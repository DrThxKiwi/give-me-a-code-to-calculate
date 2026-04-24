import { editablePages } from "@/lib/site-content";

export default function AdminPagesPage() {
  return (
    <section className="panel rounded-[2rem] p-8">
      <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
        PAGE COLLECTION
      </p>
      <h1 className="mt-4 font-display text-5xl text-ink-950">页面内容管理</h1>
      <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
        这里展示的是未来后台里“页面内容”集合的样子。后面接数据库后，每一条记录都可以进入表单编辑模式。
      </p>
      <div className="mt-8 grid gap-4">
        {editablePages.map((page) => (
          <article
            key={page.slug}
            className="rounded-[1.4rem] border border-ink-950/10 bg-white/70 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  /{page.slug}
                </p>
                <h2 className="mt-2 text-xl text-ink-950">{page.title}</h2>
              </div>
              <span className="rounded-full bg-moss-500/10 px-3 py-1 text-xs text-moss-500">
                {page.visibility}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-700">{page.summary}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-ink-500">
              {page.sections} 个内容模块
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
