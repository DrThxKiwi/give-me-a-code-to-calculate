# Portfolio Studio Demo

这是一个适合继续部署到 Vercel 的个人网站项目，已经从展示型 demo 升级成“公开站点 + 管理后台 + 可选数据库”的结构。

## 当前技术栈

- `Next.js 16` + `App Router`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Auth.js`
- `Prisma`
- `PostgreSQL`

## 现在已经具备的能力

- 多页面公开站：首页、关于、项目列表、项目详情、随笔列表、文章详情、联系页
- 后台工作区：`/admin`
- 管理员登录页：`/admin/login`
- 页面内容管理：`/admin/pages`
- 项目管理：`/admin/projects`
- 文章管理：`/admin/writing`
- 站点设置管理：`/admin/settings`
- Prisma schema 和 seed 脚本
- 没有数据库时自动回退到默认静态内容，不会把现有公开站点直接搞坏

## 本地开发

```bash
npm install
npm run dev
```

## 数据库初始化

在已经配置好 `DATABASE_URL` 的前提下：

```bash
npm run db:push
npm run db:seed
```

## 管理员登录环境变量

需要这些变量：

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
AUTH_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD_HASH="replace-with-bcrypt-hash"
```

生成密码哈希的一个简单方式：

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
```

把输出结果填到 `ADMIN_PASSWORD_HASH` 即可。

## 部署到 Vercel

1. 把项目推到 GitHub
2. 在 Vercel 导入仓库
3. Framework Preset 保持为 `Next.js`
4. 如果暂时还没接数据库，当前版本也能继续部署
5. 准备启用后台时，在 Vercel 中补充环境变量
6. 配好数据库后执行 `db push` 和 `db seed`

## 下一步推荐

1. 把默认文案改成你的真实名字、简介、项目和联系方式
2. 在 Vercel 配置 PostgreSQL 环境变量
3. 配置管理员登录环境变量
4. 先用后台维护页面、项目和文章
5. 下一阶段再接 `Vercel Blob` 做图片上传
