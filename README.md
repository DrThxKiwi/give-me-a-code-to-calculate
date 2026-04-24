# Portfolio Studio Demo

这是一个适合继续部署到 Vercel 的个人网站升级版骨架。

## 当前技术栈

- `Next.js 16` + `App Router`
- `TypeScript`
- `Tailwind CSS`
- 公开站点与后台管理分离布局
- 本地内容数据层：后续可替换为 `Prisma + PostgreSQL`

## 已完成内容

- 多页面公开站：首页、关于、项目、项目详情、随笔、文章详情、联系页
- 后台骨架：`/admin`、`/admin/pages`、`/admin/projects`、`/admin/settings`、`/admin/login`
- 内容抽象层：`lib/cms.ts`
- 数据模型草案：`prisma/schema.prisma`
- 示例环境变量：`.env.example`
- 健康检查接口：`/api/health`

## 为什么这样搭

这套结构适合继续往下做：

1. 继续增加页面数量
2. 接入管理员登录
3. 接入数据库，让后台真正编辑前台内容
4. 后续接入图片上传与发布流程

## 本地运行

```bash
npm install
npm run dev
```

## 部署到 Vercel

1. 把项目推到 GitHub
2. 在 Vercel 导入仓库
3. Framework Preset 保持为 `Next.js`
4. 如果还没有数据库，当前版本可以直接部署
5. 等接入数据库和认证后，再到 Vercel 补充环境变量

## 下一步推荐

1. 把站点里的默认文案替换成你的真实信息
2. 优先完善 `/projects` 和 `/about`
3. 下一阶段接入 `Prisma + PostgreSQL`
4. 然后再接 `Auth.js` 保护 `/admin`
