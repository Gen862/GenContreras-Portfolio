// All site copy lives here so it can be edited without touching layout code.

import { publicPath } from './img'

export const CONTACT_EMAIL = 'contacto@migranteslibres.com'

export const profile = {
  name: 'Gen Contreras',
  role: 'Desarrollador Fullstack & Administrador Cloud',
  location: 'Porto, Portugal',
  motto: 'El éxito de la solución nace de la comprensión del problema.',
  bio: 'Soy un joven venezolano apasionado por los viajes y la creación de soluciones IT. Resido en Portugal, soy ingeniero en sistemas, artista y emprendedor. Desde 2019 construyo comunidades y marcas a través de soluciones digitales. En 2024 fundé, junto con mis socios, Migrantes Libres, un movimiento para migrantes. Soy nómada digital y me considero un eterno aprendiz de la verdad. En mí encontrarás confianza, proactividad, lealtad y autenticidad.',
}

export const cvDocuments = [
  {
    label: 'Descargar en Español',
    href: publicPath(
      'cv/Curriculum%20Vitae%20ESPA%C3%91OL%20-%20Gen%20Contreras.pdf',
    ),
  },
  {
    label: 'Descargar en Portugués',
    href: publicPath(
      'cv/Curriculum%20Vitae%20PORTUGUES%20-%20Gen%20Contreras.pdf',
    ),
  },
  {
    label: 'Descargar en Inglés',
    href: publicPath(
      'cv/Curriculum%20Vitae%20ENGLISH%20-%20Gen%20Contreras.pdf',
    ),
  },
] as const

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gen-contreras/' },
  { label: 'GitHub', href: 'https://github.com/Gen862' },
  { label: 'YouTube', href: 'https://www.youtube.com/@genlaelocuencia' },
  { label: 'Instagram', href: 'https://www.instagram.com/gen.laelocuencia/' },
] as const

export const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Arte & comunidad', href: '#arte-comunidad' },
  { label: 'Trayectoria', href: '#trayectoria' },
] as const

export const stats = [
  { value: 'Desde', label: '2020 Creando soluciones IT' },
  { value: '+35', label: 'Proyectos entregados' },
  { value: '+350', label: 'Personas formadas' },
  { value: '5', label: 'Negocios propios creados' },
] as const

export type ServiceIcon =
  'cloud' | 'code' | 'workflow' | 'chart' | 'cart' | 'graduation'

export const services: {
  icon: ServiceIcon
  title: string
  description: string
  tags: string[]
}[] = [
  {
    icon: 'cloud',
    title: 'Arquitectura & migración cloud',
    description:
      'Diseño infraestructuras en la nube seguras y escalables, y migro tus sistemas sin frenar tu operación.',
    tags: ['AWS', 'Azure', 'Google Cloud'],
  },
  {
    icon: 'code',
    title: 'Desarrollo web & aplicaciones',
    description:
      'Aplicaciones web y móviles rápidas, accesibles y listas para crecer, desde la idea hasta producción.',
    tags: ['React', 'Angular', 'Tailwind'],
  },
  {
    icon: 'workflow',
    title: 'Automatización & DevOps',
    description:
      'Administración de servidores Linux/Windows, scripting, integraciones por API y flujos automáticos que ahorran horas a tu equipo.',
    tags: ['Linux', 'Shell & PowerShell', 'SRE'],
  },
  {
    icon: 'chart',
    title: 'Datos & Business Intelligence',
    description:
      'Convierto tus datos en decisiones: ETL, consultas SQL y dashboards dinámicos para dirección.',
    tags: ['Power BI', 'SQL Server', 'Python'],
  },
  {
    icon: 'cart',
    title: 'CMS, LMS & e-commerce',
    description:
      'Tiendas, webs corporativas y comunidades de aprendizaje autogestionables con WordPress, WooCommerce y Moodle.',
    tags: ['WordPress', 'WooCommerce', 'Moodle'],
  },
  {
    icon: 'graduation',
    title: 'Consultoría & formación IT',
    description:
      'Acompaño a empresas y emprendedores en su transformación digital con consultoría y formación práctica.',
    tags: ['Estrategia', 'Masterclass', 'Mentoría'],
  },
]

