import { SectionHeading } from "@/components/section-heading";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminOverview } from "@/lib/cms";

export default async function AdminOverviewPage() {
  await requireAdmin("/admin");
  const overview = await getAdminOverview();

  return (
    <>
      <section className="section-frame panel rounded-[2rem] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          ADMIN OVERVIEW
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">后台已经开始具备工作能力</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          现在这里已经不再只是一个样板页。你可以把它继续接到数据库和 Auth.js 上，然后通过表单真正维护站点内容。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">页面数量</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.pages.length}
          </p>
        </article>
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">项目数量</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.projectCount}
          </p>
        </article>
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">文章数量</p>
          <p className="mt-4 font-display text-5xl text-ink-950">
            {overview.articleCount}
          </p>
        </article>
        <article className="panel rounded-[1.75rem] p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-ink-500">运行状态</p>
          <p className="mt-4 text-sm leading-7 text-ink-700">
            {overview.authConfigured ? "登录已配置" : "登录未配置"}
            <br />
            {overview.databaseConfigured ? "数据库已配置" : "数据库未配置"}
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
          <h2 className="mt-4 font-display text-4xl text-ink-950">你接下来要做什么</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-ink-700">
            <p>1. 在 Vercel 设置 DATABASE_URL 并执行数据库初始化。</p>
            <p>2. 配置 AUTH_SECRET、ADMIN_EMAIL、ADMIN_PASSWORD_HASH。</p>
            <p>3. 登录后台后开始维护页面、项目和文章。</p>
            <p>4. 下一阶段再继续接 Vercel Blob 做图片上传。</p>
          </div>
        </article>
      </section>
    </>
  );
}
