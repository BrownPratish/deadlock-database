import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  {
    href: "/heroes",
    title: "Heroes",
    description: "Browse every Deadlock hero.",
  },
  {
    href: "/items",
    title: "Items",
    description:
      "Browse shop items — abilities and upgrades — filterable by slot and type.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Deadlock Database</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        A small reference explorer for Deadlock heroes and shop items, backed
        by live data from Supabase.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button nativeButton={false} render={<Link href={section.href} />}>
                Browse {section.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
