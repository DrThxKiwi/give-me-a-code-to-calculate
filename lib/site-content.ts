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

export type FaqItem = {
  question: string;
  answer: string;
};

export type RoadmapItem = {
  step: string;
  title: string;
  description: string;
};

export type PageSlug = "home" | "about" | "projects" | "writing" | "contact";

export type HomePageContent = {
  metrics: Metric[];
  focusAreas: FocusArea[];
  roadmap: RoadmapItem[];
  featuredProjectSlugs: string[];
};

export type AboutPageContent = {
  principles: FocusArea[];
  learningPriorities: string[];
  roadmap: RoadmapItem[];
};

export type ContactPageContent = {
  faqs: FaqItem[];
  note: string;
};

export type PageContentBySlug = {
  home: HomePageContent;
  about: AboutPageContent;
  projects: Record<string, never>;
  writing: Record<string, never>;
  contact: ContactPageContent;
};

export type EditablePageRecord<TSlug extends PageSlug = PageSlug> = {
  slug: TSlug;
  title: string;
  summary: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  visibility: "public" | "draft";
  content: PageContentBySlug[TSlug];
};

export type ProjectRecord = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  year: string;
  phaseLabel: string;
  visibility: "public" | "draft";
  stack: string[];
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleRecord = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  publishedAt: string;
  visibility: "public" | "draft";
  sections: ArticleSection[];
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export type AdminCollection = {
  key: string;
  name: string;
  description: string;
  fields: string[];
  status: string;
};

export type SiteSettingsRecord = {
  brandName: string;
  brandBadge: string;
  footerSummary: string;
  contactEmail: string;
  githubUrl: string;
  deployUrl: string;
  navigation: NavItem[];
  footerLinks: NavItem[];
};

export const defaultSiteSettings: SiteSettingsRecord = {
  brandName: "Lin Portfolio Studio",
  brandBadge: "Portfolio CMS",
  footerSummary:
    "这是一套面向 Vercel 的个人网站骨架：前台负责展示，后台负责编辑，后续可以平滑接入数据库、登录和文件上传。",
  contactEmail: "yourname@example.com",
  githubUrl: "https://github.com/yourname",
  deployUrl: "https://vercel.com",
  navigation: [
    { href: "/", label: "首页" },
    { href: "/about", label: "关于" },
    { href: "/projects", label: "项目" },
    { href: "/writing", label: "随笔" },
    { href: "/contact", label: "联系" }
  ],
  footerLinks: [
    { href: "/", label: "首页" },
    { href: "/admin", label: "后台" },
    { href: "/api/health", label: "健康检查" }
  ]
};

