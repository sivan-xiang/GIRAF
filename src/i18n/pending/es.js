/**
 * Español (Spanish)
 * GIRAF — sitio internacional de LONGSAIL International Logistics.
 *
 * 术语约定（勿混用）：
 *   presupuesto   —— 统一用 presupuesto（西葡市场通用商业语），不用 cotización
 *   transitario   —— freight forwarder 的标准西语对应词（非"agente de carga"）
 *   despacho de aduanas —— customs clearance
 *   almacenaje    —— warehousing；仓储服务场所用 almacén
 *   所有格与省略号一律使用 ’（U+2019），避免与 JS 字符串定界符冲突
 */

export default {
  code: 'es',
  label: 'Español',
  short: 'ES',
  htmlLang: 'es',

  nav: {
    home: 'Inicio',
    services: 'Servicios',
    solutions: 'Soluciones',
    about: 'Empresa',
    network: 'Red',
    contact: 'Contacto'
  },

  common: {
    submenu: 'Submenú',
    viewAll: 'Ver todo',
    prev: 'Anterior',
    next: 'Siguiente',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
    skipToContent: 'Ir al contenido',
    learnMore: 'Más información',
    allServices: 'Todos los servicios',
    details: 'Detalles',
    back: 'Volver',
    ctaQuote: 'Solicitar presupuesto',
    ctaContact: 'Contacte con nosotros',
    ctaCall: 'Llámenos',
    ctaMail: 'Enviar un correo',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    address: 'Dirección',
    legal: 'Legal',
    imprint: 'Aviso legal',
    privacy: 'Privacidad',
    officeHours: 'Horario de atención',
    officeHoursValue: 'Lun–Vie, 08:00–18:00 CET/CEST',
    required: 'Obligatorio',
    since: 'desde'
  },

  meta: {
    home: {
      title: 'GIRAF | Simplificamos el comercio transfronterizo',
      desc: 'GIRAF es la marca internacional de LONGSAIL International Logistics: transporte marítimo, aéreo y ferroviario, despacho de aduanas y almacenaje, prestados por nuestras propias sociedades en siete países y respaldados por más de 30 ubicaciones en todo el mundo.'
    },
    services: {
      title: 'Servicios | Transporte marítimo, aéreo y ferroviario, aduanas, almacenaje',
      desc: 'Transporte marítimo, aéreo y ferroviario, transporte terrestre, despacho de aduanas, almacenaje, mercancías peligrosas, comercio electrónico y financiación logística, gestionados de principio a fin.'
    },
    solutions: {
      title: 'Soluciones | Soluciones de cadena de suministro de GIRAF',
      desc: 'Puerta a puerta China–Europa, logística de aprovisionamiento, carga de proyecto y sobredimensionada, y logística para comercio electrónico, gestionadas como procesos únicos con un solo responsable.'
    },
    about: {
      title: 'Empresa | GIRAF, la marca internacional de LONGSAIL',
      desc: 'Fundada en 1999, LONGSAIL opera más de 30 oficinas en todo el mundo. GIRAF es su marca internacional, con la actividad europea gestionada desde Hamburgo por Girafsail Logistics GmbH.'
    },
    network: {
      title: 'Red | Oficinas en China, Europa, Norteamérica y todo el mundo',
      desc: 'Siete sociedades propias en Europa, América, Asia y Oriente Medio, más de 20 delegaciones propias en China y oficinas asociadas en todo el mundo.'
    },
    contact: {
      title: 'Contacto | GIRAF — nuestras sociedades en todo el mundo',
      desc: 'Contacte con la sociedad de GIRAF en su mercado. Oficinas registradas, direcciones y teléfonos directos en siete países de Europa, América, Asia y Oriente Medio.'
    },
    imprint: {
      title: 'Aviso legal | Girafsail Logistics GmbH',
      desc: 'Datos del prestador de servicios conforme al art. 5 de la Ley alemana de Servicios Digitales (DDG): Girafsail Logistics GmbH, Hamburger Straße 11, 22083 Hamburgo, Alemania.'
    },
    privacy: {
      title: 'Privacidad | Girafsail Logistics GmbH',
      desc: 'Cómo tratamos los datos personales en este sitio web, de conformidad con el art. 13 del RGPD.'
    }
  },

  home: {
    hero: {
      eyebrow: 'GIRAF · la marca internacional de LONGSAIL',
      title: 'Simplificamos el',
      titleLead: 'Simplificamos el',
      titleAccent: 'comercio transfronterizo.',
      text: 'Una marca internacional de logística especializada en la localización en el exterior: soluciones integrales basadas en operación local y recursos globales. Contamos con equipos propios en México, Reino Unido, Alemania, Vietnam, Tailandia y Arabia Saudí, respaldados por la red del grupo en origen.',
      primary: 'Solicitar presupuesto',
      secondary: 'Ver servicios',
      scroll: 'Ver más',
      badges: ['Equipos propios en 7 mercados', 'Empresa logística AAAAA', 'Aduanas gestionadas internamente']
    },

    stats: [
      { value: '450.000', label: 'TEU al año', note: 'volumen de transporte del grupo, 2024' },
      { value: '110.236', label: 'Clientes atendidos', note: 'en siete sectores, incluidas empresas Fortune 500' },
      { value: '36', label: 'Delegaciones en el mundo', note: 'China, Europa, Norteamérica, Sudeste Asiático y Oriente Medio' },
      { value: '1997', label: 'Fundación del grupo', note: 'un equipo de cuatro personas en Shenzhen' }
    ],

    trust: {
      label: 'Oficinas propias y equipos permanentes en origen',
      count: 'oficinas en China',
      aria: 'Nuestras delegaciones en China'
    },

    services: {
      eyebrow: 'Servicios',
      title: 'Diez servicios, cada uno con su propia página',
      text: 'Abra cualquier entrada para ver qué cubre realmente: el equipo, las rutas y los puntos que deciden si el envío funciona.'
    },

    why: {
      eyebrow: 'Por qué GIRAF',
      title: 'Una marca, un socio responsable',
      text: 'El transporte transfronterizo rara vez falla en tránsito. Falla allí donde cambia de manos la responsabilidad. Precisamente ahí ponemos el foco.',
      items: [
        {
          title: 'Operación local, recursos globales',
          text: 'GIRAFSAIL es la marca del grupo para la localización en el exterior: apoyo al cumplimiento normativo y respuesta ágil en cada mercado, con los recursos del grupo detrás.'
        },
        {
          title: 'Cualificación AAAAA y plataforma propia',
          text: 'Respaldados por la cualificación AAAAA, una red mundial de más de 30 filiales y la plataforma informática desarrollada por LONGSAIL.'
        },
        {
          title: 'Equipos propios en los mercados donde vende',
          text: 'Ciudad de México, Londres, Hamburgo, Ho Chi Minh, Hanói, Bangkok y Riad: no agentes, sino sociedades propias.'
        },
        {
          title: 'Más de 20 años de transitario detrás de cada oferta',
          text: 'Nuestro equipo logístico aporta más de veinte años de experiencia profesional. Una llamada o un correo bastan para empezar.'
        }
      ]
    },

    segments: {
      eyebrow: 'Sectores',
      title: 'Con quién trabajamos',
      items: [
        'Nuevas energías',
        'Equipos de telecomunicaciones',
        'Componentes de automoción',
        'Hogar inteligente',
        'Maquinaria de construcción',
        'Química',
        'EPC'
      ]
    },

    networkTeaser: {
      eyebrow: 'Red',
      title: '36 delegaciones. 8 entidades legales. Una marca.',
      text: 'Cada sociedad GIRAF contrata para su propio mercado, de modo que usted trata con una entidad local que responde localmente, mientras que el origen lo opera la red propia del grupo.',
      cta: 'Ver la red completa'
    },

    cta: {
      title: 'Hablemos de su próximo envío',
      text: 'Envíenos la ruta, la mercancía, el peso y el plazo. Normalmente recibirá un presupuesto y un plazo de tránsito realista en un día laborable.',
      primary: 'Solicitar presupuesto',
      secondary: 'Ver datos de contacto'
    }
  },

  services: {
    tally: {
      services: 'Servicios en la cartera',
      entities: 'Entidades legales',
      locations: 'Ubicaciones operativas'
    },
    directory: {
      label: 'Directorio de servicios',
      note: 'Cada entrada abre su propia página.',
      items: 'partidas'
    },
    hero: {
      eyebrow: 'Servicios',
      title: 'Transporte, aduanas y almacenaje desde un solo proveedor',
      text: 'No debería tener que incorporar un proveedor nuevo para cada modo de transporte. Integramos todo el proceso y asumimos la responsabilidad de los traspasos.',
      crumb: 'Servicios'
    },
    intro: {
      title: 'Un pedido, una parte responsable',
      text: 'Ya sea transporte marítimo desde Ningbo, aéreo desde Shanghái o ferroviario vía Duisburgo, el pedido lo cursa con nosotros. Organizamos el precarrete, el transporte principal, el despacho de aduanas y la entrega, y le informamos del estado.'
    },
    items: [
      {
        id: 'ocean',
        title: 'Transporte marítimo',
        text: 'La opción más económica para grandes volúmenes, con conocimiento del puerto de Hamburgo y acceso directo a las terminales de contenedores.',
        points: [
          'FCL: 20′, 40′, 40′ HC, 45′, además de reefer y flat rack',
          'LCL: consolidaciones semanales en salidas fijas',
          'Puerta a puerta, con precarrete en origen y transporte posterior en Europa',
          'Seguimiento de transbordos y buques de conexión'
        ]
      },
      {
        id: 'air',
        title: 'Transporte aéreo',
        text: 'Para envíos cuyo plazo no es negociable. Vuelos directos y consolidaciones con capacidad asegurada.',
        points: [
          'Servicios directos desde Fráncfort, Ámsterdam, Shanghái y Hong Kong',
          'Carga aérea consolidada con salidas semanales',
          'Recogida, asesoramiento sobre embalaje, manipulación y presentación en aduana',
          'Entrega posterior en Alemania y la UE'
        ]
      },
      {
        id: 'rail',
        title: 'Transporte ferroviario',
        text: 'Corredores ferroviarios China–Europa vía Kazajistán, Bielorrusia y Polonia hasta Duisburgo, Hamburgo o Małaszewicze.',
        points: [
          'Plazos de tránsito entre el marítimo y el aéreo',
          'Adecuado para carga paletizada, en cajas y contenerizada',
          'Alternativa práctica cuando se ajusta la capacidad marítima y aérea',
          'Asistencia completa en los trámites fronterizos'
        ]
      },
      {
        id: 'inland',
        title: 'Transporte terrestre y precarrete/posterior',
        text: 'Una cadena vale lo que valen su primer y su último tramo. Trabajamos con socios contrastados y procesos de despacho propios.',
        points: [
          'Transporte de contenedores en los puertos de Hamburgo y Bremerhaven',
          'Grupaje y cargas parciales por carretera en Alemania',
          'Transfronterizo: Benelux, Francia, Polonia, República Checa',
          'Ventanas de entrega al día, bajo petición'
        ]
      },
      {
        id: 'customs',
        title: 'Despacho de aduanas',
        text: 'La aduana rara vez abarata un envío, pero a menudo es lo que lo detiene. Nos ocupamos de ella nosotros mismos.',
        points: [
          'Declaraciones de importación y exportación (ATLAS)',
          'Clasificación arancelaria e información arancelaria vinculante',
          'Origen preferencial, certificados de origen, EUR.1 y certificados de circulación',
          'Licencias de exportación, control de doble uso y procedimientos de control'
        ]
      },
      {
        id: 'warehouse',
        title: 'Almacenaje y distribución',
        text: 'Manipulación y almacenamiento tampón en la zona portuaria de Hamburgo, para mercancía que no debe seguir viaje de inmediato.',
        points: [
          'Recepción, almacenamiento, reenvasado y etiquetado',
          'Depósito aduanero y pago de derechos a demanda',
          'Preparación de pedidos y fulfillment',
          'Distribución en toda Europa'
        ]
      },
      {
        id: 'dg',
        title: 'Mercancías peligrosas y equipos especiales',
        text: 'Envíos con requisitos elevados de documentación y equipamiento, preparados correctamente en lugar de corregidos después.',
        points: [
          'Envíos ADR, IMDG e IATA-DGR',
          'Flat rack, open top, reefer y fuera de gálibo',
          'Asesoramiento sobre clasificación, embalaje y marcado',
          'Documentación de acompañamiento completa'
        ]
      },
      {
        id: 'ecommerce',
        title: 'Logística para comercio electrónico',
        text: 'Para minoristas online que quieren consolidar en origen y entregar con fiabilidad en Europa.',
        points: [
          'Consolidación y embalaje en China',
          'Opciones aéreas y ferroviarias para crear stock',
          'Conexión con redes de reparto en Alemania y la UE',
          'Gestión de devoluciones y conciliación de stock'
        ]
      },
      {
        id: 'finance',
        title: 'Financiación logística',
        text: 'Financiación de circulante y de cadena de suministro para importadores y exportadores, desde el prepago hasta la financiación de existencias, articulada a través de nuestra red.',
        points: [
          'Prepago y financiación de proveedores en origen',
          'Financiación de existencias y de depósito aduanero',
          'Soluciones de crédito alineadas con el ciclo del envío',
          'Una única relación para transporte y financiación'
        ]
      }
    ],
    process: {
      eyebrow: 'Cómo funciona',
      title: 'De la consulta a la entrega',
      steps: [
        { n: '01', title: 'Consulta', text: 'Nos envía la ruta, la descripción de la mercancía, el peso, el volumen y el plazo.' },
        { n: '02', title: 'Presupuesto', text: 'Comprobamos ruta y capacidad y le presupuestamos una tarifa con un plazo de tránsito realista.' },
        { n: '03', title: 'Ejecución', text: 'Reserva, recogida en origen, aduana y carga, con avisos de estado a medida que ocurren.' },
        { n: '04', title: 'Entrega', text: 'Traspaso en destino, levante de aduanas y documentación de cierre.' }
      ]
    }
  },

  solutions: {
    readMore: 'Leer la ficha completa',
    bridge: 'Cuatro tipos de carga. Un equipo que los ha movido todos.',
    hero: {
      eyebrow: 'Soluciones',
      title: 'Cadenas de suministro que no exigen atención constante',
      text: 'Cuatro situaciones que gestionamos de forma habitual para empresas industriales y comerciales de todo el mundo.',
      crumb: 'Soluciones'
    },
    items: [
      {
        title: 'Puerta a puerta China–Europa',
        text: 'La mercancía se recoge en origen y se entrega en destino. Usted recibe un número de referencia y un interlocutor.',
        points: [
          'Recogida en proveedor o fábrica',
          'Despacho de exportación y consolidación',
          'Seguimiento del transporte principal',
          'Despacho de importación y entrega final'
        ]
      },
      {
        title: 'Aprovisionamiento y logística de proveedores',
        text: 'Para equipos de compras que trabajan con varios proveedores asiáticos y quieren consolidar sus flujos de entrada.',
        points: [
          'Recogida en varios proveedores y consolidación',
          'Control de cantidades e inspección visual bajo petición',
          'Condiciones FOB, EXW y DAP',
          'Documentación homogénea para su equipo de compras'
        ]
      },
      {
        title: 'Carga de proyecto y sobredimensionada',
        text: 'Transportes especiales en los que la planificación y los permisos deciden el resultado.',
        points: [
          'Estudios de ruta y de viabilidad',
          'Permisos de carga sobredimensionada y vehículos de acompañamiento',
          'Planificación de grúas y manipulación',
          'Calendario alineado con su equipo de proyecto'
        ]
      },
      {
        title: 'Fulfillment para comercio electrónico',
        text: 'Cree stock en Europa sin construir su propia infraestructura.',
        points: [
          'Consolidación en origen',
          'Almacenamiento de entrada y registro de existencias',
          'Preparación y expedición de pedidos',
          'Gestión de devoluciones'
        ]
      }
    ],
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Empezamos con tres preguntas',
      items: [
        { q: '¿Cuándo tiene que estar la mercancía allí?', a: 'El plazo determina el modo de transporte, no al contrario.' },
        { q: '¿Qué dicen los papeles de aduana?', a: 'Revisamos la descripción de la mercancía antes de que se convierta en un problema.' },
        { q: '¿Quién decide cuando algo cambia?', a: 'Acordamos de antemano a quién se informa y quién decide en cada escenario.' }
      ]
    }
  },

  about: {
    anchor: {
      founded: 'Grupo fundado',
      branches: 'sucursales'
    },
    timeline: {
      eyebrow: 'Hitos',
      title: 'De un equipo de cuatro personas en 1997',
      text: 'La cronología que sigue reproduce la historia del grupo tal como se publica: de dónde viene la red y por qué las oficinas con las que trata ya existían antes de que las necesitara.'
    },
    credentials: {
      eyebrow: 'Credenciales',
      title: 'Cualificación, adhesiones y clasificación',
      qualifications: 'Cualificación empresarial',
      rankings: 'Clasificaciones',
      memberships: 'Adhesiones'
    },
    hero: {
      eyebrow: 'Empresa',
      title: 'La marca internacional de LONGSAIL',
      text: 'GIRAF es la marca internacional de LONGSAIL International Logistics. Nuestra actividad europea la gestiona desde Hamburgo Girafsail Logistics GmbH, con dirección propia, contratos propios y facturación alemana.',
      crumb: 'Empresa'
    },
    profile: {
      eyebrow: 'Perfil',
      title: 'Quiénes somos',
      paragraphs: [
        'LONGSAIL International Logistics se fundó en 1999 y se ha convertido en una red de más de 30 oficinas propias, con su centro de gravedad en China y delegaciones adicionales en Norteamérica, Europa, el Sudeste Asiático y Oriente Medio. GIRAF es la marca del grupo para el mercado internacional.',
        'Hamburgo es nuestra interfaz europea con esa red. Desde aquí atendemos a importadores, fabricantes y minoristas online que mueven mercancía entre Asia y Europa: organizamos transporte marítimo, aéreo y ferroviario, gestionamos el despacho de aduanas y acompañamos el envío hasta su entrega.',
        'Nos consideramos un transitario en el sentido tradicional: planificamos, documentamos, asumimos responsabilidad y comunicamos, en lugar de limitarnos a transmitir pedidos. Lo que se promete en Hamburgo se responde en Hamburgo.'
      ]
    },
    facts: {
      title: 'De un vistazo',
      rows: [
        { k: 'Marca', v: 'GIRAF — marca internacional de LONGSAIL International Logistics' },
        { k: 'Domicilio social', v: 'Hamburger Straße 11, 22083 Hamburgo, Alemania' },
        { k: 'Administrador', v: 'HUANG YU' },
        { k: 'Registro mercantil', v: 'Amtsgericht Hamburg (Juzgado de Primera Instancia), HRB 186908' },
        { k: 'NIF-IVA', v: 'DE323296008' },
        { k: 'Grupo activo desde', v: '1999' }
      ]
    },
    values: {
      eyebrow: 'Cómo trabajamos',
      title: 'Cuatro principios',
      items: [
        {
          title: 'Respondemos de lo que presupuestamos',
          text: 'Damos plazos de tránsito que podemos sostener. Si una ruta no opera con fiabilidad, lo decimos antes de que reserve, no después.'
        },
        {
          title: 'Las malas noticias van primero',
          text: 'Los retrasos y las cargas no embarcadas ocurren. Lo que importa es que se entere mientras aún existen alternativas.'
        },
        {
          title: 'El papeleo no es un añadido',
          text: 'Un solo código de mercancía equivocado cuesta más que el flete. Revisamos los documentos antes de que la mercancía empiece a moverse.'
        },
        {
          title: 'Siempre habla con las mismas personas',
          text: 'Vuelve a contactar con los mismos colegas, no cada día con un número distinto en un centro de llamadas.'
        }
      ]
    },
    sustainability: {
      eyebrow: 'Logística baja en carbono',
      title: 'Plazo de tránsito frente a emisiones',
      text: 'Por tonelada-kilómetro, el corredor ferroviario hacia China emite bastante menos CO₂ que el transporte aéreo. Cuando los plazos lo permiten, proponemos por tanto la opción ferroviaria y, si lo desea, documentamos la comparación en el presupuesto.',
      points: [
        'Comparativa de emisiones de marítimo, ferroviario y aéreo en el presupuesto',
        'Consolidación de envíos para mejorar los factores de carga',
        'Menos trayectos en vacío gracias a una planificación previsible'
      ]
    },
    careers: {
      eyebrow: 'Empleo',
      title: '¿Le interesa formar parte del equipo de GIRAF?',
      text: 'Somos un equipo compacto, con líneas de comunicación cortas. Si entiende el transitario como un oficio y no como una función de encaminamiento, encajará aquí.',
      cta: 'Envíenos su CV',
      subject: 'Candidatura — equipo de GIRAF',
      note: 'Envíe su documentación a nuestra dirección de contacto. Respondemos en un plazo de dos semanas.'
    }
  },

  network: {
    legend: {
      branches: 'Ubicaciones operativas',
      entities: 'Entidades legales',
      markets: 'Regiones'
    },
    regions: {
      eyebrow: 'Cobertura regional',
      title: 'Dónde operamos',
      text: 'Treinta ubicaciones en cinco regiones. Las oficinas siguientes son direcciones operativas; la entidad contratante de su mercado figura más abajo.'
    },
    region: {
      cn: 'China',
      eu: 'Europa',
      am: 'América',
      as: 'Asia',
      me: 'Oriente Medio',
      intl: 'Internacional'
    },
    own: 'Sociedad propia',
    directory: {
      eyebrow: 'Directorio',
      title: 'Direcciones y teléfonos',
      text: 'Cada ubicación con su dirección postal completa y, cuando se publica, un número marcable.',
      colCity: 'Ubicación',
      colAddress: 'Dirección',
      colPhone: 'Teléfono',
      onRequest: 'A petición'
    },
    hero: {
      eyebrow: 'Red',
      title: 'Sociedades propias. Equipos propios. Treinta ubicaciones.',
      text: 'Siete sociedades propias en Europa, América, Asia y Oriente Medio: cada una contrata localmente, respaldada por la red de LONGSAIL en origen, en China.',
      crumb: 'Red'
    },
    note: {
      title: 'Con quién contrata',
      text: 'Cada sociedad de GIRAF contrata para su propio mercado. Para Alemania y la UE, todos los presupuestos, facturas y contratos los emite Girafsail Logistics GmbH en Hamburgo; los clientes de otras regiones son atendidos por la sociedad de GIRAF de su zona.'
    },
    coverage: {
      eyebrow: 'Cobertura',
      title: 'Qué significa para usted',
      items: [
        { k: 'Recogida en origen', v: 'Recogida en su proveedor en cualquier punto de China, coordinada por nuestro propio equipo sobre el terreno' },
        { k: 'Despacho de exportación', v: 'Documentación de exportación china y tramitación aduanera a través del grupo' },
        { k: 'Despacho europeo', v: 'Importación y derechos gestionados internamente por nuestro equipo de Hamburgo' }
      ]
    }
  },

  /** 全球法定主体（分公司 / 子公司）——名称与地址为登记原文，不翻译 */
  offices: {
    eyebrow: 'Entidades legales',
    title: 'Nuestras propias sociedades en el mundo',
    text: 'GIRAF opera con sociedades propias registradas en siete países. Cada una contrata localmente, bajo el mismo estándar de servicio.',
    registered: 'Domicilio social',
    phoneOnRequest: 'Teléfono a petición',
    region: {
      europe: 'Europa',
      americas: 'América',
      asia: 'Asia',
      middleeast: 'Oriente Medio'
    }
  },

  contact: {
    hero: {
      eyebrow: 'Contacto',
      title: 'Hable con la sociedad de GIRAF en su mercado',
      text: 'GIRAF opera a través de sociedades propias registradas en siete países. Cada una emite presupuestos, contratos y facturas localmente, con el mismo estándar de servicio. Elija su región abajo o envíenos los datos de su envío y dirigiremos su consulta al equipo correspondiente.',
      crumb: 'Contacto'
    },
    details: {
      mgmt: 'Administrador',
      web: 'Web'
    },
    directory: {
      eyebrow: 'Directorio mundial',
      title: 'Todas las sociedades de GIRAF, con dirección y teléfono',
      text: 'Nuestras propias oficinas registradas en todo el mundo: siete países, un mismo estándar de servicio. La sociedad indicada para su mercado es la que emite sus presupuestos, contratos y facturas.',
      colAddress: 'Domicilio social',
      colPhone: 'Teléfono',
      colEmail: 'Correo electrónico',
      noPhone: 'Telephone on request',
      jump: 'Ir a'
    },
    routing: 'Envíe aquí su consulta y la dirigiremos a la sociedad de GIRAF responsable de su mercado.',
    form: {
      title: 'Solicitar presupuesto',
      text: 'Describa brevemente su envío. Cuanto más precisos sean los datos, más fiable será el presupuesto.',
      firstName: 'Nombre',
      lastName: 'Apellidos',
      company: 'Empresa',
      email: 'Correo electrónico profesional',
      phone: 'Teléfono (opcional)',
      subject: 'Asunto',
      subjectOptions: [
        'Solicitud de presupuesto — transporte marítimo',
        'Solicitud de presupuesto — transporte aéreo',
        'Solicitud de presupuesto — transporte ferroviario',
        'Consulta sobre despacho de aduanas',
        'Consulta sobre almacenaje y distribución',
        'Consulta sobre financiación logística',
        'Pregunta sobre un envío en tránsito',
        'Otra consulta'
      ],
      route: 'Ruta (p. ej. Ningbo → Hamburgo)',
      cargo: 'Descripción de la mercancía',
      weight: 'Peso / volumen',
      timeline: 'Fecha objetivo',
      message: 'Mensaje',
      messagePlaceholder: 'Describa su envío: tipo de mercancía, embalaje, número de bultos y fecha objetivo.',
      consent:
        'Acepto que mis datos se almacenen y traten para gestionar mi consulta. Encontrará más información en la política de privacidad.',
      submit: 'Enviar consulta',
      sending: 'Preparando …',
      errors: {
        firstName: 'Introduzca su nombre.',
        lastName: 'Introduzca sus apellidos.',
        email: 'Introduzca una dirección de correo electrónico válida.',
        message: 'Describa brevemente su consulta.',
        consent: 'No podemos tramitar la consulta sin su consentimiento.'
      },
      successTitle: 'Su consulta está lista para enviarse.',
      success:
        'Hemos abierto su cliente de correo con los datos rellenados. Pulse enviar y llegará a nuestro equipo. Si no se ha abierto nada, copie los datos de abajo o escriba a',
      copy: 'Copiar datos',
      copied: 'Copiado al portapapeles'
    },
    direct: {
      title: '¿Prefiere hablar directamente?',
      text: 'Puede llamarnos por teléfono en horario de atención o escribirnos por correo en cualquier momento.'
    },
    claims: {
      title: 'Reclamaciones y daños en el transporte',
      text: 'Tenga a mano la referencia del envío y, si es posible, fotografías. Comunique los daños inmediatamente tras la recepción para que podamos cumplir los plazos frente a transportistas y aseguradoras.',
      cta: 'Comunicar un daño'
    },
    mapNote: 'Hamburger Straße 11 está en el barrio de Barmbek-Süd, a pocos minutos de la estación de metro Hamburger Straße.'
  },

  serviceDetail: {
    spec: 'Especificación',
    overview: 'Resumen',
    features: 'Qué incluye',
    advantages: 'Por qué funciona',
    allServices: 'Todos los servicios',
    more: 'Otros servicios de la cartera'
  },

  solutionDetail: {
    cargoType: 'Tipo de carga',
    contactNote: 'Envíenos la mercancía, la ruta y el plazo, y le diremos qué ruta es realista.',
    others: 'Otros tipos de carga'
  },

  imprint: {
    hero: {
      eyebrow: 'Legal',
      title: 'Aviso legal',
      text: 'Información conforme al art. 5 de la Ley alemana de Servicios Digitales (DDG) y al art. 18 del Tratado Interestatal de Medios (MStV). En caso de discrepancia, prevalece la versión alemana.',
      crumb: 'Aviso legal'
    },
    sections: {
      provider: 'Prestador de servicios',
      represented: 'Representado por',
      contact: 'Contacto',
      register: 'Registro mercantil',
      vat: 'Número de identificación a efectos del IVA',
      tax: 'Número de identificación fiscal',
      responsible: 'Responsable del contenido conforme al art. 18 (2) MStV',
      dispute: 'Resolución de litigios con consumidores',
      liability: 'Responsabilidad por el contenido',
      links: 'Responsabilidad por enlaces',
      copyright: 'Derechos de autor'
    },
    disputeText:
      'No estamos dispuestos ni obligados a participar en procedimientos de resolución de litigios ante una junta de arbitraje de consumo.',
    liabilityText:
      'Como prestador de servicios, somos responsables de nuestro propio contenido en estas páginas conforme al derecho general y al art. 7 (1) DDG. Sin embargo, conforme a los arts. 8 a 10 DDG, como prestador de servicios no estamos obligados a supervisar la información de terceros transmitida o almacenada ni a investigar circunstancias que indiquen una actividad ilícita. Las obligaciones de eliminar o bloquear el uso de información conforme al derecho general no se ven afectadas. La responsabilidad a este respecto solo es posible desde el momento en que se tiene conocimiento de una infracción concreta.',
    linksText:
      'Nuestro sitio web contiene enlaces a sitios web externos de terceros cuyo contenido no podemos influir. Por ello no asumimos ninguna garantía sobre ese contenido externo. El proveedor u operador de las páginas enlazadas es siempre responsable de su contenido. Las páginas enlazadas se revisaron en busca de posibles infracciones legales en el momento del enlace; en ese momento no se apreció contenido ilícito.',
    copyrightText:
      'El contenido y las obras creadas por los operadores del sitio en estas páginas están sujetos al derecho de autor alemán. La reproducción, edición, distribución y cualquier forma de explotación fuera de los límites de la ley de derechos de autor requieren el consentimiento por escrito del autor o creador correspondiente.'
  },

  privacy: {
    hero: {
      eyebrow: 'Legal',
      title: 'Política de privacidad',
      text: 'Información sobre el tratamiento de datos personales conforme a los arts. 13 y 14 del RGPD.',
      crumb: 'Privacidad'
    },
    intro:
      'La protección de sus datos personales nos importa. Esta política explica qué datos se tratan cuando visita este sitio web y con qué finalidad.',
    sections: [
      {
        h: '1. Responsable del tratamiento',
        p: 'El responsable del tratamiento de datos en este sitio web es Girafsail Logistics GmbH, Hamburger Straße 11, 22083 Hamburgo, Alemania. Puede contactar con nosotros en el +49 40 60429719-0 o por correo electrónico en info.de@girafsail-logistics.com.'
      },
      {
        h: '2. Archivos de registro del servidor',
        p: 'Cuando accede a este sitio web, nuestro proveedor de alojamiento registra automáticamente la información que transmite su navegador. Esto incluye la dirección IP, la fecha y la hora de la solicitud, la página consultada, el volumen de datos transferidos, el referente y su tipo de navegador y sistema operativo. Este tratamiento sirve para garantizar un funcionamiento sin incidencias y la seguridad del sistema sobre la base del art. 6 (1) (f) RGPD. Los datos de registro se eliminan tras un breve periodo.'
      },
      {
        h: '3. Contacto',
        p: 'Si se pone en contacto con nosotros por correo electrónico, teléfono o mediante el formulario de consulta, tratamos los datos que nos facilite (nombre, empresa, dirección de correo electrónico, número de teléfono, contenido de la consulta) para gestionar su solicitud. La base jurídica es el art. 6 (1) (b) RGPD para consultas contractuales y, en los demás casos, el art. 6 (1) (f) RGPD. El formulario de este sitio web no transmite datos a nuestro servidor: abre su cliente de correo local con los datos ya rellenados.'
      },
      {
        h: '4. Cookies y seguimiento',
        p: 'Este sitio web no utiliza cookies con fines analíticos o de marketing y no emplea ningún servicio de seguimiento. No se realiza elaboración de perfiles. La única información almacenada localmente en su navegador (localStorage) es el idioma seleccionado, para conservarlo en su próxima visita. Esta información nunca sale de su dispositivo.'
      },
      {
        h: '5. Contenido externo',
        p: 'Evitamos deliberadamente incrustar fuentes tipográficas, mapas o servicios analíticos externos. Por tanto, no se transmiten datos a terceros al cargar la página.'
      },
      {
        h: '6. Destinatarios y transferencias a terceros países',
        p: 'Sus datos no se venden. Solo se transmiten cuando es necesario para ejecutar una orden de transporte (por ejemplo, a transportistas, navieras o agentes de aduanas) o cuando existe una obligación legal. Para las transferencias a terceros países nos basamos en las cláusulas contractuales tipo de la Comisión Europea o en las excepciones legales del art. 49 RGPD.'
      },
      {
        h: '7. Plazo de conservación',
        p: 'Conservamos los datos personales únicamente durante el tiempo necesario para la finalidad correspondiente o mientras lo exijan los plazos legales de conservación. Los registros comerciales y fiscales se conservan de acuerdo con los §§ 238 y 257 del Código de Comercio alemán (HGB) y el § 147 de la Ordenanza Tributaria alemana (AO).'
      },
      {
        h: '8. Sus derechos',
        p: 'Tiene derecho a la información (art. 15 RGPD), la rectificación (art. 16), la supresión (art. 17), la limitación del tratamiento (art. 18), la portabilidad de los datos (art. 20) y la oposición al tratamiento (art. 21 RGPD). Puede revocar en cualquier momento todo consentimiento otorgado con efectos para el futuro.'
      },
      {
        h: '9. Derecho de reclamación',
        p: 'Tiene derecho a presentar una reclamación ante una autoridad de control. La autoridad competente en nuestro caso es el Comisionado de Hamburgo para la Protección de Datos y la Libertad de Información, Ludwig-Erhard-Straße 22, 20459 Hamburgo.'
      }
    ]
  },

  footer: {
    about:
      'GIRAF es la marca internacional de LONGSAIL International Logistics: transporte marítimo, aéreo y ferroviario, despacho de aduanas y almacenaje, prestados por nuestras propias sociedades en siete países y respaldados por más de 30 ubicaciones en todo el mundo.',
    servicesTitle: 'Servicios',
    companyTitle: 'Empresa',
    contactTitle: 'Contacto',
    newsletterTitle: 'Solicitar presupuesto',
    newsletterText: 'Envíenos la ruta, el peso y el plazo, y le responderemos con una tarifa y un plazo de tránsito.',
    legalNote:
      'Cada sociedad de GIRAF contrata para su propio mercado. Para la Unión Europea, los presupuestos, facturas y contratos los emite Girafsail Logistics GmbH conforme al derecho alemán.',
    rights: 'Todos los derechos reservados.'
  }
}
