// Edge Function "borrar-fotos-vencidas"
//
// Borra las fotos de comprobantes que se subieron hace MÁS de 60 días
// (bucket privado "comprobantes", carpetas <user_id>/<archivo>.jpg).
// Los movimientos NO se tocan: solo se les saca la referencia a la foto
// (movimientos.comprobante = null) para que la app no intente mostrarla.
//
// IMPORTANTE: las fotos se borran con la API oficial de Storage (.remove).
// NUNCA borrar filas de storage.objects con SQL: los archivos quedan huérfanos
// ocupando lugar y Supabase puede bloquear el proyecto por cuota.
//
// Cómo se usa:
//   - Se programa 1 vez por día en Supabase → Integrations → Cron
//     (tipo "Supabase Edge Function", función borrar-fotos-vencidas, POST).
//   - Prueba sin borrar nada: llamar con ?simular=1 (devuelve cuántas borraría).
//   - Usa la clave interna que Supabase ya le da a la función
//     (SUPABASE_SERVICE_ROLE_KEY). NO hay que pegar ninguna clave.
//
// Regla definida por Edu y Marcelo (21/11/2026): 60 días desde que se sube la foto.

import { createClient } from "jsr:@supabase/supabase-js@2";

const DIAS = 60;
const BUCKET = "comprobantes";

Deno.serve(async (req) => {
  try {
    const simular = new URL(req.url).searchParams.get("simular") === "1";
    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const limite = Date.now() - DIAS * 24 * 60 * 60 * 1000;
    const vencidas: string[] = [];

    // 1) Carpetas (una por usuario)
    for (let offA = 0; ; offA += 100) {
      const { data: carpetas, error: eC } = await sb.storage.from(BUCKET)
        .list("", { limit: 100, offset: offA });
      if (eC) throw eC;
      if (!carpetas || carpetas.length === 0) break;

      for (const c of carpetas) {
        if (c.id) continue; // es un archivo suelto, no una carpeta de usuario
        // 2) Archivos de esa carpeta
        for (let offB = 0; ; offB += 100) {
          const { data: archivos, error: eA } = await sb.storage.from(BUCKET)
            .list(c.name, { limit: 100, offset: offB });
          if (eA) throw eA;
          if (!archivos || archivos.length === 0) break;
          for (const a of archivos) {
            const creado = Date.parse(a.created_at ?? "");
            if (Number.isFinite(creado) && creado < limite) vencidas.push(`${c.name}/${a.name}`);
          }
          if (archivos.length < 100) break;
        }
      }
      if (carpetas.length < 100) break;
    }

    if (simular || vencidas.length === 0) {
      return Response.json({ simular, vencidas: vencidas.length, borradas: 0 });
    }

    // 3) Borrar con la API oficial, de a 50
    let borradas = 0;
    for (let i = 0; i < vencidas.length; i += 50) {
      const lote = vencidas.slice(i, i + 50);
      const { error: eR } = await sb.storage.from(BUCKET).remove(lote);
      if (eR) throw eR;
      borradas += lote.length;
      // 4) Sacar la referencia en los movimientos (quedan sin foto)
      const { error: eU } = await sb.from("movimientos").update({ comprobante: null }).in("comprobante", lote);
      if (eU) console.error("No se pudo limpiar la referencia:", eU.message);
    }
    return Response.json({ simular: false, vencidas: vencidas.length, borradas });
  } catch (e) {
    console.error(e);
    return new Response("error: " + (e as Error).message, { status: 500 });
  }
});
