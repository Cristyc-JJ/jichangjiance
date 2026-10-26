// 文章数据
import { generatedKnowledgeArticles } from './generatedKnowledge';
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  updateDate?: string;
  featured?: boolean;
  faqs?: Array<{ question: string; answer: string }>;
}

export const categories = [
  '新手教程',
  '使用教程',
  '客户端教程',
  '评测对比',
  '问题解答',
  '进阶技巧',
  'Apple ID 专题',
  '选购与推荐',
  '年度指南',
  '线路与架构',
  '价格与套餐',
  '客户端生态',
  '流媒体与 AI',
  '跨境商业',
  '评测与排行',
];

export const articles: Article[] = [
  ...generatedKnowledgeArticles,
  {
    slug: 'what-is-airport-service',
    title: '什么是机场服务？新手完全指南',
    description: '详细介绍机场服务的基本概念、IEPL专线/BGP工作原理与挑选避坑方法，帮助新手快速了解。',
    category: '新手教程',
    tags: ['新手入门', '基础概念', '选择指南'],
    author: '编辑部',
    publishDate: '2026-01-15',
    updateDate: '2026-03-01',
    featured: true,
  },
  {
    slug: 'how-to-choose-airport',
    title: '如何选择适合自己的机场服务',
    description: '从线路架构、延迟抖动、IP纯净度、计费模式等多个维度分析，教你如何选择最适合的机场服务。',
    category: '新手教程',
    tags: ['选择指南', '对比分析', '新手入门'],
    author: '编辑部',
    publishDate: '2026-01-20',
    featured: true,
  },
  {
    slug: 'clash-windows-setup',
    title: 'Clash Verge Rev Windows 完整配置教程',
    description: '新一代 Clash Verge Rev 从下载安装到 TUN 虚拟网卡全系统接管的高级配置详解。',
    category: '客户端教程',
    tags: ['Clash', 'Windows', '客户端配置'],
    author: '技术团队',
    publishDate: '2026-02-01',
    updateDate: '2026-02-28',
    featured: true,
  },
  {
    slug: 'v2rayn-setup',
    title: 'V2rayN Windows 客户端完整配置教程',
    description: '经典轻量 Windows 客户端 V2rayN 的订阅导入、路由绕过大陆与常见错误排查指南。',
    category: '客户端教程',
    tags: ['V2rayN', 'Windows', '客户端配置'],
    author: '技术团队',
    publishDate: '2026-02-03',
    featured: true,
  },
  {
    slug: 'clash-mac-setup',
    title: 'macOS Clash Verge Rev & Sing-box 配置指南',
    description: '完美适配 Apple Silicon M 系列芯片与 Intel Mac 的科学上网客户端配置教程。',
    category: '客户端教程',
    tags: ['macOS', 'Clash', 'Sing-box'],
    author: '技术团队',
    publishDate: '2026-02-04',
    featured: true,
  },
  {
    slug: 'ios-shadowrocket-guide',
    title: '免费美区ID共享与 iOS Shadowrocket 小火箭配置指南',
    description: '从免费美区 Apple ID 获取与安全登录开始，完整讲解 Shadowrocket 小火箭下载、机场订阅一键导入、规则分流与常见问题。',
    category: '客户端教程',
    tags: ['免费美区ID共享', 'iOS', 'Shadowrocket', '小火箭机场推荐', '客户端一键导入'],
    author: '技术团队',
    publishDate: '2026-02-05',
    updateDate: '2026-10-20',
    featured: true,
  },
  {
    slug: 'quantumult-x-guide',
    title: 'iOS Quantumult X (圈X) 进阶配置指南',
    description: 'iOS 高级代理工具圈X的策略组构建、脚本重写与规则定制 3000 字使用指南。',
    category: '客户端教程',
    tags: ['iOS', 'QuantumultX', '进阶技巧'],
    author: '技术团队',
    publishDate: '2026-02-07',
  },
  {
    slug: 'android-v2rayng-setup',
    title: 'Android v2rayNG 客户端配置教程',
    description: '安卓平台使用最广泛的开源代理工具 v2rayNG 订阅导入与全局分流设置。',
    category: '客户端教程',
    tags: ['Android', 'v2rayNG', '客户端配置'],
    author: '编辑部',
    publishDate: '2026-02-08',
  },
  {
    slug: 'flashclash-surfboard-guide',
    title: 'Android FlashClash / Surfboard 冲浪板对比配置教程',
    description: '安卓图形化 Clash 规则客户端 FlashClash 与 Surfboard 的性能对比与选购配置。',
    category: '客户端教程',
    tags: ['Android', 'FlashClash', 'Surfboard'],
    author: '技术团队',
    publishDate: '2026-02-09',
  },
  {
    slug: 'netflix-unlock-guide',
    title: 'Netflix 流媒体解锁与 4K 杜比视界完整指南',
    description: '如何选择原生 IP 节点解锁 Netflix/Disney+ 全区，以及 TV 电视盒子 4K 画质设置。',
    category: '使用教程',
    tags: ['Netflix', '流媒体解锁', '节点选择'],
    author: '编辑部',
    publishDate: '2026-02-10',
    featured: true,
  },
  {
    slug: 'chatgpt-access-guide',
    title: 'AI 工具需要翻墙吗？15 款主流 AI 工具网络要求一览表 (2026)',
    description: '深度整理 ChatGPT、Claude、Gemini、Midjourney、Sora 等 15 款主流 AI 工具的网络要求、IP 敏感度与国内替代方案。',
    category: '使用教程',
    tags: ['ChatGPT', 'Claude', 'AI工具', 'IP纯净度'],
    author: '技术团队',
    publishDate: '2026-02-15',
    featured: true,
  },
  {
    slug: 'line-type-comparison',
    title: '线路类型对比：IEPL专线、CN2 GIA/9929、BGP中转详解',
    description: '深入分析 IEPL 物理专线、三网 CN2 GIA/9929 及 BGP 中转的传输机制、优缺点与场景推荐。',
    category: '评测对比',
    tags: ['线路类型', 'IEPL专线', 'CN2 GIA', '对比分析'],
    author: '技术团队',
    publishDate: '2026-02-20',
  },
  {
    slug: 'connection-troubleshooting',
    title: '连接问题排查：从入门到精通',
    description: '详细讲解 95% 以上连接超时、测速 Timeout、系统时间不同步及 DNS 污染的 1 分钟修复全集。',
    category: '问题解答',
    tags: ['故障排查', '问题解决', '技术支持'],
    author: '技术团队',
    publishDate: '2026-02-25',
  },
  {
    slug: 'advanced-rules-config',
    title: '进阶：自定义规则配置与分流策略详解',
    description: '深入讲解 Clash 与 Sing-box 规则语法匹配优先级，实现自动化高效分流。',
    category: '进阶技巧',
    tags: ['规则配置', '进阶技巧', '分流策略'],
    author: '技术团队',
    publishDate: '2026-03-05',
  },
];

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => article.tags.includes(tag));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}
