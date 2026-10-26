import fs from 'node:fs';
import path from 'node:path';
import { buildDescription, buildDistinctArticleContent, buildFaqs } from './knowledge_content_builders.mjs';

const output = path.resolve('src/data/generatedKnowledge.ts');

const topics = [
  ['us-apple-id-sharing-safety', '美区 Apple ID 共享安全吗？账号使用、退出与隐私保护指南', '美区apple id共享', 'Apple ID 专题', '共享账号的安全边界、正确登录位置、退出步骤与隐私保护', 'iPhone 与 iPad 用户'],
  ['us-apple-id-sharing-download-guide', '美区 Apple ID 共享下载指南：获取海外 App 的完整流程', '美区apple id共享下载', 'Apple ID 专题', '下载海外 App 的操作流程、常见验证问题与后续更新方法', '需要下载海外应用的 iOS 用户'],
  ['airport-recommendation-guide', '机场推荐怎么选：从线路、稳定性到售后服务的完整判断框架', '机场推荐', '选购与推荐', '建立不依赖广告榜单的机场筛选方法', '第一次购买订阅的用户'],
  ['vpn-recommendation-china', 'VPN 推荐前先看懂：协议、线路与使用场景差异', 'VPN推荐', '选购与推荐', '比较传统 VPN、代理订阅与自建方案的适用边界', '重视易用性与隐私的用户'],
  ['proxy-service-recommendation', '梯子推荐避坑手册：稳定、速度与价格如何取舍', '梯子推荐', '选购与推荐', '用可验证指标替代模糊的高速宣传', '希望长期稳定使用的普通用户'],
  ['stable-airport-selection', '稳定机场推荐标准：晚高峰、丢包与故障恢复实测方法', '稳定机场推荐', '选购与推荐', '识别真正稳定的线路和服务保障', '视频、会议与远程办公用户'],
  ['high-speed-airport-testing', '高速机场推荐不能只看带宽：测速方法与真实体验指标', '高速机场推荐', '选购与推荐', '解释带宽、延迟、抖动和单线程速度的关系', '下载与高清流媒体用户'],
  ['paid-airport-value', '付费机场推荐：月付试用、套餐选择与风险控制', '付费机场推荐', '选购与推荐', '用小额试用和分阶段续费降低购买风险', '准备从免费节点升级的用户'],
  ['science-internet-guide-2026', '2026 科学上网指南：客户端、订阅与分流配置全流程', '2026科学上网指南', '年度指南', '从零完成客户端选择、订阅导入、节点测试和规则分流', '需要系统入门的新用户'],
  ['latest-airport-recommendation-2026', '2026 最新机场推荐方法：如何识别仍在维护的服务', '2026机场推荐', '年度指南', '通过更新频率、公告透明度和线路维护判断活跃度', '关注服务持续性的用户'],
  ['long-term-stable-airport', '长期稳定机场的 8 个特征：运营历史、冗余与售后', '长期稳定机场', '年度指南', '从长期运营视角评估服务商风险', '计划季度或年度使用的用户'],
  ['old-brand-airport-guide', '老牌机场推荐是否更可靠？历史口碑与技术债的双面分析', '老牌机场推荐', '年度指南', '平衡运营年限、技术更新和用户规模', '偏好成熟服务的用户'],
  ['iplc-airport-explained', 'IPLC 专线机场详解：线路原理、优缺点与适用人群', 'IPLC专线机场', '线路与架构', '讲清 IPLC 的链路结构、成本与体验差异', '对晚高峰稳定性要求较高的用户'],
  ['iepl-airport-explained', 'IEPL 专线机场怎么选：入口、落地与 SLA 判断方法', 'IEPL专线机场', '线路与架构', '分析 IEPL 服务的关键组成和验证方法', '远程办公与跨境协作用户'],
  ['dedicated-line-airport-guide', '专线机场推荐指南：别被“专线”两个字误导', '专线机场推荐', '线路与架构', '区分物理专线、中转优化和营销包装', '需要低抖动连接的用户'],
  ['bgp-relay-airport', 'BGP 中继机场是什么：三网入口与智能路由原理', 'BGP中继机场', '线路与架构', '解释 BGP 中转对不同运营商的实际价值', '家庭宽带网络环境复杂的用户'],
  ['high-sla-airport', '高 SLA 机场如何验证：可用率、恢复时间与补偿机制', '高SLA机场', '线路与架构', '把服务承诺转化为可核验的指标', '业务连续性要求较高的用户'],
  ['peak-hour-stable-airport', '晚高峰稳定机场判断指南：20:00 后应该测什么', '晚高峰稳定机场', '线路与架构', '设计晚高峰对照测试并解读结果', '晚间观看视频和游戏的用户'],
  ['dual-load-airport', '双负载机场原理：入口冗余、自动切换与真实收益', '双负载机场', '线路与架构', '说明双入口和负载均衡的能力边界', '希望减少断线的多设备用户'],
  ['cheap-airport-recommendation', '便宜机场推荐的成本真相：低价套餐应检查哪些限制', '便宜机场推荐', '价格与套餐', '识别低价套餐中的倍率、限速和共享拥堵', '预算敏感的轻度用户'],
  ['value-airport-recommendation', '性价比机场推荐：如何计算每 GB 与有效带宽成本', '性价比机场推荐', '价格与套餐', '建立可横向比较的套餐成本模型', '希望控制长期支出的用户'],
  ['monthly-airport-plan', '月付机场推荐：为什么新用户更适合短周期订阅', '月付机场推荐', '价格与套餐', '比较月付、季付和年付的风险与折扣', '初次试用和需求变化大的用户'],
  ['pay-as-you-go-airport', '按量计费机场适合谁：流量包有效期与成本测算', '按量计费机场', '价格与套餐', '分析按量套餐的使用节奏和到期规则', '低频或备用线路用户'],
  ['unlimited-time-traffic-airport', '不限时流量机场指南：一次购买长期使用的注意事项', '不限时流量机场', '价格与套餐', '核对流量包有效期、账号活跃规则和服务风险', '偶尔出差与备用需求用户'],
  ['free-trial-airport', '免费试用机场怎么测：24 小时内完成的测试计划', '免费试用机场', '价格与套餐', '用有限试用时间覆盖关键网络场景', '购买前希望先验证体验的用户'],
  ['large-traffic-airport', '大流量机场推荐：4K 视频、下载与多设备用量估算', '大流量机场推荐', '价格与套餐', '估算常见场景流量并选择合理套餐', '家庭共享和重度视频用户'],
  ['clash-airport-recommendation', 'Clash 机场推荐与兼容性检查：订阅格式、内核和规则', 'Clash机场推荐', '客户端生态', '验证 Clash/Mihomo 订阅兼容与规则质量', 'Windows、macOS 与 Android 用户'],
  ['shadowrocket-node-guide', 'Shadowrocket 节点推荐：小火箭订阅导入与策略选择', 'Shadowrocket节点推荐', '客户端生态', '完成 iOS 节点导入、测速和按应用分流', 'iPhone 与 iPad 用户'],
  ['sing-box-airport-guide', 'Sing-box 机场选择指南：新协议支持与跨平台配置', 'Sing-box机场', '客户端生态', '评估 Sing-box 配置、协议支持和更新维护', '需要跨平台统一配置的用户'],
  ['v2rayn-airport-guide', 'V2rayN 机场推荐：Windows 订阅导入与路由设置', 'V2rayN机场推荐', '客户端生态', '讲解 Windows 客户端订阅、路由和故障排查', '偏好轻量客户端的 Windows 用户'],
  ['quantumult-x-node-guide', 'Quantumult X 节点与策略组配置：从导入到分流', 'Quantumult X节点', '客户端生态', '组织节点资源、策略组和规则优先级', '需要精细化分流的 iOS 用户'],
  ['one-click-subscription-import', '客户端一键导入并不难：订阅转换与安全检查', '客户端一键导入', '客户端生态', '解释一键导入流程以及链接泄露风险', '希望快速完成配置的新手'],
  ['chatgpt-airport-guide', 'ChatGPT 专用机场怎么选：IP 质量、地区与稳定登录', 'ChatGPT专用机场', '流媒体与 AI', '降低频繁验证、地区限制和会话中断', '使用 AI 写作、编程与办公的用户'],
  ['netflix-airport-guide', 'Netflix 解锁机场选择：分区、清晰度与检测方法', 'Netflix解锁机场', '流媒体与 AI', '验证片库地区、播放清晰度和持续解锁能力', '影视流媒体用户'],
  ['tiktok-live-dedicated-line', 'TikTok 直播专线怎么搭配：上行、抖动与账号环境', 'TikTok直播专线', '流媒体与 AI', '围绕直播上行稳定、出口地区和设备环境做规划', '跨境直播团队'],
  ['disney-plus-node-guide', 'Disney+ 解锁节点指南：地区识别与播放故障排查', 'Disney+解锁节点', '流媒体与 AI', '处理地区判断、DNS 和设备缓存问题', 'Disney+ 观影用户'],
  ['claude-proxy-guide', 'Claude 专用代理选择：长对话稳定性与 IP 风控', 'Claude专用代理', '流媒体与 AI', '改善长会话中断、登录验证和出口一致性', '研究、写作和开发用户'],
  ['youtube-4k-airport', 'YouTube 4K 机场怎么测：连接速度、缓冲与编码统计', 'YouTube 4K机场', '流媒体与 AI', '使用 Stats for Nerds 判断真实播放能力', '4K 与高帧率视频用户'],
  ['native-ip-airport', '原生 IP 机场是什么：识别方法、用途与常见误区', '原生IP机场', '流媒体与 AI', '区分原生、广播、住宅和数据中心 IP', '关注平台地区识别的用户'],
  ['ai-network-acceleration', 'AI 工具网络加速指南：稳定会话比峰值速度更重要', 'AI工具网络加速', '流媒体与 AI', '优化 ChatGPT、Claude 与开发接口的连接体验', '高频使用生成式 AI 的用户'],
  ['foreign-trade-vpn-guide', '外贸 VPN 推荐框架：邮箱、社媒与客户系统安全访问', '外贸VPN推荐', '跨境商业', '为日常外贸工具建立稳定且可审计的网络方案', 'SOHO 与外贸团队'],
  ['cross-border-ecommerce-line', '跨境电商专线选择：店铺环境、固定出口与团队协作', '跨境电商专线', '跨境商业', '规划店铺运营网络并减少环境频繁变化', '亚马逊、独立站运营团队'],
  ['amazon-operation-proxy', '亚马逊运营代理怎么选：账号隔离不是只换一个 IP', '亚马逊运营代理', '跨境商业', '从设备、浏览器、出口和权限四层理解隔离', '多店铺运营与代运营团队'],
  ['independent-site-node-guide', '独立站节点推荐：广告投放、支付测试与访问速度', '独立站节点推荐', '跨境商业', '匹配投放地区、支付环境和站点测试需求', 'Shopify 与品牌站运营者'],
  ['anti-association-proxy-airport', '防关联代理机场靠谱吗：风险边界与正确隔离方法', '防关联代理机场', '跨境商业', '澄清代理服务不能替代完整账号隔离', '管理多个业务账号的团队'],
  ['enterprise-cross-border-line', '企业翻墙专线规划：权限、日志、容灾与合规边界', '企业翻墙专线', '跨境商业', '构建可管理、可恢复的企业跨境访问方案', '中小企业 IT 管理者'],
  ['airport-review-methodology', '机场评测方法论：如何做一份可复现的真实测试', '机场评测', '评测与排行', '建立测试环境、样本时段和记录模板', '希望独立判断服务质量的用户'],
  ['airport-ranking-explained', '机场排行榜怎么看：排名指标、商业合作与更新时间', '机场排行榜', '评测与排行', '识别榜单权重和潜在利益关系', '通过榜单筛选服务的用户'],
  ['peak-hour-speed-test', '晚高峰测速完整教程：延迟、抖动、丢包与吞吐量', '晚高峰测速', '评测与排行', '在统一条件下测试线路的真实承载能力', '重视夜间体验的用户'],
  ['airport-speed-comparison', '机场测速横评怎么做才公平：变量控制与结果解读', '机场测速横评', '评测与排行', '控制设备、运营商、节点和时段变量', '评测作者与进阶用户'],
  ['reliable-airport-ranking', '靠谱机场排行的判断标准：稳定性权重应高于峰值', '靠谱机场排行', '评测与排行', '用长期稳定、售后和风险替代单次跑分', '希望减少更换成本的用户'],
  ['anti-exit-scam-airport', '防跑路机场指南：付款前检查主体、历史与异常信号', '防跑路机场', '评测与排行', '识别高风险促销、失联和资金盘式运营迹象', '准备购买长期套餐的用户'],
];