export const stack = [
  {
    group: 'Desarrollo & frameworks',
    items: [
      'JavaScript',
      'Python',
      'React',
      'Java',
      'PHP',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'REST APIs',
      'Pruebas unitarias',
    ],
  },
  {
    group: 'Cloud, DevOps & SysAdmin',
    items: [
      'AWS',
      'Azure',
      'Google Cloud',
      'Linux Server',
      'Windows Server',
      'Shell Scripting',
      'PowerShell',
      'Fundamentos de SRE',
    ],
  },
  {
    group: 'Bases de datos & BI',
    items: [
      'SQL Server',
      'MySQL',
      'MariaDB',
      'Oracle',
      'Canalizaciones ETL',
      'Power BI',
      'Excel avanzado',
    ],
  },
  {
    group: 'Diseño & herramientas',
    items: [
      'Figma',
      'Adobe Creative Cloud',
      'GitHub',
      'Jira',
      'Trello',
      'Moodle',
      'WordPress',
      'Joomla',
      'Shopify',
      'Canva',
    ],
  },
]

export type ProjectCategory = 'desarrollo' | 'consultoria' | 'diseno'

export const projectFilters: {
  id: 'todos' | ProjectCategory
  label: string
}[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'desarrollo', label: 'Desarrollo' },
  { id: 'consultoria', label: 'Formación & consultoría' },
  { id: 'diseno', label: 'Branding de marca y Coach' },
]

const projectCards: {
  title: string
  subtitle: string
  category: ProjectCategory
  image: string
  href?: string
  featured?: boolean
}[] = [
  {
    title: 'Grúas Torito',
    subtitle: 'Web corporativa y Google ADS',
    category: 'desarrollo',
    image: 'gruastorito.png',
    href: 'https://gruastorito.com/',
    featured: true,
  },
  {
    title: 'Huellatina',
    subtitle: 'Cooperativa Luso-latina',
    category: 'desarrollo',
    image: 'huellatina.png',
    href: 'https://www.huellatina.org',
  },
  {
    title: 'Douglas Blanco',
    subtitle: 'Marca personal con CMS',
    category: 'desarrollo',
    image: 'douglas.png',
    href: 'https://www.douglasblanco.com',
  },
  {
    title: 'Travel Web',
    subtitle: 'Repositorio creado con Tailwind',
    category: 'desarrollo',
    image: 'travel web.png',
    href: 'https://github.com/Gen862/Travel-Web.git',
  },
  {
    title: 'CRM Migrantes Libres',
    subtitle: 'Plataforma CRM para gestión de clientes',
    category: 'desarrollo',
    image: 'crm.png',
    href: 'https://crm-migranteslibres.vercel.app/',
  },
  {
    title: 'Agencia de marketing 360',
    subtitle: 'Desarrollo propio hecho a la medida',
    category: 'desarrollo',
    image: 'agencia-optimized.webp',
    href: 'https://migranteslibres.com/agencia/',
  },
  {
    title: 'Conferencia en áreas de TI',
    subtitle: 'Herramientas Digitales para Emprendedores',
    category: 'consultoria',
    image: 'p-9.jpg',
    href: 'https://youtu.be/2ECH7H5z2-k?si=DqcgVmh31WLXMxwO',
  },
  {
    title: 'Entrenamiento grupal',
    subtitle: 'Para emprendedores y profesionales',
    category: 'consultoria',
    image: 'p-3.png',
    href: 'https://youtu.be/KJpGc1UHOpc?si=1hwhM-yc0QLZmrTl',
  },
  {
    title: 'Consultoría personalizada',
    subtitle: 'Claridad, dirección y un plan de implementación',
    category: 'consultoria',
    image: 'consultoria.png',
  },
  {
    title: 'Conferencia de ventas',
    subtitle: 'Evento en Bogotá, Colombia',
    category: 'consultoria',
    image: 'p-6.jpg',
  },
  {
    title: 'Branding Migrantes Libres',
    subtitle: 'Identidad de agencia',
    category: 'diseno',
    image: 'branding.jpg',
    href: 'https://migranteslibres.com/agencia/',
  },
  {
    title: 'Logotipos',
    subtitle: 'Diseños personalizados',
    category: 'diseno',
    image: 'p-2.jpg',
  },
  {
    title: 'Diseño & publicidad',
    subtitle: 'Flyers, tráfico e invitaciones',
    category: 'diseno',
    image: 'p-8.jpg',
  },
  {
    title: 'Eli Coach',
    subtitle: 'Branding de marca y Coach',
    category: 'desarrollo',
    image: 'Eli coach transformacional.png',
    href: 'https://elicoachtransformacional.com/',
  },
  {
    title: 'Claudia Vásquez',
    subtitle: 'Asesora de imagen y marca',
    category: 'desarrollo',
    image: 'Claudia.png',
    href: 'https://clauvasquezasesoradeimagen.com/',
  },
  {
    title: 'E-commerce',
    subtitle: 'Tienda online con WooCommerce',
    category: 'desarrollo',
    image: 'p-1-3.jpg',
  },
  {
    title: 'Te Queremos',
    subtitle: 'Plataforma web con E-commerce en Europa',
    category: 'desarrollo',
    image: 'tequeremos.png',
    href: 'https://tequeremos.net/',
  },
  {
    title: 'Alma Candel',
    subtitle: 'Creación de Marca completa y sistema web',
    category: 'desarrollo',
    image: 'agency-almacandel.png',
    href: 'https://almacandel.com/',
  },
  {
    title: 'Yerbabuena',
    subtitle: 'E-commerce de productos latinos en Portugal',
    category: 'desarrollo',
    image: 'agency-yerbabuena.png',
    href: 'https://yerbabuena.eu/',
  },
  {
    title: 'Wayra Raízes',
    subtitle: 'E-commerce de joyería artesanal en Portugal',
    category: 'desarrollo',
    image: 'agency-wayra.png',
    href: 'https://wayraraizes.com/',
  },
  {
    title: 'Publicidad digital',
    subtitle: 'Campañas en Meta Ads y Google Ads',
    category: 'diseno',
    image: 'publicidad.png',
  },
]

