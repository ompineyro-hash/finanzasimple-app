-- Préstamos en cuotas (D4). Ejecutar UNA vez en Supabase → SQL Editor.
-- Agrega una marca a la tabla prestamos: si es "en_cuotas", la deuda se sigue con las
-- cuotas (que quedan como pendientes en Movimientos) y el préstamo solo suma plata a la cuenta.
-- No hace falta tocar permisos: la tabla ya los tiene.
alter table public.prestamos add column if not exists en_cuotas boolean not null default false;
