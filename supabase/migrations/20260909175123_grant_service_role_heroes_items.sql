-- service_role lacked write privileges on these tables (seed script upserts
-- failed with "permission denied for table heroes", Postgres error 42501),
-- so grant it explicitly instead of relying on Supabase's default grants.
GRANT SELECT, INSERT, UPDATE ON public.heroes TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.items TO service_role;
