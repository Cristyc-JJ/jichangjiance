import fs from 'node:fs';

const knowledge = fs.readFileSync('knowledge/index.html', 'utf8');
const home = fs.readFileSync('index.html', 'utf8');
const expected = ['edgenova', 'jilianyun', 'guangnianti', 'liyun', 'sujie', 'kuaili', 'kexinyun', 'yunjiexian', 'dalaoyun', 'huanqiuti', 'shandianshu', 'liulianyun', 'shenxing'];
const cardOrder = [...home.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const observed = cardOrder.filter((id) => expected.includes(id)).slice(0, 13);
const newIds = expected.slice(7);

console.log(JSON.stringify({
  articleHref: knowledge.match(/href="([^"]*us-apple-id-sharing-safety[^"]*)"/)?.[1],
  articleHrefTargetsFile: knowledge.includes('../blog/us-apple-id-sharing-safety/index.html'),
  first13: observed,
  rankingCorrect: JSON.stringify(observed) === JSON.stringify(expected),
  hasLocalFileFix: home.includes("window.location.protocol === 'file:'"),
  newBrandPages: newIds.every((id) => fs.existsSync(`brands/${id}/index.html`)),
  newGoPages: newIds.every((id) => fs.existsSync(`go/${id}/index.html`)),
  redirectsCorrect: [
    'youxia01.yunjiexianaff.com', 'liu01.dalaoyunaff.com', '123pps01.huanqiutiaff.com',
    'eothvip01.shandianshuaff.com', '853vip01.liulianyunaff.com', 'fugui0077.shenxingaff.com',
  ].every((host) => home.includes(host)),
}, null, 2));