const internalLinks = [
  ['/knowledge/', '科学上网知识库'], ['/blog/what-is-airport-service/', '机场服务基础指南'],
  ['/blog/how-to-choose-airport/', '机场选择方法'], ['/blog/connection-troubleshooting/', '连接故障排查'],
  ['/blog/advanced-rules-config/', '规则分流教程'], ['/downloads/', '客户端下载中心'],
  ['/reviews/', '机场评测'], ['/faq/', '常见问题中心']
];

const officialLinks = [
  ['https://support.apple.com/zh-cn/HT204053', 'Apple 账户安全说明'],
  ['https://github.com/MetaCubeX/mihomo', 'Mihomo 官方项目'],
  ['https://sing-box.sagernet.org/', 'sing-box 官方文档'],
  ['https://github.com/2dust/v2rayN', 'v2rayN 官方项目'],
  ['https://help.netflix.com/zh-cn/node/87', 'Netflix 网络建议'],
  ['https://support.google.com/youtube/answer/78358?hl=zh-Hans', 'YouTube 系统要求'],
];

const angles = [
  '先确认自己的主要设备、宽带运营商和每天使用时段，再比较产品参数',
  '把一次峰值测速与一周连续体验分开记录，避免被偶然结果误导',
  '优先验证最常使用的真实场景，而不是只看服务商给出的节点数量',
  '采用小额月付、保留备用方案，并定期复盘订阅是否仍然值得续费',
  '把线路质量、出口质量、客户端兼容和售后响应拆成四张独立评分表',
  '在相同设备和相同网络下做对照测试，才能排除环境变量干扰',
];

