import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const ASSETS_API_BASE = "https://api.deadlock-api.com/v1/assets";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Shapes of the raw Deadlock Assets API responses (only the fields we use).
type ApiHero = {
  id: number;
  name: string;
};

type ApiItem = {
  id: number;
  name: string;
  type: string;
  item_tier: number | null;
  item_slot_type: string | null;
  cost: number | null;
  shopable?: boolean;
};

type Hero = {
  id: number;
  name: string;
};

type ItemType = "ability" | "upgrade" | "unknown";

type Item = {
  id: number;
  name: string;
  tier: number | null;
  type: ItemType;
  slot_type: string | null;
  cost: number | null;
};

// Matches our items.type CHECK constraint. The raw feed also contains
// internal, non-shop assets (e.g. hero base weapon definitions with
// type "weapon") which fall outside this set and must be skipped.
const SUPPORTED_ITEM_TYPES = new Set<string>(["ability", "upgrade", "unknown"]);

// `shopable` is required in addition to `type`: the API also returns
// type="upgrade" entries that are retired/non-current (e.g. old fixed-cost
// duplicates) with shopable:false despite otherwise-complete tier/slot_type/
// cost data. Only shopable:true items are live, purchasable shop items.

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request to ${url} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

async function fetchHeroes(): Promise<Hero[]> {
  const heroes = await fetchJson<ApiHero[]>(`${ASSETS_API_BASE}/heroes`);
  return heroes.map((hero) => ({ id: hero.id, name: hero.name }));
}

async function fetchItems(): Promise<Item[]> {
  const items = await fetchJson<ApiItem[]>(`${ASSETS_API_BASE}/items`);

  return items
    .filter((item) => item.shopable === true && SUPPORTED_ITEM_TYPES.has(item.type))
    .map((item) => ({
      id: item.id,
      name: item.name,
      tier: item.item_tier ?? null,
      type: item.type as ItemType,
      slot_type: item.item_slot_type ?? null,
      cost: item.cost ?? null,
    }));
}

async function main() {
  console.log("Fetching heroes...");
  const heroes = await fetchHeroes();
  console.log(`Fetched ${heroes.length} heroes.`);

  console.log("Fetching items...");
  const items = await fetchItems();
  console.log(`Fetched ${items.length} shopable items.`);

  console.log("Upserting heroes into Supabase...");
  const { error: heroesError } = await supabase
    .from("heroes")
    .upsert(heroes, { onConflict: "id" });
  if (heroesError) throw heroesError;

  console.log("Upserting items into Supabase...");
  const { error: itemsError } = await supabase
    .from("items")
    .upsert(items, { onConflict: "id" });
  if (itemsError) throw itemsError;

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
