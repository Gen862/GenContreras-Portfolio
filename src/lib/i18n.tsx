import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'

export type Language = 'es' | 'pt' | 'en'
type Translate = (text: string) => string

export function isLanguage(value: string): value is Language {
  return value === 'es' || value === 'pt' || value === 'en'
}

let currentLanguage: Language = 'es'
const languageListeners = new Set<() => void>()

function subscribeToLanguage(listener: () => void) {
  languageListeners.add(listener)
  const onStorage = () => listener()
  window.addEventListener('storage', onStorage)

  return () => {
    languageListeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function getSavedLanguage(): Language {
  try {
    const savedLanguage = window.localStorage.getItem('portfolio-language')
    if (savedLanguage && isLanguage(savedLanguage)) {
      currentLanguage = savedLanguage
    }
  } catch (error) {
    console.error('Could not load the saved portfolio language.', error)
  }

  return currentLanguage
}

function chooseLanguage(language: Language) {
  currentLanguage = language
  try {
    window.localStorage.setItem('portfolio-language', language)
  } catch (error) {
    console.error('Could not save the selected portfolio language.', error)
  }
  languageListeners.forEach((listener) => listener())
}

const translations: Record<Exclude<Language, 'es'>, Record<string, string>> = {
  en: {
    Idioma: 'Language',
    Español: 'Spanish',
    Portugués: 'Portuguese',
    Inglés: 'English',
    Stack: 'Tech stack',
    Proyectos: 'Projects',
    Proceso: 'Process',
    Trayectoria: 'Experience',
    'Sobre mí': 'About me',
    'Arte & comunidad': 'Art & community',
    'Cotizar proyecto': 'Request a quote',
    Menú: 'Menu',
    'Navega por las secciones del portafolio.':
      'Browse the portfolio sections.',
    'Saltar al contenido': 'Skip to content',
    'Disponible para nuevos proyectos · Porto, Portugal':
      'Available for new projects · Porto, Portugal',
    'Soluciones Digitales para tus ideas y procesos tradicionales':
      'Digital solutions for your ideas and traditional processes',
    'Soy Gen Contreras, desarrollador fullstack y administrador cloud. Diseño, construyo y despliego soluciones IT escalables, desde la infraestructura en AWS, Azure o Google Cloud hasta la web que ven tus clientes.':
      'I am Gen Contreras, a full-stack developer and cloud administrator. I design, build and deploy scalable IT solutions, from AWS, Azure or Google Cloud infrastructure to the websites your customers use.',
    'Cotiza tu proyecto': 'Get a project quote',
    'Ver proyectos': 'View projects',
    'Desarrollo full-stack': 'Full-stack development',
    'Escalable desde el día 1': 'Scalable from day one',
    '1.ª consulta gratis': 'First consultation is free',
    'Sin compromiso': 'No commitment',
    'En cifras': 'At a glance',
    'Construyendo soluciones IT': 'Building IT solutions',
    'Proyectos entregados': 'Projects delivered',
    'Flujos optimizados con automatización':
      'Workflows optimized through automation',
    'Nubes: AWS, Azure y GCP': 'Cloud platforms: AWS, Azure and GCP',
    Servicios: 'Services',
    'Todo lo que necesitas para': 'Everything you need to',
    'digitalizar y escalar': 'go digital and scale',
    'Un único aliado técnico para llevar tu proyecto de la idea a la nube: arquitectura, desarrollo, datos y acompañamiento.':
      'One technical partner to take your project from idea to cloud: architecture, development, data and guidance.',
    'Arquitectura & migración cloud': 'Cloud architecture & migration',
    'Diseño infraestructuras en la nube seguras y escalables, y migro tus sistemas sin frenar tu operación.':
      'I design secure, scalable cloud infrastructure and migrate your systems without disrupting your operations.',
    'Desarrollo web & aplicaciones': 'Web & application development',
    'Aplicaciones web y móviles rápidas, accesibles y listas para crecer, desde la idea hasta producción.':
      'Fast, accessible web and mobile apps built to grow, from concept through production.',
    'Automatización & DevOps': 'Automation & DevOps',
    'Administración de servidores Linux/Windows, scripting, integraciones por API y flujos automáticos que ahorran horas a tu equipo.':
      'Linux/Windows server administration, scripting, API integrations and automated workflows that save your team hours.',
    'Datos & Business Intelligence': 'Data & business intelligence',
    'Convierto tus datos en decisiones: ETL, consultas SQL y dashboards dinámicos para dirección.':
      'I turn data into decisions with ETL pipelines, SQL queries and dynamic dashboards for leadership.',
    'CMS, LMS & e-commerce': 'CMS, LMS & e-commerce',
    'Tiendas, webs corporativas y comunidades de aprendizaje autogestionables con WordPress, WooCommerce y Moodle.':
      'Self-managed stores, corporate websites and learning communities built with WordPress, WooCommerce and Moodle.',
    'Consultoría & formación IT': 'IT consulting & training',
    'Acompaño a empresas y emprendedores en su transformación digital con consultoría y formación práctica.':
      'I guide businesses and entrepreneurs through digital transformation with consulting and practical training.',
    'Infraestructura que escala con tu demanda, sin sobrecostes':
      'Infrastructure that scales with demand, without overspending',
    'Despliegues automáticos y entornos de prueba por cada cambio':
      'Automated deployments and test environments for every change',
    'Seguridad, copias y monitorización desde el primer día':
      'Security, backups and monitoring from day one',
    'Rendimiento global: tu web cerca de cada usuario':
      'Global performance: your website close to every user',
    'Tu infraestructura,': 'Your infrastructure,',
    'lista para crecer': 'ready to grow',
    'Llevo tus aplicaciones a la nube con una arquitectura pensada para el rendimiento, la seguridad y el control de costes. Sin servidores que mantener, sin sorpresas.':
      'I move your applications to the cloud using architecture designed for performance, security and cost control. No servers to maintain, no surprises.',
    'Planifiquemos tu migración': 'Let us plan your migration',
    'Stack tecnológico': 'Technology stack',
    'Herramientas que': 'Tools I',
    'domino a diario': 'use every day',
    'La tecnología adecuada para cada problema, no al revés.':
      'The right technology for each problem, not the other way around.',
    'Desarrollo & frameworks': 'Development & frameworks',
    'Pruebas unitarias': 'Unit testing',
    'Cloud, DevOps & SysAdmin': 'Cloud, DevOps & systems administration',
    'Fundamentos de SRE': 'SRE fundamentals',
    'Bases de datos & BI': 'Databases & BI',
    'Canalizaciones ETL': 'ETL pipelines',
    'Excel avanzado': 'Advanced Excel',
    'Diseño & herramientas': 'Design & tools',
    Portafolio: 'Portfolio',
    'Proyectos que': 'Projects that',
    'ya están funcionando': 'are already making an impact',
    'Webs corporativas, e-commerce, plataformas y formación para empresas reales en Europa y Latinoamérica.':
      'Corporate websites, e-commerce, platforms and training for real businesses in Europe and Latin America.',
    Todos: 'All',
    Desarrollo: 'Development',
    'Formación & consultoría': 'Training & consulting',
    'Diseño & marketing': 'Design & marketing',
    'Grúas Torito': 'Grúas Torito',
    'Web corporativa responsive con CMS':
      'Responsive corporate website with a CMS',
    Huellatina: 'Huellatina',
    'Plataforma para cooperativa': 'Platform for a cooperative',
    'Douglas Blanco': 'Douglas Blanco',
    'Marca personal con CMS': 'Personal brand website with a CMS',
    'Travel Web': 'Travel website',
    'Agencia de viajes con Tailwind':
      'Travel agency website built with Tailwind',
    'E-commerce': 'E-commerce',
    'Tienda online con WooCommerce': 'Online store built with WooCommerce',
    'Agencia de marketing digital': 'Digital marketing agency',
    'Desarrollo a medida': 'Custom development',
    Masterclass: 'Masterclass',
    'Herramientas para aumentar tu valor':
      'Tools to increase your professional value',
    'Clase de oratoria': 'Public speaking class',
    'Potencia tus discursos con IA': 'Enhance your speeches with AI',
    Conferencia: 'Conference',
    'Evento en Bogotá, Colombia': 'Event in Bogotá, Colombia',
    'Branding Migrantes Libres': 'Migrantes Libres branding',
    'Identidad de agencia': 'Agency brand identity',
    Logotipos: 'Logos',
    'Diseños personalizados': 'Custom designs',
    'Diseño & publicidad': 'Design & advertising',
    'Flyers, tráfico e invitaciones': 'Flyers, paid traffic and invitations',
    'Publicidad digital': 'Digital advertising',
    'Campañas en Meta Ads y Google Ads': 'Meta Ads and Google Ads campaigns',
    'Agencia Migrante': 'Agencia Migrante',
    'Agencia propia de marketing digital':
      'Digital marketing agency co-founded and managed by Gen',
    'Marca personal de Eli Coach': 'Eli Coach personal brand',
    'Branding e identidad visual': 'Branding and visual identity',
    'Alma Candel': 'Alma Candel',
    'Proyecto web para una marca creativa':
      'Website project for a creative brand',
    Yerbabuena: 'Yerbabuena',
    'Presencia digital para una marca natural':
      'Digital presence for a natural products brand',
    'Wayra Raízes': 'Wayra Raízes',
    'Marca digital de joyería artesanal':
      'Digital brand for artisanal jewellery',
    'Co-fundé y gestiono Agencia Migrante, un equipo que ayuda a emprendedores y pequeñas empresas a construir su presencia digital. Reunimos branding e identidad, landing pages y marketing digital en servicios prácticos, adaptados a cada etapa del negocio.':
      'I co-founded and manage Agencia Migrante, a team helping entrepreneurs and small businesses build their digital presence. We bring together branding and identity, landing pages, and digital marketing in practical services tailored to each stage of a business.',
    'Conoce Agencia Migrante': 'Discover Agencia Migrante',
    'Cómo trabajo': 'How I work',
    'Un proceso claro,': 'A clear process,',
    'de principio a fin': 'from start to finish',
    'El éxito de la solución nace de la comprensión del problema.':
      'The right solution starts with understanding the problem.',
    Diagnóstico: 'Discovery',
    'Entiendo tu negocio, tus usuarios y el problema real antes de proponer tecnología.':
      'I understand your business, users and the real problem before recommending technology.',
    Arquitectura: 'Architecture',
    'Defino la solución, el stack y el presupuesto: viable hoy y escalable mañana.':
      'I define the solution, technology stack and budget: viable today and scalable tomorrow.',
    'Desarrollo & despliegue': 'Development & deployment',
    'Construyo por iteraciones, con entregas visibles y despliegue continuo en la nube.':
      'I build iteratively, with visible milestones and continuous cloud deployment.',
    'Soporte & evolución': 'Support & improvement',
    'Mido resultados, reporto avances y sigo optimizando de principio a fin.':
      'I measure results, report progress and keep improving from start to finish.',
    'Automatizo lo repetitivo': 'I automate repetitive work',
    'Pipelines de despliegue, integraciones entre plataformas y comunicaciones automáticas para que tu equipo se concentre en lo que aporta valor.':
      'Deployment pipelines, platform integrations and automated communications help your team focus on what matters.',
    'Experiencia que': 'Experience that',
    'respalda cada entrega': 'backs every delivery',
    Experiencia: 'Experience',
    Formación: 'Education',
    Idiomas: 'Languages',
    Nativo: 'Native',
    'Venezolano en Portugal, emprendedor y fundador de Migrantes Libres. Uno desarrollo fullstack, administración de sistemas y soluciones cloud con visión estratégica, experiencia de usuario y mejora continua de procesos.':
      'A Venezuelan in Portugal, entrepreneur and founder of Migrantes Libres. I bring together full-stack development, systems administration and cloud solutions with strategic thinking, user experience and continuous improvement.',
    'Descargar CV': 'Download CV',
    'Descargar en Español': 'Download in Spanish',
    'Descargar en Portugués': 'Download in Portuguese',
    'Descargar en Inglés': 'Download in English',
    Requerimiento: 'Requirement',
    Solución: 'Solution',
    Logro: 'Outcome',
    'Ver detalles del proyecto': 'View project details',
    'Ver más': 'View more',
    'Ver menos': 'View less',
    'Más allá del código': 'More than code',
    'lo que me mueve': 'what drives me',
    'Soy un joven venezolano apasionado por los viajes y la creación de soluciones IT. Resido en Portugal, soy ingeniero en sistemas, artista y emprendedor. Desde 2019 construyo comunidades y marcas a través de soluciones digitales. En 2024 fundé, junto con mis socios, Migrantes Libres, un movimiento para migrantes. Soy nómada digital y me considero un eterno aprendiz de la verdad. En mí encontrarás confianza, proactividad, lealtad y autenticidad.':
      'I am a young Venezuelan passionate about travel and creating IT solutions. I live in Portugal and am a systems engineer, artist and entrepreneur. Since 2019, I have been building communities and brands through digital solutions. In 2024, together with my partners, I founded Migrantes Libres, a movement for migrants. I am a digital nomad and consider myself a lifelong seeker of truth. You will find trust, initiative, loyalty and authenticity in me.',
    'Ingeniero en sistemas': 'Systems engineer',
    Artista: 'Artist',
    Emprendedor: 'Entrepreneur',
    'Nómada digital': 'Digital nomad',
    'Voz, comunidad': 'Voice, community',
    'y propósito': 'and purpose',
    'Arte y voluntariado': 'Art and volunteering',
    'Del escenario al servicio': 'From the stage to service',
    'La creatividad y el compromiso social también forman parte de quien soy. La música me ha llevado a distintos escenarios en Venezuela y Colombia; el voluntariado me permite acompañar a otras personas en su crecimiento.':
      'Creativity and social commitment are also part of who I am. Music has taken me to stages across Venezuela and Colombia; volunteering lets me support others as they grow.',
    'Gen la elocuencia': 'Gen la elocuencia',
    'Cantante y compositor': 'Singer and songwriter',
    'A través de GLE (Gen la elocuencia), doy vida a canciones, poesía y freestyle. He participado en distintos escenarios en Venezuela y Colombia, explorando la palabra como expresión, encuentro y creación.':
      'Through GLE (Gen la elocuencia), I bring songs, poetry and freestyle to life. I have performed at events in Venezuela and Colombia, exploring words as a form of expression, connection and creation.',
    'Voluntario cooperante': 'Volunteer and community partner',
    'Arte y comunidad': 'Art and community',
    'Agilidad Mental — El Arte del Freestyle':
      'Mental Agility — The Art of Freestyle',
    'Explora mi playlist de freestyle en YouTube.':
      'Explore my freestyle playlist on YouTube.',
    'Escritos — Poesía Moderna': 'Writings — Modern Poetry',
    'Poemas y escritos en mi canal de YouTube.':
      'Poems and writing on my YouTube channel.',
    'Ver sitio (abre en una pestaña nueva)':
      'View website (opens in a new tab)',
    Testimonios: 'Testimonials',
    'Lo que dicen': 'What people say',
    'quienes han trabajado conmigo': 'about working with me',
    'Gestor de proyectos & Team Leader': 'Project manager & team leader',
    'Profesional integral. Excelente proactividad y con amplio dominio del área.':
      'A well-rounded professional, highly proactive and with extensive expertise.',
    'Gerente de proyectos': 'Project manager',
    'Una persona amable, responsable y siempre orientada a cumplir con sus metas organizacionales.':
      'Kind, responsible and always focused on achieving organizational goals.',
    Consultor: 'Consultant',
    'Gen es un trabajador diligente y dedicado.':
      'Gen is a diligent and dedicated professional.',
    'Administradora de empresas y psicóloga':
      'Business administrator and psychologist',
    'Orientado a dar lo mejor de él y cumplir los objetivos del equipo.':
      'Always committed to doing his best and achieving the team’s goals.',
    Hablemos: 'Let’s talk',
    'Contáctame para cotizar tu proyecto': 'Let’s discuss your project',
    'sin compromiso': 'with no obligation',
    'Cuéntame tu idea o tu reto tecnológico. Te respondo con una propuesta clara: alcance, plazos y presupuesto.':
      'Tell me about your idea or technology challenge. I will reply with a clear proposal covering scope, timeline and budget.',
    'Escríbeme y cotiza gratis': 'Get in touch for a free quote',
    'Sin compromiso · La primera consulta es gratuita':
      'No commitment · The first consultation is free',
    'Quiero cotizar mi proyecto': 'I would like a project quote',
    'Hola Gen,\n\nMe gustaría cotizar un proyecto.\n\n- Empresa / proyecto:\n- ¿Qué necesito?:\n- Plazo ideal:\n- Presupuesto aproximado:\n\nGracias.':
      'Hi Gen,\n\nI would like a quote for a project.\n\n- Company / project:\n- What do I need?:\n- Ideal timeline:\n- Approximate budget:\n\nThank you.',
    'Email copiado': 'Email copied',
    'No se pudo copiar': 'Could not copy',
    'Escribe a': 'Email',
    'Abrir menú': 'Open menu',
    Cerrar: 'Close',
    Principal: 'Main',
    Móvil: 'Mobile',
    'Pie de página': 'Footer',
    'Todos los derechos reservados.': 'All rights reserved.',
    'Desarrollador Fullstack & Administrador Cloud':
      'Full-Stack Developer & Cloud Administrator',
    'Oporto, Portugal': 'Porto, Portugal',
    'Meta alcanzada: ': 'Achievement: ',
    'AWS re/Start: Computación en la Nube, SRE y Administración de Redes':
      'AWS re/Start: Cloud Computing, SRE and Network Administration',
    'Técnico Especialista en Programación y Sistemas de Información':
      'Specialist Technician in Programming and Information Systems',
    'Especialización en Ciencia de Datos': 'Data Science specialization',
    'Técnico en Programación de Aplicaciones Móviles':
      'Mobile Application Development Technician',
    'Técnico en Desarrollo de Software': 'Software Development Technician',
    'Técnico Especialista en Tributación y Fiscalidad':
      'Specialist Technician in Taxation and Fiscal Studies',
    'CESAE · Oporto': 'CESAE · Porto',
    'IEFP · Oporto': 'IEFP · Porto',
    'Desde 2025': 'Since 2025',
    'Escucha la playlist en YouTube': 'Listen to the playlist on YouTube',
    'Consulta el proyecto de la agencia': 'View the agency project',
    'Foto de Gen presentando en un evento de Huellatina':
      'Gen speaking at a Huellatina event',
    'Encuentro de la comunidad de Huellatina en Porto':
      'Huellatina community gathering in Porto',
    'Comunidad de Huellatina durante un evento para emprendedores':
      'Huellatina community at an entrepreneurship event',
    'Jornada de trabajo voluntario con Huellatina':
      'Volunteer work session with Huellatina',
    'Participantes de una actividad comunitaria de Huellatina':
      'Participants at a Huellatina community activity',
    'Logo de GLE, Gen la elocuencia': 'GLE (Gen la elocuencia) logo',
    'Ilustración de una arquitectura cloud con servidores, bases de datos y contenedores conectados':
      'Illustration of a cloud architecture with connected servers, databases and containers',
    'Ilustración de un pipeline automatizado con código, engranajes y paneles de datos':
      'Illustration of an automated pipeline with code, gears and data dashboards',
    'Gen Contreras — Cloud & Soluciones IT':
      'Gen Contreras — Cloud & IT Solutions',
    'Desarrollador Fullstack y Administrador Cloud (AWS, Azure, Google Cloud). Diseño, construyo y despliego soluciones IT escalables para empresas y emprendedores.':
      'Full-stack developer and cloud administrator (AWS, Azure, Google Cloud). I design, build and deploy scalable IT solutions for businesses and entrepreneurs.',
    inicio: 'home',
    'Filtrar proyectos': 'Filter projects',
    'Soluciones Digitales para tus ideas': 'Digital solutions for your ideas',
    'y procesos tradicionales': 'and traditional processes',
    'Explora mis': 'Explore my',
    playlists: 'playlists',
    'Dos espacios para descubrir mis letras, freestyle y poesía.':
      'Two playlists featuring my lyrics, freestyle and poetry.',
    'Soluciones IT escalables desde': 'Scalable IT solutions from',
    'Desde 2025 colaboro como voluntario cooperante en Huellatina, en Porto, Portugal. Acompaño a personas emprendedoras migrantes a convertir sus ideas en negocios y a dar sus primeros pasos con más herramientas y confianza.':
      'Since 2025, I have volunteered with Huellatina in Porto, Portugal. I support migrant entrepreneurs as they turn their ideas into businesses and take their first steps with practical tools and confidence.',
    'Mar 2025 — Actual': 'Mar 2025 — Present',
    'Ene 2024 — Actual': 'Jan 2024 — Present',
    'Sep 2020 — Oct 2023': 'Sep 2020 — Oct 2023',
    'Ene 2020 — Ago 2020': 'Jan 2020 — Aug 2020',
    'Ene 2019 — Dic 2019': 'Jan 2019 — Dec 2019',
    'Líder Desarrollador de Proyectos': 'Project Development Lead',
    'Desarrollador Fundador': 'Founding Developer',
    'Webmaster y Desarrollador de Software': 'Webmaster & Software Developer',
    'Analista de Datos': 'Data Analyst',
    'Diseño Gráfico y Marketing Digital': 'Graphic Design & Digital Marketing',
    'Medellín, Colombia': 'Medellín, Colombia',
    'Centro de operaciones centralizado para apoyar a inmigrantes en su integración y establecimiento en Portugal.':
      'A centralized operations hub that supports migrants with integration and settlement in Portugal.',
    'Liderazgo técnico de equipos multidisciplinarios de diseño, arquitectura de software y desarrollo.':
      'Technical leadership of multidisciplinary design, software architecture and development teams.',
    'Diseñé la arquitectura y el núcleo escalable del sistema web y capacité a un equipo de pasantes.':
      'Designed the architecture and scalable core of the web system, and trained a team of interns.',
    'E-commerce, agenda en línea, newsletter, portal de empleo, integraciones con API de CRM y más de 70 páginas CMS.':
      'E-commerce, online scheduling, newsletter, jobs portal, CRM API integrations and more than 70 CMS pages.',
    'Metodologías ágiles, revisiones de calidad de código y diseño, y reportes diarios de progreso.':
      'Agile methods, code and design quality reviews, and daily progress reports.',
    'Crecimiento exponencial de la marca y habilitación digital de cientos de emprendedores, con un 100% de disponibilidad.':
      'Exponential brand growth and digital enablement for hundreds of entrepreneurs, with 100% availability.',
    'Concepción, desarrollo, gestión y mantenimiento de todo el ecosistema digital de la organización.':
      'Conceived, developed, managed and maintained the organization’s entire digital ecosystem.',
    'Arquitectura web adaptativa y accesible con JavaScript, React y HTML5/CSS3, con optimización continua de SEO y rendimiento.':
      'Built an accessible, responsive web architecture with JavaScript, React and HTML5/CSS3, continuously optimizing SEO and performance.',
    'Herramientas y automatizaciones que redujeron costos y tiempos operativos.':
      'Tools and automations that reduced costs and operational time.',
    '35% de optimización en flujos de comunicación automatizada y soporte a comunidades de aprendizaje virtual a gran escala.':
      'Improved automated communication workflows by 35% and supported large-scale virtual learning communities.',
    'Aplicaciones web CRUD, integración de APIs de terceros y automatización de marketing digital.':
      'CRUD web applications, third-party API integrations and digital marketing automation.',
    'React, JavaScript y PHP con pruebas unitarias y modelado de bases de datos relacionales.':
      'React, JavaScript and PHP, with unit tests and relational database modelling.',
    'Automatización de email marketing y soporte a usuarios en Moodle/LMS.':
      'Email marketing automation and Moodle/LMS user support.',
    'Mejor toma de decisiones estratégicas de dirección gracias al procesamiento automatizado de datos.':
      'Automated data processing helped leadership make better strategic decisions.',
    'Análisis de datos empresariales, métricas de rendimiento y paneles dinámicos.':
      'Business data analysis, performance metrics and dynamic dashboards.',
    'Canalizaciones ETL, consultas SQL avanzadas y modelado visual en Power BI, Excel y SQL Server.':
      'ETL pipelines, advanced SQL queries and visual modelling in Power BI, Excel and SQL Server.',
    'Marcas comerciales a medida y un aumento promedio del 40% en la interacción en redes sociales.':
      'Custom brands and an average 40% increase in social media engagement.',
    'Identidades visuales completas, campañas de marketing digital y contenido multimedia.':
      'Complete visual identities, digital marketing campaigns and multimedia content.',
    'Adobe Creative Cloud, Figma, Canva y tráfico pagado con Google Ads.':
      'Adobe Creative Cloud, Figma, Canva and paid traffic with Google Ads.',
    'Universidad Autónoma de Bucaramanga':
      'Autonomous University of Bucaramanga',
    'Porto, Portugal': 'Porto, Portugal',
    'Soluciones Digitales.': 'Digital Solutions.',
    'Para tus ideas Tradicionales': 'For your Traditional Ideas',
    '¿creamos tu proyecto?': 'Shall we build your project?',
    'Desde 2020': 'Since 2020',
    'Más de 35': '35+',
    'Más de 350': '350+',
    'Personas formadas': 'People trained',
    'Negocios propios creados': 'Businesses founded',
    '¿Necesitas una web, tienda online o aplicación a medida?':
      'Need a website, online store or custom application?',
    '¿Quieres migrar tu infraestructura a la nube?':
      'Want to migrate your infrastructure to the cloud?',
    '¿Buscas automatizar tareas y conectar plataformas?':
      'Looking to automate tasks and connect platforms?',
    '¿Necesitas entender tus datos o formar a tu equipo?':
      'Need to understand your data or train your team?',
    'Cloud first': 'Cloud first',
    'Cloud y automatización': 'Cloud and automation',
    'en acción': 'in action',
    'Infraestructura confiable y tareas repetitivas que trabajan por ti.':
      'Reliable infrastructure and repetitive tasks that run for you.',
    Cloud: 'Cloud',
    'Infraestructura segura que crece con tu proyecto.':
      'Secure infrastructure that grows with your project.',
    'Despliegues, copias de seguridad y monitorización.':
      'Deployments, backups and monitoring.',
    Automatización: 'Automation',
    'Conecto herramientas y APIs para reducir trabajo manual.':
      'I connect tools and APIs to reduce manual work.',
    'Pipelines de entrega para publicar cambios con confianza.':
      'Delivery pipelines to release changes with confidence.',
    'La tecnología Adecuada Para cada problema':
      'The right technology for every problem',
    'Webs corporativa como e-commerce, como plataforma y formación consultiva para empresas e individuos a nivel internacional':
      'Corporate websites, e-commerce, platforms and consulting for businesses and individuals worldwide',
    'Branding de marca y Coach': 'Branding and coaching',
    'Asesoría de imagen y marca personal':
      'Image consulting and personal branding',
    'CRM Migrantes Libres': 'Migrantes Libres CRM',
    'Plataforma CRM para gestión de clientes':
      'CRM platform for customer management',
    'Te Queremos': 'Te Queremos',
    'Plataforma web': 'Web platform',
    'Equipo de Huellatina en una actividad comunitaria':
      'Huellatina team at a community event',
    Talento: 'Talent',
    'Música y palabra': 'Music and words',
    'en movimiento': 'in motion',
    'Agilidad mental': 'Mental agility',
    'El arte de las palabras': 'The art of words',
    'Testimonios en video': 'Video testimonials',
    'Pausar carrusel': 'Pause carousel',
    'Reanudar carrusel': 'Resume carousel',
    'Video anterior': 'Previous video',
    'Video siguiente': 'Next video',
    carrusel: 'carousel',
    diapositiva: 'slide',
    de: 'of',
    Video: 'Video',
    'Testimonio en video de': 'Video testimonial from',
    'Tu navegador no admite la reproducción de vídeo.':
      'Your browser does not support video playback.',
    'Todo comienza con una reunión sin compromiso':
      'Everything starts with a no-obligation meeting',
    'Reserva 30 minutos para conversar sobre tu idea, tus necesidades y los próximos pasos.':
      'Book 30 minutes to discuss your idea, needs and next steps.',
    'Agéndate y Hablemos 30min': 'Book a 30-minute chat',
    'Conocer más sobre la comunidad': 'Learn more about the community',
    'Hablemos sobre un proyecto': 'Let’s talk about a project',
    'Hola Gen, me gustaría conversar sobre un proyecto.':
      'Hi Gen, I would like to talk about a project.',
  },
  pt: {
    Idioma: 'Idioma',
    Español: 'Espanhol',
    Portugués: 'Português',
    Inglés: 'Inglês',
    Servicios: 'Serviços',
    Stack: 'Tecnologias',
    Proyectos: 'Projetos',
    Proceso: 'Processo',
    Trayectoria: 'Percurso',
    'Sobre mí': 'Sobre mim',
    'Arte & comunidad': 'Arte & comunidade',
    'Cotizar proyecto': 'Pedir orçamento',
    Menú: 'Menu',
    'Navega por las secciones del portafolio.':
      'Navegue pelas secções do portefólio.',
    'Saltar al contenido': 'Saltar para o conteúdo',
    'Disponible para nuevos proyectos · Porto, Portugal':
      'Disponível para novos projetos · Porto, Portugal',
    'Soluciones Digitales para tus ideas y procesos tradicionales':
      'Soluções digitais para as suas ideias e processos tradicionais',
    'Soy Gen Contreras, desarrollador fullstack y administrador cloud. Diseño, construyo y despliego soluciones IT escalables, desde la infraestructura en AWS, Azure o Google Cloud hasta la web que ven tus clientes.':
      'Sou Gen Contreras, programador full-stack e administrador cloud. Concebo, desenvolvo e implemento soluções de TI escaláveis, desde a infraestrutura em AWS, Azure ou Google Cloud até aos sites que os seus clientes utilizam.',
    'Cotiza tu proyecto': 'Peça um orçamento',
    'Ver proyectos': 'Ver projetos',
    'Desarrollo full-stack': 'Desenvolvimento full-stack',
    'Escalable desde el día 1': 'Escalável desde o primeiro dia',
    '1.ª consulta gratis': 'Primeira consulta gratuita',
    'Sin compromiso': 'Sem compromisso',
    'En cifras': 'Em números',
    'Construyendo soluciones IT': 'A criar soluções de TI',
    'Proyectos entregados': 'Projetos entregues',
    'Flujos optimizados con automatización':
      'Processos otimizados com automação',
    'Nubes: AWS, Azure y GCP': 'Plataformas cloud: AWS, Azure e GCP',
    'Todo lo que necesitas para': 'Tudo o que precisa para',
    'digitalizar y escalar': 'digitalizar e crescer',
    'Un único aliado técnico para llevar tu proyecto de la idea a la nube: arquitectura, desarrollo, datos y acompañamiento.':
      'Um parceiro técnico para levar o seu projeto da ideia à cloud: arquitetura, desenvolvimento, dados e acompanhamento.',
    'Arquitectura & migración cloud': 'Arquitetura e migração cloud',
    'Diseño infraestructuras en la nube seguras y escalables, y migro tus sistemas sin frenar tu operación.':
      'Concebo infraestruturas cloud seguras e escaláveis e migro os seus sistemas sem interromper a operação.',
    'Desarrollo web & aplicaciones': 'Desenvolvimento web e de aplicações',
    'Aplicaciones web y móviles rápidas, accesibles y listas para crecer, desde la idea hasta producción.':
      'Aplicações web e móveis rápidas, acessíveis e preparadas para crescer, da ideia à produção.',
    'Automatización & DevOps': 'Automação e DevOps',
    'Administración de servidores Linux/Windows, scripting, integraciones por API y flujos automáticos que ahorran horas a tu equipo.':
      'Administração de servidores Linux/Windows, scripting, integrações API e processos automáticos que poupam horas à sua equipa.',
    'Datos & Business Intelligence': 'Dados e Business Intelligence',
    'Convierto tus datos en decisiones: ETL, consultas SQL y dashboards dinámicos para dirección.':
      'Transformo dados em decisões: ETL, consultas SQL e dashboards dinâmicos para a gestão.',
    'CMS, LMS & e-commerce': 'CMS, LMS e comércio eletrónico',
    'Tiendas, webs corporativas y comunidades de aprendizaje autogestionables con WordPress, WooCommerce y Moodle.':
      'Lojas, sites empresariais e comunidades de aprendizagem autónomas com WordPress, WooCommerce e Moodle.',
    'Consultoría & formación IT': 'Consultoria e formação em TI',
    'Acompaño a empresas y emprendedores en su transformación digital con consultoría y formación práctica.':
      'Acompanho empresas e empreendedores na transformação digital com consultoria e formação prática.',
    'Infraestructura que escala con tu demanda, sin sobrecostes':
      'Infraestrutura que cresce com a procura, sem custos excessivos',
    'Despliegues automáticos y entornos de prueba por cada cambio':
      'Implementações automáticas e ambientes de teste a cada alteração',
    'Seguridad, copias y monitorización desde el primer día':
      'Segurança, cópias de segurança e monitorização desde o primeiro dia',
    'Rendimiento global: tu web cerca de cada usuario':
      'Desempenho global: o seu site perto de cada utilizador',
    'Tu infraestructura,': 'A sua infraestrutura,',
    'lista para crecer': 'preparada para crescer',
    'Llevo tus aplicaciones a la nube con una arquitectura pensada para el rendimiento, la seguridad y el control de costes. Sin servidores que mantener, sin sorpresas.':
      'Levo as suas aplicações para a cloud com uma arquitetura concebida para o desempenho, a segurança e o controlo de custos. Sem servidores para manter, sem surpresas.',
    'Planifiquemos tu migración': 'Vamos planear a sua migração',
    'Stack tecnológico': 'Tecnologias',
    'Herramientas que': 'Ferramentas que',
    'domino a diario': 'utilizo diariamente',
    'La tecnología adecuada para cada problema, no al revés.':
      'A tecnologia certa para cada problema, e não o contrário.',
    'Desarrollo & frameworks': 'Desenvolvimento e frameworks',
    'Pruebas unitarias': 'Testes unitários',
    'Cloud, DevOps & SysAdmin': 'Cloud, DevOps e administração de sistemas',
    'Fundamentos de SRE': 'Fundamentos de SRE',
    'Bases de datos & BI': 'Bases de dados e BI',
    'Canalizaciones ETL': 'Pipelines ETL',
    'Excel avanzado': 'Excel avançado',
    'Diseño & herramientas': 'Design e ferramentas',
    Portafolio: 'Portefólio',
    'Proyectos que': 'Projetos que',
    'ya están funcionando': 'já estão a funcionar',
    'Webs corporativas, e-commerce, plataformas y formación para empresas reales en Europa y Latinoamérica.':
      'Sites empresariais, comércio eletrónico, plataformas e formação para empresas na Europa e na América Latina.',
    Todos: 'Todos',
    Desarrollo: 'Desenvolvimento',
    'Formación & consultoría': 'Formação e consultoria',
    'Diseño & marketing': 'Design e marketing',
    'Grúas Torito': 'Grúas Torito',
    'Web corporativa responsive con CMS': 'Site empresarial responsivo com CMS',
    Huellatina: 'Huellatina',
    'Plataforma para cooperativa': 'Plataforma para cooperativa',
    'Douglas Blanco': 'Douglas Blanco',
    'Marca personal con CMS': 'Marca pessoal com CMS',
    'Travel Web': 'Travel Web',
    'Agencia de viajes con Tailwind': 'Agência de viagens com Tailwind',
    'E-commerce': 'Comércio eletrónico',
    'Tienda online con WooCommerce': 'Loja online com WooCommerce',
    'Agencia de marketing digital': 'Agência de marketing digital',
    'Desarrollo a medida': 'Desenvolvimento à medida',
    Masterclass: 'Masterclass',
    'Herramientas para aumentar tu valor':
      'Ferramentas para aumentar o seu valor profissional',
    'Clase de oratoria': 'Aula de oratória',
    'Potencia tus discursos con IA': 'Melhore os seus discursos com IA',
    Conferencia: 'Conferência',
    'Evento en Bogotá, Colombia': 'Evento em Bogotá, Colômbia',
    'Branding Migrantes Libres': 'Branding Migrantes Libres',
    'Identidad de agencia': 'Identidade da agência',
    Logotipos: 'Logótipos',
    'Diseños personalizados': 'Designs personalizados',
    'Diseño & publicidad': 'Design e publicidade',
    'Flyers, tráfico e invitaciones': 'Flyers, anúncios e convites',
    'Publicidad digital': 'Publicidade digital',
    'Campañas en Meta Ads y Google Ads': 'Campanhas no Meta Ads e Google Ads',
    'Agencia Migrante': 'Agencia Migrante',
    'Agencia propia de marketing digital':
      'Agência de marketing digital cofundada e gerida por Gen',
    'Marca personal de Eli Coach': 'Marca pessoal Eli Coach',
    'Branding e identidad visual': 'Branding e identidade visual',
    'Alma Candel': 'Alma Candel',
    'Proyecto web para una marca creativa':
      'Projeto web para uma marca criativa',
    Yerbabuena: 'Yerbabuena',
    'Presencia digital para una marca natural':
      'Presença digital de uma marca de produtos naturais',
    'Wayra Raízes': 'Wayra Raízes',
    'Marca digital de joyería artesanal':
      'Marca digital de joalharia artesanal',
    'Co-fundé y gestiono Agencia Migrante, un equipo que ayuda a emprendedores y pequeñas empresas a construir su presencia digital. Reunimos branding e identidad, landing pages y marketing digital en servicios prácticos, adaptados a cada etapa del negocio.':
      'Cofundei e giro a Agencia Migrante, uma equipa que ajuda empreendedores e pequenas empresas a construir a sua presença digital. Reunimos branding e identidade, landing pages e marketing digital em serviços práticos, adaptados a cada etapa do negócio.',
    'Conoce Agencia Migrante': 'Conheça a Agencia Migrante',
    'Cómo trabajo': 'Como trabalho',
    'Un proceso claro,': 'Um processo claro,',
    'de principio a fin': 'do início ao fim',
    'El éxito de la solución nace de la comprensión del problema.':
      'O sucesso da solução começa pela compreensão do problema.',
    Diagnóstico: 'Diagnóstico',
    'Entiendo tu negocio, tus usuarios y el problema real antes de proponer tecnología.':
      'Compreendo o seu negócio, os seus utilizadores e o problema real antes de propor tecnologia.',
    Arquitectura: 'Arquitetura',
    'Defino la solución, el stack y el presupuesto: viable hoy y escalable mañana.':
      'Defino a solução, as tecnologias e o orçamento: viável hoje e escalável amanhã.',
    'Desarrollo & despliegue': 'Desenvolvimento e implementação',
    'Construyo por iteraciones, con entregas visibles y despliegue continuo en la nube.':
      'Desenvolvo de forma iterativa, com entregas visíveis e implementação contínua na cloud.',
    'Soporte & evolución': 'Suporte e evolução',
    'Mido resultados, reporto avances y sigo optimizando de principio a fin.':
      'Meço resultados, comunico o progresso e continuo a otimizar do início ao fim.',
    'Automatizo lo repetitivo': 'Automatizo tarefas repetitivas',
    'Pipelines de despliegue, integraciones entre plataformas y comunicaciones automáticas para que tu equipo se concentre en lo que aporta valor.':
      'Pipelines de implementação, integrações entre plataformas e comunicações automáticas para que a equipa se concentre no que cria valor.',
    'Experiencia que': 'Experiência que',
    'respalda cada entrega': 'sustenta cada entrega',
    Experiencia: 'Experiência',
    Formación: 'Formação',
    Idiomas: 'Idiomas',
    Nativo: 'Nativo',
    'Venezolano en Portugal, emprendedor y fundador de Migrantes Libres. Uno desarrollo fullstack, administración de sistemas y soluciones cloud con visión estratégica, experiencia de usuario y mejora continua de procesos.':
      'Venezuelano em Portugal, empreendedor e fundador da Migrantes Libres. Uno desenvolvimento full-stack, administração de sistemas e soluções cloud com visão estratégica, experiência do utilizador e melhoria contínua.',
    'Descargar CV': 'Descarregar CV',
    'Descargar en Español': 'Descarregar em Espanhol',
    'Descargar en Portugués': 'Descarregar em Português',
    'Descargar en Inglés': 'Descarregar em Inglês',
    Requerimiento: 'Requisito',
    Solución: 'Solução',
    Logro: 'Resultado',
    'Ver detalles del proyecto': 'Ver detalhes do projeto',
    'Ver más': 'Ver mais',
    'Ver menos': 'Ver menos',
    'Más allá del código': 'Para além do código',
    'lo que me mueve': 'o que me inspira',
    'Soy un joven venezolano apasionado por los viajes y la creación de soluciones IT. Resido en Portugal, soy ingeniero en sistemas, artista y emprendedor. Desde 2019 construyo comunidades y marcas a través de soluciones digitales. En 2024 fundé, junto con mis socios, Migrantes Libres, un movimiento para migrantes. Soy nómada digital y me considero un eterno aprendiz de la verdad. En mí encontrarás confianza, proactividad, lealtad y autenticidad.':
      'Sou um jovem venezuelano apaixonado por viagens e pela criação de soluções de TI. Vivo em Portugal, sou engenheiro de sistemas, artista e empreendedor. Desde 2019, construo comunidades e marcas através de soluções digitais. Em 2024, fundei, com os meus parceiros, a Migrantes Libres, um movimento para migrantes. Sou nómada digital e considero-me um eterno aprendiz da verdade. Em mim encontrará confiança, proatividade, lealdade e autenticidade.',
    'Ingeniero en sistemas': 'Engenheiro de sistemas',
    Artista: 'Artista',
    Emprendedor: 'Empreendedor',
    'Nómada digital': 'Nómada digital',
    'Voz, comunidad': 'Voz, comunidade',
    'y propósito': 'e propósito',
    'Arte y voluntariado': 'Arte e voluntariado',
    'Del escenario al servicio': 'Do palco ao serviço',
    'La creatividad y el compromiso social también forman parte de quien soy. La música me ha llevado a distintos escenarios en Venezuela y Colombia; el voluntariado me permite acompañar a otras personas en su crecimiento.':
      'A criatividade e o compromisso social também fazem parte de quem sou. A música levou-me a vários palcos na Venezuela e na Colômbia; o voluntariado permite-me acompanhar outras pessoas no seu crescimento.',
    'Gen la elocuencia': 'Gen la elocuencia',
    'Cantante y compositor': 'Cantor e compositor',
    'A través de GLE (Gen la elocuencia), doy vida a canciones, poesía y freestyle. He participado en distintos escenarios en Venezuela y Colombia, explorando la palabra como expresión, encuentro y creación.':
      'Através da GLE (Gen la elocuencia), dou vida a canções, poesia e freestyle. Já participei em vários palcos na Venezuela e na Colômbia, explorando a palavra como expressão, encontro e criação.',
    'Voluntario cooperante': 'Voluntário cooperante',
    'Desde 2025 colaboro como voluntario cooperante en Huellatina, en Porto, Portugal. Acompaño a personas emprendedoras migrantes a convertir sus ideas en negocios y a dar sus primeros pasos con más herramientas y confianza.':
      'Desde 2025, colaboro como voluntário cooperante na Huellatina, no Porto, Portugal. Acompanho empreendedores migrantes na transformação das suas ideias em negócios e nos primeiros passos, com mais ferramentas e confiança.',
    'Arte y comunidad': 'Arte e comunidade',
    'Agilidad Mental — El Arte del Freestyle':
      'Agilidade Mental — A Arte do Freestyle',
    'Explora mi playlist de freestyle en YouTube.':
      'Explore a minha playlist de freestyle no YouTube.',
    'Escritos — Poesía Moderna': 'Escritos — Poesia Moderna',
    'Poemas y escritos en mi canal de YouTube.':
      'Poemas e textos no meu canal do YouTube.',
    'Ver sitio (abre en una pestaña nueva)':
      'Ver site (abre num novo separador)',
    Testimonios: 'Testemunhos',
    'Lo que dicen': 'O que dizem',
    'quienes han trabajado conmigo': 'as pessoas que trabalharam comigo',
    'Gestor de proyectos & Team Leader': 'Gestor de projetos e líder de equipa',
    'Profesional integral. Excelente proactividad y con amplio dominio del área.':
      'Profissional completo, muito proativo e com amplo domínio da área.',
    'Gerente de proyectos': 'Gestora de projetos',
    'Una persona amable, responsable y siempre orientada a cumplir con sus metas organizacionales.':
      'Uma pessoa amável, responsável e sempre focada nos objetivos da organização.',
    Consultor: 'Consultor',
    'Gen es un trabajador diligente y dedicado.':
      'Gen é um profissional diligente e dedicado.',
    'Administradora de empresas y psicóloga':
      'Administradora de empresas e psicóloga',
    'Orientado a dar lo mejor de él y cumplir los objetivos del equipo.':
      'Procura dar sempre o seu melhor e cumprir os objetivos da equipa.',
    Hablemos: 'Vamos conversar',
    'Contáctame para cotizar tu proyecto':
      'Peça um orçamento para o seu projeto',
    'sin compromiso': 'sem compromisso',
    'Cuéntame tu idea o tu reto tecnológico. Te respondo con una propuesta clara: alcance, plazos y presupuesto.':
      'Conte-me a sua ideia ou desafio tecnológico. Responderei com uma proposta clara: âmbito, prazos e orçamento.',
    'Escríbeme y cotiza gratis': 'Escreva-me e peça um orçamento gratuito',
    'Sin compromiso · La primera consulta es gratuita':
      'Sem compromisso · A primeira consulta é gratuita',
    'Quiero cotizar mi proyecto': 'Gostaria de pedir um orçamento',
    'Hola Gen,\n\nMe gustaría cotizar un proyecto.\n\n- Empresa / proyecto:\n- ¿Qué necesito?:\n- Plazo ideal:\n- Presupuesto aproximado:\n\nGracias.':
      'Olá, Gen,\n\nGostaria de pedir um orçamento para um projeto.\n\n- Empresa / projeto:\n- O que preciso?:\n- Prazo ideal:\n- Orçamento aproximado:\n\nObrigado.',
    'Email copiado': 'Email copiado',
    'No se pudo copiar': 'Não foi possível copiar',
    'Escribe a': 'Escreva para',
    'Abrir menú': 'Abrir menu',
    Cerrar: 'Fechar',
    Principal: 'Principal',
    Móvil: 'Móvel',
    'Pie de página': 'Rodapé',
    'Todos los derechos reservados.': 'Todos os direitos reservados.',
    'Desarrollador Fullstack & Administrador Cloud':
      'Programador Full-Stack e Administrador Cloud',
    'Oporto, Portugal': 'Porto, Portugal',
    'Meta alcanzada: ': 'Resultado alcançado: ',
    'AWS re/Start: Computación en la Nube, SRE y Administración de Redes':
      'AWS re/Start: Computação Cloud, SRE e Administração de Redes',
    'Técnico Especialista en Programación y Sistemas de Información':
      'Técnico Especialista em Programação e Sistemas de Informação',
    'Especialización en Ciencia de Datos': 'Especialização em Ciência de Dados',
    'Técnico en Programación de Aplicaciones Móviles':
      'Técnico em Programação de Aplicações Móveis',
    'Técnico en Desarrollo de Software':
      'Técnico em Desenvolvimento de Software',
    'Técnico Especialista en Tributación y Fiscalidad':
      'Técnico Especialista em Tributação e Fiscalidade',
    'CESAE · Oporto': 'CESAE · Porto',
    'IEFP · Oporto': 'IEFP · Porto',
    'Desde 2025': 'Desde 2025',
    'Escucha la playlist en YouTube': 'Ouvir a playlist no YouTube',
    'Consulta el proyecto de la agencia': 'Ver o projeto da agência',
    'Foto de Gen presentando en un evento de Huellatina':
      'Gen a apresentar num evento da Huellatina',
    'Encuentro de la comunidad de Huellatina en Porto':
      'Encontro da comunidade Huellatina no Porto',
    'Comunidad de Huellatina durante un evento para emprendedores':
      'Comunidade Huellatina num evento para empreendedores',
    'Jornada de trabajo voluntario con Huellatina':
      'Sessão de voluntariado com a Huellatina',
    'Participantes de una actividad comunitaria de Huellatina':
      'Participantes numa atividade comunitária da Huellatina',
    'Logo de GLE, Gen la elocuencia': 'Logótipo GLE, Gen la elocuencia',
    'Ilustración de una arquitectura cloud con servidores, bases de datos y contenedores conectados':
      'Ilustração de uma arquitetura cloud com servidores, bases de dados e contentores ligados',
    'Ilustración de un pipeline automatizado con código, engranajes y paneles de datos':
      'Ilustração de um pipeline automatizado com código, engrenagens e dashboards de dados',
    'Gen Contreras — Cloud & Soluciones IT':
      'Gen Contreras — Cloud e Soluções de TI',
    'Desarrollador Fullstack y Administrador Cloud (AWS, Azure, Google Cloud). Diseño, construyo y despliego soluciones IT escalables para empresas y emprendedores.':
      'Programador full-stack e administrador cloud (AWS, Azure, Google Cloud). Concebo, desenvolvo e implemento soluções de TI escaláveis para empresas e empreendedores.',
    inicio: 'início',
    'Filtrar proyectos': 'Filtrar projetos',
    'Soluciones Digitales para tus ideas':
      'Soluções digitais para as suas ideias',
    'y procesos tradicionales': 'e processos tradicionais',
    'Explora mis': 'Explore as minhas',
    playlists: 'playlists',
    'Dos espacios para descubrir mis letras, freestyle y poesía.':
      'Duas playlists para descobrir as minhas letras, freestyle e poesia.',
    'Soluciones IT escalables desde': 'Soluções de TI escaláveis desde',
    'Mar 2025 — Actual': 'Mar 2025 — Atualidade',
    'Ene 2024 — Actual': 'Jan 2024 — Atualidade',
    'Sep 2020 — Oct 2023': 'Set 2020 — Out 2023',
    'Ene 2020 — Ago 2020': 'Jan 2020 — Ago 2020',
    'Ene 2019 — Dic 2019': 'Jan 2019 — Dez 2019',
    'Líder Desarrollador de Proyectos': 'Líder de Desenvolvimento de Projetos',
    'Desarrollador Fundador': 'Programador Fundador',
    'Webmaster y Desarrollador de Software':
      'Webmaster e Programador de Software',
    'Analista de Datos': 'Analista de Dados',
    'Diseño Gráfico y Marketing Digital': 'Design Gráfico e Marketing Digital',
    'Medellín, Colombia': 'Medellín, Colômbia',
    'Centro de operaciones centralizado para apoyar a inmigrantes en su integración y establecimiento en Portugal.':
      'Centro de operações centralizado para apoiar migrantes na integração e instalação em Portugal.',
    'Liderazgo técnico de equipos multidisciplinarios de diseño, arquitectura de software y desarrollo.':
      'Liderança técnica de equipas multidisciplinares de design, arquitetura de software e desenvolvimento.',
    'Diseñé la arquitectura y el núcleo escalable del sistema web y capacité a un equipo de pasantes.':
      'Concebi a arquitetura e o núcleo escalável do sistema web e formei uma equipa de estagiários.',
    'E-commerce, agenda en línea, newsletter, portal de empleo, integraciones con API de CRM y más de 70 páginas CMS.':
      'Comércio eletrónico, agendamento online, newsletter, portal de emprego, integrações com API de CRM e mais de 70 páginas CMS.',
    'Metodologías ágiles, revisiones de calidad de código y diseño, y reportes diarios de progreso.':
      'Metodologias ágeis, revisões da qualidade do código e do design e relatórios diários de progresso.',
    'Crecimiento exponencial de la marca y habilitación digital de cientos de emprendedores, con un 100% de disponibilidad.':
      'Crescimento exponencial da marca e capacitação digital de centenas de empreendedores, com 100% de disponibilidade.',
    'Concepción, desarrollo, gestión y mantenimiento de todo el ecosistema digital de la organización.':
      'Conceção, desenvolvimento, gestão e manutenção de todo o ecossistema digital da organização.',
    'Arquitectura web adaptativa y accesible con JavaScript, React y HTML5/CSS3, con optimización continua de SEO y rendimiento.':
      'Arquitetura web responsiva e acessível com JavaScript, React e HTML5/CSS3, com otimização contínua de SEO e desempenho.',
    'Herramientas y automatizaciones que redujeron costos y tiempos operativos.':
      'Ferramentas e automações que reduziram custos e tempos operacionais.',
    '35% de optimización en flujos de comunicación automatizada y soporte a comunidades de aprendizaje virtual a gran escala.':
      'Otimização de 35% nos fluxos de comunicação automatizada e suporte a comunidades de aprendizagem virtual em grande escala.',
    'Aplicaciones web CRUD, integración de APIs de terceros y automatización de marketing digital.':
      'Aplicações web CRUD, integração de APIs de terceiros e automação de marketing digital.',
    'React, JavaScript y PHP con pruebas unitarias y modelado de bases de datos relacionales.':
      'React, JavaScript e PHP com testes unitários e modelação de bases de dados relacionais.',
    'Automatización de email marketing y soporte a usuarios en Moodle/LMS.':
      'Automação de email marketing e apoio a utilizadores no Moodle/LMS.',
    'Mejor toma de decisiones estratégicas de dirección gracias al procesamiento automatizado de datos.':
      'O processamento automatizado de dados apoiou melhores decisões estratégicas da gestão.',
    'Análisis de datos empresariales, métricas de rendimiento y paneles dinámicos.':
      'Análise de dados empresariais, métricas de desempenho e dashboards dinâmicos.',
    'Canalizaciones ETL, consultas SQL avanzadas y modelado visual en Power BI, Excel y SQL Server.':
      'Pipelines ETL, consultas SQL avançadas e modelação visual em Power BI, Excel e SQL Server.',
    'Marcas comerciales a medida y un aumento promedio del 40% en la interacción en redes sociales.':
      'Marcas personalizadas e um aumento médio de 40% na interação nas redes sociais.',
    'Identidades visuales completas, campañas de marketing digital y contenido multimedia.':
      'Identidades visuais completas, campanhas de marketing digital e conteúdos multimédia.',
    'Adobe Creative Cloud, Figma, Canva y tráfico pagado con Google Ads.':
      'Adobe Creative Cloud, Figma, Canva e tráfego pago com Google Ads.',
    'Universidad Autónoma de Bucaramanga':
      'Universidade Autónoma de Bucaramanga',
    'Porto, Portugal': 'Porto, Portugal',
    'Soluciones Digitales.': 'Soluções Digitais.',
    'Para tus ideas Tradicionales': 'Para as suas Ideias Tradicionais',
    '¿creamos tu proyecto?': 'Vamos criar o seu projeto?',
    'Desde 2020': 'Desde 2020',
    'Más de 35': 'Mais de 35',
    'Más de 350': 'Mais de 350',
    'Personas formadas': 'Pessoas formadas',
    'Negocios propios creados': 'Negócios próprios criados',
    '¿Necesitas una web, tienda online o aplicación a medida?':
      'Precisa de um site, loja online ou aplicação personalizada?',
    '¿Quieres migrar tu infraestructura a la nube?':
      'Quer migrar a sua infraestrutura para a cloud?',
    '¿Buscas automatizar tareas y conectar plataformas?':
      'Quer automatizar tarefas e ligar plataformas?',
    '¿Necesitas entender tus datos o formar a tu equipo?':
      'Precisa de compreender os seus dados ou formar a sua equipa?',
    'Cloud first': 'Cloud first',
    'Cloud y automatización': 'Cloud e automação',
    'en acción': 'em ação',
    'Infraestructura confiable y tareas repetitivas que trabajan por ti.':
      'Infraestrutura fiável e tarefas repetitivas a trabalhar por si.',
    Cloud: 'Cloud',
    'Infraestructura segura que crece con tu proyecto.':
      'Infraestrutura segura que cresce com o seu projeto.',
    'Despliegues, copias de seguridad y monitorización.':
      'Implementações, cópias de segurança e monitorização.',
    Automatización: 'Automação',
    'Conecto herramientas y APIs para reducir trabajo manual.':
      'Ligo ferramentas e APIs para reduzir o trabalho manual.',
    'Pipelines de entrega para publicar cambios con confianza.':
      'Pipelines de entrega para publicar alterações com confiança.',
    'La tecnología Adecuada Para cada problema':
      'A tecnologia certa para cada problema',
    'Webs corporativa como e-commerce, como plataforma y formación consultiva para empresas e individuos a nivel internacional':
      'Sites empresariais, comércio eletrónico, plataformas e consultoria para empresas e pessoas a nível internacional',
    'Branding de marca y Coach': 'Branding e coaching',
    'Asesoría de imagen y marca personal':
      'Consultoria de imagem e marca pessoal',
    'CRM Migrantes Libres': 'CRM Migrantes Libres',
    'Plataforma CRM para gestión de clientes':
      'Plataforma CRM para gestão de clientes',
    'Te Queremos': 'Te Queremos',
    'Plataforma web': 'Plataforma web',
    'Equipo de Huellatina en una actividad comunitaria':
      'Equipa Huellatina numa atividade comunitária',
    Talento: 'Talento',
    'Música y palabra': 'Música e palavra',
    'en movimiento': 'em movimento',
    'Agilidad mental': 'Agilidade mental',
    'El arte de las palabras': 'A arte das palavras',
    'Testimonios en video': 'Testemunhos em vídeo',
    'Pausar carrusel': 'Pausar carrossel',
    'Reanudar carrusel': 'Retomar carrossel',
    'Video anterior': 'Vídeo anterior',
    'Video siguiente': 'Vídeo seguinte',
    carrusel: 'carrossel',
    diapositiva: 'diapositivo',
    de: 'de',
    Video: 'Vídeo',
    'Testimonio en video de': 'Testemunho em vídeo de',
    'Tu navegador no admite la reproducción de vídeo.':
      'O seu navegador não suporta a reprodução de vídeo.',
    'Todo comienza con una reunión sin compromiso':
      'Tudo começa com uma reunião sem compromisso',
    'Reserva 30 minutos para conversar sobre tu idea, tus necesidades y los próximos pasos.':
      'Reserve 30 minutos para conversarmos sobre a sua ideia, necessidades e próximos passos.',
    'Agéndate y Hablemos 30min': 'Marque uma conversa de 30 minutos',
    'Conocer más sobre la comunidad': 'Saiba mais sobre a comunidade',
    'Hablemos sobre un proyecto': 'Vamos conversar sobre um projeto',
    'Hola Gen, me gustaría conversar sobre un proyecto.':
      'Olá, Gen. Gostaria de conversar sobre um projeto.',
  },
}

export function translate(text: string, language: Language) {
  if (language === 'es') return text
  return translations[language][text] ?? text
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Translate
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getSavedLanguage,
    (): Language => 'es',
  )

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback((text: string) => translate(text, language), [language])
  useEffect(() => {
    document.title = t('Gen Contreras — Cloud & Soluciones IT')
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (description) {
      description.content = t(
        'Desarrollador Fullstack y Administrador Cloud (AWS, Azure, Google Cloud). Diseño, construyo y despliego soluciones IT escalables para empresas y emprendedores.',
      )
    }
  }, [t])
  const value = useMemo(
    () => ({ language, setLanguage: chooseLanguage, t }),
    [language, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