const cases = [
  '晚间家庭宽带同时有电视播放、手机浏览和电脑下载时，线路更容易暴露抖动与拥堵问题',
  '出差切换酒店 Wi-Fi 与手机热点后，原本正常的配置可能因 DNS、IPv6 或系统代理残留而变化',
  '多人共用订阅时，设备数、并发连接和流量倍率往往比套餐标称流量更早成为瓶颈',
  '远程会议看似带宽要求不高，但连续的小幅丢包会直接造成声音断续和画面冻结',
  '流媒体与 AI 平台同时关注出口地区和 IP 信誉，单纯增加下载速度不一定能解决登录限制',
  '跨境业务强调环境一致性，频繁切换国家、节点和设备比速度稍慢更容易造成业务风险',
];

const escapeText = (s) => s.replaceAll('`', '\\`').replaceAll('${', '\\${');
const link = (pair) => `<a href="${pair[0]}" target="_blank" rel="noopener noreferrer">${pair[1]}</a>`;
const ilink = (pair) => `<a href="${pair[0]}">${pair[1]}</a>`;

function makeLongTails(keyword, audience, category) {
  const tails = [
    `${keyword}怎么选`, `${keyword}安全吗`, `${keyword}使用教程`, `${keyword}避坑指南`,
    `${keyword}适合新手吗`, `${keyword}晚高峰稳定吗`, `${keyword}价格怎么比较`, `${keyword}常见问题`,
    `${keyword}客户端配置`, `${keyword}节点测速方法`, `${keyword}2026选择指南`, `${keyword}适合${audience}`,
  ];
  if (category === 'Apple ID 专题') tails.push('美区Apple ID登录App Store教程', '共享Apple ID退出方法');
  return tails;
}

