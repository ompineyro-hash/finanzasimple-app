-- 17/11/2026 - Auditoría de seguridad. Aplicado a mano en Supabase (SQL Editor).
-- Problema: cualquier usuario con sesión podía editar plan_activo y plan_vence de su
-- propia fila en profiles (la regla es ALL) y darse plan pago sin pagar.
-- La app solo edita moneda, idioma y moneda_base. Los datos del plan los escribe solo
-- la Edge Function verificar-pago (service_role), que no se ve afectada.
revoke update on public.profiles from authenticated, anon;
grant update (moneda, idioma, moneda_base) on public.profiles to authenticated;

-- Para verificar (deben salir solo idioma, moneda, moneda_base):
-- select grantee, column_name from information_schema.column_privileges
-- where table_schema='public' and table_name='profiles'
--   and privilege_type='UPDATE' and grantee in ('anon','authenticated');
