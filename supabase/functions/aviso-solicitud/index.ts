// Edge Function "aviso-solicitud"
//
// Cuando alguien usa el Botón de Baja o el Botón de Arrepentimiento, se carga
// una fila en la tabla "solicitudes". Un Database Webhook de Supabase llama a
// esta función, que manda un mail de aviso a ingastosoporte@gmail.com (con
// Resend), para atender el pedido dentro de las 24 horas.
//
// Seguridad: no confía en lo que le mandan. Vuelve a buscar el pedido en la
// base por su id (con la clave interna de Supabase) y solo avisa si existe y
// está pendiente. Así nadie puede usarla para mandar mails falsos.
//
// Configuración en Supabase:
//   - Secreto RESEND_API_KEY (la clave de Resend). Lo carga cada uno en
//     Edge Functions → Secrets. NUNCA pegarla en el chat ni en el código.
//   - "Verify JWT" APAGADO (la función se protege sola, ver arriba).
//   - Database Webhook: tabla solicitudes, evento Insert, tipo Supabase Edge
//     Functions, función aviso-solicitud, método POST.
//
// Resend gratis solo manda mails a la dirección con la que se creó la cuenta
// de Resend: por eso la cuenta de Resend es la de ingastosoporte@gmail.com.

import { createClient } from "jsr:@supabase/supabase-js@2";

const AVISO_A = "ingastosoporte@gmail.com";

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string)
  );

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => null);
    const id = body?.record?.id;
    if (body?.type !== "INSERT" || body?.table !== "solicitudes" || !id) {
      return new Response("ignorado", { status: 200 });
    }

    // Volver a leer el pedido desde la base (no confiar en el payload)
    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: r, error } = await sb
      .from("solicitudes")
      .select("*")
      .eq("id", id)
      .eq("estado", "pendiente")
      .maybeSingle();
    if (error) throw error;
    if (!r) return new Response("no existe", { status: 200 });

    const zona = { timeZone: "America/Argentina/Buenos_Aires" } as const;
    const creado = new Date(r.creado_en);
    const limite = new Date(creado.getTime() + 24 * 3600 * 1000);
    const esArrep = r.tipo === "arrepentimiento";
    const tipo = esArrep ? "ARREPENTIMIENTO" : "BAJA";
    const queHacer = esArrep
      ? "1) Verificar que el primer pago tenga 10 días corridos o menos y que no haya usado el arrepentimiento antes.<br>2) Cancelar la suscripción en Mercado Pago.<br>3) Devolver el importe completo desde Mercado Pago.<br>4) Responderle por mail con el código."
      : "1) Cancelar la suscripción en Mercado Pago (sin devolución).<br>2) Responderle por mail con el código.";

    const html = `
      <h2>Pedido de ${tipo}</h2>
      <p><b>Código:</b> ${esc(r.codigo)}<br>
      <b>Email del cliente:</b> ${esc(r.email)}<br>
      <b>Comentario:</b> ${esc(r.comentario) || "(sin comentario)"}<br>
      <b>Recibido:</b> ${creado.toLocaleString("es-AR", zona)}<br>
      <b>Responder antes de:</b> ${limite.toLocaleString("es-AR", zona)}</p>
      <p><b>Qué hacer:</b><br>${queHacer}</p>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ingasto <onboarding@resend.dev>",
        to: [AVISO_A],
        reply_to: r.email,
        subject: `Ingasto: pedido de ${tipo} (${r.codigo})`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend:", res.status, await res.text());
      return new Response("error al mandar el mail", { status: 500 });
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("error", { status: 500 });
  }
});
