import { SectionHeading } from "@/components/section-heading";
import { getAdminOverview } from "@/lib/cms";

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();

  return (
    <>
      <section className="section-frame panel rounded-[2rem] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          ADMIN OVERVIEW
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">后台骨架已就位</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          这里先把未来需要编辑的内容集合和工作流展示出来。下一步接 Auth.js
          与 Prisma 后，这些页面就可以逐步变成真正可编辑的后台。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">页面数量</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.pages.length}
          </p>
        </article>
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">项目集合</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.projectCount}
          </p>
        </article>
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">文章集合</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.articleCount}
          </p>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="CONTENT COLLECTIONS"
            title="建议优先接入后台的内容集合"
          />
          <div className="mt-8 grid gap-4">
            {overview.collections.map((collection) => (
              <article
                key={collection.key}
                className="rounded-[1.4rem] border border-ink-950/10 bg-white/70 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-3xl text-ink-950">
                    {collection.name}
                  </h2>
                  <span className="rounded-full bg-brick-500/10 px-3 py-1 text-xs text-brick-600">
                    {collection.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-700">
                  {collection.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collection.fields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-ink-950/10 px-3 py-1 text-xs text-ink-700"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            NEXT INTEGRATIONS
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink-950">下一步接什么</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-ink-700">
            <p>1. Auth.js：保护后台入口，只允许管理员访问。</p>
            <p>2. Prisma + PostgreSQL：把页面、项目、文章数据入库。</p>
            <p>3. Vercel Blob：为项目封面、个人头像和文章配图做上传。</p>
            <p>4. Server Actions：让后台表单真正写入内容。</p>
          </div>
        </article>
      </section>
    </>
  );
}
