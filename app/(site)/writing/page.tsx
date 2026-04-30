import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getWritingPageData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "随笔"
};

export default async function WritingPage() {
  const { page, entries } = await getWritingPageData();

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroBody}
      />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="LATEST ENTRIES"
          title="当前文章结构"
          description={page.summary}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {entries.map((entry) => (
            <article key={entry.slug} className="panel rounded-[1.75rem] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                {entry.category} / {entry.publishedAt}
              </p>
              <h2 className="mt-4 font-display text-3xl text-ink-950">
                {entry.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-700">{entry.summary}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-ink-500">
                <span>{entry.readTime}</span>
                <Link
                  href={`/writing/${entry.slug}`}
                  className="text-brick-600 transition hover:text-brick-500"
                >
                  阅读详情
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
