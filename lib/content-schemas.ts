import { z } from "zod";
import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  PageSlug
} from "@/lib/site-content";

export const navItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1)
});

export const metricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  detail: z.string().min(1)
});

export const focusAreaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

export const roadmapItemSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1)
});

export const homePageContentSchema = z.object({
  metrics: z.array(metricSchema),
  focusAreas: z.array(focusAreaSchema),
  roadmap: z.array(roadmapItemSchema),
  featuredProjectSlugs: z.array(z.string().min(1))
});

export const aboutPageContentSchema = z.object({
  principles: z.array(focusAreaSchema),
  learningPriorities: z.array(z.string().min(1)),
  roadmap: z.array(roadmapItemSchema)
});

export const contactPageContentSchema = z.object({
  faqs: z.array(faqItemSchema),
  note: z.string().min(1)
});

export const articleSectionSchema = z.object({
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1)
});

export const articleBodySchema = z.array(articleSectionSchema);

export function parsePageContent(
  slug: PageSlug,
  value: unknown,
  fallback: HomePageContent | AboutPageContent | ContactPageContent | Record<string, never>
) {
  switch (slug) {
    case "home": {
      const parsed = homePageContentSchema.safeParse(value);
      return parsed.success ? parsed.data : fallback;
    }
    case "about": {
      const parsed = aboutPageContentSchema.safeParse(value);
      return parsed.success ? parsed.data : fallback;
    }
    case "contact": {
      const parsed = contactPageContentSchema.safeParse(value);
      return parsed.success ? parsed.data : fallback;
    }
    default:
      return {};
  }
}

export function getPageContentSchema(slug: PageSlug) {
  switch (slug) {
    case "home":
      return homePageContentSchema;
    case "about":
      return aboutPageContentSchema;
    case "contact":
      return contactPageContentSchema;
    case "projects":
    case "writing":
      return z.object({});
  }
}
