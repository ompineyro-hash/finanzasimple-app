import { createClient } from "jsr:@supabase/supabase-js@2";

const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    let body: any = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const topic = body.type || body.topic || url.searchParams.get("type") || url.searchParams.get("topic") || "";
    const id = body.data?.id || url.searchParams.get("id") || url.searchParams.get("data.id") || "";

    console.log("Webhook recibido:", topic, id);

    if (!id) {
      return new Response("ok", { status: 200 });
    }

    let email: string | null = null;
    let aprobado = false;

    if (topic.includes("subscription_authorized_payment") || topic.includes("authorized_payment")) {
      const resp = await fetch(`https://api.mercadopago.com/authorized_payments/${id}`, {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      });
      const payment = await resp.json();
      console.log("Pago de suscripción consultado:", JSON.stringify(payment));

      if (payment.status === "processed") {
        aprobado = true;
        email = payment.payer?.email || null;
      }
    } else if (topic.includes("payment")) {
      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
      });
      const payment = await resp.json();
      console.log("Pago consultado:", JSON.stringify(payment));

      if (payment.status === "approved") {
        aprobado = true;
        email = payment.payer?.email || null;
      }
    }

    if (aprobado && email) {
      const { data: userId, error: rpcError } = await supabase.rpc("get_user_id_by_email", {
        user_email: email,
      });

      if (rpcError) {
        console.error("Error buscando usuario:", rpcError);
      } else if (userId) {
        const { error } = await supabase
          .from("profiles")
          .update({
            plan_activo: true,
            plan_vence: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
          })
          .eq("id", userId);

        if (error) console.error("Error activando perfil:", error);
        else console.log("Perfil activado para", email);
      } else {
        console.error("No se encontro usuario con email:", email);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Error en webhook:", e);
    return new Response("ok", { status: 200 });
  }
});
