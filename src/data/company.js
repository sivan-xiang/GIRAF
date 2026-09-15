import { pick, DEFAULT_LANG } from '@/i18n/locales'

/**
 * 单一数据源（Single Source of Truth）
 * 站点上所有对外品牌与联络信息都从这里读取，避免出现「宣传海外、联系总部」的错位。
 * 修改公司信息只需改这一个文件。
 *
 * 品牌关系：
 *   GIRAF  = LONGSAIL 集团的【海外品牌】，本站点即为 GIRAF 海外站。
 *   Girafsail Logistics GmbH = 该品牌在欧洲（德国汉堡）的运营与签约主体，
 *     也是欧盟/德国客户唯一可对外联络的实体（Impressum / 合同 / 发票均由此主体出具）。
 *
 * 多语言约定：
 *   需要随语言变化的字段一律写成 { en, de, es, th } 映射，
 *   用 pick(字段, lang) 取值，缺失语言自动回退英语。
 *   因此新增语言时，这里不需要任何三元判断，忘记补充也只会退回英语而非显示空白。
 */
export const company = {
  // —— 品牌 ——
  brand: 'GIRAF',
  tagline: 'Simplify the cross-border trade',
  legalName: 'Girafsail Logistics GmbH',
  shortName: 'Girafsail',

  // —— 注册地址（德国汉堡，欧盟主体）——
  // 街道名 Hamburger Straße / Hamburger Strasse 属专有地名，各语言统一保留原拼写
  address: {
    street: 'Hamburger Straße 11',
    floor: {
      en: '15th floor',
      de: '15. OG',
      es: '15.ª planta',
      th: 'ชั้น 15'
    },
    zip: '22083',
    city: {
      en: 'Hamburg',
      de: 'Hamburg',
      es: 'Hamburgo',
      th: 'ฮัมบูร์ก'
    },
    country: {
      en: 'Germany',
      de: 'Deutschland',
      es: 'Alemania',
      th: 'เยอรมนี'
    },
    countryCode: 'DE'
  },

  // —— 联络方式（欧盟主体）——
  phone: '+49 40 60429719-0',
  phoneHref: '+4940604297190',
  email: 'info.de@girafsail-logistics.com',
  website: 'www.girafsail-logistics.com',

  // —— 德国工商登记信息（Impressum 法定必备，§ 5 DDG）——
  // 法定披露项使用官方登记原文，不随语言改写，仅由各语言文案给出字段标签
  managingDirector: 'HUANG YU',
  registerCourt: 'Amtsgericht Hamburg',
  registerNumber: 'HRB 186908',
  vatId: 'DE323296008',
  taxNumber: '43/724/02194',

  // —— 集团背景（仅用于「网络 / 关于」页，标注为集团网络，不作联络方式展示）——
  group: {
    name: 'LONGSAIL International Logistics Co., Ltd.',
    nameZh: '长帆国际物流股份有限公司',
    headquarters: 'Shenzhen, China',
    since: 1999,
    offices: '30+'
  }
}

/** 城市名（随语言变化，缺失回退英语） */
export const cityName = (lang = DEFAULT_LANG) => pick(company.address.city, lang)

/** 国家名（随语言变化，缺失回退英语） */
export const countryName = (lang = DEFAULT_LANG) => pick(company.address.country, lang)

/** 楼层（德语 15. OG → 英语 15th floor 等） */
export const floorName = (lang = DEFAULT_LANG) => pick(company.address.floor, lang)

/** 一行式地址：街道 + 邮编城市 + 国家（页脚 / 信息列表等紧凑场景） */
export const addressLine = (lang = DEFAULT_LANG) =>
  `${company.address.street}, ${company.address.zip} ${cityName(lang)}, ${countryName(lang)}`

/** 完整地址：含楼层，用于 Impressum、联系页与公司页 */
export const fullAddress = (lang = DEFAULT_LANG) =>
  `${company.address.street}, ${floorName(lang)}, ${company.address.zip} ${cityName(lang)}, ${countryName(lang)}`

/** mailto 链接 */
export const mailto = (subject = '', body = '') => {
  const q = []
  if (subject) q.push(`subject=${encodeURIComponent(subject)}`)
  if (body) q.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${company.email}${q.length ? '?' + q.join('&') : ''}`
}

export default company
