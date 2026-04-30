import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getHomePageData } from "@/lib/cms";

export default async function HomePage() {
  const { page, featuredProjects } = await getHomePageData();

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroBody}
        actions={[
          { href: "/projects", label: "查看项目结构" },
          { href: "/admin", label: "进入后台", variant: "secondary" }
        ]}
        aside={
          <>
            {page.content.metrics.map((metric) => (
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
        {page.content.focusAreas.map((item) => (
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
          {featuredProjects.map((project) => (
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
            {page.content.roadmap.map((item) => (
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
            这次已经不是“后台预留”，而是“后台可落地”
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink-700">
            现在的结构已经支持继续接入数据库、管理员登录和内容编辑。接下来你可以把站点当成一个真正的内容系统来维护，而不只是一个静态主页。
          </p>
          <div className="mt-6 space-y-3 text-sm text-ink-700">
            <p>1. 通过管理员登录进入工作区</p>
            <p>2. 在后台编辑页面、项目和文章内容</p>
            <p>3. 保存后自动刷新前台页面展示</p>
          </div>
          <Link
            href="/admin"
            className="mt-6 inline-flex rounded-full bg-brick-600 px-5 py-3 text-sm text-white transition hover:bg-ink-950"
          >
            打开后台
          </Link>
        </div>
      </section>
    </>
  );
}
