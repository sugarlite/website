# OpenGraph 支持文档

## 概述

已为项目的所有页面添加了 OpenGraph (OG) 支持，确保在社交媒体（如微博、微信、LinkedIn、Twitter 等）分享页面链接时能够正确显示预览信息。

## 实现内容

### 1. **创建 OpenGraph Hook** (`hooks/useOpenGraph.ts`)

一个自定义 React Hook，用于动态管理元标签：

```typescript
interface OpenGraphMeta {
  title: string; // 页面标题
  description: string; // 页面描述
  url: string; // 页面 URL
  image?: string; // OG 图片
  type?: string; // OG 类型（默认 'website'）
  twitterCard?: string; // Twitter 卡片类型
}

useOpenGraph({
  title: "页面标题",
  description: "页面描述",
  url: "https://example.com/page",
  image: "https://example.com/image.png",
});
```

**功能特性：**

- 自动创建或更新 meta 标签
- 支持 OpenGraph 和 Twitter Card
- 智能处理 `property` 和 `name` 属性
- 动态更新页面标题

### 2. **更新 index.html**

在 HTML 头部添加了基础的 OpenGraph 和 Twitter Card 元标签：

```html
<!-- OpenGraph Meta Tags -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="..." />
<meta property="og:image" content="..." />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />

<!-- Basic Meta Tags -->
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<meta name="author" content="..." />
```

### 3. **更新 App.tsx**

在应用主组件中集成 OpenGraph Hook，根据当前路由动态更新元标签：

```typescript
const location = useLocation();

useOpenGraph({
  title:
    location.pathname === "/"
      ? "SugarLite 轻糖 - 掌控您的血糖健康"
      : location.pathname === "/privacy"
      ? "隐私政策 - SugarLite 轻糖"
      : "服务条款 - SugarLite 轻糖",
  description: "...",
  url: `https://sugarlite.app${location.pathname}`,
  image: "https://sugarlite.app/og-image.png",
  type: "website",
});
```

## 支持的页面

1. **主页 (/)** - 展示应用概览和功能特性
2. **隐私政策 (/privacy)** - 隐私协议页面
3. **服务条款 (/terms)** - 服务条款页面

## 如何自定义

### 修改默认 OG 信息

编辑 `App.tsx` 中的 `useOpenGraph` 配置：

```typescript
useOpenGraph({
  title: "自定义标题",
  description: "自定义描述",
  url: "https://yourdomain.com/path",
  image: "https://yourdomain.com/custom-image.png",
  type: "website",
});
```

### 为新页面添加 OG 支持

1. 在路由中添加新的 `<Route>` 标签
2. 更新 `useOpenGraph` 的条件判断以处理新路由

```typescript
useOpenGraph({
  title: location.pathname === "/new-page" ? "新页面标题" : "...",
  // ... 其他配置
});
```

### 替换 OG 图片

1. 将你的图片文件放在 `public/` 目录（推荐尺寸：1200x630px）
2. 更新 `og:image` URL：

```typescript
image: "https://sugarlite.app/your-og-image.png";
```

## OG 图片建议

- **尺寸**: 1200×630px（Facebook 推荐）或 1200×675px（通用）
- **格式**: JPG 或 PNG
- **文件大小**: < 5MB
- **内容**: 清晰展示应用特色和品牌元素

## 验证 OG 标签

### 使用以下工具验证 OpenGraph：

1. **Facebook 分享调试工具**: https://developers.facebook.com/tools/debug/
2. **Twitter 卡片验证工具**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Open Graph Preview**: https://www.opengraphco.com/

### 手动验证

在浏览器开发者工具中查看页面源代码，检查 `<head>` 是否包含相应的 meta 标签。

## SEO 相关

本实现已包含：

- ✅ OpenGraph (og:title, og:description, og:image, og:url, og:type)
- ✅ Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image)
- ✅ Meta Description
- ✅ Meta Keywords
- ✅ Meta Author
- ✅ 动态页面标题

## 注意事项

1. **URL 替换**: 记得将 `https://sugarlite.app` 替换为实际的域名
2. **OG 图片**: 确保 OG 图片 URL 可从互联网访问
3. **多语言**: 当前实现为中文，如需支持多语言，可在 Hook 中添加语言参数
4. **动态内容**: 如果使用 SSR (Server-Side Rendering)，可能需要在服务端生成 meta 标签

## 技术栈

- **Framework**: React 19.2.3
- **Router**: react-router-dom 7.11.0
- **TypeScript**: 用于类型安全
