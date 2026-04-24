import type { ReactNode } from "react";
import Link from "next/link";

type Action = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  aside
}: PageHeroProps) {
  return (
    <section className="section-frame panel grid gap-10 rounded-[2rem] p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:p-12">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.36em] text-ink-500">{eyebrow}</p>
        <h1 className="font-display text-5xl leading-none text-ink-950 sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-ink-700 sm:text-lg">
          {description}
        </p>
        {actions.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "secondary"
                    ? "rounded-full border border-ink-950/10 px-5 py-3 text-sm text-ink-700 transition hover:border-brick-500 hover:text-brick-600"
                    : "rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {aside ? <div className="grid gap-4">{aside}</div> : null}
    </section>
  );
}
