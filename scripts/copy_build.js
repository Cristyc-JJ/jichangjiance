import fs from 'fs';
import path from 'path';

const legacyGeneratedPaths = [
  'blog/android-clients-comparison',
  'tag/使用体验',
  'tag/使用技巧',
  'tag/客户端对比',
  'tag/技术解析',
  'category/对比指南',
];

function removeLegacyGeneratedPages() {
  for (const relativePath of legacyGeneratedPaths) {
    for (const basePath of ['dist', '.', 'public']) {
      const targetPath = path.resolve(basePath, relativePath);
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
    }
  }
}

function copyFileWithRetry(src, dest, attempts = 12) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      fs.copyFileSync(src, dest);
      return;
    } catch (error) {
      if (attempt === attempts) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    copyFileWithRetry(src, dest);
  }
}

console.log('Syncing dist output strictly within 机场博客 project...');
removeLegacyGeneratedPages();
if (fs.existsSync('dist')) {
  // 1. Copy dist contents to root directory of 机场博客
  fs.readdirSync('dist').forEach((item) => {
    const srcPath = path.join('dist', item);
    const destPath = path.join('.', item);
    copyRecursiveSync(srcPath, destPath);
    
    // 2. Copy to public directory of 机场博客
    const publicDestPath = path.join('public', item);
    copyRecursiveSync(srcPath, publicDestPath);
  });

  // 3. Ensure all logo PNG files exist in subdirectories within 机场博客 for robust image loading
  const logoFiles = [
    'edgenova_logo.png', 'sujie_logo.png', 'kexinyun_logo.png',
    'kuaili_logo.png', 'yuntu_logo.png', 'jisuyun_logo.png', 'jisu_logo.png',
    'shunyun_logo.png', 'jilianyun_logo.png', 'guangnianti_logo.png',
    'liyun_logo.png', 'shanshuiyun_logo.png', 'miaomiaoyun_logo.png',
    'jinyun_logo.png', 'xiongmaocloud_logo.png', 'jiuyun_logo.png', 'baoyun_logo.png',
    'shandianshu_logo.png', 'dalaoyun_logo.png', 'shenxing_logo.png', 'huanqiuti_logo.png',
    'liulianyun_logo.png', 'yunjiexian_logo.png',
    'hero_tech_illust_core.png', 'hero_illust_core.png', 'ghibli_forest_core.png',
    'hero_forest_core.png', 'hero_tech_core.png'
  ];

  const subDirs = [
    'reviews', 'topics', 'tag', 'category', 'brands', 'go', 'blog', 'downloads', 'knowledge', 'apple-id', 'free-nodes', 'about', 'compare', 'coupons'
  ];

  logoFiles.forEach(file => {
    const srcFile = fs.existsSync(path.join('public', file)) ? path.join('public', file) : fs.existsSync(file) ? file : null;
    if (srcFile && fs.existsSync(srcFile)) {
      subDirs.forEach(sub => {
        if (!fs.existsSync(sub)) {
          fs.mkdirSync(sub, { recursive: true });
        }
        const target = path.join(sub, file);
        copyFileWithRetry(srcFile, target);
      });
    }
  });

  console.log('Build sync completed successfully.');
}
