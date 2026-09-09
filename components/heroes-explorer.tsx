"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Hero } from "@/lib/types";

export function HeroesExplorer({ heroes }: { heroes: Hero[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return heroes;
    return heroes.filter((hero) => hero.name.toLowerCase().includes(q));
  }, [heroes, query]);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <Input
        placeholder="Search heroes..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-xs"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No heroes match your search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((hero) => (
            <Card key={hero.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{hero.name}</CardTitle>
                  <Badge variant="outline">#{hero.id}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