export const defaultPages: EditablePageRecord[] = [
  {
    slug: "home",
    title: "首页",
    summary: "管理首页 Hero、指标卡片、精选项目和路线图。",
    heroEyebrow: "PORTFOLIO CMS BLUEPRINT",
    heroTitle: "把个人主页做成可长期进化的网站系统",
    heroBody:
      "这一版不再只是展示型单页，而是面向长期扩展的个人网站骨架。你后面想继续增加页面、项目详情、文章、管理员后台和数据库时，都可以沿着这套结构直接往前走。",
    visibility: "public",
    content: {
      metrics: [
        {
          value: "5+",
          label: "公开页面",
          detail: "首页、关于、项目、随笔、联系页都已经拆分完成。"
        },
        {
          value: "1",
          label: "后台入口",
          detail: "后台已经有独立入口，下一步就是接入真正的登录和编辑。"
        },
        {
          value: "100%",
          label: "Vercel 友好",
          detail: "继续保持 Next.js 全栈架构，便于长期部署和迭代。"
        }
      ],
      focusAreas: [
        {
          title: "多页面内容组织",
          description:
            "把每一类内容拆成独立路由，后面无论增加案例页、博客还是服务介绍页都会更清楚。"
        },
        {
          title: "内容层与页面层解耦",
          description:
            "现在先用本地 TypeScript 数据，后面只要替换数据层，就能接入 Prisma 和 PostgreSQL。"
        },
        {
          title: "后台管理优先预留",
          description:
            "管理端与展示端分开布局，避免未来加入登录、角色权限时反复返工。"
        }
      ],
      roadmap: [
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
            "先把页面摘要、项目卡片和文章列表入库，后面再扩展到更细的内容模块。"
        },
        {
          step: "03",
          title: "接入管理员登录",
          description:
            "把 /admin 改成真正受保护的后台入口，并为管理员角色加入权限判断。"
        },
        {
          step: "04",
          title: "增加文件上传与发布流程",
          description:
            "后续通过 Vercel Blob 管理图片资源，再为后台加上草稿和发布时间追踪。"
        }
      ],
      featuredProjectSlugs: ["portfolio-studio", "admin-editing-roadmap"]
    }
  },
  {
    slug: "about",
    title: "关于页",
    summary: "更新个人介绍、当前关注方向和合作方式。",
    heroEyebrow: "ABOUT THE SITE",
    heroTitle: "这不是一次性网页，而是一套可持续迭代的个人站",
    heroBody:
      "你后续会持续增加页面、内容和管理能力，所以这个项目从现在开始就按内容网站的标准来组织。这样等你要加博客、服务介绍、案例页或后台编辑时，基本不用推翻重来。",
    visibility: "public",
    content: {
      principles: [
        {
          title: "先做结构，再做内容量",
          description:
            "页面数变多之后，最怕的是所有文案都散落在组件里，所以我们优先整理了路由和数据层。"
        },
        {
          title: "先做后台入口，再做高级能力",
          description:
            "一开始就预留后台，未来接入认证、权限、富文本和上传时会轻松很多。"
        },
        {
          title: "让每一次升级都能直接复用上一次成果",
          description:
            "今天搭的是个人主页，明天它也可以继续长成作品集、博客和轻量 CMS。"
        }
      ],
      learningPriorities: [
        "Next.js App Router 的页面和布局组织方式",
        "TypeScript 的基础类型、组件 Props 与表单数据",
        "Server Actions 和表单提交的完整流程",
        "数据库里的表、字段、关系和发布状态"
      ],
      roadmap: [
        {
          step: "01",
          title: "把页面拆清楚",
          description:
            "先学会把不同页面和布局组织好，避免未来每加一个功能都需要返工。"
        },
        {
          step: "02",
          title: "把数据独立出来",
          description:
            "让页面消费数据，而不是直接内嵌文案，这样后续切换到数据库会自然很多。"
        },
        {
          step: "03",
          title: "再接后台与权限",
          description:
            "等页面和数据层稳了，再加管理员登录和后台编辑。"
        }
      ]
    }
  },
  {
    slug: "projects",
    title: "项目页",
    summary: "展示项目列表，并支持后续扩展成案例库。",
    heroEyebrow: "PROJECT LIBRARY",
    heroTitle: "把项目拆成列表页和详情页，是未来后台编辑的第一步",
    heroBody:
      "项目现在已经不再是首页里的一小块介绍，而是独立的内容集合。后面接后台时，管理员可以直接维护这些项目卡片和详情。",
    visibility: "public",
    content: {}
  },
  {
    slug: "writing",
    title: "随笔页",
    summary: "沉淀建站记录、学习总结和项目复盘。",
    heroEyebrow: "WRITING",
    heroTitle: "个人主页也需要长期内容输出",
    heroBody:
      "文章区可以放建站记录、学习总结和项目复盘。现在先用静态数据组织，后面可以直接接数据库或富文本编辑。",
    visibility: "public",
    content: {}
  },
  {
    slug: "contact",
    title: "联系页",
    summary: "维护联系方法、常见问题和下一步引导。",
    heroEyebrow: "CONTACT",
    heroTitle: "把沟通入口也纳入内容系统的一部分",
    heroBody:
      "联系方式、社交链接和合作说明同样适合纳入后台管理。这样你以后换邮箱、换 GitHub、增加个人介绍时，不需要再改代码文件。",
    visibility: "public",
    content: {
      faqs: [
        {
          question: "这个网站后面真的可以接后台吗？",
          answer:
            "可以。现在已经把展示层和后台入口分开，接下来只要把登录、数据库和表单写入接上去就行。"
        },
        {
          question: "未来新增页面会不会很麻烦？",
          answer:
            "不会。现在已经按 App Router 的方式拆分，增加页面或动态详情页都会比最初的单页结构轻松得多。"
        }
      ],
      note: "欢迎交流网页开发、作品集搭建和个人内容站点建设。"
    }
  }
];

