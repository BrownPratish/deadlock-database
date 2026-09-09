import { getHeroes } from "@/lib/queries";
import { HeroesExplorer } from "@/components/heroes-explorer";

// Without this, Next prerenders the page once at build time and bakes in
// whatever was in Supabase then, so re-running the seed script wouldn't show
// up until the next deploy.
export const dynamic = "force-dynamic";

export default async function HeroesPage() {
  const heroes = await getHeroes();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Heroes</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {heroes.length} heroes from Deadlock.
      </p>
      <HeroesExplorer heroes={heroes} />
    </div>
  );
}
