import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllProjects } from "@/lib/cms";

export const metadata: Metadata = {
  title: "项目"
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <>
      <PageHero
        eyebrow="PROJECT LIBRARY"
        title="把项目拆成列表页和详情页，是未来后台编辑的第一步"
        description="项目现在已经不再是首页里的一小块介绍，而是独立的内容集合。后面接后台时，管理员可以直接维护这些项目卡片和详情。"
      />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="ALL PROJECTS"
          title="当前项目结构"
          description="现在用本地 TypeScript 数据驱动，后面可以平滑替换成 Prisma 查询。"
        />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
