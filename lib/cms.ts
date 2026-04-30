import { PublishStatus } from "@prisma/client";
import { z } from "zod";
import {
  articleBodySchema,
  navItemSchema,
  parsePageContent
} from "@/lib/content-schemas";
import { isAuthConfigured, isDatabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import {
  defaultAdminCollections,
  defaultArticles,
  defaultPages,
  defaultProjects,
  defaultSiteSettings,
  getDefaultArticleBySlug,
  getDefaultContactMethods,
  getDefaultPageBySlug,
  getDefaultProjectBySlug,
  type ArticleRecord,
  type ContactMethod,
  type EditablePageRecord,
  type PageSlug,
  type ProjectRecord,
  type SiteSettingsRecord
} from "@/lib/site-content";

const navItemsSchema = z.array(navItemSchema);

function statusToVisibility(status: PublishStatus) {
  return status === PublishStatus.PUBLISHED ? "public" : "draft";
}

export function visibilityToStatus(visibility: "public" | "draft") {
  return visibility === "public"
    ? PublishStatus.PUBLISHED
    : PublishStatus.DRAFT;
}

function asPageSlug(slug: string): PageSlug | null {
  if (
    slug === "home" ||
    slug === "about" ||
    slug === "projects" ||
    slug === "writing" ||
    slug === "contact"
  ) {
    return slug;
  }

  return null;
}

function parseNavItems(
  value: unknown,
  fallback: SiteSettingsRecord["navigation"]
) {
  const parsed = navItemsSchema.safeParse(value);
  return parsed.success ? parsed.data : fallback;
}

function parseArticleSections(
  value: unknown,
  fallback: ArticleRecord["sections"]
) {
  const parsed = articleBodySchema.safeParse(value);
  return parsed.success ? parsed.data : fallback;
}

function mapSettingsRecord(record: {
  brandName: string;
  brandBadge: string;
  footerSummary: string;
  contactEmail: string;
  githubUrl: string;
  deployUrl: string;
  navigation: unknown;
  footerLinks: unknown;
} | null): SiteSettingsRecord {
  if (!record) {
    return defaultSiteSettings;
  }

  return {
    brandName: record.brandName,
    brandBadge: record.brandBadge,
    footerSummary: record.footerSummary,
    contactEmail: record.contactEmail,
    githubUrl: record.githubUrl,
    deployUrl: record.deployUrl,
    navigation: parseNavItems(record.navigation, defaultSiteSettings.navigation),
    footerLinks: parseNavItems(record.footerLinks, defaultSiteSettings.footerLinks)
  };
}

function mapPageRecord(record: {
  slug: string;
  title: string;
  summary: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  content: unknown;
  status: PublishStatus;
}): EditablePageRecord | null {
  const slug = asPageSlug(record.slug);

  if (!slug) {
    return null;
  }

  const fallback = getDefaultPageBySlug(slug);

  return {
    slug,
    title: record.title,
    summary: record.summary,
    heroEyebrow: record.heroEyebrow,
    heroTitle: record.heroTitle,
    heroBody: record.heroBody,
    visibility: statusToVisibility(record.status),
    content: parsePageContent(slug, record.content, fallback.content)
  } as EditablePageRecord;
}

function mapProjectRecord(record: {
  slug: string;
  name: string;
  category: string;
  summary: string;
  year: string;
  phaseLabel: string;
  stack: string[];
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  status: PublishStatus;
}): ProjectRecord {
  return {
    slug: record.slug,
    name: record.name,
    category: record.category,
    summary: record.summary,
    year: record.year,
    phaseLabel: record.phaseLabel,
    visibility: statusToVisibility(record.status),
    stack: record.stack,
    challenge: record.challenge,
    solution: record.solution,
    outcome: record.outcome,
    deliverables: record.deliverables
  };
}

function mapArticleRecord(record: {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  body: unknown;
  publishedAt: Date | null;
  status: PublishStatus;
}): ArticleRecord {
  const fallback = getDefaultArticleBySlug(record.slug);

  return {
    slug: record.slug,
    category: record.category,
    title: record.title,
    summary: record.summary,
    readTime: record.readTime,
    publishedAt: record.publishedAt
      ? record.publishedAt.toISOString().slice(0, 10)
      : fallback?.publishedAt ?? new Date().toISOString().slice(0, 10),
    visibility: statusToVisibility(record.status),
    sections: parseArticleSections(record.body, fallback?.sections ?? [])
  };
}

async function tryDatabaseQuery<T>(query: () => Promise<T>) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    return await query();
  } catch {
    return null;
  }
}

async function getDbSettings() {
  return tryDatabaseQuery(() =>
    prisma.siteSettings.findUnique({ where: { id: "site" } })
  );
}

async function getDbPages() {
  return tryDatabaseQuery(() =>
    prisma.page.findMany({ orderBy: { createdAt: "asc" } })
  );
}

async function getDbProjects() {
  return tryDatabaseQuery(() =>
    prisma.project.findMany({
      orderBy: [{ year: "desc" }, { createdAt: "asc" }]
    })
  );
}

