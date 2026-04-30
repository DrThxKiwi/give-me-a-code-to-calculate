import { PrismaClient, PublishStatus } from "@prisma/client";
import {
  defaultArticles,
  defaultPages,
  defaultProjects,
  defaultSiteSettings
} from "../lib/site-content";

const prisma = new PrismaClient();

function toStatus(visibility: "public" | "draft") {
  return visibility === "public"
    ? PublishStatus.PUBLISHED
    : PublishStatus.DRAFT;
}

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "site" },
    create: {
      id: "site",
      brandName: defaultSiteSettings.brandName,
      brandBadge: defaultSiteSettings.brandBadge,
      footerSummary: defaultSiteSettings.footerSummary,
      contactEmail: defaultSiteSettings.contactEmail,
      githubUrl: defaultSiteSettings.githubUrl,
      deployUrl: defaultSiteSettings.deployUrl,
      navigation: defaultSiteSettings.navigation,
      footerLinks: defaultSiteSettings.footerLinks
    },
    update: {
      brandName: defaultSiteSettings.brandName,
      brandBadge: defaultSiteSettings.brandBadge,
      footerSummary: defaultSiteSettings.footerSummary,
      contactEmail: defaultSiteSettings.contactEmail,
      githubUrl: defaultSiteSettings.githubUrl,
      deployUrl: defaultSiteSettings.deployUrl,
      navigation: defaultSiteSettings.navigation,
      footerLinks: defaultSiteSettings.footerLinks
    }
  });

  for (const page of defaultPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      create: {
        slug: page.slug,
        title: page.title,
        summary: page.summary,
        heroEyebrow: page.heroEyebrow,
        heroTitle: page.heroTitle,
        heroBody: page.heroBody,
        content: page.content,
        status: toStatus(page.visibility),
        updatedBy: "seed"
      },
      update: {
        title: page.title,
        summary: page.summary,
        heroEyebrow: page.heroEyebrow,
        heroTitle: page.heroTitle,
        heroBody: page.heroBody,
        content: page.content,
        status: toStatus(page.visibility),
        updatedBy: "seed"
      }
    });
  }

  for (const project of defaultProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        name: project.name,
        category: project.category,
        summary: project.summary,
        year: project.year,
        phaseLabel: project.phaseLabel,
        stack: project.stack,
        challenge: project.challenge,
        solution: project.solution,
        outcome: project.outcome,
        deliverables: project.deliverables,
        status: toStatus(project.visibility),
        updatedBy: "seed"
      },
      update: {
        name: project.name,
        category: project.category,
        summary: project.summary,
        year: project.year,
        phaseLabel: project.phaseLabel,
        stack: project.stack,
        challenge: project.challenge,
        solution: project.solution,
        outcome: project.outcome,
        deliverables: project.deliverables,
        status: toStatus(project.visibility),
        updatedBy: "seed"
      }
    });
  }

  for (const article of defaultArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      create: {
        slug: article.slug,
        category: article.category,
        title: article.title,
        summary: article.summary,
        readTime: article.readTime,
        body: article.sections,
        publishedAt: new Date(article.publishedAt),
        status: toStatus(article.visibility),
        updatedBy: "seed"
      },
      update: {
        category: article.category,
        title: article.title,
        summary: article.summary,
        readTime: article.readTime,
        body: article.sections,
        publishedAt: new Date(article.publishedAt),
        status: toStatus(article.visibility),
        updatedBy: "seed"
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