function makeFaqs(keyword, focus, audience, i) {
  return [
    { question: `${keyword}最重要的判断指标是什么？`, answer: `先围绕“${focus}”建立可重复的测试流程。不要只看节点数量或瞬时峰值，应记录高峰期延迟、抖动、丢包、出口地区和连续使用情况。` },
    { question: `${keyword}适合一次购买长期套餐吗？`, answer: `对${audience}而言，更稳妥的做法是先短期试用，再根据两到四周记录决定是否续费。长期折扣不能抵消服务变化与运营风险。` },
    { question: `测试${keyword}时为什么结果每天不同？`, answer: `本地运营商拥堵、Wi-Fi 干扰、节点负载、目标平台限速和测试时段都会影响结果。固定设备与测试方法，并比较多个时段，结论才可靠。` },
    { question: `${keyword}出现连接失败时先查什么？`, answer: `依次检查账号状态、订阅更新时间、系统时间、客户端内核、系统代理与 DNS；再切换同地区备用节点。可参考站内连接故障排查文章。` },
  ];
}

function makeContent(topic, i, longTails) {
  const [slug, title, keyword, category, focus, audience] = topic;
  const a = angles[i % angles.length];
  const b = angles[(i + 2) % angles.length];
  const c = cases[i % cases.length];
  const d = cases[(i + 3) % cases.length];
  const official = officialLinks[i % officialLinks.length];
  const inside = [internalLinks[i % internalLinks.length], internalLinks[(i + 3) % internalLinks.length], internalLinks[(i + 5) % internalLinks.length]];
  const dimensions = category === 'Apple ID 专题'
    ? ['登录位置是否正确', '双重认证与验证码', '个人 iCloud 数据隔离', '下载完成后的退出步骤', '应用后续更新方式']
    : category === '价格与套餐'
      ? ['真实月成本', '流量倍率', '有效期规则', '设备与并发限制', '退款及售后条件']
      : category === '线路与架构'
        ? ['入口质量', '中继链路', '出口地区', '高峰拥堵', '故障切换能力']
        : category === '跨境商业'
          ? ['环境一致性', '人员权限', '固定出口', '日志与审计', '备用线路']
          : ['高峰延迟', '抖动与丢包', '出口 IP 质量', '客户端兼容', '售后响应'];

  return `
<p class="lead"><strong>${keyword}</strong>并不是一个只看价格或测速截图就能做出的选择。本文面向${audience}，围绕${focus}展开，给出可以自己复现的检查步骤、记录表和决策方法。阅读后你不需要照搬任何榜单，而是能根据设备、网络和用途得出更适合自己的结论。</p>

<h2>一、先定义需求：${keyword}究竟解决什么问题</h2>
<p>搜索“${keyword}”的人，表面上都想找到一个答案，实际需求往往完全不同。有人在意晚间视频不卡顿，有人需要长时间远程会议，有人关注海外应用下载，也有人希望跨境业务环境保持稳定。如果不先写清目标，测速越多反而越容易被无关指标带偏。</p>
<p>建议先列出三项必须满足的条件：最常用设备、最常访问的服务、最集中的使用时段。然后再列两项可以妥协的条件，例如节点数量或界面美观。本文采用的核心原则是：${a}。这种方法虽然比直接看“推荐榜”多花十分钟，却能显著降低买错套餐和反复迁移的成本。</p>
<p>一个典型情境是：${c}。此时真正决定体验的并不是宣传页上的峰值带宽，而是连接在持续负载下能否保持稳定。你可以先阅读${ilink(inside[0])}，理解基础概念，再按本文步骤完成自己的测试。</p>

<h2>二、五个关键维度：把模糊宣传变成可检查指标</h2>
<h3>1. ${dimensions[0]}</h3>
<p>${dimensions[0]}决定了服务能否在你的主要网络中正常工作。测试时应固定设备，分别在白天和 20:00—23:00 使用相同目标进行三轮记录。不要只保留最低延迟，而要观察中位数、最大值和波动范围。连续结果比某一次“跑满带宽”更有意义。</p>
<h3>2. ${dimensions[1]}</h3>
<p>${dimensions[1]}常被营销文案简化成一个标签，但真实表现需要通过操作验证。建议记录首次连接、连续使用三十分钟、切换网络后三种状态；如果任一环节需要频繁重试，就应降低评分。${b}，这样更接近长期使用，而不是开通当天的短暂体验。</p>
<h3>3. ${dimensions[2]}</h3>
<p>检查${dimensions[2]}时，要把“能访问”与“稳定可用”区分开。前者只说明某一时刻连通，后者还包括地区识别、会话保持、验证码频率与错误恢复。若涉及账号或业务操作，请避免在短时间内频繁切换多个国家和出口。</p>
<h3>4. ${dimensions[3]}</h3>
<p>${dimensions[3]}关系到日常维护成本。好的方案应当让用户知道何时更新、更新失败如何回退、主线路不可用时如何切换。若所有问题都只能通过重装解决，说明配置可维护性不足。可收藏${ilink(inside[1])}作为排查入口。</p>
<h3>5. ${dimensions[4]}</h3>
<p>${dimensions[4]}往往在购买前被忽略，却决定故障发生后的损失。查看公告是否写明影响范围、开始时间、预计恢复和后续复盘；联系客服时，记录首次响应与有效解决的时间，而不是只看机器人是否秒回。</p>

<h2>三、可复现的 30 分钟测试流程</h2>
<ol>
  <li><strong>准备基线：</strong>关闭下载和云同步，记录直连网络的延迟、丢包与下载速度。</li>
  <li><strong>固定变量：</strong>选择同一设备、同一 Wi-Fi、同一目标站点，只改变待测节点或方案。</li>
  <li><strong>测试首连：</strong>记录连接耗时、DNS 解析、网页首屏和应用登录是否正常。</li>
  <li><strong>测试持续负载：</strong>连续播放高清视频或进行二十分钟会议，观察缓冲、断流和音画同步。</li>
  <li><strong>测试切换：</strong>在主节点不可用时切换备用节点，检查恢复步骤是否清晰。</li>
  <li><strong>保存证据：</strong>截图只作辅助，同时写下日期、时段、运营商、客户端版本和节点名称。</li>
</ol>
<p>${d}。因此测试必须覆盖自己的真实场景。客户端应优先从${ilink(inside[2])}或开发者官方渠道获取；以本篇主题为例，还可以核对${link(official)}，避免使用来源不明的安装包或过期教程。</p>

<h2>四、评分表：如何比较两个候选方案</h2>
<table class="w-full text-left text-sm border-collapse my-6">
  <thead><tr class="bg-slate-100"><th class="p-3">维度</th><th class="p-3">建议权重</th><th class="p-3">记录方式</th><th class="p-3">不合格信号</th></tr></thead>
  <tbody>
    <tr><td class="p-3">稳定与可用</td><td class="p-3">30%</td><td class="p-3">多时段连续测试</td><td class="p-3">频繁断流、恢复步骤不明确</td></tr>
    <tr><td class="p-3">场景匹配</td><td class="p-3">25%</td><td class="p-3">用常用应用实测</td><td class="p-3">只能测速，目标服务不可用</td></tr>
    <tr><td class="p-3">安全与透明</td><td class="p-3">20%</td><td class="p-3">检查权限、条款和公告</td><td class="p-3">索取无关权限、规则含糊</td></tr>
    <tr><td class="p-3">成本与限制</td><td class="p-3">15%</td><td class="p-3">计算真实月成本</td><td class="p-3">隐藏倍率、设备或有效期限制</td></tr>
    <tr><td class="p-3">支持与维护</td><td class="p-3">10%</td><td class="p-3">提交一个具体问题</td><td class="p-3">只有模板回复、长期无更新</td></tr>
  </tbody>
</table>
<p>权重不是固定答案。${audience}可以把最关键的一项提高到 40%，但不要让价格或单次速度占据全部权重。最终得分相近时，优先选择月付、条款清晰、迁移成本较低的方案。</p>

<h2>五、常见误区与风险边界</h2>
<ul>
  <li><strong>误区一：节点越多越好。</strong>大量重复落地并不等于更多冗余，重点是不同入口、不同运营商和不同故障域。</li>
  <li><strong>误区二：低延迟等于高速度。</strong>延迟反映响应时间，吞吐量还受带宽、拥堵、协议和目标服务器限制。</li>
  <li><strong>误区三：一次解锁等于长期可用。</strong>平台策略和出口 IP 状态会变化，应关注维护能力与替换速度。</li>
  <li><strong>误区四：年付一定更划算。</strong>折扣越大，预付风险越集中；新用户应先验证再延长周期。</li>
  <li><strong>误区五：共享凭据可以随意登录。</strong>涉及共享账号时，只在指定商店或应用入口操作，不开启云同步，不写入个人资料，并在完成后彻底退出。</li>
</ul>
<p>任何网络工具都应在适用法律、平台条款和组织制度允许的范围内使用。不要把线路工具当作规避账号安全规则的手段，也不要在共享环境中保存支付信息、联系人、照片或工作机密。</p>

<h2>六、围绕“${keyword}”可以继续覆盖的长尾问题</h2>
<p>${longTails.map((x) => `<span class="inline-block px-2 py-1 mr-2 mb-2 rounded bg-blue-50 text-blue-700">${x}</span>`).join('')}</p>
<p>这些长尾词对应不同搜索意图：教程型用户需要步骤，比较型用户需要指标，风险型用户关心安全和售后。写作或选购时应分别回答，不要把同一段“高速稳定”描述复制到所有页面。</p>

<h2>七、结论：用记录替代印象，用短周期控制风险</h2>
<p>围绕${keyword}做决定时，最可靠的顺序是：先定义场景，再固定变量测试，然后核对限制与安全边界，最后才比较价格。初次使用建议选择短周期并保留备用方案；一到两周后根据记录复盘，而不是凭第一天的速度决定长期续费。</p>
<p>如果仍无法定位问题，可继续查看${ilink(['/faq/', '站内 FAQ'])}和${ilink(['/blog/connection-troubleshooting/', '连接问题排查指南'])}。真正高质量的方案，不是永远不发生故障，而是问题可发现、原因可解释、切换可执行、恢复可验证。</p>`;
}

