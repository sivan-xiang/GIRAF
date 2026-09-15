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
    hq: 'European hub',
    since: 'since'
  },

  meta: {
    home: {
      title: 'GIRAF | Simplify the cross-border trade',
      desc: 'GIRAF is the overseas brand of LONGSAIL International Logistics — ocean, air and rail freight, customs clearance and warehousing from our Hamburg hub, backed by 30+ offices across China, Europe and beyond.'
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
      desc: 'A Hamburg European hub, 20+ own locations across China, and partner offices in Europe, North America, Southeast Asia and the Middle East.'
    },
    contact: {
      title: 'Contact | GIRAF — Hamburg',
      desc: 'Talk to our team in Hamburg: +49 40 60429719-0, info.de@girafsail-logistics.com. We normally reply within one business day.'
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
      text: 'The overseas brand of LONGSAIL International Logistics. From our European hub in Hamburg we run ocean, air and rail freight, customs clearance and warehousing for importers and exporters worldwide.',
      primary: 'Request a quote',
      secondary: 'Explore services',
      scroll: 'Explore more',
      badges: ['Own offices across China', 'A European team in Hamburg', 'Customs handled in-house']
    },

    stats: [
      { value: '1999', label: 'Group founded', note: 'more than two decades in freight forwarding' },
      { value: '30+', label: 'Offices worldwide', note: 'across China, Europe, North America and Southeast Asia' },
      { value: '20+', label: 'Cities in China', note: 'own branches and appointed agents at origin' },
      { value: '1', label: 'European hub', note: 'Hamburg, for contracting and liability' }
    ],

    trust: {
      label: 'Own offices and permanent teams at origin',
      aria: 'Our locations across China'
    },

    services: {
      eyebrow: 'Services',
      title: 'Every leg of the journey, under one contract',
      text: 'Book a single mode, or hand us the whole chain from factory gate to final delivery. Either way you keep one reference number and one team.',
      items: [
        {
          title: 'Ocean freight',
          text: 'FCL and LCL with weekly sailings to Asia, the Americas and the Middle East, drawing on LONGSAIL’s own origin network in China.'
        },
        {
          title: 'Air freight',
          text: 'Consolidated and direct flights for time-critical shipments, with pickup, handling and onward delivery managed in one hand.'
        },
        {
          title: 'Rail freight',
          text: 'China–Europe rail services — the middle ground between ocean transit times and air freight rates, with full border support.'
        },
        {
          title: 'Road transport',
          text: 'Pre-carriage, drayage and cross-border road transport into Benelux, France and Central and Eastern Europe.'
        },
        {
          title: 'Customs clearance',
          text: 'Import and export declarations, tariff classification, preferential origin and export control — handled by our own Hamburg team.'
        },
        {
          title: 'Warehousing',
          text: 'Handling, buffer storage, bonded warehousing and distribution from the Hamburg port area.'
        },
        {
          title: 'Dangerous goods',
          text: 'ADR, IMDG and IATA-DGR shipments, flat rack, open top, reefer and out-of-gauge — with complete documentation.'
        },
        {
          title: 'E-commerce logistics',
          text: 'Cross-border fulfilment, consolidation at origin and delivery through to the last mile in Europe.'
        }
      ]
    },

    why: {
      eyebrow: 'Why GIRAF',
      title: 'One brand, one accountable partner',
      text: 'Cross-border freight rarely fails in transit. It fails where responsibility changes hands. That is exactly where we focus.',
      items: [
        {
          title: 'One global brand, one contract',
          text: 'GIRAF connects you to LONGSAIL’s own network in China. You negotiate with one party; we coordinate the origin side internally.'
        },
        {
          title: 'A European hub with local liability',
          text: 'Your contact sits in Hamburg and contracts under German law. That simplifies invoicing, liability and claims considerably.'
        },
        {
          title: 'Customs expertise in-house',
          text: 'Tariff codes, preferential origin and export control are handled by our own staff — no outsourcing, no loss of information between parties.'
        },
        {
          title: 'Visibility across the whole journey',
          text: 'Status updates on departure, transhipment, customs release and delivery. You hear about problems while they are still solvable.'
        }
      ]
    },

    segments: {
      eyebrow: 'Industries',
      title: 'Who we work with',
      items: [
        'Machinery and plant engineering',
        'Automotive suppliers',
        'Electronics and consumer goods',
        'Chemicals and plastics',
        'Retail and e-commerce brands',
        'Project and heavy-lift cargo'
      ]
    },

    networkTeaser: {
      eyebrow: 'Network',
      title: 'A Hamburg hub. A China network. Worldwide partners.',
      text: 'GIRAF is your European contracting party. At origin we draw on the LONGSAIL Group’s own infrastructure, which shortens response times and removes friction between parties.',
      cta: 'See the full network'
    },

    cta: {
      title: 'Let’s talk about your next shipment',
      text: 'Send us the route, weight, volume and target window. You will normally receive a quote and a realistic transit time within one business day.',
      primary: 'Request a quote',
      secondary: 'See contact details'
    }
  },

  services: {
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
      title: 'Interested in a role in the Hamburg team?',
      text: 'We are a small office with short lines of communication. If you see freight forwarding as a craft rather than a routing function, you will fit in here.',
      cta: 'Send us your CV',
      subject: 'Application — Hamburg team',
      note: 'Please send your documents to our contact address. We respond within two weeks.'
    }
  },

  network: {
    hero: {
      eyebrow: 'Network',
      title: 'A Hamburg hub. A China network. Worldwide partners.',
      text: 'A European contract, backed by an established network at origin. That gives you local presence without local confusion.',
      crumb: 'Network'
    },
    germany: {
      eyebrow: 'Europe',
      title: 'Our European hub'
    },
    china: {
      eyebrow: 'Origin',
      title: 'Our own presence in China',
      text: 'More than 20 cities with own branches or permanent operations teams, as part of the LONGSAIL Group. These offices book under our mandate and report to Hamburg.'
    },
    world: {
      eyebrow: 'International',
      title: 'Partner offices worldwide'
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
    viaHq: 'Enquiries via our Hamburg head office',
    region: {
      europe: 'Europe',
      americas: 'Americas',
      asia: 'Asia',
      africa: 'Africa'
    },
    contact: {
      eyebrow: 'Regional contacts',
      title: 'Find your local GIRAF company',
      text: 'Reach the company responsible for your market directly. Quotes, invoices and contracts are issued by the entity in your region.'
    }
  },

  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Talk to us in Hamburg',
      text: 'For quotes, questions about shipments in transit and new projects, reach our Hamburg team directly. We normally reply within one business day.',
      crumb: 'Contact'
    },
    details: {
      title: 'Contact and company details',
      company: 'Company',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      web: 'Web',
      hours: 'Business hours',
      mgmt: 'Managing Director',
      register: 'Commercial register',
      vat: 'VAT ID',
      tax: 'Tax number'
    },
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
        'We have opened your email client with the details filled in. Press send and it reaches our Hamburg desk. If nothing opened, copy the details below or write to',
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
      'GIRAF is the overseas brand of LONGSAIL International Logistics — ocean, air and rail freight, customs clearance and warehousing, served from our Hamburg hub and backed by 30+ offices worldwide.',
    servicesTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    newsletterTitle: 'Request a quote',
    newsletterText: 'Send us the route, weight and timeframe — we will come back with a rate and a transit time.',
    legalNote:
      'Girafsail Logistics GmbH is your European contracting party. All quotes, invoices and contracts are issued in Hamburg and governed by German law.',
    rights: 'All rights reserved.',
    vatLine: 'VAT ID'
  }
}
