/**
 * GIRAF 全球法定主体（子公司 / 分公司）——单一数据源
 *
 * 与 network.js 的区别：
 *   network.js  = 「覆盖能力」展示（城市清单、经办内容），
 *   entities.js = 「法律主体」清单（登记名称、注册地址、电话），用于对外联络与合规展示。
 *
 * 多语言约定：
 *   - legalName 与 addressLines 为工商登记原文（拉美登记名称为全大写、地址为所在国官方写法），
 *     **不随语言改写**——翻译法定名称与注册地址会导致法律文本失真。
 *   - 仅 city / country / region 等「描述性标签」走 { en, de, es, th } 映射，经 pick() 取值，
 *     缺失语言自动回退英语。
 *
 * 电话一律按 E.164 规范清理后同时给出显示文本与 tel: 链接（tel: 不带空格与括号）。
 */
import { pick, DEFAULT_LANG } from '@/i18n/locales'
import { company } from './company'

/** 区域标识 → 文案键（offices.region.*） */
export const REGIONS = ['europe', 'americas', 'asia', 'africa']

export const entities = [
  // ————————————————— 欧洲 —————————————————
  {
    key: 'de',
    region: 'europe',
    hq: true,
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
    addressLines: [
      'Suite 203, Gable House',
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
    key: 'mx-cv',
    region: 'americas',
    legalName: 'GIRAFSAIL LOGISTICS, S. DE R.L. DE C.V.',
    city: { en: 'Mexico City', de: 'Mexiko-Stadt', es: 'Ciudad de México', th: 'เม็กซิโกซิตี้' },
    country: { en: 'Mexico', de: 'Mexiko', es: 'México', th: 'เม็กซิโก' },
    addressLines: [
      'Hamburgo 206, Piso #2, Of. 201 y 202',
      'Colonia Juárez, Alcaldía Cuauhtémoc',
      'CP 06600, Ciudad de México, México'
    ],
    phone: '+52 55 2486 5705',
    phoneHref: '+525524865705'
  },
  {
    key: 'mx-sa',
    region: 'americas',
    legalName: 'GIRAF LOGISTICS DE MEXICO SA DE CV',
    city: { en: 'Mexico City', de: 'Mexiko-Stadt', es: 'Ciudad de México', th: 'เม็กซิโกซิตี้' },
    country: { en: 'Mexico', de: 'Mexiko', es: 'México', th: 'เม็กซิโก' },
    addressLines: ['Dante #36, Piso #7, Of. 701', 'Col. Anzures, Miguel Hidalgo', 'CP 11590, CDMX, México'],
    phone: '+52 55 2486 5705',
    phoneHref: '+525524865705'
  },

  // ————————————————— 亚洲 —————————————————
  {
    key: 'th',
    region: 'asia',
    legalName: 'GIRAF LOGISTICS (THAILAND) CO., LTD.',
    city: { en: 'Bangkok', de: 'Bangkok', es: 'Bangkok', th: 'กรุงเทพฯ' },
    country: { en: 'Thailand', de: 'Thailand', es: 'Tailandia', th: 'ไทย' },
    addressLines: [
      'Room No. 32/37, 15th Floor, Zone A, Unit B',
      'Stecon Tower, Sukhumvit 21 Rd (Asoke)',
      'Khlong Toei Nuea, Watthana, Bangkok 10110',
      'Thailand'
    ],
    phone: '+66 2 163 4397',
    phoneHref: '+6621634397'
  },
  {
    key: 'vn',
    region: 'asia',
    legalName: 'GIRAFSAIL LOGISTICS (VIETNAM) COMPANY LIMITED',
    city: { en: 'Ho Chi Minh City', de: 'Ho-Chi-Minh-Stadt', es: 'Ciudad Ho Chi Minh', th: 'นครโฮจิมินห์' },
    country: { en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', th: 'เวียดนาม' },
    addressLines: ['4th Floor, 2-2B Lam Son', 'Tan Son Hoa Ward, Ho Chi Minh City', 'Vietnam'],
    phone: '+84 778 284 888',
    phoneHref: '+84778284888'
  },
  {
    key: 'my',
    region: 'asia',
    legalName: 'GIRAFSAIL LOGISTICS SDN. BHD.',
    city: { en: 'Shah Alam', de: 'Shah Alam', es: 'Shah Alam', th: 'ชาห์อาลัม' },
    country: { en: 'Malaysia', de: 'Malaysia', es: 'Malasia', th: 'มาเลเซีย' },
    addressLines: [
      'Unit 12-G, Level 12, Top Glove Tower',
      'No. 16, Persiaran Setia Dagang',
      'Bandar Setia Alam, 40170 Shah Alam, Selangor',
      'Malaysia'
    ]
    // 原始清单未提供电话
  },

  // ————————————————— 非洲 —————————————————
  {
    key: 'ma',
    region: 'africa',
    legalName: 'GIRAFSAIL LOGISTICS MOROCCO SARL',
    city: { en: 'Casablanca', de: 'Casablanca', es: 'Casablanca', th: 'คาซาบลังกา' },
    country: { en: 'Morocco', de: 'Marokko', es: 'Marruecos', th: 'โมร็อกโก' },
    addressLines: [
      'Angle Boulevard Moulay Ismail et Boulevard Balti Mohamed ben Mekki',
      'Ain Sebaa, Projet Immobilier dit Rochesnoires',
      'Casablanca, Morocco'
    ]
    // 原始清单未提供电话
  }
]

/** 取主体的城市名（缺失语言回退英语） */
export const entityCity = (e, lang = DEFAULT_LANG) => pick(e.city, lang)

/** 取主体所属国家名（缺失语言回退英语） */
export const entityCountry = (e, lang = DEFAULT_LANG) => pick(e.country, lang)

/** 主体数量（用于首页/统计等场景） */
export const entityCount = entities.length

/** 主体覆盖的国家数（同一国家多主体时去重，如墨西哥两家） */
export const entityCountryCount = new Set(entities.map((e) => e.country.en)).size

export default entities
