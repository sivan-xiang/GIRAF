/**
 * GIRAF 全球法定主体（子公司 / 分公司）——单一数据源
 *
 * 与 network.js 的区别：
 *   network.js  = 「覆盖能力」展示（城市清单、经办内容），
 *   entities.js = 「法律主体」清单（登记名称、注册地址、电话），用于对外联络与合规展示。
 *
 * ★ 数据溯源：本文件每一条都必须是源站原文，禁止推测、补全或「看起来合理」的编造。
 *   登记名称  ← GIRAF 官网 Org 页「Overseas Subsidiary」清单 / 首页子公司清单
 *   注册地址与电话 ← GIRAF 官网 Contact 页（international offices 段）
 *   汉堡主体  ← company.js（其官网 de 站的工商登记信息），不在此重复定义
 *   本文件当前 8 条记录，与源站「seven countries」口径一致（越南两家 office 同属一个法人）。
 *
 * 多语言约定：
 *   - legalName 与 addressLines 为工商登记原文（拉美登记名称为全大写、地址为所在国官方写法），
 *     **不随语言改写**——翻译法定名称与注册地址会导致法律文本失真。
 *   - 仅 city / country / region 等「描述性标签」走 { en, de, es, th } 映射，经 pick() 取值，
 *     缺失语言自动回退英语。
 *
 * 电话约定：原始登记写法常带国内中继号或本地格式，须按 E.164 规范化
 *   （英国 `+44 0790 4077141` → `+44 7904 077141`；美国 `626-386-8828` → `+1 626 386 8828`），
 *   同时给出「显示文本 phone」与「tel: 链接 phoneHref」，phoneHref 不含空格与括号。
 */
import { pick, DEFAULT_LANG } from '@/i18n/locales'
import { company } from './company'

/** 区域标识 → 文案键（offices.region.*） */
export const REGIONS = ['europe', 'americas', 'asia', 'middleeast']