export const defaultProjects: ProjectRecord[] = [
  {
    slug: "portfolio-studio",
    name: "Portfolio Studio",
    category: "个人官网",
    summary:
      "将最初的静态单页升级成多页面内容站，既能展示个人信息，也能逐步长成可编辑的作品集系统。",
    year: "2026",
    phaseLabel: "进行中",
    visibility: "public",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    challenge:
      "原始 demo 只有一个页面，后续扩展页面和后台时会越来越难维护。",
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
    phaseLabel: "规划中",
    visibility: "public",
    stack: ["Auth.js", "Prisma", "PostgreSQL", "Vercel Blob"],
    challenge:
      "后台不只是登录页，还涉及页面结构、字段设计、草稿与发布流程。",
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
    phaseLabel: "就绪",
    visibility: "public",
    stack: ["App Router", "Static Generation", "SEO"],
    challenge:
      "文章内容会越来越多，需要一开始就有列表页和详情页的概念。",
    solution:
      "先按文章摘要和详情页模式组织，等以后接数据库或 MDX 时保持相同路由结构。",
    outcome: "网站的内容层次更完整，也更适合持续更新。",
    deliverables: [
      "文章列表页",
      "文章详情页",
      "内容摘要模型",
      "可扩展的 slug 结构"
    ]
  }
];

export const defaultArticles: ArticleRecord[] = [
  {
    slug: "why-i-rebuilt-this-site",
    category: "建站记录",
    title: "为什么我要把个人主页当成一个小型 CMS 来设计",
    summary:
      "个人网站一开始看起来只是几个页面，但只要计划加入后台编辑，它就已经是在朝内容管理系统演化了。",
    readTime: "4 分钟",
    publishedAt: "2026-04-25",
    visibility: "public",
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
    title:
      "接下来最值得先学的知识，不是数据库，而是页面与内容的组织方式",
    summary:
      "在真正接入后台之前，先理解路由、组件拆分和数据流，会让后面的学习成本低很多。",
    readTime: "5 分钟",
    publishedAt: "2026-04-25",
    visibility: "public",
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

export const defaultAdminCollections: AdminCollection[] = [
  {
    key: "pages",
    name: "页面内容",
    description: "管理首页、关于页、联系页等固定页面内容。",
    fields: ["标题", "描述", "Hero 文案", "JSON 内容"],
    status: "优先建设"
  },
  {
    key: "projects",
    name: "项目案例",
    description: "维护项目卡片、详情页内容、技术栈和交付物。",
    fields: ["slug", "摘要", "技术栈", "案例详情"],
    status: "优先建设"
  },
  {
    key: "writing",
    name: "随笔文章",
    description: "支持持续写作和输出学习记录。",
    fields: ["标题", "分类", "正文 JSON", "发布日期"],
    status: "优先建设"
  },
  {
    key: "settings",
    name: "站点设置",
    description: "品牌名、联系方式、社交链接和页脚说明。",
    fields: ["站点名称", "邮箱", "社交链接", "页脚说明"],
    status: "优先建设"
  }
];

export function getDefaultPageBySlug<TSlug extends PageSlug>(slug: TSlug) {
  const page = defaultPages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Missing default page for slug: ${slug}`);
  }

  return page as EditablePageRecord<TSlug>;
}

export function getDefaultProjectBySlug(slug: string) {
  return defaultProjects.find((project) => project.slug === slug) ?? null;
}

export function getDefaultArticleBySlug(slug: string) {
  return defaultArticles.find((article) => article.slug === slug) ?? null;
}

export function getDefaultContactMethods(): ContactMethod[] {
  return [
    {
      label: "邮箱",
      value: defaultSiteSettings.contactEmail,
      href: `mailto:${defaultSiteSettings.contactEmail}`
    },
    {
      label: "GitHub",
      value: defaultSiteSettings.githubUrl.replace(/^https?:\/\//, ""),
      href: defaultSiteSettings.githubUrl
    },
    {
      label: "Vercel",
      value: "部署到你的 Vercel 项目",
      href: defaultSiteSettings.deployUrl
    }
  ];
}
