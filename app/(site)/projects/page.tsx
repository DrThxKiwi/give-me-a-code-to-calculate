import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getProjectsPageData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "项目"
};

export default async function ProjectsPage() {
  const { page, projects } = await getProjectsPageData();

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroBody}
      />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="ALL PROJECTS"
          title="当前项目结构"
          description={page.summary}
        />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
