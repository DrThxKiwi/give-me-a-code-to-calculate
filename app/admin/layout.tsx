import type { ReactNode } from "react";
import Link from "next/link";

const adminNavigation = [
  { href: "/admin", label: "概览" },
  { href: "/admin/pages", label: "页面内容" },
  { href: "/admin/projects", label: "项目管理" },
  { href: "/admin/settings", label: "站点设置" },
  { href: "/admin/login", label: "登录页" }
];

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7efe4]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="panel h-fit rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Admin</p>
          <h1 className="mt-4 font-display text-4xl text-ink-950">
            Content Studio
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-700">
            这一侧是未来管理员工作区。下一步会接入 Auth.js 与数据库权限控制。
          </p>
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
          <Link
            href="/"
            className="mt-8 inline-flex text-sm text-brick-600 transition hover:text-brick-500"
          >
            返回公开站点
          </Link>
        </aside>
        <main className="grid gap-6">{children}</main>
      </div>
    </div>
  );
}
