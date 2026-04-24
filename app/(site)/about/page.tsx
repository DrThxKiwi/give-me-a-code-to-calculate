import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { focusAreas, roadmap } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "关于"
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT THE SITE"
        title="这不是一次性网页，而是一套可持续迭代的个人站"
        description="你后续会持续增加页面、内容和管理能力，所以这个项目从现在开始就按“内容网站”的标准来组织。这样等你要加博客、服务介绍、案例页或后台编辑时，基本不用推翻重来。"
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="WORKING PRINCIPLES"
            title="这版升级的设计原则"
            description="先把信息架构做好，再让数据和后台逐步接进来。"
          />
          <div className="mt-8 grid gap-5">
            {focusAreas.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-ink-950/10 bg-white/65 p-5"
              >
                <h2 className="font-display text-3xl text-ink-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.description}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-ink-500">
            WHAT TO LEARN NEXT
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink-950">建议优先学习</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-ink-700">
            <p>1. Next.js App Router 的页面和布局组织方式</p>
            <p>2. TypeScript 的基础类型与组件 Props 写法</p>
            <p>3. 表单与服务端数据写入的基本流程</p>
            <p>4. 数据库里“表、字段、关系”的最小概念</p>
          </div>
        </article>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="ROADMAP"
          title="项目会沿着这条路线继续升级"
          description="先让页面丰富起来，再让后台真正接管内容。"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {roadmap.map((item) => (
            <article key={item.step} className="panel rounded-[1.75rem] p-6">
              <p className="text-sm uppercase tracking-[0.26em] text-brick-600">
                Step {item.step}
              </p>
              <h3 className="mt-3 font-display text-3xl text-ink-950">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-ink-700">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
