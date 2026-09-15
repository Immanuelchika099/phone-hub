-- Run this once in the Supabase SQL Editor for the customer account settings.
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists address text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists state text;
alter table public.profiles add column if not exists currency text not null default 'NGN';

drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());
