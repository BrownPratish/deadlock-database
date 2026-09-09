import { getItems } from "@/lib/queries";
import { ItemsExplorer } from "@/components/items-explorer";

// See app/heroes/page.tsx — same reasoning, avoid a build-time-frozen list.
export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} shop items from Deadlock.
      </p>
      <ItemsExplorer items={items} />
    </div>
  );
}
