"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-helpers";
import { visibilityToStatus } from "@/lib/cms";
import { isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import {
  articleFormSchema,
  pageFormSchema,
  parseArticleBodyJson,
  parseNavItems,
  parsePageContentJson,
  projectFormSchema,
  siteSettingsFormSchema,
  splitTextareaLines
} from "@/lib/validators";

function redirectWithMessage(
  path: string,
  kind: "success" | "error",
  message: string
) {
  const url = new URL(`http://local${path}`);
  url.searchParams.set(kind, message);
  redirect(`${url.pathname}${url.search}`);
}

function ensureDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error("当前还没有配置 DATABASE_URL，暂时不能保存到数据库。");
  }
}

function readFormValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function saveSiteSettingsAction(formData: FormData) {
  await requireAdmin("/admin/settings");

  try {
    ensureDatabase();

    const parsed = siteSettingsFormSchema.parse({
      brandName: readFormValue(formData, "brandName"),
      brandBadge: readFormValue(formData, "brandBadge"),
      footerSummary: readFormValue(formData, "footerSummary"),
      contactEmail: readFormValue(formData, "contactEmail"),
      githubUrl: readFormValue(formData, "githubUrl"),
      deployUrl: readFormValue(formData, "deployUrl"),
      navigationJson: readFormValue(formData, "navigationJson"),
      footerLinksJson: readFormValue(formData, "footerLinksJson")
    });

    await prisma.siteSettings.upsert({
      where: { id: "site" },
      create: {
        id: "site",
        brandName: parsed.brandName,
        brandBadge: parsed.brandBadge,
        footerSummary: parsed.footerSummary,
        contactEmail: parsed.contactEmail,
        githubUrl: parsed.githubUrl,
        deployUrl: parsed.deployUrl,
        navigation: parseNavItems(parsed.navigationJson, "导航 JSON"),
        footerLinks: parseNavItems(parsed.footerLinksJson, "页脚链接 JSON")
      },
      update: {
        brandName: parsed.brandName,
        brandBadge: parsed.brandBadge,
        footerSummary: parsed.footerSummary,
        contactEmail: parsed.contactEmail,
        githubUrl: parsed.githubUrl,
        deployUrl: parsed.deployUrl,
        navigation: parseNavItems(parsed.navigationJson, "导航 JSON"),
        footerLinks: parseNavItems(parsed.footerLinksJson, "页脚链接 JSON")
      }
    });

    revalidatePath("/", "layout");
    revalidatePath("/contact");
    redirectWithMessage("/admin/settings", "success", "站点设置已保存。");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "保存站点设置时出现未知错误。";
    redirectWithMessage("/admin/settings", "error", message);
  }
}

