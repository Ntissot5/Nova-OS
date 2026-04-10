-- Ensure insert policies exist separately (for all = select+insert+update+delete but let's be explicit)
-- Drop and recreate to be safe

do $$ begin
  -- Businesses: users can insert their own
  if not exists (select 1 from pg_policies where policyname = 'Users insert own businesses' and tablename = 'businesses') then
    create policy "Users insert own businesses" on businesses for insert with check (owner_id = auth.uid());
  end if;

  -- Agents: users can insert for their own businesses
  if not exists (select 1 from pg_policies where policyname = 'Users insert own agents' and tablename = 'agents') then
    create policy "Users insert own agents" on agents for insert with check (business_id in (select id from businesses where owner_id = auth.uid()));
  end if;
end $$;
