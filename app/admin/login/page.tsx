import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSession } from "@/lib/auth-helpers";
import { isAuthConfigured } from "@/lib/env";

type AdminLoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function AdminLoginPage({
  searchParams
}: AdminLoginPageProps) {
  const session = await getAdminSession();

  if (session?.user) {
    redirect("/admin");
  }

  const { callbackUrl = "/admin" } = await searchParams;
  const configured = isAuthConfigured();

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center">
      <article className="panel section-frame w-full rounded-[2rem] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">LOGIN</p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">管理员登录</h1>
        <p className="mt-4 text-sm leading-8 text-ink-700">
          登录之后你就可以进入后台工作区，维护公开页面、项目案例和随笔内容。
        </p>
        {!configured ? (
          <div className="mt-6 rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-800">
            当前还没有配置管理员登录环境变量。请先设置 <code>AUTH_SECRET</code>、
            <code>ADMIN_EMAIL</code> 和 <code>ADMIN_PASSWORD_HASH</code>。
          </div>
        ) : null}
        <AdminLoginForm callbackUrl={callbackUrl} disabled={!configured} />
      </article>
    </section>
  );
}
