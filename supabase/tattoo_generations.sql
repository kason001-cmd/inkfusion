-- Create table for per-user tattoo generation history.
-- Run this in your Supabase SQL editor.

create table if not exists public.tattoo_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  prompt text not null,
  model_prompt text not null,
  style text null,
  color text null,
  placement text null,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.tattoo_generations enable row level security;

drop policy if exists "tattoo_generations_select_own" on public.tattoo_generations;
create policy "tattoo_generations_select_own"
on public.tattoo_generations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tattoo_generations_insert_own" on public.tattoo_generations;
create policy "tattoo_generations_insert_own"
on public.tattoo_generations
for insert
to authenticated
with check (auth.uid() = user_id);