export async function savePageAction(formData: FormData) {
  await requireAdmin("/admin/pages");

  try {
    ensureDatabase();

    const parsed = pageFormSchema.parse({
      slug: readFormValue(formData, "slug"),
      title: readFormValue(formData, "title"),
      summary: readFormValue(formData, "summary"),
      heroEyebrow: readFormValue(formData, "heroEyebrow"),
      heroTitle: readFormValue(formData, "heroTitle"),
      heroBody: readFormValue(formData, "heroBody"),
      visibility: readFormValue(formData, "visibility"),
      contentJson: readFormValue(formData, "contentJson")
    });

    await prisma.page.upsert({
      where: { slug: parsed.slug },
      create: {
        slug: parsed.slug,
        title: parsed.title,
        summary: parsed.summary,
        heroEyebrow: parsed.heroEyebrow,
        heroTitle: parsed.heroTitle,
        heroBody: parsed.heroBody,
        status: visibilityToStatus(parsed.visibility),
        content: parsePageContentJson(parsed.slug, parsed.contentJson),
        updatedBy: "admin"
      },
      update: {
        title: parsed.title,
        summary: parsed.summary,
        heroEyebrow: parsed.heroEyebrow,
        heroTitle: parsed.heroTitle,
        heroBody: parsed.heroBody,
        status: visibilityToStatus(parsed.visibility),
        content: parsePageContentJson(parsed.slug, parsed.contentJson),
        updatedBy: "admin"
      }
    });

    if (parsed.slug === "home") {
      revalidatePath("/");
    } else {
      revalidatePath(`/${parsed.slug}`);
    }

    redirectWithMessage("/admin/pages", "success", `页面 ${parsed.slug} 已保存。`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存页面时出现未知错误。";
    redirectWithMessage("/admin/pages", "error", message);
  }
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin("/admin/projects");

  try {
    ensureDatabase();

    const parsed = projectFormSchema.parse({
      slug: readFormValue(formData, "slug"),
      name: readFormValue(formData, "name"),
      category: readFormValue(formData, "category"),
      summary: readFormValue(formData, "summary"),
      year: readFormValue(formData, "year"),
      phaseLabel: readFormValue(formData, "phaseLabel"),
      visibility: readFormValue(formData, "visibility"),
      stackText: readFormValue(formData, "stackText"),
      challenge: readFormValue(formData, "challenge"),
      solution: readFormValue(formData, "solution"),
      outcome: readFormValue(formData, "outcome"),
      deliverablesText: readFormValue(formData, "deliverablesText")
    });

    await prisma.project.upsert({
      where: { slug: parsed.slug },
      create: {
        slug: parsed.slug,
        name: parsed.name,
        category: parsed.category,
        summary: parsed.summary,
        year: parsed.year,
        phaseLabel: parsed.phaseLabel,
        status: visibilityToStatus(parsed.visibility),
        stack: splitTextareaLines(parsed.stackText),
        challenge: parsed.challenge,
        solution: parsed.solution,
        outcome: parsed.outcome,
        deliverables: splitTextareaLines(parsed.deliverablesText),
        updatedBy: "admin"
      },
      update: {
        name: parsed.name,
        category: parsed.category,
        summary: parsed.summary,
        year: parsed.year,
        phaseLabel: parsed.phaseLabel,
        status: visibilityToStatus(parsed.visibility),
        stack: splitTextareaLines(parsed.stackText),
        challenge: parsed.challenge,
        solution: parsed.solution,
        outcome: parsed.outcome,
        deliverables: splitTextareaLines(parsed.deliverablesText),
        updatedBy: "admin"
      }
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${parsed.slug}`);
    redirectWithMessage("/admin/projects", "success", `项目 ${parsed.slug} 已保存。`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存项目时出现未知错误。";
    redirectWithMessage("/admin/projects", "error", message);
  }
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin("/admin/projects");

  try {
    ensureDatabase();
    const slug = readFormValue(formData, "slug");

    if (!slug) {
      throw new Error("缺少要删除的项目 slug。");
    }

    await prisma.project.delete({ where: { slug } });
    revalidatePath("/projects");
    redirectWithMessage("/admin/projects", "success", `项目 ${slug} 已删除。`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "删除项目时出现未知错误。";
    redirectWithMessage("/admin/projects", "error", message);
  }
}

export async function saveArticleAction(formData: FormData) {
  await requireAdmin("/admin/writing");

  try {
    ensureDatabase();

    const parsed = articleFormSchema.parse({
      slug: readFormValue(formData, "slug"),
      category: readFormValue(formData, "category"),
      title: readFormValue(formData, "title"),
      summary: readFormValue(formData, "summary"),
      readTime: readFormValue(formData, "readTime"),
      publishedAt: readFormValue(formData, "publishedAt"),
      visibility: readFormValue(formData, "visibility"),
      bodyJson: readFormValue(formData, "bodyJson")
    });

    await prisma.article.upsert({
      where: { slug: parsed.slug },
      create: {
        slug: parsed.slug,
        category: parsed.category,
        title: parsed.title,
        summary: parsed.summary,
        readTime: parsed.readTime,
        publishedAt: new Date(parsed.publishedAt),
        status: visibilityToStatus(parsed.visibility),
        body: parseArticleBodyJson(parsed.bodyJson),
        updatedBy: "admin"
      },
      update: {
        category: parsed.category,
        title: parsed.title,
        summary: parsed.summary,
        readTime: parsed.readTime,
        publishedAt: new Date(parsed.publishedAt),
        status: visibilityToStatus(parsed.visibility),
        body: parseArticleBodyJson(parsed.bodyJson),
        updatedBy: "admin"
      }
    });

    revalidatePath("/writing");
    revalidatePath(`/writing/${parsed.slug}`);
    redirectWithMessage("/admin/writing", "success", `文章 ${parsed.slug} 已保存。`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存文章时出现未知错误。";
    redirectWithMessage("/admin/writing", "error", message);
  }
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin("/admin/writing");

  try {
    ensureDatabase();
    const slug = readFormValue(formData, "slug");

    if (!slug) {
      throw new Error("缺少要删除的文章 slug。");
    }

    await prisma.article.delete({ where: { slug } });
    revalidatePath("/writing");
    redirectWithMessage("/admin/writing", "success", `文章 ${slug} 已删除。`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "删除文章时出现未知错误。";
    redirectWithMessage("/admin/writing", "error", message);
  }
}
