/**
 * 集团网络节点（LONGSAIL 网络）
 * 说明：以下为集团关联网络，仅作覆盖能力展示；
 * 页面上唯一可对外联络的实体是汉堡的 Girafsail Logistics GmbH。
 *
 * 多语言：随语言变化的字段写成 { en, de, es, th } 映射，用 pick() 取值。
 * 德/西语对城市与多数国名沿用拉丁拼写，故仅在与英语不同处列出对应语言，其余自动回退英语。
 */
import { pick, DEFAULT_LANG } from '@/i18n/locales'

export const germanOffices = [
  {
    key: 'hamburg',
    city: { en: 'Hamburg', de: 'Hamburg', es: 'Hamburgo', th: 'ฮัมบูร์ก' },
    country: { en: 'Germany', de: 'Deutschland', es: 'Alemania', th: 'เยอรมนี' },
    primary: true,
    role: {
      en: 'Head office · Girafsail Logistics GmbH',
      de: 'Firmensitz · Girafsail Logistics GmbH',
      es: 'Sede central · Girafsail Logistics GmbH',
      th: 'สำนักงานใหญ่ · Girafsail Logistics GmbH'
    },
    note: {
      en: 'Ocean freight, air freight, rail freight, customs clearance',
      de: 'Seefracht, Luftfracht, Bahnfracht, Zollabfertigung',
      es: 'Transporte marítimo, aéreo y ferroviario, despacho de aduanas',
      th: 'ขนส่งทางเรือ ทางอากาศ ทางราง และพิธีการศุลกากร'
    }
  },
  {
    key: 'bremen',
    city: { en: 'Werder (Bremen)', de: 'Werder (Bremen)', th: 'แวร์เดอร์ (เบรเมิน)' },
    country: { en: 'Germany', de: 'Deutschland', es: 'Alemania', th: 'เยอรมนี' },
    primary: false,
    role: {
      en: 'Group location',
      de: 'Gruppenstandort',
      es: 'Ubicación del grupo',
      th: 'ที่ตั้งของกลุ่มบริษัท'
    },
    note: {
      en: 'North German port access',
      de: 'Norddeutsche Hafenanbindung',
      es: 'Acceso a los puertos del norte de Alemania',
      th: 'การเชื่อมต่อท่าเรือเยอรมนีตอนเหนือ'
    }
  }
]

/** 自有网点（中国）——泰国市场是集团重点区域之一，城市名提供泰文转写 */
export const chinaOffices = [
  { city: { en: 'Shenzhen', th: 'เซินเจิ้น' }, hq: true },
  { city: { en: 'Shanghai', th: 'เซี่ยงไฮ้' } },
  { city: { en: 'Guangzhou', th: 'กว่างโจว' } },
  { city: { en: 'Ningbo', th: 'หนิงโป' } },
  { city: { en: 'Qingdao', th: 'ชิงเต่า' } },
  { city: { en: 'Tianjin', th: 'เทียนจิน' } },
  { city: { en: 'Xiamen', th: 'เซี่ยเหมิน' } },
  { city: { en: 'Chengdu', th: 'เฉิงตู' } },
  { city: { en: 'Wuhan', th: 'อู่ฮั่น' } },
  { city: { en: 'Nanjing', th: 'หนานจิง' } },
  { city: { en: 'Chongqing', th: 'ฉงชิ่ง' } },
  { city: { en: 'Hefei', th: 'เหอเฟย์' } },
  { city: { en: 'Foshan', th: 'ฝอซาน' } },
  { city: { en: 'Shunde', th: 'ซุ่นเต๋อ' } },
  { city: { en: 'Zhongshan', th: 'จงซาน' } },
  { city: { en: 'Dongguan', th: 'ตงก่วน' } },
  { city: { en: 'Jiangmen', th: 'เจียงเหมิน' } },
  { city: { en: 'Huizhou', th: 'หุ้ยโจว' } },
  { city: { en: 'Shantou', th: 'ซัวเถา' } },
  { city: { en: 'Zhuhai', th: 'จูไห่' } },
  { city: { en: 'Changsha', th: 'ฉางซา' } },
  { city: { en: 'Beijing', th: 'ปักกิ่ง' } }
]

/**
 * 海外合作网点（agent 网络）
 * 注意：伦敦、曼谷、胡志明市、墨西哥城已由 entities.js 中的**自有法定主体**承接，
 * 不再列在此处，避免同一城市既是「合作方」又是「自有公司」的表述冲突。
 */
export const worldOffices = [
  {
    city: { en: 'Los Angeles', th: 'ลอสแอนเจลิส' },
    country: { en: 'USA', de: 'USA', es: 'EE. UU.', th: 'สหรัฐอเมริกา' }
  },
  {
    city: { en: 'Hanoi', th: 'ฮานอย' },
    country: { en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', th: 'เวียดนาม' }
  },
  {
    city: { en: 'Riyadh', th: 'ริยาด' },
    country: { en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudí', th: 'ซาอุดีอาระเบีย' }
  }
]

/** 取网点城市名（缺失语言回退英语） */
export const cityLabel = (office, lang = DEFAULT_LANG) => pick(office.city, lang)

/** 取网点所属国家/地区名（缺失语言回退英语） */
export const countryLabel = (office, lang = DEFAULT_LANG) => pick(office.country, lang)
