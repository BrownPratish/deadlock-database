import { supabase } from "@/lib/supabase";
import type { Hero, Item } from "@/lib/types";

export async function getHeroes(): Promise<Hero[]> {
  const { data, error } = await supabase
    .from("heroes")
    .select("id, name")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getItems(): Promise<Item[]> {
  const { data, error } = await supabase
    .from("items")
    .select("id, name, tier, type, slot_type, cost")
    .order("name");

  if (error) throw error;
  return data;
}
