import type { ReactNode } from "react";
import Link from "next/link";
import { AdminSignOutForm } from "@/components/admin-sign-out-form";
import { getAdminSession } from "@/lib/auth-helpers";
import { isDatabaseConfigured } from "@/lib/env";

const adminNavigation = [
  { href: "/admin", label: "概览" },
  { href: "/admin/pages", label: "页面内容" },
  { href: "/admin/projects", label: "项目管理" },
  { href: "/admin/writing", label: "文章管理" },
  { href: "/admin/settings", label: "站点设置" },
  { href: "/admin/login", label: "登录页" }
];

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#f7efe4]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="panel h-fit rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Admin</p>
          <h1 className="mt-4 font-display text-4xl text-ink-950">
            Content Studio
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-700">
            这里是你的内容工作区。页面、项目、文章和站点设置都可以在这里逐步接管。
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-brick-500/10 px-3 py-1 text-brick-600">
              {session?.user ? `已登录：${session.user.email}` : "未登录"}
            </span>
            <span className="rounded-full bg-moss-500/10 px-3 py-1 text-moss-500">
              {isDatabaseConfigured() ? "数据库已配置" : "数据库未配置"}
            </span>
          </div>
          <nav className="mt-8 grid gap-2">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1rem] px-4 py-3 text-sm text-ink-700 transition hover:bg-white/80 hover:text-brick-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-wrap gap-3">
            {session?.user ? <AdminSignOutForm /> : null}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-brick-600 transition hover:text-brick-500"
            >
              返回公开站点
            </Link>
          </div>
        </aside>
        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
