import Link from "next/link";

const NAV_LINKS = [
  { href: "/heroes", label: "Heroes" },
  { href: "/items", label: "Items" },
];

export function SiteNav() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          Deadlock Database
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
