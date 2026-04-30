import Link from "next/link";
import type { ProjectRecord } from "@/lib/site-content";

type ProjectCardProps = {
  project: ProjectRecord;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="panel rounded-[1.75rem] p-6 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
            {project.phaseLabel} / {project.year}
          </p>
          <h3 className="font-display text-3xl text-ink-950">{project.name}</h3>
        </div>
        <span className="rounded-full bg-brick-500/10 px-3 py-1 text-xs text-brick-600">
          {project.category}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-ink-700">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-ink-700">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-ink-950/10 px-3 py-1"
          >
            {item}
          </span>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex text-sm text-brick-600 transition hover:text-brick-500"
      >
        查看项目详情
      </Link>
    </article>
  );
}
