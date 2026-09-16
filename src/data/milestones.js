/**
 * 集团编年史（1997–2024）。
 * 内容蓝本：<https://giraf-logistics.com/About.html> 的 Corporate Milestones 原文，
 * 公司页据此采用时间轴设计——这是内容决定形式，而不是套模板。
 */

export const milestones = [
  {
    year: '2024',
    keyword: 'Digitalisation',
    text: 'Longsail ranks among the top 50 shipping companies in the world and is selected as a key enterprise in China\u2019s international freight forwarding industry in 2023. The number of price enquiries on the SOWOLL system platform approaches one million. The Changsha and Saudi Arabia branches are established.'
  },
  {
    year: '2023',
    keyword: 'Perseverance',
    text: 'LONGSAIL is awarded the AAAAA logistics enterprise by the China Federation of Logistics & Purchasing. The DAYU system is rolled out globally.'
  },
  {
    year: '2022',
    keyword: 'New Horizon',
    text: 'SAFESAIL SUPPLY CHAIN is established, along with the SOWOLL Chengdu branch and the LONGSAIL SUPPLY CHAIN Chongqing branch. GIRAF LOGISTICS Thailand (Bangkok) and UK (London) branches are established, and the GIRAFSAIL LOGISTICS Vietnam Hanoi branch follows. The US overseas warehouse enters service.'
  },
  {
    year: '2021',
    keyword: 'Metamorphose',
    text: 'LONGSAIL SUPPLY CHAIN, REXPRESS TECHNOLOGY and ESAN INTERNATIONAL LOGISTICS are established. The Wuhan and Nanjing branches open.'
  },
  {
    year: '2020',
    keyword: 'Creation',
    text: 'The Mexico branch is established. LONGSAIL now owns 25 global branches, which together form the supply chain network. Annual transportation volume reaches 360,000 TEU and annual turnover exceeds 3.3 billion RMB. Vision and values are updated.'
  },
  {
    year: '2019',
    keyword: 'Big Step',
    text: 'The Chengdu branch and Party branch are established, and our mascot Xiaofan is born. The highest credit rating of the All-trust enterprise is AAA-rated.'
  },
  {
    year: '2018',
    keyword: 'Breakthrough',
    text: 'The 20th anniversary of LONGSAIL is held in Shenzhen and a new logo is released in the same year. The number of employees exceeds 900 for the first time, and the College of LONGSAIL holds the graduation of its first students.'
  },
  {
    year: '2016',
    keyword: 'Layout',
    text: 'The first overseas branch is established in the United States, and the company passes the national ISO9001 system certification \u2014 which marks the step into a standardised, scientific modern enterprise management track.'
  },
  {
    year: '2015',
    keyword: 'Go Forward',
    text: 'LONGSAIL raises its international development strategy and participates in many large-scale international transportation exhibitions. Logistics management services are provided for Fortune 500 companies, listed companies at home and abroad, and well-known enterprises.'
  },
  {
    year: '2011',
    keyword: 'Absorb',
    text: 'The Tianjin and Qingdao branches open and LONGSAIL enters the North China market, learning from the power of logistics in China and providing integrated logistics services to customers.'
  },
  {
    year: '2010',
    keyword: 'Growth',
    text: 'Selected as one of China\u2019s top 50 international freight forwarders, logistics and shipping companies for 12 consecutive years, promoting the rapid and comprehensive development of China\u2019s logistics service industry.'
  },
  {
    year: '2007',
    keyword: 'Development',
    text: 'Over five years the Foshan and Shanghai branches are established, completing the layout in South and East China. The number of employees exceeds 1,000, which marks a big step for LONGSAIL.'
  },
  {
    year: '2002',
    keyword: 'Explore',
    text: 'LONGSAIL establishes its first domestic branch in Guangzhou and actively expands its business areas, extending into new development space.'
  },
  {
    year: '2000',
    keyword: 'Set Sail',
    text: 'LONGSAIL becomes a national first-class freight forwarding enterprise approved by the Ministry of Commerce of China, and a founding member of WCA, CGLN, WFN and X2. It is the vice-chairman unit of the Shenzhen Freight Forwarders Association and holds the first non-vessel carrier business record (NVOCC).'
  },
  {
    year: '1997',
    keyword: 'Birth',
    text: 'LONGSAIL INTERNATIONAL LOGISTICS is established in Shenzhen as a professional third-party integrated logistics service operator. The name LONGSAIL comes from a poem by Li Bai: when you hoist the sails to cross the sea, you will ride the winds and cleave the waves. The team of four people started their long journey.'
  }
]

/** 公司页要点摘要，取自编年史中的关键节点 */
export const keyFacts = {
  founded: '1997',
  headquarters: 'Shenzhen, China',
  milestones: milestones.length
}

/**
 * 使命 / 愿景 / 价值观。
 * 内容蓝本：<https://giraf-logistics.com/About.html> 的 Mission / Vision / Values 原文，
 * 按条目整理，保留原口径（不作文学化改写）。
 */
export const statements = [
  {
    id: 'mission',
    kind: 'Mission',
    title: 'Easier cross-border trade',
    points: [
      'Easier cross-border trade',
      'Best solution for convenient logistics',
      'Latest information technology for more transparent logistics'
    ]
  },
  {
    id: 'vision',
    kind: 'Vision',
    title: 'The most reliable logistics partner around you',
    points: [
      'Every city accompanied by a LONGSAIL office',
      'Be the most reliable logistics partner around you'
    ]
  },
  {
    id: 'values',
    kind: 'Values',
    title: 'Customer first, and the habits that follow from it',
    points: [
      'Customer first',
      'Efficient collaboration',
      'Trustworthy',
      'Focus',
      'Embrace change',
      'Passionate and proactive'
    ]
  }
]
