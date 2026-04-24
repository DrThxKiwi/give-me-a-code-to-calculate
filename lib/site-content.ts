export type NavItem = {
  href: string;
  label: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type FocusArea = {
  title: string;
  description: string;
};

export type ProjectRecord = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  year: string;
  status: string;
  stack: string[];
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
};

export type ArticleRecord = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  publishedAt: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export type RoadmapItem = {
  step: string;
  title: string;
  description: string;
};

export type AdminCollection = {
  key: string;
  name: string;
  description: string;
  fields: string[];
  status: string;
};

export type EditablePage = {
  slug: string;
  title: string;
  summary: string;
  sections: number;
  visibility: "public" | "draft";
};

export const siteConfig = {
  brand: {
    name: "Lin Portfolio Studio",
    badge: "Portfolio CMS"
  },
  navigation: [
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
    { href: "/projects", label: "项目" },
    { href: "/writing", label: "随笔" },
    { href: "/contact", label: "联系" }
  ] satisfies NavItem[],
  footer: {
    summary:
      "这是一套面向 Vercel 的个人网站骨架：前台负责展示，后台负责编辑，后续可以平滑接入数据库、登录和文件上传。",
    links: [
      { href: "/", label: "首页" },
      { href: "/admin", label: "后台" },
      { href: "/api/health", label: "健康检查" }
    ] satisfies NavItem[]
  }
};

export const heroMetrics: Metric[] = [
  {
    value: "5+",
    label: "公开页面",
    detail: "首页、关于、项目、随笔、联系页都已经拆分完成。"
  },
  {
    value: "1",
    label: "后台入口",
    detail: "先做独立的后台骨架，为 Auth.js 和权限控制留位置。"
  },
  {
    value: "100%",
    label: "Vercel 友好",
    detail: "继续保持 App Router 架构，方便部署和后续增量开发。"
  }
];

export const focusAreas: FocusArea[] = [
  {
    title: "多页面内容组织",
    description:
      "把每一类内容拆成独立路由，后面不管是增加博客、案例页还是服务介绍页，都会更清楚。"
  },
  {
    title: "内容层与页面层解耦",
    description:
      "现在先用本地 TypeScript 数据，后面只要替换 lib/cms.ts，就能换成 Prisma + PostgreSQL。"
  },
  {
    title: "后台管理优先预留",
    description:
      "管理端与展示端分开布局，避免未来加入登录、角色权限时反复返工。"
  }
];

export const projects: ProjectRecord[] = [
  {
    slug: "portfolio-studio",
    name: "Portfolio Studio",
    category: "个人官网",
    summary:
      "将最初的静态单页升级成多页面内容站，既能展示个人信息，也能逐步长成可编辑的作品集系统。",
    year: "2026",
    status: "进行中",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    challenge: "原始 demo 只有一个页面，后续扩展页面和后台时会越来越难维护。",
    solution:
      "拆出公共站点与后台两个布局，再把项目、文章、联系信息整理成统一的数据模型。",
    outcome:
      "现在每一部分都可以独立扩展，等数据库接入后，不需要重写页面层。",
    deliverables: [
      "首页与内容栏目页",
      "项目详情路由",
      "后台仪表盘骨架",
      "未来 Prisma 数据模型草案"
    ]
  },
  {
    slug: "admin-editing-roadmap",
    name: "Admin Editing Roadmap",
    category: "后台规划",
    summary:
      "先明确哪些内容需要管理员维护，再反推数据库结构、上传能力和权限边界，避免功能越做越乱。",
    year: "2026",
    status: "规划中",
    stack: ["Auth.js", "Prisma", "PostgreSQL", "Vercel Blob"],
    challenge: "后台不只是登录页，还涉及页面结构、字段设计、草稿与发布流程。",
    solution:
      "先按页面、项目、文章、站点设置四个集合来设计后台，再逐步接入编辑和发布功能。",
    outcome:
      "后面做后台时会更像是在往已有骨架里填能力，而不是推倒重来。",
    deliverables: [
      "后台导航结构",
      "内容集合规划",
      "权限与角色建议",
      "环境变量清单"
    ]
  },
  {
    slug: "writing-section",
    name: "Writing Section",
    category: "内容拓展",
    summary:
      "为后续博客、学习记录和开发随笔预留专门的内容区，让个人主页不只是名片，还能沉淀长期内容。",
    year: "2026",
    status: "就绪",
    stack: ["App Router", "Static Generation", "SEO"],
    challenge: "文章内容会越来越多，需要一开始就有列表页和详情页的概念。",
    solution:
      "先按文章摘要 + 详情页模式组织，等以后接数据库或 MDX 时保持相同路由结构。",
    outcome:
      "网站的内容层次更完整，也更适合持续更新。",
    deliverables: [
      "文章列表页",
      "文章详情页",
      "内容摘要模型",
      "可扩展的 slug 结构"
    ]
  }
];

