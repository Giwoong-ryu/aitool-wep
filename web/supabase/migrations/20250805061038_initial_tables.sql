create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  subscription_tier text default 'free',
  created_at timestamp default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  provider text,        -- stripe | paypal
  amount numeric,
  currency text,
  status text,
  created_at timestamp default now()
);

alter table public.users enable row level security;
alter table public.payments enable row level security;

create policy "users: owner" on public.users
  for select using ( auth.uid() = id );

create policy "payments: owner" on public.payments
  for select using ( auth.uid() = user_id );