export const entities = [
  // ————————————————— 欧洲 —————————————————
  {
    key: 'de',
    region: 'europe',
    // 刻意不设 hq 标志：本站是 GIRAF 品牌站，不把任何一家分公司抬为「总部」。
    // 集团总部在中国深圳（LONGSAIL），汉堡主体只是欧洲的运营与签约主体。
    // 法定名称与注册地址以 company.js 为单一数据源，避免汉堡主体出现两套写法
    legalName: company.legalName,
    city: { en: 'Hamburg', de: 'Hamburg', es: 'Hamburgo', th: 'ฮัมบูร์ก' },
    country: { en: 'Germany', de: 'Deutschland', es: 'Alemania', th: 'เยอรมนี' },
    addressLines: [
      `${company.address.street}, 15. OG`,
      `${company.address.zip} ${company.address.city.en}`,
      company.address.country.en
    ],
    phone: company.phone,
    phoneHref: company.phoneHref,
    email: company.email
  },
  {
    key: 'uk',
    region: 'europe',
    legalName: 'GIRAF LOGISTICS (UK) LTD',
    city: { en: 'London', de: 'London', es: 'Londres', th: 'ลอนดอน' },
    country: { en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', th: 'สหราชอาณาจักร' },
    // 源站登记写法：Airivo Chiswick Gable House, 18-24 Turnham Green Terrace Chiswick W4 1QP
    addressLines: [
      'Airivo Chiswick Gable House',
      '18-24 Turnham Green Terrace',
      'Chiswick, London W4 1QP',
      'United Kingdom'
    ],
    // 原始登记写法为 +44 0790 4077141，国际规范应去掉国内中继号 0
    phone: '+44 7904 077141',
    phoneHref: '+447904077141'
  },

  // ————————————————— 美洲 —————————————————
  {
    key: 'us',
    region: 'americas',
    legalName: 'LONGSAIL USA CORPORATION',
    city: { en: 'Los Angeles', de: 'Los Angeles', es: 'Los Ángeles', th: 'ลอสแอนเจลิส' },
    country: { en: 'United States', de: 'USA', es: 'Estados Unidos', th: 'สหรัฐอเมริกา' },
    // 源站登记写法：14750 NELSON AVE, UNIT H CITY OF INDUSTRY, CA 91744
    addressLines: ['14750 Nelson Ave, Unit H', 'City of Industry, CA 91744', 'United States'],
    // 源站为本地格式 626-386-8828，补 +1 国家码
    phone: '+1 626 386 8828',
    phoneHref: '+16263868828'
  },
  {
    key: 'mx',
    region: 'americas',
    legalName: 'GIRAFSAIL LOGISTICS DE MEXICO S.A. DE C.V',
    city: { en: 'Mexico City', de: 'Mexiko-Stadt', es: 'Ciudad de México', th: 'เม็กซิโกซิตี้' },
    country: { en: 'Mexico', de: 'Mexiko', es: 'México', th: 'เม็กซิโก' },
    // 源站登记写法：Hamburgo 206 piso 3 oficina 301 Colonia Juárez alcaldía Cuahutémoc CP 06600 ciudad de México
    // 登记原文中的 Cuahutémoc 为墨方写法，不作拼写「纠正」
    addressLines: [
      'Hamburgo 206, Piso 3, Oficina 301',
      'Colonia Juárez, Alcaldía Cuahutémoc',
      'CP 06600, Ciudad de México, México'
    ],
    phone: '+52 55 2486 5705',
    phoneHref: '+525524865705'
  },

  // ————————————————— 亚洲 —————————————————
  {
    key: 'th',
    region: 'asia',
    legalName: 'GIRAFSAIL LOGISTICS (THAILAND) CO., LTD.',
    city: { en: 'Bangkok', de: 'Bangkok', es: 'Bangkok', th: 'กรุงเทพฯ' },
    country: { en: 'Thailand', de: 'Thailand', es: 'Tailandia', th: 'ไทย' },
    // 源站登记写法：Room No. 32/37 15th Floor Zone A Unit B Sino-Thai Tower, Sukhumvit 21 Rd (Asoke), Klongtoey, Nua, Wattana, Bangkok 10110
    addressLines: [
      'Room No. 32/37, 15th Floor, Zone A, Unit B',
      'Sino-Thai Tower, Sukhumvit 21 Rd (Asoke)',
      'Klongtoey Nua, Wattana, Bangkok 10110',
      'Thailand'
    ],
    phone: '+66 2 163 4397',
    phoneHref: '+6621634397'
  },
  {
    key: 'vn-hcm',
    region: 'asia',
    legalName: 'GIRAFSAIL LOGISTICS (VIETNAM) COMPANY LIMITED',
    city: { en: 'Ho Chi Minh City', de: 'Ho-Chi-Minh-Stadt', es: 'Ciudad Ho Chi Minh', th: 'นครโฮจิมินห์' },
    country: { en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', th: 'เวียดนาม' },
    addressLines: ['4th Floor, 2-2B Lam Son', 'Tan Son Hoa Ward, Ho Chi Minh City', 'Vietnam'],
    phone: '+84 28 3622 8118',
    phoneHref: '+842836228118'
  },
  {
    // 河内为越南法人的分支办公室（源站 About 页：GIRAFSAIL LOGISTICS VIETNAM HANOI BRANCH），
    // 与胡志明市同属一个法人，故 legalName 一致，仅地址与电话不同。
    key: 'vn-hn',
    region: 'asia',
    legalName: 'GIRAFSAIL LOGISTICS (VIETNAM) COMPANY LIMITED',
    city: { en: 'Hanoi', de: 'Hanoi', es: 'Hanói', th: 'ฮานอย' },
    country: { en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', th: 'เวียดนาม' },
    addressLines: [
      '9th Floor, No. 1, Lane 19, Duy Tan Street',
      'Dich Vong Hau Ward, Cau Giay District',
      'Hanoi, Vietnam'
    ],
    phone: '+84 778 284 888',
    phoneHref: '+84778284888'
  },

  // ————————————————— 中东 —————————————————
  {
    key: 'sa',
    region: 'middleeast',
    legalName: 'FUTURE SAIL LOGISTICS SERVICES COMPANY',
    city: { en: 'Riyadh', de: 'Riad', es: 'Riad', th: 'ริยาด' },
    country: { en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudí', th: 'ซาอุดีอาระเบีย' },
    // 源站登记写法：6719 Wadi Al Thumamah Sahafah Riyadh City Saudi Arabia
    addressLines: ['6719 Wadi Al Thumamah, Sahafah', 'Riyadh, Saudi Arabia']
    // 源站未提供电话，页面回退为「经总部转接」
  }
]

/** 取主体的城市名（缺失语言回退英语） */
export const entityCity = (e, lang = DEFAULT_LANG) => pick(e.city, lang)

/** 取主体所属国家名（缺失语言回退英语） */
export const entityCountry = (e, lang = DEFAULT_LANG) => pick(e.country, lang)

/** 主体数量（用于首页/统计等场景）——按「办公地点」计，越南两家 office 计 2 */
export const entityCount = entities.length

/** 法定主体数量——按「登记名称」去重，越南两家 office 同属一个法人，故为 7 */
export const legalEntityCount = new Set(entities.map((e) => e.legalName)).size

/** 主体覆盖的国家数（同一国家多主体时去重，如越南两家 office） */
export const entityCountryCount = new Set(entities.map((e) => e.country.en)).size

/** 按区域分组，供联系页/网络页目录使用（保持 REGIONS 的声明顺序） */
export const entitiesByRegion = () =>
  REGIONS.map((region) => ({ region, items: entities.filter((e) => e.region === region) })).filter(
    (g) => g.items.length
  )

export default entities