async function getDbArticles() {
  return tryDatabaseQuery(() =>
    prisma.article.findMany({
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
    })
  );
}

export function buildContactMethods(settings: SiteSettingsRecord): ContactMethod[] {
  return [
    {
      label: "邮箱",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`
    },
    {
      label: "GitHub",
      value: settings.githubUrl.replace(/^https?:\/\//, ""),
      href: settings.githubUrl
    },
    {
      label: "Vercel",
      value: "当前部署地址",
      href: settings.deployUrl
    }
  ];
}

export async function getSiteChrome() {
  const settings = mapSettingsRecord(await getDbSettings());

  return {
    brand: {
      name: settings.brandName,
      badge: settings.brandBadge
    },
    navigation: settings.navigation,
    footer: {
      summary: settings.footerSummary,
      links: settings.footerLinks
    },
    contacts: buildContactMethods(settings),
    raw: settings
  };
}

export async function getManagedPages() {
  const dbPages = await getDbPages();

  if (!dbPages || dbPages.length === 0) {
    return defaultPages;
  }

  const mapped = new Map<PageSlug, EditablePageRecord>();

  for (const page of dbPages) {
    const record = mapPageRecord(page);
    if (record) {
      mapped.set(record.slug, record);
    }
  }

  return defaultPages.map((fallbackPage) => mapped.get(fallbackPage.slug) ?? fallbackPage);
}

export async function getManagedPage<TSlug extends PageSlug>(slug: TSlug) {
  const pages = await getManagedPages();
  const page = pages.find((item) => item.slug === slug);

  return (page ?? getDefaultPageBySlug(slug)) as EditablePageRecord<TSlug>;
}

export async function getHomePageData() {
  const page = await getManagedPage("home");
  const allProjects = await getAllProjects();
  const featuredProjects = page.content.featuredProjectSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is ProjectRecord => Boolean(project));

  return {
    page,
    featuredProjects:
      featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 2)
  };
}

export async function getAboutPageData() {
  return {
    page: await getManagedPage("about")
  };
}

export async function getProjectsPageData() {
  return {
    page: await getManagedPage("projects"),
    projects: await getAllProjects()
  };
}

export async function getWritingPageData() {
  return {
    page: await getManagedPage("writing"),
    entries: await getAllWritingEntries()
  };
}

export async function getContactPageData() {
  return {
    page: await getManagedPage("contact"),
    methods: await getContactMethods()
  };
}

export async function getAllProjects() {
  const dbProjects = await getDbProjects();

  if (!dbProjects || dbProjects.length === 0) {
    return defaultProjects.filter((project) => project.visibility === "public");
  }

  return dbProjects
    .map(mapProjectRecord)
    .filter((project) => project.visibility === "public");
}

export async function getAllProjectDraftsForAdmin() {
  const dbProjects = await getDbProjects();

  if (!dbProjects || dbProjects.length === 0) {
    return defaultProjects;
  }

  return dbProjects.map(mapProjectRecord);
}

export async function getProjectBySlug(slug: string) {
  const dbProjects = await getDbProjects();

  if (!dbProjects || dbProjects.length === 0) {
    return getDefaultProjectBySlug(slug);
  }

  const project = dbProjects.find((item) => item.slug === slug);
  return project ? mapProjectRecord(project) : null;
}

export async function getAllWritingEntries() {
  const dbArticles = await getDbArticles();

  if (!dbArticles || dbArticles.length === 0) {
    return defaultArticles.filter((article) => article.visibility === "public");
  }

  return dbArticles
    .map(mapArticleRecord)
    .filter((article) => article.visibility === "public");
}

export async function getAllWritingDraftsForAdmin() {
  const dbArticles = await getDbArticles();

  if (!dbArticles || dbArticles.length === 0) {
    return defaultArticles;
  }

  return dbArticles.map(mapArticleRecord);
}

export async function getWritingEntryBySlug(slug: string) {
  const dbArticles = await getDbArticles();

  if (!dbArticles || dbArticles.length === 0) {
    return getDefaultArticleBySlug(slug);
  }

  const article = dbArticles.find((item) => item.slug === slug);
  return article ? mapArticleRecord(article) : null;
}

export async function getContactMethods() {
  const chrome = await getSiteChrome();
  return chrome.contacts;
}

export async function getAdminOverview() {
  const [pages, projectDrafts, articleDrafts] = await Promise.all([
    getManagedPages(),
    getAllProjectDraftsForAdmin(),
    getAllWritingDraftsForAdmin()
  ]);

  return {
    pages,
    projects: projectDrafts,
    articles: articleDrafts,
    collections: defaultAdminCollections,
    projectCount: projectDrafts.length,
    articleCount: articleDrafts.length,
    databaseConfigured: isDatabaseConfigured(),
    authConfigured: isAuthConfigured()
  };
}

export async function getSettingsForAdmin() {
  return mapSettingsRecord(await getDbSettings());
}

export function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function getDefaultSetupSnapshot() {
  return {
    settings: defaultSiteSettings,
    contacts: getDefaultContactMethods(),
    pages: defaultPages,
    projects: defaultProjects,
    articles: defaultArticles
  };
}
