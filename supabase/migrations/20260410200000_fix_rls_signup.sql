-- Allow authenticated users to insert their own businesses
drop policy if exists "Users see own businesses" on businesses;
drop policy if exists "Users insert own businesses" on businesses;

create policy "Users select own businesses" on businesses for select using (owner_id = auth.uid());
create policy "Users insert businesses" on businesses for insert with check (owner_id = auth.uid());
create policy "Users update own businesses" on businesses for update using (owner_id = auth.uid());

-- Allow authenticated users to insert agents for their businesses
drop policy if exists "Users see own agents" on agents;
drop policy if exists "Users insert own agents" on agents;

create policy "Users select own agents" on agents for select using (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "Users insert agents" on agents for insert with check (business_id in (select id from businesses where owner_id = auth.uid()));
create policy "Users update own agents" on agents for update using (business_id in (select id from businesses where owner_id = auth.uid()));

-- Logs
drop policy if exists "Users see own logs" on agent_logs;
create policy "Users select own logs" on agent_logs for select using (business_id in (select id from businesses where owner_id = auth.uid()));
