import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getHomeContent } from "@/lib/cms";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <PageHero
        eyebrow="PORTFOLIO CMS BLUEPRINT"
        title="把个人主页做成可长期进化的网站系统"
        description="这一版不再只是展示型单页，而是面向长期扩展的个人网站骨架。你后面想继续增加页面、项目详情、文章、管理员后台和数据库时，都可以沿着这套结构直接往前走。"
        actions={[
          { href: "/projects", label: "查看项目结构" },
          { href: "/admin", label: "查看后台规划", variant: "secondary" }
        ]}
        aside={
          <>
            {content.metrics.map((metric) => (
              <article key={metric.label} className="panel rounded-[1.5rem] p-5">
                <p className="font-display text-4xl text-ink-950">{metric.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-ink-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-700">{metric.detail}</p>
              </article>
            ))}
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-3">
        {content.focusAreas.map((item) => (
          <article key={item.title} className="panel rounded-[1.75rem] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-500">当前重点</p>
            <h2 className="mt-4 font-display text-3xl text-ink-950">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink-700">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="FEATURED PROJECTS"
          title="优先把内容组织方式做好，网站后面会轻松很多"
          description="项目页现在已经支持列表和详情路由，后面只要把本地数据替换成数据库数据，就能继续沿用这套页面结构。"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {content.featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
        <div className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="BUILDING ROADMAP"
            title="下一步最值得投入的 4 个方向"
            description="先把地基做稳，再接数据库和管理员登录，会比一开始直接冲后台管理轻松得多。"
          />
          <div className="mt-8 grid gap-5">
            {content.roadmap.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-ink-950/10 bg-white/60 p-5"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-brick-600">
                    {item.step}
                  </span>
                  <h3 className="text-lg text-ink-950">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-700">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel section-frame rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-500">
            ADMIN READY
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink-950">
            后台管理系统会怎么接进来
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-700">
            这一版已经把公开站和后台分开了。接下来只要把 Auth.js、Prisma 和
            Vercel Blob 逐步接进 `/admin`，就可以开始做真正的内容编辑。
          </p>
          <div className="mt-6 space-y-3 text-sm text-ink-700">
            <p>1. 用 Auth.js 保护 `/admin` 路由</p>
            <p>2. 用 Prisma 读取和写入页面、项目、文章数据</p>
            <p>3. 用后台表单去编辑前台页面展示的内容</p>
          </div>
          <Link
            href="/admin"
            className="mt-6 inline-flex rounded-full bg-brick-600 px-5 py-3 text-sm text-white transition hover:bg-ink-950"
          >
            进入后台骨架
          </Link>
        </div>
      </section>
    </>
  );
}