type ProjectNarrative = {
  requirement: string
  solution: string
  achievement: string
}

type LocalizedProjectNarrative = Record<'es' | 'pt' | 'en', ProjectNarrative>

const projectNarratives: Record<string, LocalizedProjectNarrative> = {
  'Grúas Torito': {
    es: {
      requirement: 'Presentar los servicios de grúa y captar consultas online.',
      solution: 'Web corporativa acompañada de campañas de Google Ads.',
      achievement: 'Presencia digital y campañas activas para atraer clientes.',
    },
    pt: {
      requirement: 'Apresentar os serviços de reboque e captar pedidos online.',
      solution: 'Site empresarial acompanhado por campanhas Google Ads.',
      achievement: 'Presença digital e campanhas ativas para atrair clientes.',
    },
    en: {
      requirement: 'Present towing services and receive enquiries online.',
      solution: 'Corporate website supported by Google Ads campaigns.',
      achievement:
        'A digital presence and active campaigns to attract clients.',
    },
  },
  Huellatina: {
    es: {
      requirement:
        'Centralizar herramientas para apoyar la integración de inmigrantes en Portugal.',
      solution:
        'Plataforma escalable con e-commerce, agenda online, newsletter, CRM, portal de empleo, automatizaciones y más de 70 páginas CMS.',
      achievement:
        'Centro de operaciones digital para la cooperativa, con un equipo técnico formado y más de 70 páginas publicadas.',
    },
    pt: {
      requirement:
        'Centralizar ferramentas para apoiar a integração de imigrantes em Portugal.',
      solution:
        'Plataforma escalável com e-commerce, agenda online, newsletter, CRM, portal de emprego, automatizações e mais de 70 páginas CMS.',
      achievement:
        'Centro de operações digital para a cooperativa, com equipa técnica formada e mais de 70 páginas publicadas.',
    },
    en: {
      requirement:
        'Centralize tools that support immigrants settling in Portugal.',
      solution:
        'A scalable platform with e-commerce, online scheduling, newsletter, CRM, job portal, automations and 70+ CMS pages.',
      achievement:
        'A digital operations hub for the cooperative, with a trained technical team and 70+ published pages.',
    },
  },
  'Douglas Blanco': {
    es: {
      requirement:
        'Presentar una marca personal con contenido fácil de editar.',
      solution: 'Sitio personal con CMS para gestionar sus contenidos.',
      achievement: 'Un canal web propio para mostrar su perfil y contenidos.',
    },
    pt: {
      requirement:
        'Apresentar uma marca pessoal com conteúdos fáceis de editar.',
      solution: 'Site pessoal com CMS para gerir os seus conteúdos.',
      achievement: 'Um canal web próprio para apresentar o perfil e conteúdos.',
    },
    en: {
      requirement: 'Showcase a personal brand with easy-to-edit content.',
      solution: 'A personal website with a CMS to manage its content.',
      achievement: 'A dedicated website to present the profile and content.',
    },
  },
  'Travel Web': {
    es: {
      requirement: 'Crear una presencia digital para una agencia de viajes.',
      solution: 'Interfaz web construida con Tailwind CSS.',
      achievement:
        'Proyecto web de viajes disponible en un repositorio público.',
    },
    pt: {
      requirement: 'Criar uma presença digital para uma agência de viagens.',
      solution: 'Interface web construída com Tailwind CSS.',
      achievement: 'Projeto web de viagens disponível num repositório público.',
    },
    en: {
      requirement: 'Create a digital presence for a travel agency.',
      solution: 'A web interface built with Tailwind CSS.',
      achievement: 'A travel website project available in a public repository.',
    },
  },
  'E-commerce': {
    es: {
      requirement: 'Vender productos y gestionar pedidos por internet.',
      solution: 'Tienda online basada en WooCommerce.',
      achievement: 'Canal de venta online autogestionable.',
    },
    pt: {
      requirement: 'Vender produtos e gerir encomendas online.',
      solution: 'Loja online baseada em WooCommerce.',
      achievement: 'Canal de vendas online de gestão autónoma.',
    },
    en: {
      requirement: 'Sell products and manage orders online.',
      solution: 'An online store built with WooCommerce.',
      achievement: 'A self-managed online sales channel.',
    },
  },
  'Agencia de marketing 360': {
    es: {
      requirement:
        'Reunir servicios de presencia digital y marketing para emprendedores.',
      solution:
        'Sitio propio a medida para presentar los servicios de Agencia Migrante.',
      achievement:
        'Un canal digital propio para descubrir y contratar sus servicios.',
    },
    pt: {
      requirement:
        'Reunir serviços de presença digital e marketing para empreendedores.',
      solution:
        'Site próprio e personalizado para apresentar os serviços da Agencia Migrante.',
      achievement:
        'Um canal digital próprio para conhecer e contratar os serviços.',
    },
    en: {
      requirement:
        'Bring digital presence and marketing services together for entrepreneurs.',
      solution: 'A custom website presenting Agencia Migrante services.',
      achievement:
        'A dedicated digital channel to explore and engage its services.',
    },
  },
  'Conferencia en áreas de TI': {
    es: {
      requirement: 'Acercar herramientas digitales útiles a emprendedores.',
      solution:
        'Conferencia práctica sobre herramientas digitales para emprender.',
      achievement:
        'Conocimiento y recursos digitales compartidos con la audiencia.',
    },
    pt: {
      requirement: 'Apresentar ferramentas digitais úteis a empreendedores.',
      solution:
        'Conferência prática sobre ferramentas digitais para empreender.',
      achievement:
        'Conhecimento e recursos digitais partilhados com o público.',
    },
    en: {
      requirement: 'Introduce entrepreneurs to useful digital tools.',
      solution: 'A practical conference on digital tools for entrepreneurs.',
      achievement: 'Shared digital knowledge and resources with the audience.',
    },
  },
  'Entrenamiento grupal': {
    es: {
      requirement:
        'Ofrecer formación práctica a emprendedores y profesionales.',
      solution:
        'Entrenamientos grupales adaptados a necesidades profesionales.',
      achievement:
        'Más de 350 personas formadas, según el indicador del portafolio.',
    },
    pt: {
      requirement:
        'Oferecer formação prática a empreendedores e profissionais.',
      solution: 'Formações em grupo adaptadas às necessidades profissionais.',
      achievement:
        'Mais de 350 pessoas formadas, segundo o indicador do portefólio.',
    },
    en: {
      requirement:
        'Provide practical training for entrepreneurs and professionals.',
      solution: 'Group training tailored to professional needs.',
      achievement:
        '350+ people trained, as reported in the portfolio statistic.',
    },
  },
  'Consultoría personalizada': {
    es: {
      requirement:
        'Convertir dudas de negocio en prioridades y próximos pasos.',
      solution:
        'Acompañamiento personalizado con dirección y plan de implementación.',
      achievement: 'Una ruta de trabajo clara y priorizada.',
    },
    pt: {
      requirement:
        'Transformar dúvidas de negócio em prioridades e próximos passos.',
      solution:
        'Acompanhamento personalizado com orientação e plano de implementação.',
      achievement: 'Um plano de trabalho claro e prioritário.',
    },
    en: {
      requirement: 'Turn business questions into priorities and next steps.',
      solution:
        'Personal consulting with direction and an implementation plan.',
      achievement: 'A clear, prioritized roadmap.',
    },
  },
  'Conferencia de ventas': {
    es: {
      requirement: 'Compartir ideas y herramientas para fortalecer las ventas.',
      solution: 'Conferencia presentada en un evento en Bogotá.',
      achievement: 'Contenido práctico llevado a un escenario internacional.',
    },
    pt: {
      requirement: 'Partilhar ideias e ferramentas para reforçar as vendas.',
      solution: 'Conferência apresentada num evento em Bogotá.',
      achievement: 'Conteúdo prático apresentado num evento internacional.',
    },
    en: {
      requirement: 'Share ideas and tools to strengthen sales.',
      solution: 'A conference delivered at an event in Bogotá.',
      achievement: 'Practical content presented at an international event.',
    },
  },
  'Branding Migrantes Libres': {
    es: {
      requirement: 'Construir una identidad coherente para la agencia.',
      solution: 'Desarrollo de la identidad visual de Migrantes Libres.',
      achievement: 'Una marca reconocible en sus canales digitales.',
    },
    pt: {
      requirement: 'Criar uma identidade coerente para a agência.',
      solution: 'Desenvolvimento da identidade visual da Migrantes Libres.',
      achievement: 'Uma marca reconhecível nos canais digitais.',
    },
    en: {
      requirement: 'Build a consistent identity for the agency.',
      solution: 'Development of Migrantes Libres visual identity.',
      achievement: 'A recognizable brand across its digital channels.',
    },
  },
  Logotipos: {
    es: {
      requirement: 'Distinguir cada marca con un símbolo propio.',
      solution: 'Diseño de logotipos personalizados.',
      achievement: 'Recursos visuales listos para usar en distintos canales.',
    },
    pt: {
      requirement: 'Distinguir cada marca com um símbolo próprio.',
      solution: 'Criação de logótipos personalizados.',
      achievement: 'Recursos visuais prontos para vários canais.',
    },
    en: {
      requirement: 'Give each brand a distinctive symbol.',
      solution: 'Custom logo design.',
      achievement: 'Visual assets ready for use across channels.',
    },
  },
  'Diseño & publicidad': {
    es: {
      requirement:
        'Crear piezas visuales y campañas para comunicar ofertas y eventos.',
      solution: 'Diseño de flyers, invitaciones y anuncios digitales.',
      achievement:
        'El CV reporta un aumento promedio del 40% en interacción para clientes de marketing digital.',
    },
    pt: {
      requirement:
        'Criar peças visuais e campanhas para comunicar ofertas e eventos.',
      solution: 'Criação de flyers, convites e anúncios digitais.',
      achievement:
        'O CV indica um aumento médio de 40% na interação dos clientes de marketing digital.',
    },
    en: {
      requirement: 'Create visual assets and campaigns for offers and events.',
      solution: 'Design of flyers, invitations and digital ads.',
      achievement:
        'The CV reports an average 40% increase in engagement for digital marketing clients.',
    },
  },
  'Eli Coach': {
    es: {
      requirement:
        'Presentar servicios de coaching y una marca personal en línea.',
      solution: 'Identidad de marca y sitio web para Eli Coach.',
      achievement: 'Una presencia digital para descubrir sus servicios.',
    },
    pt: {
      requirement:
        'Apresentar serviços de coaching e uma marca pessoal online.',
      solution: 'Identidade de marca e site para a Eli Coach.',
      achievement: 'Uma presença digital para conhecer os seus serviços.',
    },
    en: {
      requirement: 'Present coaching services and a personal brand online.',
      solution: 'Brand identity and website for Eli Coach.',
      achievement: 'A digital presence to explore its services.',
    },
  },
  'Claudia Vásquez': {
    es: {
      requirement:
        'Comunicar servicios de asesoría de imagen y marca personal.',
      solution: 'Sitio web para presentar su perfil y servicios.',
      achievement: 'Un punto de contacto digital para potenciales clientes.',
    },
    pt: {
      requirement:
        'Comunicar serviços de consultoria de imagem e marca pessoal.',
      solution: 'Site para apresentar o perfil e os serviços.',
      achievement: 'Um ponto de contacto digital para potenciais clientes.',
    },
    en: {
      requirement:
        'Communicate image consulting and personal branding services.',
      solution: 'A website presenting the profile and services.',
      achievement: 'A digital contact point for prospective clients.',
    },
  },
  'CRM Migrantes Libres': {
    es: {
      requirement:
        'Organizar la gestión de clientes en una plataforma central.',
      solution: 'Desarrollo de una plataforma CRM para Migrantes Libres.',
      achievement: 'Un espacio digital para gestionar relaciones con clientes.',
    },
    pt: {
      requirement: 'Organizar a gestão de clientes numa plataforma central.',
      solution:
        'Desenvolvimento de uma plataforma CRM para a Migrantes Libres.',
      achievement: 'Um espaço digital para gerir relações com clientes.',
    },
    en: {
      requirement: 'Organize client management in one central platform.',
      solution: 'Development of a CRM platform for Migrantes Libres.',
      achievement: 'A digital workspace for managing client relationships.',
    },
  },
  'Te Queremos': {
    es: {
      requirement: 'Vender productos en línea a clientes de Europa.',
      solution: 'Plataforma web con e-commerce.',
      achievement: 'Un canal de comercio electrónico para el mercado europeo.',
    },
    pt: {
      requirement: 'Vender produtos online a clientes na Europa.',
      solution: 'Plataforma web com e-commerce.',
      achievement: 'Um canal de comércio eletrónico para o mercado europeu.',
    },
    en: {
      requirement: 'Sell products online to customers in Europe.',
      solution: 'A website with e-commerce.',
      achievement: 'An e-commerce channel for the European market.',
    },
  },
  'Alma Candel': {
    es: {
      requirement: 'Crear una marca y una plataforma digital desde cero.',
      solution: 'Desarrollo de identidad de marca y sistema web.',
      achievement: 'Un ecosistema digital alineado con la marca.',
    },
    pt: {
      requirement: 'Criar uma marca e uma plataforma digital de raiz.',
      solution: 'Desenvolvimento da identidade da marca e do sistema web.',
      achievement: 'Um ecossistema digital alinhado com a marca.',
    },
    en: {
      requirement: 'Create a brand and digital platform from the ground up.',
      solution: 'Development of a brand identity and web system.',
      achievement: 'A digital ecosystem aligned with the brand.',
    },
  },
  Yerbabuena: {
    es: {
      requirement: 'Vender productos latinos a clientes desde Portugal.',
      solution: 'Tienda online para productos latinos.',
      achievement:
        'Un canal digital de comercio para llegar a clientes en Portugal.',
    },
    pt: {
      requirement: 'Vender produtos latino-americanos a partir de Portugal.',
      solution: 'Loja online de produtos latino-americanos.',
      achievement:
        'Um canal digital de comércio para chegar a clientes em Portugal.',
    },
    en: {
      requirement: 'Sell Latin American products to customers from Portugal.',
      solution: 'An online store for Latin American products.',
      achievement: 'A digital sales channel reaching customers in Portugal.',
    },
  },
  'Wayra Raízes': {
    es: {
      requirement: 'Presentar y vender joyería artesanal en línea.',
      solution: 'Tienda digital para una marca de joyería artesanal.',
      achievement: 'Un canal online para descubrir y comprar sus piezas.',
    },
    pt: {
      requirement: 'Apresentar e vender joalharia artesanal online.',
      solution: 'Loja digital para uma marca de joalharia artesanal.',
      achievement: 'Um canal online para descobrir e comprar as peças.',
    },
    en: {
      requirement: 'Showcase and sell handcrafted jewelry online.',
      solution: 'A digital store for a handcrafted jewelry brand.',
      achievement: 'An online channel to discover and purchase its pieces.',
    },
  },
  'Publicidad digital': {
    es: {
      requirement:
        'Aumentar la visibilidad de marcas y atraer clientes potenciales.',
      solution:
        'Planificación y gestión de campañas publicitarias en Meta Ads y Google Ads.',
      achievement:
        'Campañas en redes sociales y buscadores orientadas a los objetivos del negocio.',
    },
    pt: {
      requirement:
        'Aumentar a visibilidade das marcas e atrair potenciais clientes.',
      solution:
        'Planeamento e gestão de campanhas publicitárias no Meta Ads e Google Ads.',
      achievement:
        'Campanhas nas redes sociais e nos motores de busca orientadas aos objetivos do negócio.',
    },
    en: {
      requirement: 'Increase brand visibility and attract potential customers.',
      solution:
        'Planning and management of advertising campaigns on Meta Ads and Google Ads.',
      achievement:
        'Social media and search campaigns focused on business goals.',
    },
  },
}

