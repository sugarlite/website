# SugarLite 轻糖官网

<p align="center">
  <img src="public/logo.svg" width="80" alt="SugarLite Logo">
</p>

<p align="center">
  SugarLite（轻糖）官方网站 — 专业的血糖监测、趋势分析与健康管理应用。
</p>

<p align="center">
  <a href="https://sugarlite.top">🌐 在线访问</a> •
  <a href="https://apps.apple.com/us/app/sugarlite/id6753901096">📱 App Store</a>
</p>

---

## 技术栈

- **框架**：[React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**：[Vite 6](https://vitejs.dev/)
- **样式**：[Tailwind CSS 4](https://tailwindcss.com/)
- **路由**：[React Router DOM 7](https://reactrouter.com/)
- **包管理器**：[pnpm](https://pnpm.io/)

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

开发服务器默认运行在 http://localhost:3000

## 构建

```bash
# 生产构建
pnpm build

# 预览生产构建
pnpm preview
```

## 项目结构

```
├── components/          # React 组件
│   ├── Navbar.tsx       # 导航栏（含语言切换、暗黑模式）
│   ├── Hero.tsx         # 首页首屏
│   ├── Features.tsx     # 功能特性区
│   ├── AppPreview.tsx   # App 界面预览
│   ├── Footer.tsx       # 页脚
│   ├── PrivacyPolicy.tsx    # 隐私政策页
│   └── TermsOfService.tsx   # 服务条款页
├── hooks/               # 自定义 Hooks
│   ├── useCountUp.ts    # 数字滚动动画
│   ├── useOpenGraph.ts  # OpenGraph 元数据管理
│   └── useScrollReveal.ts   # 滚动显示动画
├── public/              # 静态资源
├── constants.tsx        # 应用常量与文案
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 根组件（路由、语言、主题）
└── index.html           # HTML 入口（含 SEO 元数据）
```

## 核心特性

- **多语言支持**：中文（默认）/ 英文，基于 URL 路由（`/:lang/*`）
- **暗黑模式**：自动检测系统偏好，支持手动切换
- **SEO 优化**：完整的 OpenGraph、Twitter Card、JSON-LD 结构化数据、多语言 alternate link
- **响应式设计**：适配桌面端与移动端
- **平滑动画**：滚动揭示、数字计数动画

## 部署

本项目使用 [Vercel](https://vercel.com) 进行部署，配置见 `vercel.json`。

---

<p align="center">
  © SugarLite 轻糖
</p>
