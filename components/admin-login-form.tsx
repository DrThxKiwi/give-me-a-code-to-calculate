"use client";

import { useActionState } from "react";
import {
  authenticateAdmin,
  initialLoginFormState
} from "@/app/admin/login/actions";

type AdminLoginFormProps = {
  callbackUrl: string;
  disabled: boolean;
};

export function AdminLoginForm({
  callbackUrl,
  disabled
}: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    authenticateAdmin,
    initialLoginFormState
  );

  return (
    <form action={formAction} className="mt-8 grid gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <label className="grid gap-2 text-sm text-ink-700">
        邮箱
        <input
          type="email"
          name="email"
          placeholder="admin@example.com"
          className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
          disabled={disabled || isPending}
          required
        />
      </label>
      <label className="grid gap-2 text-sm text-ink-700">
        密码
        <input
          type="password"
          name="password"
          placeholder="输入管理员密码"
          className="rounded-[1rem] border border-ink-950/10 bg-white/80 px-4 py-3 outline-none transition focus:border-brick-500"
          disabled={disabled || isPending}
          required
        />
      </label>
      {state.error ? (
        <p className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={disabled || isPending}
        className="mt-2 rounded-full bg-ink-950 px-5 py-3 text-sm text-white transition hover:bg-brick-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "登录中..." : "进入后台"}
      </button>
    </form>
  );
}
