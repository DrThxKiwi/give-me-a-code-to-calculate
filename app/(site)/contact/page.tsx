import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getContactMethods } from "@/lib/cms";

export const metadata: Metadata = {
  title: "联系"
};

const faqs = [
  {
    question: "这个网站后面真的可以接后台吗？",
    answer:
      "可以。现在已经把展示层和后台入口分开，接下来只要把登录、数据库和表单写入接上去就行。"
  },
  {
    question: "未来新增页面会不会很麻烦？",
    answer:
      "不会。现在已经按 App Router 的方式拆分，增加页面或动态详情页都会比最初的单页结构容易得多。"
  }
];

export default async function ContactPage() {
  const methods = await getContactMethods();

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="把沟通入口也纳入内容系统的一部分"
        description="联系方式、社交链接和合作说明同样适合纳入后台管理。这样你以后换邮箱、换 GitHub、增加个人介绍时，不需要改代码文件。"
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="REACH OUT"
            title="联系信息"
            description="目前先用静态内容展示，未来会迁移到站点设置集合。"
          />
          <div className="mt-8 grid gap-4">
            {methods.map((method) => (
              <Link
                key={method.label}
                href={method.href}
                className="rounded-[1.4rem] border border-ink-950/10 bg-white/65 px-5 py-4 transition hover:border-brick-500"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-ink-500">
                  {method.label}
                </p>
                <p className="mt-2 text-base text-ink-950">{method.value}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="panel rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="FAQ"
            title="你后面最常会遇到的问题"
          />
          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.4rem] border border-ink-950/10 bg-white/65 p-5"
              >
                <h2 className="text-lg text-ink-950">{item.question}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
