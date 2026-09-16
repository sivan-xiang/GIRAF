/**
 * GIRAF 全球运营网点名录（货在哪儿操作）。
 * 内容蓝本：<https://giraf-logistics.com/Contact.html> 的 Longsail Branch 原文。
 *
 * 与 entities.js 的分工：
 *   entities.js —— 法定主体（合同跟谁签）
 *   branches.js —— 运营网点（货在哪儿操作），30 个地址与电话
 * 两者**不是**同一层概念，因此允许同一城市两侧各出现一次（如汉堡既是运营网点，
 * 也是 Girafsail Logistics GmbH 的注册地），但绝不把同一城市既写成「自有公司」
 * 又写成「合作方」——自有网点一律带 key，回指 entities.js 的登记主体。
 *
 * ★ 法定名称不在本文件重复书写：自有网点用 key 关联 entities.js，
 *   名称从那里取。此前两处各写一套（SMBH 全大写 vs. 登记原文大小写），
 *   已在页面上造成同一法人两种写法。
 */

import { entities } from './entities'

/** 由 entities.js 取法定登记名称；key 不存在时返回空串而不抛错 */
const legalNameOf = (key) => entities.find((e) => e.key === key)?.legalName || ''

export const branches = [
  /* ------------------------- 中国大陆（22） ------------------------- */
  {
    city: 'Shenzhen',
    region: 'cn',
    address:
      '6th Floor, T2, Runhong Building, No. 75 Meiyuan Road, Sunxi Community, Sungang Sub-district, Luohu District, Shenzhen, P.R. China',
    phone: '+86 755 2591 6717'
  },
  {
    city: 'Shanghai',
    region: 'cn',
    address:
      'Room 1001-1002, Floor 10, WanShuo Building, No. 198 JingZhou Road, Yangpu District, Shanghai, China',
    phone: '+86 21 3603 5663'
  },
  {
    city: 'Ningbo',
    region: 'cn',
    address:
      'Rm 8-3, YinYi Times Square, No. 8 Leng Jing Street, HaiShu District, Ningbo 315000, China',
    phone: '+86 574 8732 2632'
  },
  {
    city: 'Tianjin',
    region: 'cn',
    address: 'Unit 1-2807, Fuli Centre, Hexi District, Tianjin, China',
    phone: '+86 22 5892 2320'
  },
  {
    city: 'Qingdao',
    region: 'cn',
    address: '601, Noble Plaza Building, No. 328 Dunhua Road, Shibei District, Qingdao, China',
    phone: '+86 532 6600 6285'
  },
  {
    city: 'Hefei',
    region: 'cn',
    address:
      'Rm 1821, Block B, Weilan Business Port, No. 188 South Qianshan Road, Hefei, China',
    phone: '+86 551 6595 2871'
  },
  {
    city: 'Xiamen',
    region: 'cn',
    address: 'Unit 304-305, Building 1, 22 Huli Avenue, Huli District, Xiamen, China',
    phone: '+86 592 2639 079'
  },
  {
    city: 'Foshan',
    region: 'cn',
    address:
      'Room 3303, Block 2, No. 57 Jihua 5th Road, Zumiao Street, Chancheng District, Foshan, China',
    phone: '+86 757 8290 2043'
  },
  {
    city: 'Shunde',
    region: 'cn',
    address:
      'Room E9, 5th Floor, XinJi Times Square, QingHui Road, ShunDe District, Foshan, Guangdong, China',
    phone: '+86 757 2222 5990'
  },
  {
    city: 'Guangzhou',
    region: 'cn',
    address:
      'Unit 1509, Nanfeng Hui, No. 620 Xingang East Road, Haizhu District, Guangzhou, China',
    phone: '+86 20 8768 1663'
  },
  {
    city: 'Zhongshan',
    region: 'cn',
    address:
      '2503 Lihe Commercial Center, Dongqu Street, Zhongshan City, Guangdong Province, China',
    phone: '+86 760 8836 6212'
  },
  {
    city: 'Dongguan',
    region: 'cn',
    address:
      'Unit 1313, Building 18, Dongguan Vanke Star of East River, Wanjiang District, Dongguan, China',
    phone: '+86 769 2288 1989'
  },
  {
    city: 'Jiangmen',
    region: 'cn',
    address:
      'Room 2019-2020, Building B, Wanda Plaza, Pengjiang District, Jiangmen, Guangdong, China',
    phone: '+86 750 3850 105'
  },
  {
    city: 'Huizhou',
    region: 'cn',
    address:
      'Room 1408, Jiangbei Dewei Building, No. 4 Jiangbei Yunshan West Road, Huicheng District, Huizhou, Guangdong, China',
    phone: '+86 752 2029 699'
  },
  {
    city: 'Shantou',
    region: 'cn',
    address: 'Rm. 1320, North Tower, Bainaohui Plaza, Changping Road, Shantou, China',
    phone: '+86 754 8188 0611'
  },
  {
    city: 'Zhuhai',
    region: 'cn',
    address:
      'Room 509, JianAn Building, No. 113 First Street of Cui Qian Bei Road, Xiangzhou District, Zhuhai, China',
    phone: '+86 756 8532 612'
  },
  {
    city: 'Wuhan',
    region: 'cn',
    address:
      '2203-2204, Block F, Modern Optics Valley World Trade Center, Wuhan City, Hubei Province, China',
    phone: '+86 27 8700 3602'
  },
  {
    city: 'Nanjing',
    region: 'cn',
    address:
      'Room 1603, 16F, Friendship Square, 27 Hanzhong Road, Qinhuai District, Nanjing, Jiangsu Province, China',
    phone: '+86 25 8880 2510'
  },
  {
    city: 'Chengdu',
    region: 'cn',
    address:
      '1018, 10th Floor, Building E3, Global Center, No. 1700 North Tianfu Avenue, High-tech Zone, Chengdu, Sichuan, China',
    phone: '+86 28 8336 8208'
  },
  {
    city: 'Chongqing',
    region: 'cn',
    address:
      'Room 2509, T2, Jiangbeizui Guojin Center, Jiangbei District, Chongqing, China',
    phone: '+86 23 6310 6020'
  },
  {
    city: 'Changsha',
    region: 'cn',
    address:
      'Room 2106, 21st Floor, Building 1, Meixi Yuezhang, No. 1067 Fenglin 3rd Road, Lugu Street, Yuelu District, Changsha, China',
    phone: '+86 158 1359 2080'
  },
  {
    city: 'Beijing',
    region: 'cn',
    address:
      'Room 1505, Tower A, Rongke Wangjing Center, Wangjing Subdistrict, Chaoyang District, Beijing, China',
    phone: ''
  },

  /* ------------- 海外自有网点（8）—— 法定名称取自 entities.js ------------- */
  {
    city: 'Hamburg',
    region: 'eu',
    key: 'de',
    address: 'Hamburger Strasse 11, 15th floor, 22083 Hamburg, Germany',
    /** 通话号码与法定登记信息均以 company.js 为准，不在此重复定义 */
    phone: '+49 40 60429719-0',
    entity: legalNameOf('de')
  },
  {
    city: 'London',
    region: 'eu',
    key: 'uk',
    address:
      'Airivo Chiswick, Gable House, 18-24 Turnham Green Terrace, Chiswick, London W4 1QP, United Kingdom',
    phone: '+44 7904 077141',
    entity: legalNameOf('uk')
  },
  {
    city: 'Mexico City',
    region: 'am',
    key: 'mx',
    address:
      'Hamburgo 206, piso 3, oficina 301, Colonia Juarez, Alcaldia Cuauhtemoc, CP 06600, Ciudad de Mexico, Mexico',
    phone: '+52 55 2486 5705',
    entity: legalNameOf('mx')
  },
  {
    city: 'Los Angeles',
    region: 'am',
    key: 'us',
    address: '14750 Nelson Ave, Unit H, City of Industry, CA 91744, United States',
    phone: '+1 626 386 8828',
    entity: legalNameOf('us')
  },
  {
    city: 'Bangkok',
    region: 'as',
    key: 'th',
    address:
      'Room No. 32/37, 15th Floor, Zone A Unit B, Sino-Thai Tower, Sukhumvit 21 Rd (Asoke), Khlong Toei Nuea, Watthana, Bangkok 10110, Thailand',
    phone: '+66 2 163 4397',
    entity: legalNameOf('th')
  },
  {
    city: 'Ho Chi Minh City',
    region: 'as',
    key: 'vn-hcm',
    address: '4th Floor, 2-2B Lam Son, Tan Son Hoa Ward, Ho Chi Minh City, Vietnam',
    phone: '+84 28 3622 8118',
    entity: legalNameOf('vn-hcm')
  },
  {
    city: 'Hanoi',
    region: 'as',
    key: 'vn-hn',
    address:
      '9th Floor, No. 1, Lane 19, Duy Tan Street, Dich Vong Hau Ward, Cau Giay District, Hanoi, Vietnam',
    phone: '+84 778 284 888',
    entity: legalNameOf('vn-hn')
  },
  {
    city: 'Riyadh',
    region: 'me',
    key: 'sa',
    address: '6719 Wadi Al Thumamah, Sahafah, Riyadh City, Saudi Arabia',
    phone: '',
    entity: legalNameOf('sa')
  }
]

/** 区域定义：网络页按此分栏，顺序即展示顺序 */
export const branchRegions = [
  { id: 'cn', label: 'China' },
  { id: 'eu', label: 'Europe' },
  { id: 'am', label: 'Americas' },
  { id: 'as', label: 'Asia' },
  { id: 'me', label: 'Middle East' }
]

export const branchesOf = (regionId) => branches.filter((b) => b.region === regionId)

/** 可拨号号码：去掉空格与括号，用于 tel: 链接 */
export const telHref = (phone) => (phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '')
