-- Préstamos v1 (Me deben / Debo, con devoluciones parciales). Definido por Edu el 20/11/2026.
-- ESTADO: ya corrido en Supabase el 20/11/2026 (Success). trial_vigente() sin parámetros y eliminar_mi_cuenta verificados.
-- No cuentan como ingreso ni gasto: solo mueven saldo de las cuentas (Tengo) y se ven en Situación.
-- Cada préstamo se guarda en la moneda de la cuenta; las devoluciones van a cuentas de esa misma moneda.
-- Importante: confirmar que trial_vigente() existe sin parámetros (como en las otras tablas) y
-- revisar que la función eliminar_mi_cuenta() borre estas tablas (con el FK de abajo se borran solas).

create table public.prestamos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sentido text not null check (sentido in ('me_deben','debo')),
  persona text not null check (char_length(persona) between 1 and 80),
  monto numeric(18,2) not null check (monto > 0),
  cuenta text not null,
  fecha date not null default current_date,
  fecha_devolucion date,
  nota text check (char_length(nota) <= 200),
  creado_en timestamptz not null default now()
);

create table public.prestamo_pagos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prestamo_id uuid not null references public.prestamos(id) on delete cascade,
  fecha date not null default current_date,
  monto numeric(18,2) not null check (monto > 0),
  cuenta text not null,
  creado_en timestamptz not null default now()
);

alter table public.prestamos enable row level security;
alter table public.prestamo_pagos enable row level security;

create policy "prestamos: ver los propios" on public.prestamos
  for select to authenticated using (auth.uid() = user_id);
create policy "prestamos: cargar los propios" on public.prestamos
  for insert to authenticated with check (auth.uid() = user_id and trial_vigente());
create policy "prestamos: borrar los propios" on public.prestamos
  for delete to authenticated using (auth.uid() = user_id and trial_vigente());

create policy "pagos: ver los propios" on public.prestamo_pagos
  for select to authenticated using (auth.uid() = user_id);
create policy "pagos: cargar los propios" on public.prestamo_pagos
  for insert to authenticated with check (
    auth.uid() = user_id and trial_vigente()
    and exists (select 1 from public.prestamos p where p.id = prestamo_id and p.user_id = auth.uid()));
create policy "pagos: borrar los propios" on public.prestamo_pagos
  for delete to authenticated using (auth.uid() = user_id and trial_vigente());

-- OJO: en este proyecto las tablas nuevas NO reciben permisos solas.
grant select, insert, delete on public.prestamos to authenticated;
grant select, insert, delete on public.prestamo_pagos to authenticated;
grant select, insert, update, delete on public.prestamos, public.prestamo_pagos to service_role;

create index on public.prestamos (user_id);
create index on public.prestamo_pagos (prestamo_id);
