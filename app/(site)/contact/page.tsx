import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getContactPageData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "联系"
};

export default async function ContactPage() {
  const { page, methods } = await getContactPageData();

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroBody}
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="REACH OUT"
            title="联系信息"
            description={page.summary}
          />
          <div className="mt-8 grid gap-4">
            {methods.map((method) => (
              <Link
                key={method.label}
                href={method.href}
                className="rounded-[1.4rem] border border-ink-950/10 bg-white/65 px-5 py-4 transition hover:border-brick-500"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  {method.label}
                </p>
                <p className="mt-2 text-base text-ink-950">{method.value}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-ink-700">{page.content.note}</p>
        </article>

        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="FAQ"
            title="你后面最常会遇到的问题"
          />
          <div className="mt-8 grid gap-4">
            {page.content.faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-ink-950/10 bg-white/65 p-5"
              >
                <h2 className="text-lg text-ink-950">{item.question}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
