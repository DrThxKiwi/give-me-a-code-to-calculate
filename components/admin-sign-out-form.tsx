import { signOut } from "@/auth";

export function AdminSignOutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/login" });
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-ink-950/10 px-4 py-2 text-sm text-ink-700 transition hover:border-brick-500 hover:text-brick-600"
      >
        退出登录
      </button>
    </form>
  );
}
