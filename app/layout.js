import "./globals.css";

export const metadata = {
  title: "Lin Demo Portfolio",
  description: "A simple personal website demo ready for Vercel deployment."
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
