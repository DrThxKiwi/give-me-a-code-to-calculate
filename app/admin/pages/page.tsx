import { savePageAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth-helpers";
import { formatJson, getManagedPages } from "@/lib/cms";
import { isDatabaseConfigured } from "@/lib/env";

type AdminPagesPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

function FlashMessage({
  message,
  tone
}: {
  message?: string;
  tone: "success" | "error";
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={
        tone === "success"
          ? "rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800"
          : "rounded-[1.2rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
      }
    >
      {message}
    </div>
  );
}

export default async function AdminPagesPage({
  searchParams
}: AdminPagesPageProps) {
  await requireAdmin("/admin/pages");
  const pages = await getManagedPages();
  const { success, error } = await searchParams;

  return (
    <section className="grid gap-6">
      <div className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          PAGE COLLECTION
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">页面内容管理</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          这一页用于编辑固定页面的标题、Hero 文案和 JSON 内容块。你可以先用它管理首页、关于页、项目页、随笔页和联系页。
        </p>
      </div>

      {!isDatabaseConfigured() ? (
        <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          当前还没有配置数据库，所以你现在看到的是默认内容。配置好 <code>DATABASE_URL</code> 后，这里的保存按钮才会把数据写入 PostgreSQL。
        </div>
      ) : null}

      <FlashMessage message={success} tone="success" />
      <FlashMessage message={error} tone="error" />

      <div className="grid gap-6">
        {pages.map((page) => (
          <form
            key={page.slug}
            action={savePageAction}
            className="panel rounded-[2rem] p-8"
          >
            <input type="hidden" name="slug" value={page.slug} />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  /{page.slug}
                </p>
                <h2 className="mt-2 font-display text-4xl text-ink-950">
                  {page.title}
                </h2>
              </div>
              <select
                name="visibility"
                defaultValue={page.visibility}
                className="rounded-full border border-ink-950/10 bg-white px-4 py-2 text-sm text-ink-700"
              >
                <option value="public">public</option>
                <option value="draft">draft</option>
              </select>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink-700">
                页面标题
                <input
                  name="title"
                  defaultValue={page.title}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-ink-700">
                页面摘要
                <input
                  name="summary"
                  defaultValue={page.summary}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink-700">
                Hero Eyebrow
                <input
                  name="heroEyebrow"
                  defaultValue={page.heroEyebrow}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
                />
              </label>
              <label className="grid gap-2 text-sm text-ink-700">
                Hero 标题
                <input
                  name="heroTitle"
                  defaultValue={page.heroTitle}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-ink-700">
              Hero 描述
              <textarea
                name="heroBody"
                defaultValue={page.heroBody}
                rows={4}
                className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
              />
            </label>

            <label className="mt-4 grid gap-2 text-sm text-ink-700">
              页面内容 JSON
              <textarea
                name="contentJson"
                defaultValue={formatJson(page.content)}
                rows={16}
                className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 font-mono text-xs outline-none transition focus:border-brick-500"
              />
            </label>

            <button
              type="submit"
              className="mt-6 rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600"
            >
              保存页面
            </button>
          </form>
        ))}
      </div>
    </section>
  );
}
