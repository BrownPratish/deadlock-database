-- Heroes and items are public, read-only reference data with no user-specific
-- access rules, so expose them to the browser via the anon key: enable RLS
-- and add an open SELECT policy, rather than routing app reads through the
-- service_role key (which is reserved for the seed script).
GRANT SELECT ON public.heroes TO anon, authenticated;
GRANT SELECT ON public.items TO anon, authenticated;

ALTER TABLE public.heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.heroes
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public read access" ON public.items
    FOR SELECT
    TO anon, authenticated
    USING (true);
