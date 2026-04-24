import Link from "next/link";
import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-2">
          <p className="font-display text-2xl text-ink-950">{siteConfig.brand.name}</p>
          <p className="text-sm leading-7 text-ink-700">{siteConfig.footer.summary}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink-700">
          {siteConfig.footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-brick-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
