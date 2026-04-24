import { projects } from "@/lib/site-content";

export default function AdminProjectsPage() {
  return (
    <section className="panel rounded-[2rem] p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
        PROJECT COLLECTION
      </p>
      <h1 className="mt-4 font-display text-5xl text-ink-950">项目管理</h1>
      <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
        项目集合会是最适合最先入库的一部分，因为它既有卡片列表，也有详情页内容，非常适合练习 Prisma 查询与后台编辑表单。
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-[1.4rem] border border-ink-950/10 bg-white/70 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  /projects/{project.slug}
                </p>
                <h2 className="mt-2 text-xl text-ink-950">{project.name}</h2>
              </div>
              <span className="rounded-full bg-brick-500/10 px-3 py-1 text-xs text-brick-600">
                {project.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-700">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink-950/10 px-3 py-1 text-xs text-ink-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
