/**
 * 服务内容单一来源。
 *
 * 内容蓝本：<https://giraf-logistics.com/>（各 Service*.html 内页原文），
 * 按英语为主语言整理为结构化记录。界面文案（标题、按钮、面包屑）走 i18n，
 * 业务内容（服务名、说明、优势、路线）集中在此，避免同一份文案散落在四个语言文件里。
 *
 * extra 为「内容驱动区块」：每项服务的结构差异由内容决定，不强行套同一模板。
 *   kind: 'chips'  —— 标签组（海运航线、空运机场）
 *          'table'  —— 二维表（铁路路线，按始发站分行）
 *          'grid'   —— 多列清单（仓储 10 项作业能力）
 *          'groups' —— 分组双档（危品 / 特殊箱分别成组）
 *
 * 图标名对应 AppIcon 的图标表；accent 决定该页主色（coral / sand / steel）。
 */

export const services = [
  {
    id: 'ocean',
    slug: 'ocean',
    icon: 'ship',
    accent: 'coral',
    brand: 'Ocean+',
    name: 'Ocean Freight',
    tagline: 'FCL, LCL and door-to-door ocean freight — with NVOCC status of our own.',
    intro: [
      'We have a long-term and stable relationship with many carriers. That gives us timely and accurate vessel information, and high-quality transportation at the lowest achievable cost.',
      'On top of the main carriage we run the whole container cycle: booking, order exchange, clearance of goods, customs transit, inspection declaration, unpacking and packing, land transportation, warehousing, bonded storage, bulk cargo agency transportation, and coastal and riverside transportation.'
    ],
    facts: [
      { k: 'Main carriage', v: 'Deep sea and short sea' },
      { k: 'Equipment', v: '20\u2032 / 40\u2032 / 40\u2032 HC / 45\u2032, reefer, flat rack' },
      { k: 'Status', v: 'NVOCC \u2014 first batch approved' },
      { k: 'Origin coverage', v: 'Every main port in China' }
    ],
    features: [
      { title: 'FCL shipment' },
      { title: 'LCL shipment' },
      { title: 'Door-to-door service' },
      { title: 'Dangerous goods and special cargo' },
      { title: 'Trucking service and warehouse' }
    ],
    advantages: [
      {
        title: 'NVOCC service',
        text: 'Issuing bills of lading and waybills, arranging integrated transportation, making the shipping plan and putting it into practice according to the shipper order — booking space, customs clearance, inspection, tally, storage and distribution. When the shipment arrives at the port of discharge we release the delivery order to the consignee and arrange clearance, distribution and delivery.'
      },
      {
        title: 'Container trucking service',
        text: 'FCL, LCL, special container and SOC container quotations, with the drayage arranged as part of the same order rather than handed to a third party.'
      },
      {
        title: 'Global international transport',
        text: 'Efficient service networks across the world, providing customers with low-cost, comprehensive one-stop integrated international logistics services.'
      },
      {
        title: 'Professional sales team',
        text: 'Fast shipping quotations, timely logistics and transportation information, and transport solutions that are actually workable.'
      },
      {
        title: 'Full transport tracking',
        text: 'Timely and fast tracking across the whole cargo delivery, to safeguard the safety and the timeliness of the entire logistics process.'
      },
      {
        title: 'Customised logistics solution',
        text: 'According to the individual needs of the customer: integrated freight solutions consisting of FCL, LCL and bulk cargo agency business.'
      }
    ],
    extra: {
      kind: 'chips',
      label: 'Main routes with wide coverage',
      items: [
        'Middle East',
        'Red Sea',
        'India and Pakistan',
        'Europe',
        'Mediterranean',
        'Africa',
        'East South America',
        'West South America',
        'North America',
        'Australia',
        'Southeast Asia'
      ]
    }
  },

  {
    id: 'air',
    slug: 'air',
    icon: 'plane',
    accent: 'sand',
    brand: 'Air+',
    name: 'Air Freight',
    tagline: 'First-generation air transport qualification, with block space on leading carriers.',
    intro: [
      'We provide safe, fast and efficient logistics services to customers at home and abroad with a professional attitude. With the first-generation air transport qualification issued by the General Administration of Civil Aviation, and after more than ten years of development, we have built a strong team across the key domestic airports.',
      'The routes cover major international airports around the world. We hold block space agreements and cooperative contracts with leading global airlines, including China Southern Airlines (CZ) and Cargolux (CV).'
    ],
    facts: [
      { k: 'Main carriage', v: 'Air freight and air express' },
      { k: 'Qualification', v: 'First-generation air transport licence' },
      { k: 'Block space', v: 'China Southern Airlines (CZ), Cargolux (CV)' },
      { k: 'Clients served', v: 'Nearly 10,000 corporate clients' },
      { k: 'Coverage', v: 'Major international airports worldwide' }
    ],
    features: [
      { title: 'Booking and pickup' },
      { title: 'Inspection' },
      { title: 'Billing' },
      { title: 'Customs declaration' },
      { title: 'Supervised warehouse transfer' },
      { title: 'FOB Hong Kong delivery' },
      { title: 'Purchasing insurance' },
      { title: 'Cargo tracking' }
    ],
    advantages: [
      {
        title: 'Fast and efficient logistics services',
        text: 'Built on the first-generation air transport qualification of the General Administration of Civil Aviation. Over more than a decade we have assembled a team with deep business on the key domestic airports, drawing on the strengths of Shenzhen, Guangzhou, Hong Kong, Shanghai, Ningbo, Wuhan, Beijing and Xiamen.'
      },
      {
        title: 'Position protection',
        text: 'Signed block space agreements and cooperative contracts with many leading global airlines, including China Southern Airlines (CZ) and Cargolux (CV) — securing preferential freight rates and guaranteed cargo space, and serving nearly 10,000 domestic and international corporate clients.'
      }
    ],
    extra: {
      kind: 'chips',
      label: 'Departure gateways integrated into our network',
      items: [
        'Shenzhen',
        'Guangzhou',
        'Hong Kong',
        'Shanghai',
        'Ningbo',
        'Wuhan',
        'Beijing',
        'Xiamen'
      ]
    }
  },

  {
    id: 'rail',
    slug: 'rail',
    icon: 'train',
    accent: 'steel',
    brand: 'Railway+',
    name: 'Rail Freight',
    tagline: 'China\u2013Europe and China\u2013Russia block trains, plus all five Central Asian countries.',
    intro: [
      'The Railway Transport Department of Longsail Supply Chain Co., Ltd. was established in 2016. We actively align with China\u2019s Belt and Road Initiative and specialise in China\u2013Europe block trains, China\u2013Russia block trains, and rail freight services to all five Central Asian countries.'
    ],
    facts: [
      { k: 'Main carriage', v: 'Block train, LCL and FCL' },
      { k: 'Corridors', v: 'China\u2013Europe, China\u2013Russia, Central Asia' },
      { k: 'Origin terminals', v: '10 departure terminals in China' },
      { k: 'EU terminals', v: 'Warsaw, Hamburg, Duisburg' },
      { k: 'Established', v: '2016' }
    ],
    features: [
      {
        title: 'Rail LCL EX China',
        text: 'Departure terminals Chengdu, Xi\u2019an, Wuhan, Zhengzhou and Hefei, with pickup services from every corner of China.'
      },
      {
        title: 'Rail LCL IMP China',
        text: 'Departure terminals Warsaw (PL), Hamburg (DE) and Duisburg (DE), with pickup services within the EU.'
      },
      {
        title: 'Rail FCL EX / IMP China',
        text: 'Full-container block train services on the routes listed below, in both directions.'
      }
    ],
    advantages: [
      {
        title: 'Transit times between ocean and air',
        text: 'Rail sits in the gap the other two modes leave open — materially faster than sea on the same corridor, materially cheaper than air.'
      },
      {
        title: 'Aligned with the Belt and Road Initiative',
        text: 'The department was built around the China\u2013Europe and China\u2013Russia corridors, and around services to all five Central Asian countries.'
      },
      {
        title: 'One team across the border',
        text: 'Gauge change at the border, customs transit and the final EU leg are handled by the same team that booked the shipment.'
      }
    ],
    extra: {
      kind: 'table',
      label: 'Basic rail routes \u2014 FCL export and import',
      head: ['Departure in China', 'Destinations'],
      rows: [
        ['Chengdu', 'Mala, \u0141\u00f3d\u017a, Tilburg, Moscow, Minsk'],
        ['Chongqing', 'Mala, Hamburg, Duisburg, Moscow, Minsk'],
        ['Xi\u2019an', 'Mala, Hamburg, Duisburg, Prague, Budapest, Almaty, Tashkent'],
        ['Zhengzhou', 'Mala, Hamburg, Helsinki, Moscow, Minsk, Almaty, Tashkent'],
        ['Hefei', 'Mala, Hamburg, Duisburg, Helsinki'],
        ['Ganzhou', 'Budapest, Almaty, Tashkent'],
        ['Guangzhou', 'Moscow, Minsk'],
        ['Shenzhen', 'Mala, Hamburg, Duisburg'],
        ['Dongguan', 'Almaty, Tashkent'],
        ['Lianyungang', 'Almaty, Tashkent']
      ]
    }
  },

  {
    id: 'inland',
    slug: 'inland',
    icon: 'truck',
    accent: 'coral',
    brand: 'Inland Delivery',
    name: 'Inland Delivery',
    tagline: 'The first and the last mile, run on our own dispatch rather than subcontracted out.',
    intro: [
      'We provide professional container transport services for import and export cargo. The service relies on our network at the various transportation docks, on years of management experience and on service quality that has won the appreciation of every customer.',
      'Container transport and truck transport are quoted and dispatched as one movement, so the handover between vessel and truck does not become a gap nobody owns.'
    ],
    facts: [
      { k: 'Mode', v: 'Road, container drayage and truck load' },
      { k: 'Equipment', v: 'FCL, LCL, special and SOC containers' },
      { k: 'Visibility', v: 'Position tracking along the route' },
      { k: 'Process', v: 'Standardised operating procedures' }
    ],
    features: [
      { title: 'Container transport services' },
      { title: 'Truck transport' }
    ],
    advantages: [
      {
        title: 'Service advantage',
        text: 'An experienced operations team working to standardised operating procedures, so that the same movement is executed the same way every time.'
      },
      {
        title: 'Tracking advantage',
        text: 'We can track where the cargo is located along the way and confirm the state it is in — not only that it was dispatched.'
      }
    ]
  },

  {
    id: 'ecommerce',
    slug: 'ecommerce',
    icon: 'cart',
    accent: 'steel',
    brand: 'Cross-Border E-commerce',
    name: 'Cross-Border E-commerce Logistics',
    tagline: 'FBA, overseas warehousing and last-mile delivery for cross-border brands.',
    intro: [
      'Amid constant changes of policy on mainstream platforms such as Amazon, rapid growth of cross-border brands across regions, and continuous upgrading of e-commerce operating strategies, Girafsail keeps enhancing its cross-border logistics solutions to meet growing client demand.',
      'According to the supply chain management and operating strategy of the customer, we build tailor-made programmes covering sea and air transport for FBA, destination port customs clearance and delivery, international express, postal, overseas cross-border warehousing, and a series of value-added services across Europe, the Americas and Southeast Asia.'
    ],
    facts: [
      { k: 'Platforms', v: 'Amazon FBA and equivalent programmes' },
      { k: 'Regions', v: 'Europe, the Americas, Southeast Asia' },
      { k: 'IT integration', v: 'API docking with customer systems' },
      { k: 'Last mile', v: 'Handled as part of the same order' }
    ],
    features: [
      { title: 'Cross-border shipping' },
      { title: 'Cross-border air transport' },
      { title: 'Parcel' },
      { title: 'Overseas warehousing' },
      { title: 'Customs clearance and last-mile delivery' }
    ],
    advantages: [
      {
        title: 'Cross-border logistics project designed',
        text: 'Tailor-made cross-border logistics projects designed on our supply chain platform, reducing cost and increasing benefit.'
      },
      {
        title: 'Traditional service and IT system',
        text: 'International transportation by marine, land, air and express. Customised IT system docking by API makes seamless integration with the customer\u2019s own systems easily achievable.'
      },
      {
        title: 'Product compliance consultation',
        text: 'Product compliance consultation, import access standards counselling and labelling service.'
      },
      {
        title: 'Agency, export declaration and inspection',
        text: 'A global agency network and our own overseas branches, also covering every main port in China. A team with several years of experience, for faster clearance.'
      },
      {
        title: 'Professional warehousing and delivery',
        text: 'Professional standardised warehousing, FBA and overseas warehouse transfer, drop parcel and delivery service.'
      },
      {
        title: 'Value-added services',
        text: 'Barcode, batch and tracking management, labelling service, standard tallying, picking, sorting and packing.'
      }
    ]
  },

  {
    id: 'dg',
    slug: 'dg',
    icon: 'danger',
    accent: 'sand',
    brand: 'DG Cargo & Special Container',
    name: 'DG Cargo & Special Container Transportation',
    tagline: 'Two different problems, both of which are decided before the cargo moves: documents, and equipment.',
    intro: [
      'Dangerous goods are not a handling problem, they are a documentation and approval problem. Special cargo is not a documentation problem, it is an equipment and stowage problem. We treat them as two separate services.'
    ],
    facts: [
      { k: 'Regimes', v: 'ADR, IMDG and IATA-DGR' },
      { k: 'Equipment', v: 'Flat rack, open top, Ro-Ro, bulk, heavy lift' },
      { k: 'Booking lead time', v: 'Advise early \u2014 DG class needs terminal and carrier approval' },
      { k: 'Process', v: 'Every node monitored against a standard operating process' }
    ],
    extra: {
      kind: 'groups',
      groups: [
        {
          title: 'Dangerous goods transport',
          text: 'Shipments that need declaration, approval and a documented chain of custody before they can be offered to a carrier.',
          features: [
            { title: 'Dangerous goods transport' },
            { title: 'Maritime declaration' },
            { title: 'Port and shipping declaration' },
            { title: 'Inspection and customs declaration agency service' }
          ],
          advantages: [
            {
              title: 'Service advantage',
              text: 'An experienced operations team working to standardised operating procedures.'
            },
            {
              title: 'Tracking advantage',
              text: 'We track where the cargo is along the way and confirm the state it is in.'
            },
            {
              title: 'Resources advantage',
              text: 'Enough trucks available even in peak season \u2014 which is exactly when special equipment is scarcest.'
            }
          ]
        },
        {
          title: 'Carriage of special cargo',
          text: 'Shipments where the constraint is the shape, the weight or the stowage rather than the paperwork.',
          features: [
            { title: 'Special container and containerised break bulk' },
            { title: 'Break bulk' },
            { title: 'Ro-Ro' },
            { title: 'Bulk' },
            { title: 'Heavy lift shipping' }
          ],
          advantages: [
            {
              title: 'Horizontal integration',
              text: 'One shipment, multiple solutions \u2014 the modes are combined to fit the cargo rather than the cargo bent to fit one mode.'
            },
            {
              title: 'Vertical integration',
              text: 'Door to door across an extra-long supply chain, with one party accountable for the whole of it.'
            },
            {
              title: 'Standard operational process',
              text: 'Every node monitored, so that risks are avoided rather than corrected afterwards.'
            }
          ]
        }
      ]
    }
  },

  {
    id: 'destination',
    slug: 'destination',
    icon: 'globe',
    accent: 'coral',
    brand: 'Port of Destination',
    name: 'Port of Destination Services',
    tagline: 'What happens after the vessel arrives is usually where a shipment quietly goes wrong.',
    intro: [
      'Girafsail is committed to international logistics services, providing customers with high-quality and efficient offshore services.',
      'Overseas self-supporting companies, partner agents across four continents and more than 110 countries, and nearly 700 overseas suppliers in the network \u2014 so the destination leg is executed by people who are actually in that market.'
    ],
    facts: [
      { k: 'Terms', v: 'DAP, DDU, DDP' },
      { k: 'Overseas partners', v: 'Nearly 700 suppliers' },
      { k: 'Coverage', v: 'Four continents, more than 110 countries' },
      { k: 'Own companies abroad', v: 'Six by 2021, and growing' }
    ],
    features: [
      { title: 'DAP / DDU / DDP' },
      { title: 'Third-country shipment' },
      { title: 'Freight overseas collection' },
      { title: 'Cross-border transshipment' },
      { title: 'Inland country transportation' }
    ],
    advantages: [
      {
        title: 'Global service outlets',
        text: 'The number of overseas self-supporting companies reached six in 2021. Overseas partners are spread across four continents and more than 110 countries, with nearly 700 overseas suppliers worldwide.'
      },
      {
        title: 'Professional team',
        text: 'Cost saving at the same time as control of international transportation risk and operation quality \u2014 the two are not treated as a trade-off.'
      }
    ]
  },

  {
    id: 'customs',
    slug: 'customs',
    icon: 'doc',
    accent: 'sand',
    brand: 'Customs & Inspection',
    name: 'Customs Clearance & Cargo Inspection',
    tagline: 'Declarations, inspection and transit, handled by a team with twenty years behind it.',
    intro: [
      'Girafsail provides customers with global import and export customs clearance services, including import and export customs declaration, inspection, and customs consulting for sea, land, air and railroad transportation, and for cross-border e-commerce.',
      'Combining the freight forwarding service with import and export declaration means the classification question is answered by the same people who are booking the cargo.'
    ],
    facts: [
      { k: 'Experience', v: 'Customs team with over 20 years' },
      { k: 'Modes covered', v: 'Sea, land, air, rail, cross-border e-commerce' },
      { k: 'Scope', v: 'Global import and export clearance' },
      { k: 'Fee policy', v: 'Reasonable charges, agreed in advance' }
    ],
    features: [
      { title: 'Cargo declaration service' },
      { title: 'Electronic account for import and export cargo declaration' },
      { title: 'Cross-border e-commerce cargo declaration' },
      { title: 'Marketing purchase trade declaration' },
      { title: 'Import and export cargo customs transit' },
      { title: 'Exit, shutout, returning' }
    ],
    advantages: [
      {
        title: 'Service advantage',
        text: 'A professional customs business team with over twenty years of career experience.'
      },
      {
        title: 'Resources advantage',
        text: 'Combining freight forwarding with import and export declaration services, so nothing is lost in the handover between the two.'
      },
      {
        title: 'Customs clearance prescription',
        text: 'Keeping the customer first, guaranteeing reasonable charges, and ensuring efficient passage through customs.'
      }
    ]
  },

  {
    id: 'warehouse',
    slug: 'warehouse',
    icon: 'warehouse',
    accent: 'steel',
    brand: 'Warehouse',
    name: 'Warehousing & Distribution',
    tagline: 'Partner warehouses across 110 countries and nearly 280 ports.',
    intro: [
      'With Longsail\u2019s more than ten years of experience in international warehousing, Girafsail provides overseas warehousing services with partner warehouses across 110 countries and nearly 280 ports.',
      'Our overseas warehousing and transportation services carry no restriction on cargo weight or volume and are immune to seasonal shipping route disruption \u2014 genuinely localised warehousing. Good geographic position lets us connect better with port terminals, airports and distribution centres, which improves cargo turnover and reduces logistics cost for the customer.'
    ],
    facts: [
      { k: 'Coverage', v: '110 countries' },
      { k: 'Ports and cities', v: 'Nearly 280' },
      { k: 'Service team', v: '900 staff' },
      { k: 'Cost impact', v: 'Reduces total end-to-end logistics cost by 30%\u201370%' }
    ],
    features: [
      { title: 'Container yard' },
      { title: 'Special warehousing' },
      { title: 'Distribution logistics' },
      { title: 'Packing and unpacking' },
      { title: 'Changing packaging' },
      { title: 'Sorting and packaging' },
      { title: 'GPS positioning' },
      { title: 'Labelling' },
      { title: 'Order management' },
      { title: 'Barcode management' }
    ],
    advantages: [
      {
        title: 'Timeliness advantage',
        text: 'Global warehousing, local delivery, better timeliness \u2014 and normal timeliness guaranteed even in peak season.'
      },
      {
        title: 'Price advantage',
        text: 'Girafsail integrates the advantageous resources of air, land and sea freight, reducing total end-to-end logistics costs by 30% to 70%.'
      },
      {
        title: 'Service advantages',
        text: '110 countries and 280 ports and cities, a professional service team of 900 staff, special guidance, and support for the return service.'
      },
      {
        title: 'Operational advantages',
        text: 'Backed by over 20 years of international shipping expertise from headquarters and more than 10 years of cross-border warehousing operations, Girafsail understands the needs and the bottlenecks of customers and safeguards the goods and the control of the whole supply chain.'
      },
      {
        title: 'Value-added service advantages',
        text: 'Supply chain finance, transportation, foreign exchange settlement and inspection \u2014 the supporting services that sit around the warehouse.'
      }
    ]
  },

  {
    id: 'bonded',
    slug: 'bonded',
    icon: 'shield',
    accent: 'coral',
    brand: 'Bonded Warehouse',
    name: 'Bonded Warehouse',
    tagline: 'Duty is deferred, not avoided \u2014 and storage in the bonded area has no time limit.',
    intro: [
      'A bonded warehouse is what makes sense when the question is not how to move the cargo but when to pay duty on it. Import into the bonded area does not require taxes to be paid or special certificates to be presented.',
      'The same facility supports LCL consolidation: goods from different factories, or even different countries, can be sent in, sorted and packed, then booked, containerised and loaded for export.'
    ],
    facts: [
      { k: 'Duty', v: 'Deferred on import into the bonded area' },
      { k: 'Storage time', v: 'No limit' },
      { k: 'Consolidation', v: 'Multi-supplier LCL' },
      { k: 'Tax refund', v: 'Available on export clearance where conditions are met' }
    ],
    features: [
      { title: 'Export LCL service and warehousing' },
      { title: 'Import bonded warehousing and trucking' },
      { title: 'Transit trade service' },
      { title: 'Returning shipment for repairing' }
    ],
    advantages: [
      {
        title: 'Import duty free',
        text: 'No taxes to pay and no special certificates to present when the cargo is imported into the bonded area.'
      },
      {
        title: 'Write-off available',
        text: 'When domestic cargo is exported into the bonded area, the shipper can apply for a tax refund immediately after export customs clearance, if the conditions are met.'
      },
      {
        title: 'LCL consolidation',
        text: 'If goods in one container come from different factories or even different countries, shippers can send the goods into the bonded area. We arrange sorting and packing, then book the space, pick up the containers and load the cargo for export.'
      },
      {
        title: 'Free of supervision fee',
        text: 'There is no limit on the storage time in the bonded area.'
      }
    ]
  }
]

/** 按 slug 取服务，供详情页路由使用 */
export const serviceBySlug = (slug) => services.find((s) => s.slug === slug) || null

/** 服务 id 列表，供页脚与首页索引使用 */
export const serviceIds = services.map((s) => s.id)
