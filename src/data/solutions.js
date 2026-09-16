/**
 * 货种方案内容单一来源。
 *
 * 内容蓝本：<https://giraf-logistics.com/SolutionDetail.html?id=444..447> 原文。
 * 结构与 services.js 不同：方案页是「长文阅读」型，因此以 blocks 顺序段落表达，
 * 而非卡片网格 —— 页面模板据此采用窄栏正文排版。
 *
 * block 类型：
 *   { title, text }                  —— 标题 + 段落
 *   { title, items: [str] }          —— 标题 + 清单
 *   { title, cards: [{title, text}] }—— 标题 + 定义列表（分条款）
 */

export const solutions = [
  {
    id: 'general',
    slug: 'general',
    icon: 'layers',
    accent: 'steel',
    name: 'General Cargo',
    tagline: 'Twenty years of it, across enough industries that the exceptions are no longer surprising.',
    intro:
      'With over 20 years of extensive experience in the transportation industry, GIRAFSAIL has acquired specialised knowledge across a wide range of industries. This enables us to better support our customers in promoting their business development and achieving their business objectives. Whether your shipping needs are simple or complex, we can assist you in finding the optimal solution tailored to your cargo and your business requirements.',
    facts: [
      { k: 'Experience', v: 'Over 20 years in transportation' },
      { k: 'Modes', v: 'Ocean, air, rail and road combined' },
      { k: 'Scope', v: 'One-off shipments and standing programmes' },
      { k: 'Contracting party', v: 'The GIRAF company in your market' }
    ],
    blocks: [
      {
        title: 'Industries we already ship for',
        text: 'The sectors below are not a target list — they are where our existing volume sits, which is why the exceptions in them have stopped being exceptional.',
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
      {
        title: 'What we need from you to quote properly',
        cards: [
          {
            title: 'The route',
            text: 'Named place of receipt and named place of delivery. "China" to "Europe" is not a route, it is a range.'
          },
          {
            title: 'The cargo description',
            text: 'What it is, and what customs will call it. If those two differ, we would rather find out before the container is loaded.'
          },
          {
            title: 'Weight and volume',
            text: 'Including whether it is stackable, and whether it can be lifted by standard equipment.'
          },
          {
            title: 'The deadline',
            text: 'The date the cargo has to be there — not the date it would be convenient for it to arrive.'
          }
        ]
      },
      {
        title: 'How it runs',
        text: 'One order with us covers pre-carriage, main carriage, customs clearance and delivery. You receive one reference number and one contact person, and status updates as the milestones are hit rather than after the fact.'
      }
    ]
  },

  {
    id: 'frozen',
    slug: 'frozen',
    icon: 'shield',
    // 冷链用「冷色」区分：原先与 General Cargo 同为 steel，
    // 四种货种里有两种同色，详情页与索引页都看不出区别。
    accent: 'cold',
    name: 'Frozen Cargo',
    tagline: 'The cold chain is not a setting on a container. It is a continuous condition that either holds or does not.',
    intro:
      'Efficient transportation of perishable goods is critical to the development of your business. We promise that your cargoes can be delivered to destination in the specified status, through a safe and reliable transport path with a continuous cold chain.',
    facts: [
      { k: 'Equipment', v: 'Reefer containers, temperature-controlled clean containers' },
      { k: 'Control', v: 'Continuous cold chain, monitored end to end' },
      { k: 'Cargo types', v: 'Food, protein, seafood, pharmaceutical' },
      { k: 'Special capability', v: 'Controlled-ripening and air-sealed equipment' }
    ],
    blocks: [
      {
        title: 'Cargoes we carry under refrigeration',
        items: [
          'Fruits and vegetables',
          'Protein products',
          'Fish and seafood',
          'Drugs and pharmaceutical products'
        ]
      },
      {
        title: 'Keeping special cargoes in suitable refrigerated transport ways',
        cards: [
          {
            title: 'Air-conditioned containers',
            text: 'Used to delay the ripening of fruit, so that the cargo arrives in the condition it was sold in rather than a day past it.'
          },
          {
            title: 'Air-sealed fish and seafood containers',
            text: 'Sealed refrigerated equipment for fish and seafood, where the risk is not only temperature but also atmosphere.'
          },
          {
            title: 'Precise temperature-controlled clean containers',
            text: 'For the transport of drugs, where the tolerance for deviation is far narrower than in food logistics.'
          }
        ]
      },
      {
        title: 'For more details on refrigerated transportation',
        text: 'Welcome to contact us for an enquiry. Tell us the commodity, the target temperature range and the shelf life you are working against, and we will tell you which equipment the route can actually support.'
      }
    ]
  },

  {
    id: 'dangerous',
    slug: 'dangerous',
    icon: 'danger',
    accent: 'sand',
    name: 'Dangerous Goods',
    tagline: 'Most DG failures are administrative, and they are decided days before the vessel sails.',
    intro:
      'With over twenty years of experience in the transportation of dangerous goods — whether it is pesticides, charcoal, storage batteries or other hazardous cargoes — GIRAFSAIL\u2019s experienced cargo management team is at your service. Our services cover all aspects of the shipment process, from certification and cargo acceptance to loss prevention and current dangerous goods regulations. We can tailor safe and reliable transportation solutions according to your requirements. Throughout the entire transportation process we keep you abreast of the shipment details, so you always know where the goods are and when they arrive.',
    facts: [
      { k: 'Experience', v: 'Over 20 years in dangerous goods' },
      { k: 'Coverage', v: 'Certification, acceptance, loss prevention, current regulations' },
      { k: 'Booking lead time', v: 'At least 5 days in advance' },
      { k: 'Documentation', v: 'Photographs from at least 8 angles of the encasement' }
    ],
    blocks: [
      {
        title: 'Because the shipping procedures are complicated and the operation requirements professional, there are points to pay attention to',
        cards: [
          {
            title: '01 — Class approval',
            text: 'The class of dangerous goods needs the approval of the terminal and the shipping company. If there is a transit, the confirmation of the transit port is still required. It is therefore a better choice to book at least 5 days in advance.'
          },
          {
            title: '02 — Complete and rigorous booking information',
            text: 'Incomplete data can cause the FINAL DG to fail, which makes it impossible to board the ship, and which is charged for. Rented containers for dangerous goods are more expensive than for general cargo.'
          },
          {
            title: '03 — Loading and returning time',
            text: 'These must be strictly in accordance with the requirements of the terminal, otherwise additional costs are incurred.'
          },
          {
            title: '04 — Marking',
            text: 'Dangerous marks must be firmly stuck and correctly positioned.'
          },
          {
            title: '05 — Photographic evidence of the encasement',
            text: 'The pictures provided must be clear, and there must be at least eight photographs taken from different angles.'
          },
          {
            title: '06 — Maritime declaration data',
            text: 'The data of the maritime declaration must be rigorous.'
          },
          {
            title: '07 — Warehouse handling requirements',
            text: 'The rules and regulations for warehouse loading and unloading, product batch, loading sequence, pallet customisation, film wrapping, risk label placement, photographing requirements and handling methods are all stricter than for general cargo.'
          }
        ]
      },
      {
        title: 'For more details on the transportation of dangerous goods',
        text: 'Please contact us for service. Send the UN number, the class and the packing group first — those three fields determine whether the route you have in mind is available at all.'
      }
    ]
  },

  {
    id: 'special',
    slug: 'special',
    icon: 'box',
    accent: 'coral',
    name: 'Special Cargo',
    tagline: 'Chemicals and ultra-conventional cargo, where the constraint is regulation, geometry or both.',
    intro:
      'Our special cargo transportation programme includes chemicals and ultra-conventional cargo. When transporting chemicals or other potentially dangerous goods we are aware of the significance of safety, reliability, environmental sustainability and economic viability. No matter where you are, our experts can provide a safe, reliable and efficient chemical goods supply chain.',
    facts: [
      { k: 'Cargo families', v: 'Chemicals, ultra-conventional cargo' },
      { k: 'Regulatory depth', v: 'International law and safety regulation' },
      { k: 'Equipment', v: 'Flat rack, open top, deck stowage, heavy lift' },
      { k: 'Mode', v: 'Multimodal where the route requires it' }
    ],
    blocks: [
      {
        title: 'Chemicals',
        text: 'Our professional chemical transport covers the following product families. Companies that transport chemicals face more challenges than most: we must understand international law and safety regulations, and be equipped with professional transportation knowledge. From customs clearance to the establishment of a preferred port hub, we develop reliable and cost-effective supply chain solutions based on your needs.',
        items: [
          'Chemicals',
          'Drugs',
          'Petrochemical derivatives',
          'Thermoplastics',
          'Bare minerals',
          'Natural polymer',
          'Lubricant',
          'Fertiliser'
        ]
      },
      {
        title: 'Multimodal by necessity',
        text: 'The transport of chemicals is not only ocean freight. Inland transportation is often required in the same movement, which is why we provide a full range of multimodal transport services rather than quoting a single leg. When problems come up we look for the cause quickly and propose the solution, so that the supply chain keeps running.'
      },
      {
        title: 'Ultra-conventional cargo',
        text: 'Three classes, distinguished by whether the cargo can still be containerised and whether the vessel has to be adapted to it.'
      },
      {
        title: 'Dimensions and stowage',
        cards: [
          {
            title: 'Exceeding standard goods',
            text: 'The size of the cargo exceeds the length, width or height of the flat rack or open top container, but it can still be divided into multiple containers for shipping. Examples: propellers, flanges, trucks.'
          },
          {
            title: 'Not-exceeding standard goods',
            text: 'The size is less than or equal to the flat rack or open top container. Special equipment is needed for loading, but there is no need to change any other position of the ship. Examples: machinery, or trees that can be lowered into open-top containers.'
          },
          {
            title: 'Bulk cargo',
            text: 'Cargo that exceeds the size and/or weight of a standard container, and is therefore considered indivisible. It is usually fixed by multi-strand rope and placed on a deck board panel. Examples: yachts, masts, industrial equipment, vehicles.'
          }
        ]
      },
      {
        title: 'For more details of special cargo transportation',
        text: 'Welcome to contact us for an enquiry. Dimensions, weight, centre of gravity and lifting points get you a quotation; the description alone gets you a question.'
      }
    ]
  }
]

/** 按 slug 取方案，供详情页路由使用 */
export const solutionBySlug = (slug) => solutions.find((s) => s.slug === slug) || null
