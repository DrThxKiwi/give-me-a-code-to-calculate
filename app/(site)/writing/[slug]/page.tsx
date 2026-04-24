import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWritingEntries, getWritingEntryBySlug } from "@/lib/cms";

type WritingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allEntries = await getAllWritingEntries();

  return allEntries.map((entry) => ({
    slug: entry.slug
  }));
}

export async function generateMetadata({
  params
}: WritingDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWritingEntryBySlug(slug);

  if (!entry) {
    return {
      title: "文章不存在"
    };
  }

  return {
    title: entry.title,
    description: entry.summary
  };
}

export default async function WritingDetailPage({
  params
}: WritingDetailPageProps) {
  const { slug } = await params;
  const entry = await getWritingEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto grid w-full max-w-4xl gap-10">
      <header className="panel section-frame rounded-[2rem] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          {entry.category} / {entry.publishedAt} / {entry.readTime}
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink-950 sm:text-6xl">
          {entry.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink-700">
          {entry.summary}
        </p>
      </header>

      <div className="panel rounded-[2rem] p-8 md:p-12">
        <div className="space-y-10">
          {entry.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl text-ink-950">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-ink-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <Link
          href="/writing"
          className="mt-10 inline-flex text-sm text-brick-600 transition hover:text-brick-500"
        >
          返回随笔列表
        </Link>
      </div>
    </article>
  );
}
