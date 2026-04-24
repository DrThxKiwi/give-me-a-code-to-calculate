export default function AdminLoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center">
      <article className="panel section-frame w-full rounded-[2rem] p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-ink-500">LOGIN</p>
        <h1 className="mt-4 font-display text-5xl text-ink-950">管理员登录页预留</h1>
        <p className="mt-4 text-sm leading-8 text-ink-700">
          这里目前还是演示页面，下一步会接入 Auth.js，只有管理员才能进入后台。现在先把视觉与路由留好，后续集成时就不会影响公开站点结构。
        </p>
        <form className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-ink-700">
            邮箱
            <input
              type="email"
              placeholder="admin@example.com"
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
              disabled
            />
          </label>
          <label className="grid gap-2 text-sm text-ink-700">
            密码
            <input
              type="password"
              placeholder="未来改成 Auth.js 登录"
              className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
              disabled
            />
          </label>
          <button
            type="button"
            disabled
            className="mt-2 rounded-full bg-ink-950 px-5 py-3 text-sm text-white opacity-75"
          >
            等待接入 Auth.js
          </button>
        </form>
      </article>
    </section>
  );
}