export const projects = projectCards.map((project) => {
  const details = projectNarratives[project.title]
  if (!details) {
    throw new Error(`Missing project details for "${project.title}".`)
  }
  return { ...project, details }
})

export const huellatinaPhotos = [
  {
    image: 'huellatina-talk.jpeg',
    alt: 'Foto de Gen presentando en un evento de Huellatina',
  },
  {
    image: 'huellatina-team-1.jpeg',
    alt: 'Encuentro de la comunidad de Huellatina en Porto',
  },
  {
    image: 'huellatina-team-2.jpg',
    alt: 'Comunidad de Huellatina durante un evento para emprendedores',
  },
  {
    image: 'huellatina-team-3.jpg',
    alt: 'Jornada de trabajo voluntario con Huellatina',
  },
  {
    image: 'huellatina-team-4.jpg',
    alt: 'Participantes de una actividad comunitaria de Huellatina',
  },
  {
    image: 'huellatina-team-5.jpeg',
    alt: 'Equipo de Huellatina en una actividad comunitaria',
  },
] as const

export const artistPlaylists = [
  {
    title: 'Agilidad Mental — El Arte del Freestyle',
    description: 'Explora mi playlist de freestyle en YouTube.',
    videoId: '9HrnhZ0eC00',
    playlistId: 'PLuUaIVIeTkRIAhwvS67rbJZMlxGxRgMsz',
  },
  {
    title: 'Escritos — Poesía Moderna',
    description: 'Poemas y escritos en mi canal de YouTube.',
    videoId: 'uDK73ZG7kbI',
    playlistId: 'PLuUaIVIeTkRLaT-zytpCqoTA4IO_XtKPu',
  },
] as const

