import Link from "next/link";
import { getSiteChrome } from "@/lib/cms";

export async function SiteHeader() {
  const chrome = await getSiteChrome();

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-display text-xl tracking-[0.2em] text-brick-600">
            LP
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-ink-500">
              {chrome.brand.badge}
            </p>
            <p className="text-sm text-ink-700">{chrome.brand.name}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink-700 md:flex">
          {chrome.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-brick-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin"
          className="rounded-full border border-ink-950/10 px-4 py-2 text-sm text-ink-700 transition hover:border-brick-500 hover:text-brick-600"
        >
          后台入口
        </Link>
      </div>
    </header>
  );
}
