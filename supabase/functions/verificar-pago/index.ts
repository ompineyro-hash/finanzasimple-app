// Edge Function "verificar-pago"
//
// Red de seguridad para el cobro: en vez de esperar el aviso (webhook) de
// Mercado Pago, la app le pregunta a esta funcion "¿mi mail tiene un pago
// aprobado?". La funcion consulta a Mercado Pago y, si lo encuentra, activa
// el plan. Sirve para el primer pago y para las renovaciones mensuales.
//
// Seguridad: el mail que se busca es SIEMPRE el de la sesion iniciada (se
// saca del token), nunca uno que mande el navegador. Asi nadie puede
// activarse con el mail de otra persona.
//
// Configuracion en Supabase: "Verify JWT" APAGADO (la funcion valida el
// token ella misma). Usa los mismos secretos que mp-webhook.

import { createClient } from "jsr:@supabase/supabase-js@2";

const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Cuantos dias de acceso da cada pago mensual (igual que mp-webhook).
const DIAS_POR_PAGO = 35;
const MS_DIA = 24 * 60 * 60 * 1000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function responder(cuerpo: unknown, status = 200) {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

// Un pago cuenta como "de Ingasto" si su descripcion o referencia externa lo dice.
function esDeIngasto(p: any): boolean {
  const texto = [p.description, p.external_reference, p.metadata?.plan]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return texto.includes("ingasto");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // 1) Quien pregunta: se valida el token de la sesion.
    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!token) return responder({ ok: false, motivo: "sin_sesion" }, 401);

    const { data: dataUsuario, error: errUsuario } = await supabase.auth.getUser(token);
    const usuario = dataUsuario?.user;
    if (errUsuario || !usuario?.email) return responder({ ok: false, motivo: "sesion_invalida" }, 401);

    const email = usuario.email.toLowerCase();

    // 2) Se buscan en Mercado Pago los pagos aprobados de ese mail.
    const desde = new Date(Date.now() - (DIAS_POR_PAGO + 5) * MS_DIA).toISOString();
    const url =
      "https://api.mercadopago.com/v1/payments/search" +
      `?payer.email=${encodeURIComponent(email)}` +
      "&status=approved&sort=date_approved&criteria=desc&limit=30" +
      `&begin_date=${encodeURIComponent(desde)}&end_date=NOW`;

    const resp = await fetch(url, { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } });
    if (!resp.ok) {
      console.error("MP search error", resp.status, await resp.text());
      return responder({ ok: false, motivo: "error_mercadopago", estado: resp.status }, 502);
    }
    const busqueda = await resp.json();
    const pagos: any[] = busqueda.results || [];

    // 3) Se queda con los pagos de Ingasto que todavia dan acceso.
    const vigentes = pagos
      .filter((p) => p.status === "approved" && esDeIngasto(p))
      .map((p) => ({ id: p.id, fecha: new Date(p.date_approved || p.date_created).getTime() }))
      .filter((p) => !isNaN(p.fecha) && p.fecha + DIAS_POR_PAGO * MS_DIA > Date.now())
      .sort((a, b) => b.fecha - a.fecha);

    if (vigentes.length === 0) {
      console.log("verificar-pago: sin pago vigente", { email, encontrados: pagos.length });
      return responder({ ok: false, motivo: "sin_pago", encontrados: pagos.length });
    }

    // 4) Se activa: el vencimiento es "fecha del pago + 35 dias" y nunca se
    //    acorta uno que ya estuviera mas adelante.
    const nuevoVence = new Date(vigentes[0].fecha + DIAS_POR_PAGO * MS_DIA);

    const { data: perfil } = await supabase
      .from("profiles")
      .select("plan_vence")
      .eq("id", usuario.id)
      .maybeSingle();

    let vence = nuevoVence;
    if (perfil?.plan_vence && new Date(perfil.plan_vence) > nuevoVence) {
      vence = new Date(perfil.plan_vence);
    }

    const { error: errUpdate } = await supabase
      .from("profiles")
      .update({ plan_activo: true, plan_vence: vence.toISOString() })
      .eq("id", usuario.id);

    if (errUpdate) {
      console.error("verificar-pago: error al activar", errUpdate);
      return responder({ ok: false, motivo: "error_al_activar" }, 500);
    }

    console.log("verificar-pago: activado", { email, pago: vigentes[0].id, vence: vence.toISOString() });
    return responder({ ok: true, plan_vence: vence.toISOString() });
  } catch (e) {
    console.error("verificar-pago: error inesperado", e);
    return responder({ ok: false, motivo: "error_inesperado" }, 500);
  }
});