const articleRows = [];
const contentRows = [];
const keywordRows = [];
topics.forEach((topic, i) => {
  const [slug, title, keyword, category, focus, audience] = topic;
  const tails = makeLongTails(keyword, audience, category);
  const faqs = buildFaqs(topic);
  articleRows.push(`  {\n    slug: '${slug}',\n    title: '${escapeText(title)}',\n    description: '${escapeText(buildDescription(topic))}',\n    category: '${category}',\n    tags: ['知识库扩展', '${keyword}', '${category}', '${tails[0]}'],\n    author: '知识库编辑组',\n    publishDate: '2026-10-${String((i % 26) + 1).padStart(2, '0')}',\n    updateDate: '2026-10-26',\n    faqs: ${JSON.stringify(faqs)},\n  }`);
  contentRows.push(`  '${slug}': \`${escapeText(buildDistinctArticleContent(topic, i, tails))}\``);
  keywordRows.push(`  { keyword: '${keyword}', longTails: ${JSON.stringify(tails)} }`);
});

const source = `// 此文件由 scripts/generate_knowledge_articles.mjs 生成，请修改生成脚本后重新运行。\nimport type { Article } from './articles';\n\nexport const generatedKnowledgeArticles: Article[] = [\n${articleRows.join(',\n')}\n];\n\nexport const generatedKnowledgeContent: Record<string, string> = {\n${contentRows.join(',\n')}\n};\n\nexport const generatedLongTailKeywords = [\n${keywordRows.join(',\n')}\n];\n`;

fs.writeFileSync(output, source, 'utf8');
console.log(`Generated ${topics.length} articles at ${output}`);
