import { saveSiteSettingsAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth-helpers";
import { formatJson, getSettingsForAdmin } from "@/lib/cms";
import { isDatabaseConfigured } from "@/lib/env";

type AdminSettingsPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function AdminSettingsPage({
  searchParams
}: AdminSettingsPageProps) {
  await requireAdmin("/admin/settings");
  const settings = await getSettingsForAdmin();
  const { success, error } = await searchParams;

  return (
    <section className="grid gap-6">
      <div className="panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">
          SITE SETTINGS
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">站点设置</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-ink-700">
          当后台真正接管内容后，这里适合维护品牌名、联系方式、导航、页脚说明和公开站点的基本信息。
        </p>
      </div>

      {!isDatabaseConfigured() ? (
        <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          当前数据库未配置，所以这里展示的是默认站点设置。只有配置好 <code>DATABASE_URL</code> 之后，保存才会真正写入。
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

      <form action={saveSiteSettingsAction} className="panel rounded-[2rem] p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-ink-700">
            站点名称
            <input
              name="brandName"
              defaultValue={settings.brandName}
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            品牌短标签
            <input
              name="brandBadge"
              defaultValue={settings.brandBadge}
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-2 text-sm text-ink-700">
          页脚说明
          <textarea
            name="footerSummary"
            defaultValue={settings.footerSummary}
            rows={4}
            className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
          />
        </label>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm text-ink-700">
            联系邮箱
            <input
              name="contactEmail"
              defaultValue={settings.contactEmail}
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            GitHub 链接
            <input
              name="githubUrl"
              defaultValue={settings.githubUrl}
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
            />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            部署地址
            <input
              name="deployUrl"
              defaultValue={settings.deployUrl}
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3"
            />
          </label>
        </div>

        <label className="mt-4 grid gap-2 text-sm text-ink-700">
          导航 JSON
          <textarea
            name="navigationJson"
            defaultValue={formatJson(settings.navigation)}
            rows={8}
            className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 font-mono text-xs"
          />
        </label>

        <label className="mt-4 grid gap-2 text-sm text-ink-700">
          页脚链接 JSON
          <textarea
            name="footerLinksJson"
            defaultValue={formatJson(settings.footerLinks)}
            rows={8}
            className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 font-mono text-xs"
          />
        </label>

        <button
          type="submit"
          className="mt-6 rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600"
        >
          保存站点设置
        </button>
      </form>
    </section>
  );
}
