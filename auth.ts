import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getAdminCredentials, isAuthConfigured } from "@/lib/env";
import { loginFormSchema } from "@/lib/validators";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? "local-development-placeholder-secret",
  trustHost: true,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    Credentials({
      name: "管理员账号",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      authorize: async (credentials) => {
        if (!isAuthConfigured()) {
          return null;
        }

        const parsed = loginFormSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
          callbackUrl: "/admin"
        });

        if (!parsed.success) {
          return null;
        }

        const admin = getAdminCredentials();

        if (!admin || parsed.data.email !== admin.email) {
          return null;
        }

        const passwordMatches = await compare(
          parsed.data.password,
          admin.passwordHash
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: "admin",
          email: admin.email,
          name: "Site Admin",
          role: "ADMIN" as const
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "admin";
        session.user.role = token.role === "ADMIN" ? "ADMIN" : "ADMIN";
      }

      return session;
    }
  }
});
