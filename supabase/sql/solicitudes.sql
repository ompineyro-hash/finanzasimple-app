-- Tabla de pedidos del Botón de Baja y Botón de Arrepentimiento (Disp. 954/2025).
-- Ya está creada en Supabase (13/11/2026). Se guarda acá como referencia.
create table public.solicitudes (
  id bigint generated always as identity primary key,
  tipo text not null check (tipo in ('baja','arrepentimiento')),
  email text not null check (char_length(email) between 5 and 200),
  comentario text check (char_length(comentario) <= 500),
  codigo text not null unique check (char_length(codigo) <= 30),
  estado text not null default 'pendiente',
  creado_en timestamptz not null default now()
);
alter table public.solicitudes enable row level security;
create policy "cualquiera puede pedir baja o arrepentimiento"
  on public.solicitudes for insert
  to anon, authenticated
  with check (estado = 'pendiente');
-- Sin esto, la carga desde la página falla:
grant insert on public.solicitudes to anon, authenticated;
