/**
 * English (primary language)
 * GIRAF overseas site — the international brand of LONGSAIL International Logistics.
 * Copy is modelled on LONGSAIL's domestic (longsailing.net) and overseas
 * (longsailing.net/en) sites, written as native B2B logistics English.
 *
 * 术语约定（勿混用）：
 *   quote / quote request —— 统一用 quote，不用 quotation
 *   enquiry —— 英式拼写，全站统一
 *   所有格与省略号一律使用 ’（U+2019），避免与 JS 字符串定界符冲突
 */

export default {
  code: 'en',
  label: 'English',
  short: 'EN',
  htmlLang: 'en',

  nav: {
    home: 'Home',
    services: 'Services',
    solutions: 'Solutions',
    about: 'Company',
    network: 'Network',
    contact: 'Contact'
  },

  common: {
    submenu: 'Submenu',
    viewAll: 'View all',
    prev: 'Previous',
    next: 'Next',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    skipToContent: 'Skip to content',
    learnMore: 'Learn more',
    allServices: 'All services',
    details: 'Details',
    back: 'Back',
    ctaQuote: 'Request a quote',
    ctaContact: 'Get in touch',
    ctaCall: 'Call us',
    ctaMail: 'Send an email',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    legal: 'Legal',
    imprint: 'Imprint',
    privacy: 'Privacy',
    officeHours: 'Business hours',
    officeHoursValue: 'Mon–Fri, 08:00–18:00 CET/CEST',
    required: 'Required',
    since: 'since'
  },

  meta: {
    home: {
      title: 'GIRAF | Simplify the cross-border trade',
      desc: 'GIRAF is the overseas brand of LONGSAIL International Logistics — ocean, air and rail freight, customs clearance and warehousing, delivered by our own companies in seven countries and backed by 30+ locations worldwide.'
    },
    services: {
      title: 'Services | Ocean, air and rail freight, customs, warehousing',
      desc: 'Ocean freight, air freight, rail freight, inland haulage, customs clearance, warehousing, dangerous goods, e-commerce and logistics finance — managed end to end.'
    },
    solutions: {
      title: 'Solutions | Supply-chain solutions from GIRAF',
      desc: 'Door-to-door China–Europe, procurement logistics, project and heavy-lift cargo, and e-commerce fulfilment — run as single, accountable processes.'
    },
    about: {
      title: 'Company | GIRAF — the overseas brand of LONGSAIL',
      desc: 'Founded in 1999, LONGSAIL operates 30+ offices worldwide. GIRAF is its international brand, with European operations run from Hamburg by Girafsail Logistics GmbH.'
    },
    network: {
      title: 'Network | Offices in China, Europe, North America and worldwide',
      desc: 'Seven own companies across Europe, the Americas, Asia and the Middle East, more than 20 own locations across China, and partner offices worldwide.'
    },
    contact: {
      title: 'Contact | GIRAF — our own companies worldwide',
      desc: 'Reach the GIRAF company in your market. Registered offices, addresses and direct telephone numbers in seven countries across Europe, the Americas, Asia and the Middle East.'
    },
    imprint: {
      title: 'Imprint | Girafsail Logistics GmbH',
      desc: 'Provider identification under § 5 DDG: Girafsail Logistics GmbH, Hamburger Straße 11, 22083 Hamburg, Germany.'
    },
    privacy: {
      title: 'Privacy | Girafsail Logistics GmbH',
      desc: 'How we process personal data on this website, in accordance with Art. 13 GDPR.'
    }
  },

  home: {
    hero: {
      eyebrow: 'GIRAF · the international brand of LONGSAIL',
      title: 'Simplify the',
      titleLead: 'Simplify the',
      titleAccent: 'cross-border trade.',
      text: 'An international logistics brand built for overseas localisation: one-stop solutions resting on two things at once — operations that are local, and resources that are global. Our own teams work in Mexico, the UK, Germany, Vietnam, Thailand and Saudi Arabia, backed by the group network at origin.',
      primary: 'Request a quote',
      secondary: 'Explore services',
      scroll: 'Explore more',
      badges: [
        'Own teams in 7 markets',
        'AAAAA logistics enterprise',
        'Customs handled in-house'
      ]
    },

    stats: [
      {
        value: '450,000',
        label: 'TEU per year',
        note: 'group transportation volume, 2024'
      },
      {
        value: '110,236',
        label: 'Customers served',
        note: 'across seven industries, including Fortune 500 companies'
      },
      {
        value: '36',
        label: 'Global branches',
        note: 'China, Europe, North America, Southeast Asia and the Middle East'
      },
      {
        value: '1997',
        label: 'Group founded',
        note: 'a team of four people in Shenzhen'
      }
    ],

    trust: {
      label: 'Own offices and permanent teams at origin',
      count: 'offices in China',
      aria: 'Our locations across China'
    },

    services: {
      eyebrow: 'Services',
      title: 'Ten services — and each one has its own page',
      text: 'Open any entry to see what it actually covers: the equipment, the routes, and the points that decide whether the shipment runs or stops.'
    },

    why: {
      eyebrow: 'Why GIRAF',
      title: 'One brand, one accountable partner',
      text: 'Cross-border freight rarely fails in transit. It fails where responsibility changes hands. That is exactly where we focus.',
      items: [
        {
          title: 'Local operations, global resources',
          text: 'GIRAFSAIL is the group\u2019s brand for overseas localisation: local compliance support and agile response in each market, with the group\u2019s resources behind it.'
        },
        {
          title: 'AAAAA qualified, with the IT platform to match',
          text: 'Backed by the AAAAA logistics enterprise qualification, a global network of more than 30 subsidiaries, and the IT platform LONGSAIL developed itself.'
        },
        {
          title: 'Own teams in the markets you sell into',
          text: 'Mexico City, London, Hamburg, Ho Chi Minh City, Hanoi, Bangkok and Riyadh — not appointed agents, but our own companies.'
        },
        {
          title: 'Over 20 years of freight forwarding behind every quote',
          text: 'Our logistics team brings more than twenty years of professional experience. One phone call or one email is enough to start.'
        }
      ]
    },

    segments: {
      eyebrow: 'Industries',
      title: 'Who we work with',
      items: [
        'New energy',
        'Telecommunications equipment',
        'Automotive parts',
        'Smart home',
        'Engineering machinery',
        'Chemicals',
        'EPC'
      ]
    },

    networkTeaser: {
      eyebrow: 'Network',
      title: '36 branches. 8 legal entities. One brand.',
      text: 'Every GIRAF company contracts for its own market, so you deal with a local entity that answers locally — while the origin side is run by the group\u2019s own network.',
      cta: 'See the full network'
    },

    cta: {
      title: 'Let\u2019s talk about your next shipment',
      text: 'Send us the route, the commodity, the weight and the deadline. You will normally receive a quote and a realistic transit time within one business day.',
      primary: 'Request a quote',
      secondary: 'See contact details'
    }
  },

  services: {
    tally: {
      services: 'Services in the portfolio',
      entities: 'Legal entities',
      locations: 'Operating locations'
    },
    directory: {
      label: 'Service directory',
      note: 'Each entry opens its own page.',
      items: 'items'
    },
    hero: {
      eyebrow: 'Services',
      title: 'Freight, customs and warehousing — from one source',
      text: 'You should not have to onboard a new provider for every mode of transport. We combine the entire process and take responsibility for the handovers.',
      crumb: 'Services'
    },
    intro: {
      title: 'One order, one accountable party',
      text: 'Whether it is ocean freight out of Ningbo, air freight from Shanghai or rail via Duisburg, you place the order with us. We arrange pre-carriage, main carriage, customs clearance and delivery, and report the status back to you.'
    },
    items: [
      {
        id: 'ocean',
        title: 'Ocean freight',
        text: 'The most economical option for large volumes — with Hamburg port know-how and direct access to the container terminals.',
        points: [
          'FCL: 20′, 40′, 40′ HC, 45′, plus reefer and flat rack',
          'LCL: weekly consolidations on fixed sailings',
          'Door-to-door including origin pre-carriage and European on-carriage',
          'Monitoring of transhipments and connecting vessels'
        ]
      },
      {
        id: 'air',
        title: 'Air freight',
        text: 'For shipments where the deadline is not negotiable. Direct flights and consolidations with secured capacity.',
        points: [
          'Direct services from Frankfurt, Amsterdam, Shanghai and Hong Kong',
          'Consolidated air freight with weekly departures',
          'Pickup, packaging advice, handling and customs filing',
          'Onward delivery within Germany and the EU'
        ]
      },
      {
        id: 'rail',
        title: 'Rail freight',
        text: 'China–Europe rail corridors via Kazakhstan, Belarus and Poland to Duisburg, Hamburg or Małaszewicze.',
        points: [
          'Transit times between ocean and air freight',
          'Suited to palletised, carton and container cargo',
          'A practical alternative when ocean and air capacity tighten',
          'Full support with border formalities'
        ]
      },
      {
        id: 'inland',
        title: 'Road transport & pre/on-carriage',
        text: 'A chain is only as strong as its first and last leg. We work with vetted partners and our own dispatch processes.',
        points: [
          'Container drayage in the ports of Hamburg and Bremerhaven',
          'Groupage and part-load road transport within Germany',
          'Cross-border: Benelux, France, Poland, Czech Republic',
          'Delivery windows to the day on request'
        ]
      },
      {
        id: 'customs',
        title: 'Customs clearance',
        text: 'Customs is rarely what makes a shipment cheap — but it is often what makes it stop. We handle it ourselves.',
        points: [
          'Import and export declarations (ATLAS)',
          'Tariff classification and binding tariff information',
          'Preferential origin, certificates of origin, EUR.1 and movement certificates',
          'Export licences, dual-use screening and control procedures'
        ]
      },
      {
        id: 'warehouse',
        title: 'Warehousing & distribution',
        text: 'Handling and buffer storage in the Hamburg port area, for cargo that should not move on immediately.',
        points: [
          'Receipt, storage, repacking and labelling',
          'Bonded warehousing and duty payment on demand',
          'Order picking and order fulfilment',
          'Distribution throughout Europe'
        ]
      },
      {
        id: 'dg',
        title: 'Dangerous goods & special equipment',
        text: 'Shipments with elevated requirements for documentation and equipment — prepared properly rather than fixed afterwards.',
        points: [
          'ADR, IMDG and IATA-DGR shipments',
          'Flat rack, open top, reefer and out-of-gauge',
          'Advice on classification, packing and marking',
          'Complete accompanying documentation'
        ]
      },
      {
        id: 'ecommerce',
        title: 'E-commerce logistics',
        text: 'For online retailers who want to consolidate at origin and deliver reliably in Europe.',
        points: [
          'Consolidation and packaging in China',
          'Air and rail options for building up stock',
          'Connection to delivery networks in Germany and the EU',
          'Returns handling and stock reconciliation'
        ]
      },
      {
        id: 'finance',
        title: 'Logistics finance',
        text: 'Working-capital and supply-chain finance for importers and exporters — from prepayment to inventory funding, arranged through our network.',
        points: [
          'Prepayment and supplier financing at origin',
          'Inventory and bonded-warehouse financing',
          'Credit solutions aligned with the shipment cycle',
          'One relationship across freight and funding'
        ]
      }
    ],
    process: {
      eyebrow: 'How it works',
      title: 'From enquiry to delivery',
      steps: [
        { n: '01', title: 'Enquiry', text: 'You send us the route, cargo description, weight, volume and deadline.' },
        { n: '02', title: 'Quote', text: 'We check routing and capacity and quote a rate with a realistic transit time.' },
        { n: '03', title: 'Execution', text: 'Booking, origin pickup, customs and loading — with status updates as they happen.' },
        { n: '04', title: 'Delivery', text: 'Handover at destination, customs release and the closing documentation.' }
      ]
    }
  },

  solutions: {
    readMore: 'Read the full brief',
    bridge: 'Four cargo types. One team that has shipped all of them.',
    hero: {
      eyebrow: 'Solutions',
      title: 'Supply chains that do not need constant attention',
      text: 'Four situations we handle routinely for industrial and trading companies worldwide.',
      crumb: 'Solutions'
    },
    items: [
      {
        title: 'Door-to-door China–Europe',
        text: 'Cargo is collected at origin and delivered at destination. You receive one reference number and one contact person.',
        points: [
          'Collection from supplier or factory',
          'Export clearance and consolidation',
          'Monitoring of the main carriage',
          'Import clearance and final delivery'
        ]
      },
      {
        title: 'Procurement and supplier logistics',
        text: 'For purchasing teams working with several Asian suppliers who want to consolidate their inbound flows.',
        points: [
          'Collection from multiple suppliers and consolidation',
          'Quantity checks and visual inspection on request',
          'FOB, EXW and DAP terms',
          'Consistent documentation for your purchasing team'
        ]
      },
      {
        title: 'Project and heavy-lift cargo',
        text: 'Special transports where planning and permits decide the outcome.',
        points: [
          'Route surveys and feasibility studies',
          'Abnormal-load permits and escort vehicles',
          'Crane and handling planning',
          'Scheduling aligned with your project team'
        ]
      },
      {
        title: 'E-commerce fulfilment',
        text: 'Build up stock in Europe without building your own infrastructure.',
        points: [
          'Consolidation at origin',
          'Inbound storage and inventory records',
          'Picking and dispatch',
          'Returns processing'
        ]
      }
    ],
    approach: {
      eyebrow: 'Our approach',
      title: 'We start with three questions',
      items: [
        { q: 'When does the cargo have to be there?', a: 'The deadline determines the mode of transport — not the other way round.' },
        { q: 'What do the customs papers say?', a: 'We check the cargo description before it becomes a problem.' },
        { q: 'Who decides when things change?', a: 'We agree upfront who is informed and who decides in which scenario.' }
      ]
    }
  },

  about: {
    anchor: {
      founded: 'Group founded',
      branches: 'branches'
    },
    timeline: {
      eyebrow: 'Milestones',
      title: 'From a team of four in 1997',
      text: 'What follows is the group chronology as it is published — where the network came from, and why the offices you deal with already existed before you needed them.'
    },
    credentials: {
      eyebrow: 'Credentials',
      title: 'Qualification, membership and ranking',
      qualifications: 'Enterprise qualification',
      rankings: 'Rankings',
      memberships: 'Memberships'
    },
    hero: {
      eyebrow: 'Company',
      title: 'The overseas brand of LONGSAIL',
      text: 'GIRAF is the international brand of LONGSAIL International Logistics. Our European operations are run from Hamburg by Girafsail Logistics GmbH — with our own management, our own contracts and German invoicing.',
      crumb: 'Company'
    },
    profile: {
      eyebrow: 'Profile',
      title: 'Who we are',
      paragraphs: [
        'LONGSAIL International Logistics was founded in 1999 and has grown into a network of more than 30 own offices, with its centre of gravity in China and additional offices in North America, Europe, Southeast Asia and the Middle East. GIRAF is the group’s brand for the international market.',
        'Hamburg is our European interface to that network. From here we look after importers, manufacturers and online retailers moving cargo between Asia and Europe: we arrange ocean, air and rail freight, handle customs clearance and stay with the shipment until it is delivered.',
        'We see ourselves as a freight forwarder in the traditional sense: we plan, document, carry liability and communicate — rather than simply passing orders on. What is promised in Hamburg is answered for in Hamburg.'
      ]
    },
    facts: {
      title: 'At a glance',
      rows: [
        { k: 'Brand', v: 'GIRAF — overseas brand of LONGSAIL International Logistics' },
        { k: 'Registered office', v: 'Hamburger Straße 11, 22083 Hamburg, Germany' },
        { k: 'Managing Director', v: 'HUANG YU' },
        { k: 'Commercial register', v: 'Amtsgericht Hamburg (Local Court), HRB 186908' },
        { k: 'VAT ID', v: 'DE323296008' },
        { k: 'Group active since', v: '1999' }
      ]
    },
    values: {
      eyebrow: 'How we work',
      title: 'Four principles',
      items: [
        {
          title: 'We stand by what we quote',
          text: 'We give transit times we can hold. If a routing does not run reliably, we say so before you book — not afterwards.'
        },
        {
          title: 'Bad news travels first',
          text: 'Delays and rolled cargo happen. What matters is that you hear about it while there are still alternatives.'
        },
        {
          title: 'Paperwork is not an afterthought',
          text: 'A single wrong commodity code costs more than the freight. We check the documents before the cargo starts moving.'
        },
        {
          title: 'You get the same people',
          text: 'You reach the same colleagues again — not a different number in a call centre every day.'
        }
      ]
    },
    sustainability: {
      eyebrow: 'Low-carbon logistics',
      title: 'Transit time against emissions',
      text: 'Per tonne-kilometre, the rail corridor to China emits substantially less CO₂ than air freight. Where deadlines allow, we therefore propose the rail option — and, on request, document the comparison in the quote.',
      points: [
        'Emission comparison of sea, rail and air in the quote',
        'Consolidation of shipments for better load factors',
        'Fewer empty runs through plannable dispatch'
      ]
    },
    careers: {
      eyebrow: 'Careers',
      title: 'Interested in joining the GIRAF team?',
      text: 'We are a compact team with short lines of communication. If you see freight forwarding as a craft rather than a routing function, you will fit in here.',
      cta: 'Send us your CV',
      subject: 'Application — GIRAF team',
      note: 'Please send your documents to our contact address. We respond within two weeks.'
    }
  },

  network: {
    legend: {
      branches: 'Operating locations',
      entities: 'Legal entities',
      markets: 'Regions'
    },
    regions: {
      eyebrow: 'Regional coverage',
      title: 'Where we operate',
      text: 'Thirty locations across five regions. The offices below are operational addresses — the contracting entity for your market is listed further down.'
    },
    region: {
      cn: 'China',
      eu: 'Europe',
      am: 'Americas',
      as: 'Asia',
      me: 'Middle East',
      intl: 'International'
    },
    /** 区域名册中城市前圆点的含义 */
    own: 'Own company',
    directory: {
      eyebrow: 'Directory',
      title: 'Addresses and telephone numbers',
      text: 'Every location with its full postal address and, where published, a dialable number.',
      colCity: 'Location',
      colAddress: 'Address',
      colPhone: 'Telephone',
      onRequest: 'On request'
    },
    hero: {
      eyebrow: 'Network',
      title: 'Our own companies. Our own teams. Thirty locations.',
      text: 'Seven own companies across Europe, the Americas, Asia and the Middle East — each contracting locally, backed by the LONGSAIL network at origin in China.',
      crumb: 'Network'
    },
    note: {
      title: 'Who you contract with',
      text: 'Every GIRAF company contracts for its own market. For Germany and the EU, all quotes, invoices and contracts are issued by Girafsail Logistics GmbH in Hamburg; customers elsewhere are served by the GIRAF company in their region.'
    },
    coverage: {
      eyebrow: 'Coverage',
      title: 'What that means for you',
      items: [
        { k: 'Origin pickup', v: 'Collection from your supplier anywhere in China, coordinated by our own team on the ground' },
        { k: 'Export clearance', v: 'Chinese export documentation and customs handling through the group' },
        { k: 'European clearance', v: 'Import and duty handling carried out in-house by our Hamburg team' }
      ]
    }
  },

  /** 全球法定主体（分公司 / 子公司）——名称与地址为登记原文，不翻译 */
  offices: {
    eyebrow: 'Legal entities',
    title: 'Our own companies worldwide',
    text: 'GIRAF operates through its own registered companies in seven countries. Each one contracts locally, under the same service standard.',
    registered: 'Registered office',
    phoneOnRequest: 'Telephone on request',
    region: {
      europe: 'Europe',
      americas: 'Americas',
      asia: 'Asia',
      middleeast: 'Middle East'
    }
  },

  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Talk to the GIRAF company in your market',
      text: 'GIRAF operates through its own registered companies in seven countries. Each one quotes, contracts and invoices locally, under the same service standard. Pick your region below — or send us your shipment details and we will route your enquiry to the right team.',
      crumb: 'Contact'
    },
    /** 法定披露项：mgmt / web 由 Imprint 页复用，保持单一来源避免两处不一致 */
    details: {
      mgmt: 'Managing Director',
      web: 'Web'
    },
    /** 全球公司目录（联系页主体内容）：名称与地址为登记原文，字段标签随语言 */
    directory: {
      eyebrow: 'Global directory',
      title: 'Every GIRAF company, with address and telephone',
      text: 'Our own registered offices worldwide — seven countries, one service standard. The company listed for your market is the one that issues your quotes, contracts and invoices.',
      colAddress: 'Registered office',
      colPhone: 'Telephone',
      colEmail: 'Email',
      noPhone: 'Telephone on request',
      jump: 'Skip to'
    },
    routing: 'Send your enquiry here and we will route it to the GIRAF company responsible for your market.',
    form: {
      title: 'Request a quote',
      text: 'Describe your shipment briefly. The more precise the details, the more reliable the quote.',
      firstName: 'First name',
      lastName: 'Last name',
      company: 'Company',
      email: 'Business email address',
      phone: 'Phone (optional)',
      subject: 'Subject',
      subjectOptions: [
        'Quote request — ocean freight',
        'Quote request — air freight',
        'Quote request — rail freight',
        'Customs clearance enquiry',
        'Warehousing and distribution enquiry',
        'Logistics finance enquiry',
        'Question about a shipment in transit',
        'Other enquiry'
      ],
      route: 'Route (e.g. Ningbo → Hamburg)',
      cargo: 'Cargo description',
      weight: 'Weight / volume',
      timeline: 'Target timeframe',
      message: 'Message',
      messagePlaceholder: 'Describe your shipment: type of goods, packaging, number of packages, target timeframe.',
      consent:
        'I agree that my details may be stored and processed in order to handle my enquiry. Further information is available in the privacy policy.',
      submit: 'Send enquiry',
      sending: 'Preparing …',
      errors: {
        firstName: 'Please enter your first name.',
        lastName: 'Please enter your last name.',
        email: 'Please enter a valid email address.',
        message: 'Please describe your enquiry briefly.',
        consent: 'We cannot process the enquiry without your consent.'
      },
      successTitle: 'Your enquiry is ready to send.',
      success:
        'We have opened your email client with the details filled in. Press send and it reaches our team. If nothing opened, copy the details below or write to',
      copy: 'Copy details',
      copied: 'Copied to clipboard'
    },
    direct: {
      title: 'Prefer to talk directly?',
      text: 'You can reach us by phone during business hours, or by email at any time.'
    },
    claims: {
      title: 'Claims and transport damage',
      text: 'Please have your shipment reference and, if possible, photographs ready. Report damage immediately on receipt so that we can meet the deadlines towards carriers and insurers.',
      cta: 'Report damage'
    },
    mapNote: 'Hamburger Straße 11 is in the Barmbek-Süd district, a few minutes from the Hamburger Straße underground station.'
  },

  /**
   * 详情页界面标签。页面正文（服务与货种内容）来自 src/data/services.js 与
   * solutions.js（英语为主要语言的编辑内容），这里只承载界面文字。
   */
  serviceDetail: {
    spec: 'Specification',
    overview: 'Overview',
    features: 'What this covers',
    advantages: 'Why it works',
    allServices: 'All services',
    more: 'Other services in the portfolio'
  },

  solutionDetail: {
    cargoType: 'Cargo type',
    contactNote:
      'Send the commodity, the route and the deadline, and we will tell you which routing is realistic.',
    others: 'Other cargo types'
  },

  imprint: {
    hero: {
      eyebrow: 'Legal',
      title: 'Imprint',
      text: 'Information pursuant to § 5 of the German Digital Services Act (DDG) and § 18 of the Interstate Media Treaty (MStV).',
      crumb: 'Imprint'
    },
    sections: {
      provider: 'Service provider',
      represented: 'Represented by',
      contact: 'Contact',
      register: 'Commercial register',
      vat: 'VAT identification number',
      tax: 'Tax number',
      responsible: 'Responsible for content pursuant to § 18 (2) MStV',
      dispute: 'Consumer dispute resolution',
      liability: 'Liability for content',
      links: 'Liability for links',
      copyright: 'Copyright'
    },
    disputeText:
      'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
    liabilityText:
      'As a service provider we are responsible for our own content on these pages under general law, pursuant to § 7 (1) DDG. Under §§ 8 to 10 DDG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the point in time at which a concrete infringement becomes known.',
    linksText:
      'Our website contains links to external third-party websites whose content we cannot influence. We therefore accept no warranty for this external content. The provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking; unlawful content was not apparent at that time.',
    copyrightText:
      'The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any form of exploitation outside the limits of copyright law require the written consent of the respective author or creator.'
  },

  privacy: {
    hero: {
      eyebrow: 'Legal',
      title: 'Privacy policy',
      text: 'Information on the processing of personal data pursuant to Art. 13 and 14 GDPR.',
      crumb: 'Privacy'
    },
    intro:
      'The protection of your personal data matters to us. This policy explains what data is processed when you visit this website and for what purpose.',
    sections: [
      {
        h: '1. Controller',
        p: 'The controller for data processing on this website is Girafsail Logistics GmbH, Hamburger Straße 11, 22083 Hamburg, Germany. You can reach us on +49 40 60429719-0 or by email at info.de@girafsail-logistics.com.'
      },
      {
        h: '2. Server log files',
        p: 'When you access this website, our hosting provider automatically records information transmitted by your browser. This includes the IP address, date and time of the request, the page accessed, the volume of data transferred, the referrer, and your browser type and operating system. This processing serves to ensure trouble-free operation and system security on the basis of Art. 6 (1) (f) GDPR. Log data is deleted after a short period.'
      },
      {
        h: '3. Contacting us',
        p: 'If you contact us by email, telephone or via the enquiry form, we process the details you provide (name, company, email address, telephone number, content of the enquiry) in order to handle your request. The legal basis is Art. 6 (1) (b) GDPR for contractual enquiries and otherwise Art. 6 (1) (f) GDPR. The enquiry form on this website does not transmit data to our server; it opens your local email client with the details pre-filled.'
      },
      {
        h: '4. Cookies and tracking',
        p: 'This website does not use cookies for analytics or marketing purposes and does not use any tracking services. No profiling takes place. The only information stored locally in your browser (localStorage) is your selected language, so that it is retained on your next visit. This information never leaves your device.'
      },
      {
        h: '5. External content',
        p: 'We deliberately avoid embedding external fonts, maps or analytics services. No data is therefore transmitted to third parties when the page loads.'
      },
      {
        h: '6. Recipients and transfers to third countries',
        p: 'Your data is not sold. It is passed on only where necessary to execute a transport order (for example to carriers, shipping lines or customs agents) or where a statutory obligation exists. For transfers to third countries we rely on the European Commission’s standard contractual clauses or on statutory derogations under Art. 49 GDPR.'
      },
      {
        h: '7. Retention period',
        p: 'We store personal data only for as long as is necessary for the relevant purpose or as required by statutory retention periods. Commercial and tax records are retained in accordance with §§ 238, 257 HGB and § 147 AO.'
      },
      {
        h: '8. Your rights',
        p: 'You have the right to information (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection to processing (Art. 21 GDPR). You may withdraw any consent you have given at any time with effect for the future.'
      },
      {
        h: '9. Right to complain',
        p: 'You have the right to lodge a complaint with a supervisory authority. The authority responsible for us is the Hamburg Commissioner for Data Protection and Freedom of Information, Ludwig-Erhard-Straße 22, 20459 Hamburg.'
      }
    ]
  },

  footer: {
    about:
      'GIRAF is the overseas brand of LONGSAIL International Logistics — ocean, air and rail freight, customs clearance and warehousing, delivered by our own companies in seven countries and backed by 30+ locations worldwide.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    newsletterTitle: 'Request a quote',
    newsletterText: 'Send us the route, weight and timeframe — we will come back with a rate and a transit time.',
    legalNote:
      'Each GIRAF company contracts for its own market. For the European Union, quotes, invoices and contracts are issued by Girafsail Logistics GmbH under German law.',
    rights: 'All rights reserved.'
  }
}