export const workProcess = [
  {
    title: 'Diagnóstico',
    description:
      'Entiendo tu negocio, tus usuarios y el problema real antes de proponer tecnología.',
  },
  {
    title: 'Arquitectura',
    description:
      'Defino la solución, el stack y el presupuesto: viable hoy y escalable mañana.',
  },
  {
    title: 'Desarrollo & despliegue',
    description:
      'Construyo por iteraciones, con entregas visibles y despliegue continuo en la nube.',
  },
  {
    title: 'Soporte & evolución',
    description:
      'Mido resultados, reporto avances y sigo optimizando de principio a fin.',
  },
]

export const experience: {
  period: string
  role: string
  company: string
  href?: string
  place: string
  result: string
  points: string[]
}[] = [
  {
    period: 'Mar 2025 — Actual',
    role: 'Líder Desarrollador de Proyectos',
    company: 'Huellatina',
    href: 'https://www.huellatina.org',
    place: 'Oporto, Portugal',
    result:
      'Centro de operaciones centralizado para apoyar a inmigrantes en su integración y establecimiento en Portugal.',
    points: [
      'Liderazgo técnico de equipos multidisciplinarios de diseño, arquitectura de software y desarrollo.',
      'Diseñé la arquitectura y el núcleo escalable del sistema web y capacité a un equipo de pasantes.',
      'E-commerce, agenda en línea, newsletter, portal de empleo, integraciones con API de CRM y más de 70 páginas CMS.',
      'Metodologías ágiles, revisiones de calidad de código y diseño, y reportes diarios de progreso.',
    ],
  },
  {
    period: 'Ene 2024 — Actual',
    role: 'Desarrollador Fundador',
    company: 'Migrantes Libres',
    href: 'https://migranteslibres.com',
    place: 'Oporto, Portugal',
    result:
      'Crecimiento exponencial de la marca y habilitación digital de cientos de emprendedores, con un 100% de disponibilidad.',
    points: [
      'Concepción, desarrollo, gestión y mantenimiento de todo el ecosistema digital de la organización.',
      'Arquitectura web adaptativa y accesible con JavaScript, React y HTML5/CSS3, con optimización continua de SEO y rendimiento.',
      'Herramientas y automatizaciones que redujeron costos y tiempos operativos.',
    ],
  },
  {
    period: 'Sep 2020 — Oct 2023',
    role: 'Webmaster y Desarrollador de Software',
    company: 'Corprefer SAS',
    href: 'https://corprefer.com/',
    place: 'Medellín, Colombia',
    result:
      '35% de optimización en flujos de comunicación automatizada y soporte a comunidades de aprendizaje virtual a gran escala.',
    points: [
      'Aplicaciones web CRUD, integración de APIs de terceros y automatización de marketing digital.',
      'React, JavaScript y PHP con pruebas unitarias y modelado de bases de datos relacionales.',
      'Automatización de email marketing y soporte a usuarios en Moodle/LMS.',
    ],
  },
  {
    period: 'Ene 2020 — Ago 2020',
    role: 'Analista de Datos',
    company: 'Comfama',
    href: 'https://www.comfama.com/',
    place: 'Medellín, Colombia',
    result:
      'Mejor toma de decisiones estratégicas de dirección gracias al procesamiento automatizado de datos.',
    points: [
      'Análisis de datos empresariales, métricas de rendimiento y paneles dinámicos.',
      'Canalizaciones ETL, consultas SQL avanzadas y modelado visual en Power BI, Excel y SQL Server.',
    ],
  },
  {
    period: 'Ene 2019 — Dic 2019',
    role: 'Diseño Gráfico y Marketing Digital',
    company: 'Freelance',
    place: 'Medellín, Colombia',
    result:
      'Marcas comerciales a medida y un aumento promedio del 40% en la interacción en redes sociales.',
    points: [
      'Identidades visuales completas, campañas de marketing digital y contenido multimedia.',
      'Adobe Creative Cloud, Figma, Canva y tráfico pagado con Google Ads.',
    ],
  },
]

