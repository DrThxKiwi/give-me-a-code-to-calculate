import { deleteArticleAction, saveArticleAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth-helpers";
import { formatJson, getAllWritingDraftsForAdmin } from "@/lib/cms";
import { isDatabaseConfigured } from "@/lib/env";

type AdminWritingPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function AdminWritingPage({
  searchParams
}: AdminWritingPageProps) {
  await requireAdmin("/admin/writing");
  const articles = await getAllWritingDraftsForAdmin();
  const { success, error } = await searchParams;

  return (
    <section className="grid gap-6">
      <div className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          WRITING COLLECTION
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">文章管理</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          这里管理的是文章摘要、阅读时长、发布日期，以及正文的 JSON 内容块。
        </p>
      </div>

      {!isDatabaseConfigured() ? (
        <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          当前数据库未配置，所以这里展示的是默认文章数据。配好数据库后，保存和删除才会真正持久化。
        </div>
      ) : null}

      {success ? (
        <div className="rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {success}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-[1.2rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form action={saveArticleAction} className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-ink-500">NEW ARTICLE</p>
        <h2 className="mt-3 font-display text-4xl text-ink-950">新增文章</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-ink-700">
            slug
            <input name="slug" className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            分类
            <input name="category" className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-ink-700">
            标题
            <input name="title" className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            阅读时长
            <input name="readTime" defaultValue="4 分钟" className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-ink-700">
            发布日期
            <input name="publishedAt" defaultValue={new Date().toISOString().slice(0, 10)} className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            可见性
            <select name="visibility" defaultValue="public" className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3">
              <option value="public">public</option>
              <option value="draft">draft</option>
            </select>
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm text-ink-700">
          摘要
          <textarea name="summary" rows={3} className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3" />
        </label>
        <label className="mt-4 grid gap-2 text-sm text-ink-700">
          正文 JSON
          <textarea name="bodyJson" defaultValue="[]" rows={12} className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 font-mono text-xs" />
        </label>
        <button
          type="submit"
          className="mt-6 rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600"
        >
          新增文章
        </button>
      </form>

      <div className="grid gap-6">
        {articles.map((article) => (
          <form
            key={article.slug}
            action={saveArticleAction}
            className="panel rounded-[2rem] p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  /writing/{article.slug}
                </p>
                <h2 className="mt-2 font-display text-4xl text-ink-950">
                  {article.title}
                </h2>
              </div>
              <select
                name="visibility"
                defaultValue={article.visibility}
                className="rounded-full border border-ink-950/10 bg-white px-4 py-2 text-sm text-ink-700"
              >
                <option value="public">public</option>
                <option value="draft">draft</option>
              </select>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink-700">
                slug
                <input
                  name="slug"
                  defaultValue={article.slug}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
                />
              </label>
              <label className="grid gap-2 text-sm text-ink-700">
                分类
                <input
                  name="category"
                  defaultValue={article.category}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink-700">
                标题
                <input
                  name="title"
                  defaultValue={article.title}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
                />
              </label>
              <label className="grid gap-2 text-sm text-ink-700">
                阅读时长
                <input
                  name="readTime"
                  defaultValue={article.readTime}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-ink-700">
                发布日期
                <input
                  name="publishedAt"
                  defaultValue={article.publishedAt}
                  className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-ink-700">
              摘要
              <textarea
                name="summary"
                defaultValue={article.summary}
                rows={3}
                className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
              />
            </label>
            <label className="mt-4 grid gap-2 text-sm text-ink-700">
              正文 JSON
              <textarea
                name="bodyJson"
                defaultValue={formatJson(article.sections)}
                rows={12}
                className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 font-mono text-xs"
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600"
              >
                保存文章
              </button>
              <button
                formAction={deleteArticleAction}
                type="submit"
                name="slug"
                value={article.slug}
                className="rounded-full border border-red-200 px-5 py-3 text-sm text-red-700 transition hover:bg-red-50"
              >
                删除文章
              </button>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
}
