export default function AdminSettingsPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <article className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          SITE SETTINGS
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">站点设置规划</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          当后台真正接入后，这里适合管理站点名称、联系方式、社交链接、SEO 描述和首页主标题等全局内容。
        </p>
        <div className="mt-8 grid gap-4">
          {[
            "站点名称与副标题",
            "首页 Hero 文案",
            "联系邮箱与社交链接",
            "SEO 标题与描述",
            "导航和页脚链接"
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-ink-950/10 bg-white/70 px-5 py-4 text-sm text-ink-700"
            >
              {item}
            </div>
          ))}
        </div>
      </article>

      <article className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
          ENVIRONMENT
        </p>
        <h2 className="mt-4 font-display text-4xl text-ink-950">未来会用到的变量</h2>
        <div className="mt-6 space-y-3 text-sm text-ink-700">
          <p>
            <code>DATABASE_URL</code>：连接 PostgreSQL
          </p>
          <p>
            <code>AUTH_SECRET</code>：保护 Auth.js 会话
          </p>
          <p>
            <code>AUTH_GITHUB_ID / AUTH_GITHUB_SECRET</code>：管理员登录
          </p>
          <p>
            <code>BLOB_READ_WRITE_TOKEN</code>：上传图片到 Vercel Blob
          </p>
        </div>
      </article>
    </section>
  );
}
