"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Item, ItemType, SlotType } from "@/lib/types";

const TYPE_OPTIONS: { value: ItemType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "ability", label: "Ability" },
  { value: "upgrade", label: "Upgrade" },
  { value: "unknown", label: "Unknown" },
];

const SLOT_OPTIONS: { value: SlotType | "all"; label: string }[] = [
  { value: "all", label: "All slots" },
  { value: "weapon", label: "Weapon" },
  { value: "vitality", label: "Vitality" },
  { value: "spirit", label: "Spirit" },
];

export function ItemsExplorer({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ItemType | "all">("all");
  const [slot, setSlot] = useState<SlotType | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (q && !item.name.toLowerCase().includes(q)) return false;
      if (type !== "all" && item.type !== type) return false;
      if (slot !== "all" && item.slot_type !== slot) return false;
      return true;
    });
  }, [items, query, type, slot]);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search items..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-xs"
        />

        <Select value={type} onValueChange={(value) => setType(value as ItemType | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={slot} onValueChange={(value) => setSlot(value as SlotType | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="All slots" />
          </SelectTrigger>
          <SelectContent>
            {SLOT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items match these filters.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-1.5">
                <Badge variant="secondary">{item.type}</Badge>
                {item.slot_type && <Badge variant="outline">{item.slot_type}</Badge>}
                {item.tier !== null && <Badge variant="outline">Tier {item.tier}</Badge>}
                {item.cost !== null && (
                  <Badge variant="outline">{item.cost.toLocaleString()} souls</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
