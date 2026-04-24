import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { getAllProjects, getProjectBySlug } from "@/lib/cms";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allProjects = await getAllProjects();

  return allProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "项目不存在"
    };
  }

  return {
    title: project.name,
    description: project.summary
  };
}

export default async function ProjectDetailPage({
  params
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="grid gap-8">
      <article className="section-frame panel rounded-[2rem] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          {project.category} / {project.status}
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950 sm:text-6xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-ink-700">
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-ink-700">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-ink-950/10 px-3 py-1"
            >
              {item}
            </span>
          ))}
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="CASE STUDY"
            title="这个项目为什么要这样设计"
          />
          <div className="mt-8 grid gap-6">
            <section>
              <h2 className="text-sm uppercase tracking-[0.28em] text-ink-500">
                Challenge
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                {project.challenge}
              </p>
            </section>
            <section>
              <h2 className="text-sm uppercase tracking-[0.28em] text-ink-500">
                Solution
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                {project.solution}
              </p>
            </section>
            <section>
              <h2 className="text-sm uppercase tracking-[0.28em] text-ink-500">
                Outcome
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-700">
                {project.outcome}
              </p>
            </section>
          </div>
        </article>

        <aside className="panel rounded-[2rem] p-8">
          <h2 className="font-display text-3xl text-ink-950">当前交付内容</h2>
          <div className="mt-5 space-y-3">
            {project.deliverables.map((item) => (
              <p
                key={item}
                className="rounded-[1.2rem] border border-ink-950/10 bg-white/65 px-4 py-3 text-sm text-ink-700"
              >
                {item}
              </p>
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-6 inline-flex text-sm text-brick-600 transition hover:text-brick-500"
          >
            返回项目列表
          </Link>
        </aside>
      </div>
    </section>
  );
}
