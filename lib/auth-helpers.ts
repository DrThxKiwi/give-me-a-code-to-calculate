import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAuthConfigured } from "@/lib/env";

export async function getAdminSession() {
  if (!isAuthConfigured()) {
    return null;
  }

  try {
    return await auth();
  } catch (error) {
    console.error("Failed to read admin session:", error);
    return null;
  }
}

export async function requireAdmin(callbackUrl = "/admin") {
  const session = await getAdminSession();

  if (!session?.user) {
    redirect(`/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return session;
}

export function getAdminRuntimeState() {
  return {
    authConfigured: isAuthConfigured()
  };
}
