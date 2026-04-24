import {
  adminCollections,
  contactMethods,
  editablePages,
  focusAreas,
  heroMetrics,
  projects,
  roadmap,
  siteConfig,
  writingEntries
} from "@/lib/site-content";

// This module is the seam we can swap from local content to Prisma queries later.
export async function getSiteChrome() {
  return siteConfig;
}

export async function getHomeContent() {
  return {
    metrics: heroMetrics,
    focusAreas,
    featuredProjects: projects.slice(0, 2),
    roadmap
  };
}

export async function getAllProjects() {
  return projects;
}

export async function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllWritingEntries() {
  return writingEntries;
}

export async function getWritingEntryBySlug(slug: string) {
  return writingEntries.find((entry) => entry.slug === slug) ?? null;
}

export async function getContactMethods() {
  return contactMethods;
}

export async function getAdminOverview() {
  return {
    pages: editablePages,
    collections: adminCollections,
    projectCount: projects.length,
    articleCount: writingEntries.length
  };
}