export const education = [
  {
    period: '2026 — 2027',
    title:
      'AWS re/Start: Computación en la Nube, SRE y Administración de Redes',
    place: 'CESAE · Oporto',
  },
  {
    period: '2024 — 2025',
    title: 'Técnico Especialista en Programación y Sistemas de Información',
    place: 'IEFP · Oporto',
  },
  {
    period: '2022 — 2023',
    title: 'Especialización en Ciencia de Datos',
    place: 'Platzi',
  },
  {
    period: '2021',
    title: 'Técnico en Programación de Aplicaciones Móviles',
    place: 'Universidad Autónoma de Bucaramanga',
  },
  {
    period: '2020 — 2022',
    title: 'Técnico en Desarrollo de Software',
    place: 'CESDE',
  },
  {
    period: '2013 — 2016',
    title: 'Técnico Especialista en Tributación y Fiscalidad',
    place: 'ISUM',
  },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Portugués', level: 'C1' },
  { name: 'Inglés', level: 'B1/B2' },
]

export const testimonials = [
  {
    name: 'Andrew Gallego Ibarra',
    role: 'Gestor de proyectos & Team Leader',
    quote:
      'Profesional integral. Excelente proactividad y con amplio dominio del área.',
    image: 't-1.jpg',
  },
  {
    name: 'Paula Andrea Soto Alvarado',
    role: 'Gerente de proyectos',
    quote:
      'Una persona amable, responsable y siempre orientada a cumplir con sus metas organizacionales.',
    image: 't-2.jpg',
  },
  {
    name: 'Sergio Jaramillo Arango',
    role: 'Consultor',
    quote: 'Gen es un trabajador diligente y dedicado.',
    image: 't-3.jpg',
  },
  {
    name: 'Lina María González Franco',
    role: 'Administradora de empresas y psicóloga',
    quote: 'Orientado a dar lo mejor de él y cumplir los objetivos del equipo.',
    image: 't-4.jpg',
  },
]

export const videoTestimonials = [
  {
    name: 'Dayana',
    src: 'https://migranteslibres.com/wp-content/uploads/2026/10/dayana.mp4',
    poster: 'testimonial-dayana.jpg',
  },
  {
    name: 'Deisy',
    src: 'https://migranteslibres.com/wp-content/uploads/2026/10/deisy.mp4',
    poster: 'testimonial-deisy.jpg',
  },
  {
    name: 'Roxana',
    src: 'https://migranteslibres.com/wp-content/uploads/2026/10/clienta.mp4',
    poster: 'testimonial-roxana.jpg',
  },
  {
    name: 'Ana',
    src: 'https://migranteslibres.com/wp-content/uploads/2026/10/ana.mp4',
    poster: 'testimonial-ana.jpg',
  },
  {
    name: 'Breth',
    src: 'https://migranteslibres.com/wp-content/uploads/2026/10/breth.mp4',
    poster: 'testimonial-breth.jpg',
  },
] as const
