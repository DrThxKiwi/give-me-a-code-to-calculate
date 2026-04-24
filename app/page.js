const projects = [
  {
    name: "个人展示页",
    description: "用来放自我介绍、技能、联系方式和作品入口。"
  },
  {
    name: "博客或学习记录",
    description: "后续可以扩展成文章列表，继续部署在 Vercel 上。"
  },
  {
    name: "轻量工具页面",
    description: "比如计算器、待办清单、作品展示，都适合继续加进去。"
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">PERSONAL WEBSITE DEMO</p>
        <h1>你好，我是你的名字</h1>
        <p className="hero-text">
          这是一个适合直接部署到 Vercel 的个人网页示例，使用 Next.js
          构建，不依赖数据库，也不需要常驻后端服务。
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button primary">
            查看项目
          </a>
          <a href="#contact" className="button secondary">
            联系我
          </a>
        </div>
      </section>

      <section className="card-grid">
        <article className="card">
          <span className="card-label">关于我</span>
          <h2>我正在学习并制作自己的网页作品</h2>
          <p>
            你可以把这里改成自己的介绍，比如专业方向、兴趣、正在做的项目，或者想应聘的岗位方向。
          </p>
        </article>
        <article className="card">
          <span className="card-label">技能</span>
          <h2>适合继续扩展</h2>
          <p>
            当前示例适合从静态页面开始，后续可以逐步接入表单、博客、项目详情页，依然保持对
            Vercel 友好。
          </p>
        </article>
      </section>

      <section id="projects" className="projects">
        <div className="section-heading">
          <p className="eyebrow">PROJECTS</p>
          <h2>示例项目区</h2>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>联系信息</h2>
        </div>
        <div className="contact-card">
          <p>邮箱：yourname@example.com</p>
          <p>GitHub：github.com/yourname</p>
          <p>一句话介绍：欢迎交流网页开发与个人项目。</p>
        </div>
      </section>
    </main>
  );
}
