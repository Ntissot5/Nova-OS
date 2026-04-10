-- Nova OS — Supabase schema

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  owner_email text not null,
  name text not null,
  description text,
  site_config jsonb default '{}',
  site_url text,
  plan text default 'free' check (plan in ('free','starter','pro','unlimited')),
  agents text[] default '{}',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  type text not null check (type in ('support','sales','marketing','email','reports','ecommerce')),
  status text default 'active' check (status in ('active','paused','error')),
  config jsonb default '{}',
  last_run timestamptz,
  next_run timestamptz,
  tasks_this_month int default 0,
  created_at timestamptz default now()
);

create table if not exists agent_logs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade not null,
  business_id uuid references businesses(id) on delete cascade not null,
  action text not null,
  result text,
  type text,
  created_at timestamptz default now()
);

create table if not exists onboarding_responses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company_name text,
  sector text,
  city text,
  description text,
  services text[] default '{}',
  client_type text,
  age_range text,
  tone text,
  automations text[] default '{}',
  plan text,
  created_at timestamptz default now()
);

-- RLS
alter table businesses enable row level security;
alter table agents enable row level security;
alter table agent_logs enable row level security;

alter table onboarding_responses enable row level security;
create policy "Anyone can insert onboarding" on onboarding_responses for insert with check (true);
create policy "Users see own onboarding" on onboarding_responses for select using (email = (select email from auth.users where id = auth.uid()));

create policy "Users see own businesses" on businesses for all using (owner_id = auth.uid());
create policy "Users see own agents" on agents for all using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "Users see own logs" on agent_logs for all using (business_id in (select id from businesses where owner_id = auth.uid()));

-- Indexes
create index if not exists idx_agents_business on agents(business_id);
create index if not exists idx_logs_business on agent_logs(business_id);
create index if not exists idx_logs_agent on agent_logs(agent_id);
create index if not exists idx_logs_created on agent_logs(created_at desc);
