import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lin Portfolio Studio",
    template: "%s | Lin Portfolio Studio"
  },
  description:
    "A Vercel-ready personal website that can grow into a content-managed portfolio.",
  applicationName: "Lin Portfolio Studio"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
