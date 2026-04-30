import { z } from "zod";
import { articleBodySchema, getPageContentSchema, navItemSchema } from "@/lib/content-schemas";
import type { PageSlug } from "@/lib/site-content";

export const loginFormSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址。"),
  password: z.string().min(8, "密码至少需要 8 个字符。"),
  callbackUrl: z.string().min(1).default("/admin")
});

export const siteSettingsFormSchema = z.object({
  brandName: z.string().min(1, "站点名称不能为空。"),
  brandBadge: z.string().min(1, "品牌短标签不能为空。"),
  footerSummary: z.string().min(1, "页脚说明不能为空。"),
  contactEmail: z.string().email("请输入正确的联系邮箱。"),
  githubUrl: z.string().url("请输入正确的 GitHub 链接。"),
  deployUrl: z.string().url("请输入正确的部署链接。"),
  navigationJson: z.string().min(1, "导航 JSON 不能为空。"),
  footerLinksJson: z.string().min(1, "页脚链接 JSON 不能为空。")
});

export const pageFormSchema = z.object({
  slug: z.enum(["home", "about", "projects", "writing", "contact"]),
  title: z.string().min(1, "页面标题不能为空。"),
  summary: z.string().min(1, "页面摘要不能为空。"),
  heroEyebrow: z.string().min(1, "Hero eyebrow 不能为空。"),
  heroTitle: z.string().min(1, "Hero 标题不能为空。"),
  heroBody: z.string().min(1, "Hero 描述不能为空。"),
  visibility: z.enum(["public", "draft"]),
  contentJson: z.string().min(1, "内容 JSON 不能为空。")
});

export const projectFormSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug 只能包含小写字母、数字和连字符。"),
  name: z.string().min(1, "项目名称不能为空。"),
  category: z.string().min(1, "项目分类不能为空。"),
  summary: z.string().min(1, "项目摘要不能为空。"),
  year: z.string().min(1, "年份不能为空。"),
  phaseLabel: z.string().min(1, "项目阶段不能为空。"),
  visibility: z.enum(["public", "draft"]),
  stackText: z.string().min(1, "请至少填写一项技术栈。"),
  challenge: z.string().min(1, "Challenge 不能为空。"),
  solution: z.string().min(1, "Solution 不能为空。"),
  outcome: z.string().min(1, "Outcome 不能为空。"),
  deliverablesText: z.string().min(1, "请至少填写一个交付项。")
});

export const articleFormSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug 只能包含小写字母、数字和连字符。"),
  category: z.string().min(1, "文章分类不能为空。"),
  title: z.string().min(1, "文章标题不能为空。"),
  summary: z.string().min(1, "文章摘要不能为空。"),
  readTime: z.string().min(1, "阅读时长不能为空。"),
  publishedAt: z.string().min(1, "发布日期不能为空。"),
  visibility: z.enum(["public", "draft"]),
  bodyJson: z.string().min(1, "正文 JSON 不能为空。")
});

export function parseJsonText(text: string, fieldName: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(`${fieldName} 不是有效的 JSON。`);
  }
}

export function parseNavItems(text: string, fieldName: string) {
  const parsed = navItemSchema.array().safeParse(parseJsonText(text, fieldName));

  if (!parsed.success) {
    throw new Error(`${fieldName} 的结构不正确。`);
  }

  return parsed.data;
}

export function parsePageContentJson(slug: PageSlug, text: string) {
  const schema = getPageContentSchema(slug);
  const parsed = schema.safeParse(parseJsonText(text, "页面内容 JSON"));

  if (!parsed.success) {
    throw new Error("页面内容 JSON 的结构不正确。");
  }

  return parsed.data;
}

export function parseArticleBodyJson(text: string) {
  const parsed = articleBodySchema.safeParse(parseJsonText(text, "文章正文 JSON"));

  if (!parsed.success) {
    throw new Error("文章正文 JSON 的结构不正确。");
  }

  return parsed.data;
}

export function splitTextareaLines(text: string) {
  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