export const writingEntries: ArticleRecord[] = [
  {
    slug: "why-i-rebuilt-this-site",
    category: "建站记录",
    title: "为什么我要把个人主页当成一个小型 CMS 来设计",
    summary:
      "个人网站一开始看起来只是几个页面，但只要计划加入后台编辑，它就已经是在朝内容管理系统演化了。",
    readTime: "4 分钟",
    publishedAt: "2026-04-25",
    sections: [
      {
        heading: "从展示页到内容系统",
        paragraphs: [
          "最初的个人主页只需要一个漂亮的首页，但当你开始增加页面、项目案例、文章和联系信息时，内容就会逐渐分散。",
          "如果没有统一的数据结构和后台入口，后续每加一个功能都像在补丁上继续打补丁。"
        ]
      },
      {
        heading: "为什么 Vercel 仍然适合",
        paragraphs: [
          "因为这个项目会优先走 Next.js 的全栈能力，页面和轻量后端都可以继续留在同一个仓库里。",
          "等数据库和登录接入后，部署方式几乎不用改变。"
        ]
      }
    ]
  },
  {
    slug: "what-to-learn-next",
    category: "学习路线",
    title: "接下来最值得先学的知识，不是数据库，而是页面与内容的组织方式",
    summary:
      "在真正接入后台之前，先理解路由、组件拆分和数据流，会让后面的学习成本低很多。",
    readTime: "5 分钟",
    publishedAt: "2026-04-25",
    sections: [
      {
        heading: "先学会拆页面",
        paragraphs: [
          "你之后会不断增加页面数量，所以先熟悉 Next.js 的目录路由、布局和动态详情页。",
          "当页面结构稳定之后，再把内容存到数据库里会更自然。"
        ]
      },
      {
        heading: "再学会让数据独立出来",
        paragraphs: [
          "不要把所有文案直接写死在页面组件里，应该先学会把内容抽到单独模块里。",
          "今天用本地数据，明天换成 Prisma 查询，页面层都能继续复用。"
        ]
      }
    ]
  }
];

export const contactMethods: ContactMethod[] = [
  {
    label: "邮箱",
    value: "yourname@example.com",
    href: "mailto:yourname@example.com"
  },
  {
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname"
  },
  {
    label: "Vercel",
    value: "部署到你的 Vercel 项目",
    href: "https://vercel.com"
  }
];

export const roadmap: RoadmapItem[] = [
  {
    step: "01",
    title: "先稳定公开页面结构",
    description:
      "让首页、关于、项目、随笔和联系页都独立存在，再逐步增加二级详情页。"
  },
  {
    step: "02",
    title: "接入 PostgreSQL + Prisma",
    description:
      "先从页面摘要、项目卡片和文章列表开始入库，后面再扩展到富文本或 JSON 内容块。"
  },
  {
    step: "03",
    title: "接入 Auth.js 管理员登录",
    description:
      "把 /admin 改成真正受保护的后台入口，并为管理员角色加入权限判断。"
  },
  {
    step: "04",
    title: "增加文件上传与发布流程",
    description:
      "通过 Vercel Blob 管理图片资源，再为后台加上草稿、发布和更新时间追踪。"
  }
];

export const editablePages: EditablePage[] = [
  {
    slug: "home",
    title: "首页",
    summary: "管理首页 Hero、指标卡片、精选项目和路线图。",
    sections: 4,
    visibility: "public"
  },
  {
    slug: "about",
    title: "关于页",
    summary: "更新个人介绍、当前关注方向和合作方式。",
    sections: 3,
    visibility: "public"
  },
  {
    slug: "contact",
    title: "联系页",
    summary: "维护联系方法、常见问题和下一步引导。",
    sections: 3,
    visibility: "public"
  },
  {
    slug: "services",
    title: "服务页",
    summary: "为未来新增的服务说明或个人介绍页预留草稿。",
    sections: 2,
    visibility: "draft"
  }
];

export const adminCollections: AdminCollection[] = [
  {
    key: "pages",
    name: "页面内容",
    description: "管理首页、关于页、联系页等固定页面内容。",
    fields: ["标题", "描述", "模块顺序", "发布时间"],
    status: "优先建设"
  },
  {
    key: "projects",
    name: "项目案例",
    description: "维护项目卡片、详情页内容、技术栈和链接。",
    fields: ["slug", "摘要", "标签", "案例详情"],
    status: "优先建设"
  },
  {
    key: "writing",
    name: "随笔文章",
    description: "支持持续写作和输出学习记录。",
    fields: ["标题", "分类", "正文", "发布日期"],
    status: "第二阶段"
  },
  {
    key: "settings",
    name: "站点设置",
    description: "品牌名、联系方式、社交链接、SEO 说明。",
    fields: ["站点名称", "邮箱", "社交链接", "SEO 描述"],
    status: "第二阶段"
  }
];
