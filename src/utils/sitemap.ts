import { getCollection } from 'astro:content';
import { articles } from '../data/articles';
import { topics } from '../data/topics';
import { brands } from '../data/brands';

export async function createSitemapResponse() {
  const reviews = await getCollection('reviews');
  const today = new Date().toISOString().split('T')[0];

  // 静态核心页面
  const staticPages = [
    { url: 'https://jichangjiance.net/', priority: '1.0', changefreq: 'daily' },
    { url: 'https://jichangjiance.net/reviews/', priority: '0.9', changefreq: 'daily' },
    { url: 'https://jichangjiance.net/coupons/', priority: '0.9', changefreq: 'daily' },
    { url: 'https://jichangjiance.net/downloads/', priority: '0.9', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/knowledge/', priority: '0.9', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/blog/', priority: '0.8', changefreq: 'daily' },
    { url: 'https://jichangjiance.net/topics/', priority: '0.8', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/brands/', priority: '0.8', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/apple-id/', priority: '0.7', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/faq/', priority: '0.9', changefreq: 'daily' },
    { url: 'https://jichangjiance.net/compare/', priority: '0.6', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/html-sitemap/', priority: '0.5', changefreq: 'weekly' },
    { url: 'https://jichangjiance.net/about/', priority: '0.5', changefreq: 'monthly' },
  ];

  // 测评单页
  const reviewPages = reviews.map((r) => ({
    url: `https://jichangjiance.net/reviews/${r.slug}/`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: r.data.date || today,
  }));

  // 博客文章
  const blogPages = articles.map((a) => ({
    url: `https://jichangjiance.net/blog/${a.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: a.updateDate || a.publishDate || today,
  }));

  // 专题分类页
  const topicPages = topics.map((t) => ({
    url: `https://jichangjiance.net/topics/${t.slug}/`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: today,
  }));

  // 品牌列表页
  const brandPages = brands.map((b) => ({
    url: `https://jichangjiance.net/brands/${b.slug}/`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: today,
  }));

  // 分类聚合页
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const categoryPages = categories.map((cat) => ({
    url: `https://jichangjiance.net/category/${encodeURIComponent(cat)}/`,
    priority: '0.6',
    changefreq: 'weekly',
    lastmod: today,
  }));

  // 标签聚合页
  const tags = Array.from(new Set(articles.flatMap((a) => a.tags || [])));
  const tagPages = tags.map((t) => ({
    url: `https://jichangjiance.net/tag/${encodeURIComponent(t)}/`,
    priority: '0.5',
    changefreq: 'weekly',
    lastmod: today,
  }));

  const allUrls = [
    ...staticPages.map((p) => ({ ...p, lastmod: today })),
    ...reviewPages,
    ...blogPages,
    ...topicPages,
    ...brandPages,
    ...categoryPages,
    ...tagPages,
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
