"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { isAuthConfigured } from "@/lib/env";
import { loginFormSchema } from "@/lib/validators";

export type LoginFormState = {
  error: string | null;
};

export const initialLoginFormState: LoginFormState = {
  error: null
};

export async function authenticateAdmin(
  _previousState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  if (!isAuthConfigured()) {
    return {
      error:
        "当前还没有配置管理员登录环境变量。请先在 Vercel 或本地 .env 中配置 AUTH_SECRET、ADMIN_EMAIL 和 ADMIN_PASSWORD_HASH。"
    };
  }

  const parsed = loginFormSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    callbackUrl: String(formData.get("callbackUrl") ?? "/admin")
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "请检查你填写的登录信息。"
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: parsed.data.callbackUrl
    });
    return initialLoginFormState;
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "邮箱或密码不正确。"
      };
    }

    throw error;
  }
}
