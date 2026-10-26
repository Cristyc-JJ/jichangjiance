import fs from 'node:fs';
import path from 'node:path';

const src = fs.readFileSync('src/data/generatedKnowledge.ts', 'utf8');
const slugs = [...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const rows = slugs.map((slug) => {
  const html = fs.readFileSync(path.join('dist', 'blog', slug, 'index.html'), 'utf8');
  const main = html.match(/id="main-article-content">([\s\S]*?)<div class="mt-12/)?.[1] || '';
  const text = main.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').replace(/\s+/g, '');
  return {
    slug,
    text,
    chars: [...text].length,
    internalLinks: (main.match(/href="\//g) || []).length,
    externalLinks: (main.match(/href="https:/g) || []).length,
    faqs: (html.match(/<details/g) || []).length,
  };
});

const shingles = (text, size = 18) => {
  const set = new Set();
  for (let i = 0; i <= text.length - size; i += 3) set.add(text.slice(i, i + size));
  return set;
};
const similarity = (left, right) => {
  const a = shingles(left);
  const b = shingles(right);
  let shared = 0;
  for (const item of a) if (b.has(item)) shared++;
  return shared / Math.max(1, Math.min(a.size, b.size));
};
const pairs = [];
for (let i = 0; i < rows.length; i++) {
  for (let j = i + 1; j < rows.length; j++) {
    pairs.push({ left: rows[i].slug, right: rows[j].slug, similarity: similarity(rows[i].text, rows[j].text) });
  }
}
pairs.sort((a, b) => b.similarity - a.similarity);

console.log(JSON.stringify({
  count: rows.length,
  minChars: Math.min(...rows.map((x) => x.chars)),
  maxChars: Math.max(...rows.map((x) => x.chars)),
  averageChars: Math.round(rows.reduce((sum, x) => sum + x.chars, 0) / rows.length),
  highestSimilarity: pairs[0],
  topSimilarPairs: pairs.slice(0, 10).map((x) => ({ ...x, similarity: Number(x.similarity.toFixed(3)) })),
  failures: rows.filter((x) => x.chars < 2400 || x.internalLinks < 4 || x.externalLinks < 1 || x.faqs < 4).map(({ text, ...row }) => row),
  similarityFailures: pairs.filter((x) => x.similarity > 0.72).slice(0, 20),
}, null, 2));
