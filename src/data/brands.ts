// 品牌数据
export interface Brand {
  slug: string;
  name: string;
  description: string;
  logo: string;
  category?: string;
  featured?: boolean;
  pros: string[];
  cons: string[];
  rating?: number;
  articleCount?: number;
}

export const brands: Brand[] = [
  {
    slug: 'edgenova',
    name: 'EdgeNova',
    description: '全线 IPLC 专线，晚高峰依然稳定流畅。解锁 Netflix、Disney+、ChatGPT 等主流服务。',
    logo: '/edgenova_logo.png',
    category: 'IEPL专线评测',
    featured: true,
    pros: ['物理内网专线抗干扰', '无感秒开 4K/8K 视频', '原生纯净 IP 解锁 AI'],
    cons: ['热门节点偶有满载', '起步套餐无按量付'],
    rating: 9.8,
    articleCount: 5,
  },
  {
    slug: 'jilianyun',
    name: '极连云',
    description: '多站 BGP 中转架构，访问国内响应迅速，适合跨服游戏、4K 高清视频和日常办公使用。',
    logo: '/jilianyun_logo.png',
    category: '高性价比/按量',
    featured: true,
    pros: ['多站 BGP 智能中转', '月付 10 元极低门槛', '适合日常办公与观影'],
    cons: ['晚高峰偶有波动'],
    rating: 9.7,
    articleCount: 4,
  },
  {
    slug: 'guangnianti',
    name: '光年梯',
    description: '注重隐私保护与无日志政策，AES-256 加密传输。起步价仅 9.9 元/月，提供 1020M 大带宽。',
    logo: '/guangnianti_logo.png',
    category: '大流量/高吞吐',
    featured: true,
    pros: ['9.9 元起大流量套餐', 'AES-256 高强加密', '1020M 海量带宽秒开'],
    cons: ['海外节点延迟略高'],
    rating: 9.6,
    articleCount: 4,
  },
  {
    slug: 'sujie',
    name: '速界',
    description: '专门针对跨服游戏玩家优化，提供低丢包率的专线连接，游戏与4K观影体验极佳。',
    logo: '/sujie_logo.png',
    category: '游戏加速评测',
    featured: true,
    pros: ['极低 Jitter 抖动', '真实 1.0 倍率不限设备', '游戏专线低丢包'],
    cons: ['免费体验节点较少'],
    rating: 9.5,
    articleCount: 4,
  },
  {
    slug: 'kexinyun',
    name: '可信云',
    description: '高强度数据加密，无日志记录，极度保护用户隐私安全，支持匿名支付与全端订阅。',
    logo: '/kexinyun_logo.png',
    category: '高性价比/按量',
    featured: true,
    pros: ['全过程无日志记录', '不限设备同时连接', '年付折合仅 8 元/月'],
    cons: ['客服响应时间稍长'],
    rating: 9.3,
    articleCount: 3,
  },
  {
    slug: 'shanshuiyun',
    name: '山水云',
    description: '主打琴、棋、书经典高品质节点，兼具轻量季付与年付套餐，提供极高稳定性与观影质感。',
    logo: '/shanshuiyun_logo.png',
    category: '大流量/高吞吐',
    featured: false,
    pros: ['琴棋书画高品质分类', '轻量季付/年付极高性价比', '解锁 4K 流媒体与 AI'],
    cons: ['极低套餐流量较紧凑'],
    rating: 9.2,
    articleCount: 3,
  },
  {
    slug: 'kuaili',
    name: '快狸',
    description: '专注大带宽 UDP 优化与流媒体解锁，多线程并发下载测试可轻松达到 100MB/s - 300MB/s。',
    logo: '/kuaili_logo.png',
    category: '大流量/高吞吐',
    featured: false,
    pros: ['300MB/s 极限峰值带宽', '不设隐形高倍率', '新手一键配置'],
    cons: ['节点维护更新较频繁'],
    rating: 9.1,
    articleCount: 3,
  },
  {
    slug: 'miaomiaoyun',
    name: '秒秒云',
    description: '提供探花、榜眼、状元级高速节点，具备低延迟与不限时100G方案，解锁 ChatGPT 与 Netflix。',
    logo: '/miaomiaoyun_logo.png',
    category: 'IEPL专线评测',
    featured: false,
    pros: ['探花/榜眼/状元多阶节点', '18元季付特惠极具性价比', '秒开 4K/8K 影音'],
    cons: ['体验版限速较明显'],
    rating: 9.0,
    articleCount: 3,
  },
  {
    slug: 'yuntu',
    name: '云图机场',
    description: '金融级物理专线不过 GFW 过滤，独享商业原生 IP 池，针对 ChatGPT、Claude 进行风控优化。',
    logo: '/yuntu_logo.png',
    category: '外贸&AI解锁',
    featured: false,
    pros: ['真物理专线不过 GFW', '商业白名单纯净 IP', '外贸/AI 生产力首选'],
    cons: ['资费相对偏高'],
    rating: 8.9,
    articleCount: 4,
  },
  {
    slug: 'jinyun',
    name: '锦云',
    description: '低至 6 元/50G 体验版起步，包含日常版、办公版及不限时套餐，高性价比全端覆盖。',
    logo: '/jinyun_logo.png',
    category: '高性价比/按量',
    featured: false,
    pros: ['6元体验版极低门槛', '办公版高并发低延迟', '18元季付特惠包'],
    cons: ['基础体验版连接数有限'],
    rating: 8.8,
    articleCount: 3,
  },
  {
    slug: 'liyun',
    name: '鲤云',
    description: '提供小鲤、中鲤、大鲤丰富方案，支持不限时 200G 与特惠年付/季付，多节点秒开观影。',
    logo: '/liyun_logo.png',
    category: '高性价比/按量',
    featured: false,
    pros: ['5元/100G 极低试错门槛', '支持不限时包月计费', '多节点并发秒开'],
    cons: ['热门节点晚高峰偶需切换'],
    rating: 8.7,
    articleCount: 3,
  },
  {
    slug: 'jisuyun',
    name: '极速机场',
    description: '采用国内三网顶级精品优化线路与物理落地，提供 28ms 超低延迟与 990M 带宽。',
    logo: '/jisuyun_logo.png',
    category: 'IEPL专线评测',
    featured: false,
    pros: ['28ms 国内极低延迟', '三网 CN2 GIA 9929', '24小时无视晚高峰'],
    cons: ['限制在线连接数'],
    rating: 8.7,
    articleCount: 3,
  },
  {
    slug: 'xiongmaocloud',
    name: '熊猫cloud',
    description: '主打超大流量包与 66 元不限时 600G 方案，6 元可得 300G 流量，全站统一高性价比风格。',
    logo: '/xiongmaocloud_logo.png',
    category: '大流量/高吞吐',
    featured: false,
    pros: ['6元享 300G 超大流量', '66元不限时 600G 超值', '全平台客户端兼容'],
    cons: ['节点更名较频繁'],
    rating: 8.6,
    articleCount: 3,
  },
  {
    slug: 'shunyun',
    name: '瞬云',
    description: '主打轻量与极速连接，支持灵活的按量付费模式，非常适合作为主线之外的备用机场。',
    logo: '/shunyun_logo.png',
    category: '高性价比/按量',
    featured: false,
    pros: ['灵活按量计费模式', '轻量极速握手连接', '备用永不失联'],
    cons: ['基础包流量较小'],
    rating: 8.5,
    articleCount: 3,
  },
  {
    slug: 'jiuyun',
    name: '九云',
    description: '招财、聚财、旺财及鸿运 300G 一次性方案，特惠 99 元/年付，稳定高覆盖。',
    logo: '/jiuyun_logo.png',
    category: '高性价比/按量',
    featured: false,
    pros: ['招财/聚财/旺财阶梯套餐', '99元/300G 一次性鸿运版', '99元/年付400G 特惠'],
    cons: ['高峰期需灵活选择就近节点'],
    rating: 8.4,
    articleCount: 2,
  },
  {
    slug: 'baoyun',
    name: '宝云',
    description: '福宝 4 元起步包，拥有 500G 财宝与 1000G 金宝，兼具传家宝/传世宝一次性传承方案。',
    logo: '/baoyun_logo.png',
    category: '大流量/高吞吐',
    featured: false,
    pros: ['4元/200G 福宝起步', '1000G 金宝海量传输', '传家宝/传世宝/传承宝一次性包'],
    cons: ['平价套餐限制最高并发'],
    rating: 8.3,
    articleCount: 2,
  },
  {
    slug: 'yunjiexian', name: '云界线', description: '面向跨境访问与多设备使用的稳定加速服务，提供多地区节点和一键订阅。', logo: '/yunjiexian_logo.png', category: '跨境专线', featured: true,
    pros: ['跨境访问稳定', '多端一键订阅', '常用地区节点覆盖'], cons: ['具体套餐以官网为准'], rating: 9.0, articleCount: 1,
  },
  {
    slug: 'dalaoyun', name: '大佬云', description: '兼顾高清观影、文件传输与日常办公的大带宽多地区节点服务。', logo: '/dalaoyun_logo.png', category: '大流量/高吞吐', featured: true,
    pros: ['大带宽节点', '多地区覆盖', '适合高清流媒体'], cons: ['具体套餐以官网为准'], rating: 8.9, articleCount: 1,
  },
  {
    slug: 'huanqiuti', name: '环球梯', description: '覆盖常用海外地区，适合多地区访问、流媒体和跨境业务测试。', logo: '/huanqiuti_logo.png', category: '全球节点', featured: false,
    pros: ['全球多区节点', '切换灵活', '支持主流客户端'], cons: ['具体套餐以官网为准'], rating: 8.8, articleCount: 1,
  },
  {
    slug: 'shandianshu', name: '闪电鼠', description: '强调快速连接和简单配置，适合跨平台直接导入订阅的新用户。', logo: '/shandianshu_logo.png', category: '新手友好', featured: false,
    pros: ['连接速度快', '一键导入订阅', '多平台支持'], cons: ['具体套餐以官网为准'], rating: 8.7, articleCount: 1,
  },
  {
    slug: 'liulianyun', name: '榴莲云', description: '主打大流量和持续使用体验，适合视频、下载与多设备日常使用。', logo: '/liulianyun_logo.png', category: '大流量/高吞吐', featured: false,
    pros: ['大流量方案', '多设备使用', '流媒体体验稳定'], cons: ['官网使用 HTTP 链接'], rating: 8.6, articleCount: 1,
  },
  {
    slug: 'shenxing', name: '神行加速', description: '针对延迟和抖动进行优化，兼顾游戏、实时会议及跨境访问。', logo: '/shenxing_logo.png', category: '低延迟加速', featured: false,
    pros: ['低延迟优化', '适合实时会议', '游戏与办公兼顾'], cons: ['具体套餐以官网为准'], rating: 8.5, articleCount: 1,
  },
];

// 获取精选品牌
export function getFeaturedBrands(): Brand[] {
  return brands.filter(brand => brand.featured);
}

// 根据slug获取品牌
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(brand => brand.slug === slug);
}

