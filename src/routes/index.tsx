import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  ChevronDown,
  CircleCheck,
  Cloud,
  CodeXml,
  Download,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Music2,
  Quote,
  ShoppingCart,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ContactActions, mailtoHref } from '@/components/site/contact'
import { Logo, SiteHeader } from '@/components/site/header'
import { ProjectsGallery } from '@/components/site/projects'
import { Reveal } from '@/components/site/reveal'
import { VideoTestimonialsCarousel } from '@/components/site/video-testimonials'
import {
  artistPlaylists,
  CONTACT_EMAIL,
  cvDocuments,
  education,
  experience,
  huellatinaPhotos,
  languages,
  navLinks,
  workProcess,
  profile,
  services,
  socials,
  stack,
  stats,
  testimonials,
} from '@/lib/content'
import type { ServiceIcon } from '@/lib/content'
import { img } from '@/lib/img'
import { LanguageProvider, useLanguage } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: Home,
})

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  cloud: Cloud,
  code: CodeXml,
  workflow: Workflow,
  chart: ChartColumn,
  cart: ShoppingCart,
  graduation: GraduationCap,
}

function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}

function HomeContent() {
  const { t } = useLanguage()

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t('Saltar al contenido')}
      </a>
      <SiteHeader />
      <main id="contenido" className="overflow-x-clip">
        <Hero />
        <Stats />
        <Services />
        <Process />
        <Stack />
        <Projects />
        <CloudPlaybook />
        <Journey />
        <AboutMe />
        <ArtistAndCommunity />
        <ArtistPlaylists />
        <Testimonials />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string
  title: string
  highlight: string
  description?: string
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {description && (
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  )
}

function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto max-w-content">{children}</div>
    </section>
  )
}

function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="inicio"
      className="relative isolate px-4 pt-28 pb-16 sm:px-6 md:pt-36 lg:pb-24"
    >
      <img
        src={img('hero-glow-optimized.webp')}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/40 to-background" />

      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none">
          <p className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t('Disponible para nuevos proyectos · Porto, Portugal')}
          </p>

          <h1 className="text-4xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
            {t('Soluciones Digitales.')}
            <br />
            <span className="text-gradient">
              {t('Para tus ideas Tradicionales')}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {t(
              'Soy Gen Contreras, desarrollador fullstack y administrador cloud. Diseño, construyo y despliego soluciones IT escalables, desde la infraestructura en AWS, Azure o Google Cloud hasta la web que ven tus clientes.',
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-6 text-base glow-primary"
            >
              <a href="#contacto">
                {t('¿creamos tu proyecto?')} <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-border bg-secondary/40 px-6 text-base backdrop-blur"
            >
              <a href="#proyectos">{t('Ver proyectos')}</a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {[
              'AWS · Azure · Google Cloud',
              'Desarrollo full-stack',
              'SysAdmin & SRE',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CircleCheck className="size-4 text-accent" aria-hidden />{' '}
                {t(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-x-6 top-10 bottom-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/60 via-primary/20 to-accent/40 blur-2xl"
          />
          <div className="glass relative overflow-hidden rounded-[2rem]">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/40 shadow-[0_0_80px_10px] shadow-primary/40"
            />
            <img
              src={img('gen-contreras-optimized.webp')}
              alt={`${profile.name}, ${profile.role}`}
              width={640}
              height={687}
              fetchPriority="high"
              className="relative mx-auto w-full max-w-[30rem] object-contain pt-8"
            />
          </div>

          <div className="glass animate-float absolute top-8 -left-3 rounded-2xl px-4 py-3 sm:-left-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/20 text-primary">
                <Cloud className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold">Cloud & DevOps</p>
                <p className="text-xs text-muted-foreground">
                  {t('Sistemas escalables')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const { t } = useLanguage()

  return (
    <section aria-label={t('En cifras')} className="px-4 sm:px-6">
      <Reveal className="glass mx-auto grid max-w-content grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="p-6 text-center md:p-8">
            <p className="font-display text-xl font-bold text-gradient sm:text-3xl md:text-5xl">
              {t(s.value)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t(s.label)}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Services() {
  const { t } = useLanguage()

  return (
    <Section id="servicios">
      <SectionHeading
        eyebrow={t('Servicios')}
        title={t('Todo lo que necesitas para')}
        highlight={t('digitalizar y escalar')}
        description={t(
          'Cuenta conmigo para llevar tu proyecto de la idea a la nube: arquitectura, desarrollo, datos y acompañamiento.',
        )}
      />
      <ul className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          '¿Necesitas una web, tienda online o aplicación a medida?',
          '¿Quieres migrar tu infraestructura a la nube?',
          '¿Buscas automatizar tareas y conectar plataformas?',
          '¿Necesitas entender tus datos o formar a tu equipo?',
        ].map((question) => (
          <li
            key={question}
            className="glass rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground"
          >
            {t(question)}
          </li>
        ))}
      </ul>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon]
          return (
            <Reveal
              key={s.title}
              delay={(i % 3) * 90}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
            >
              <div
                aria-hidden
                className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 text-accent ring-1 ring-accent/30">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{t(s.title)}</h3>
              <p className="mt-2 text-muted-foreground">{t(s.description)}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t(tag)}
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function CloudPlaybook() {
  const { t } = useLanguage()

  return (
    <Section className="pt-0! md:pt-0!">
      <div className="glass space-y-5 overflow-hidden rounded-3xl p-5 md:p-8">
        <SectionHeading
          eyebrow={t('Capacidad Resolutiva')}
          title={t('Escalabilidad y automatización')}
          highlight={t('en acción')}
          description={t(
            'Infraestructura confiable y tareas repetitivas que trabajan por ti.',
          )}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="glass grid items-center gap-5 overflow-hidden rounded-2xl p-4 sm:grid-cols-[1fr_1.1fr]">
            <img
              src={img('cloud-architecture-optimized.webp')}
              alt={t(
                'Ilustración de una arquitectura cloud con servidores, bases de datos y contenedores conectados',
              )}
              loading="lazy"
              decoding="async"
              width={800}
              height={446}
              className="h-full min-h-40 w-full rounded-xl object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">{t('Cloud')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  'Infraestructura segura que crece con tu proyecto.',
                  'Despliegues, copias de seguridad y monitorización.',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {t(tip)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal
            delay={100}
            className="glass grid items-center gap-5 overflow-hidden rounded-2xl p-4 sm:grid-cols-[1fr_1.1fr]"
          >
            <img
              src={img('automation-optimized.webp')}
              alt={t(
                'Ilustración de un pipeline automatizado con código, engranajes y paneles de datos',
              )}
              loading="lazy"
              decoding="async"
              width={800}
              height={446}
              className="h-full min-h-40 w-full rounded-xl object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">{t('Automatización')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  'Conecto herramientas y APIs para reducir trabajo manual.',
                  'Pipelines de entrega para publicar cambios con confianza.',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <CircleCheck
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {t(tip)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <a
          href="https://migranteslibres.com/agencia/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('Consulta el proyecto de la agencia')}
          className="glass group flex flex-col gap-5 rounded-2xl p-6 transition-colors hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between md:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-accent uppercase">
              {t('Logro destacado ⭐')}
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              {t('Agencia propia de marketing digital')}
            </h3>
            <p className="mt-3 text-muted-foreground">
              {t(
                'Co-fundé una Agencia de Marketing 360, ayudamos a emprendedores y pequeñas empresas a construir su presencia digital. Reunimos branding e identidad, landing pages y marketing digital en servicios prácticos, adaptados a cada etapa del negocio.',
              )}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent group-hover:underline">
            {t('Conoce Agencia Migrante')} <ArrowUpRight className="size-4" />
          </span>
        </a>
      </div>
    </Section>
  )
}

function Stack() {
  const { t } = useLanguage()

  return (
    <Section id="stack">
      <SectionHeading
        eyebrow={t('Stack tecnológico')}
        title={t('Herramientas que')}
        highlight={t('domino a diario')}
        description={t('La tecnología Adecuada Para cada problema')}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {stack.map((g, i) => (
          <Reveal
            key={g.group}
            delay={(i % 2) * 90}
            className="glass rounded-2xl p-6"
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span
                className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-accent"
                aria-hidden
              />
              {t(g.group)}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {t(item)}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  const { t } = useLanguage()

  return (
    <Section id="proyectos">
      <SectionHeading
        eyebrow={t('Portafolio')}
        title={t('Proyectos que')}
        highlight={t('ya están funcionando')}
        description={t(
          'Webs corporativa, e-commerce, plataforma y formación consultiva para empresas e individuos a nivel internacional',
        )}
      />
      <ProjectsGallery />
    </Section>
  )
}

function Process() {
  const { t } = useLanguage()

  return (
    <Section id="proceso">
      <SectionHeading
        eyebrow={t('Cómo trabajo')}
        title={t('Un proceso claro,')}
        highlight={t('de principio a fin')}
        description={t(profile.motto)}
      />
      <div className="relative">
        <div
          aria-hidden
          className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-primary via-accent to-primary md:block"
        />
        <ol className="relative grid gap-5 md:grid-cols-4">
          {workProcess.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 110}
              className="relative text-center"
            >
              <span className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-background font-display text-lg font-bold text-accent ring-1 ring-accent/40 glow-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="glass mt-5 rounded-2xl p-5">
                <h3 className="text-lg font-semibold">{t(step.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(step.description)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}

function Journey() {
  const { t } = useLanguage()

  return (
    <Section id="trayectoria">
      <SectionHeading
        eyebrow={t('Trayectoria')}
        title={t('Experiencia que')}
        highlight={t('respalda cada entrega')}
      />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="mb-6 font-display text-xl font-semibold">
            {t('Experiencia')}
          </h3>
          <ol className="relative space-y-6 border-l border-border pl-6">
            {experience.map((e, i) => (
              <Reveal as="li" key={e.role} delay={i * 80} className="relative">
                <span
                  aria-hidden
                  className="absolute top-2 -left-[1.95rem] size-3 rounded-full bg-accent ring-4 ring-accent/20"
                />
                <div className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-lg font-semibold">
                      {t(e.role)}{' '}
                      <span className="text-muted-foreground">·</span>{' '}
                      {e.href ? (
                        <a
                          href={e.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {t(e.company)}
                        </a>
                      ) : (
                        <span className="text-accent">{t(e.company)}</span>
                      )}
                    </h4>
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {t(e.period)}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden /> {t(e.place)}
                  </p>
                  <p className="mt-3 flex gap-2 rounded-xl bg-primary/10 p-3 text-sm ring-1 ring-primary/20">
                    <Target
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>
                      <span className="sr-only">{t('Meta alcanzada: ')}</span>
                      {t(e.result)}
                    </span>
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-6 font-display text-xl font-semibold">
            {t('Formación')}
          </h3>
          <ul className="space-y-4">
            {education.map((ed, i) => (
              <Reveal
                as="li"
                key={ed.title}
                delay={i * 80}
                className="glass rounded-2xl p-5"
              >
                <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                  {t(ed.period)} · {t(ed.place)}
                </p>
                <p className="mt-1 font-medium">{t(ed.title)}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="glass mt-6 rounded-2xl p-5">
            <h3 className="font-display text-lg font-semibold">
              {t('Idiomas')}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {languages.map((l) => (
                <li
                  key={l.name}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-sm"
                >
                  {t(l.name)}{' '}
                  <span className="text-muted-foreground">· {t(l.level)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="glass mt-6 rounded-2xl p-5">
            <details className="group relative">
              <summary className="inline-flex h-auto cursor-pointer list-none items-center gap-2 rounded-md py-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                <Download aria-hidden className="size-4" />
                {t('Descargar CV')}
                <ChevronDown
                  aria-hidden
                  className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="absolute left-0 top-full z-30 mt-2 min-w-56 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl">
                {cvDocuments.map((document) => (
                  <a
                    key={document.href}
                    href={document.href}
                    download
                    className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {t(document.label)}
                  </a>
                ))}
              </div>
            </details>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function AboutMe() {
  const { t } = useLanguage()

  return (
    <Section id="sobre-mi">
      <SectionHeading
        eyebrow={t('Sobre mí')}
        title={t('Más allá del código')}
        highlight={t('lo que me mueve')}
      />
      <Reveal className="glass mx-auto max-w-4xl rounded-3xl p-7 md:p-10">
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t(
            'Soy un joven venezolano apasionado por los viajes y la creación de soluciones IT. Resido en Portugal, soy ingeniero en sistemas, artista y emprendedor. Desde 2019 construyo comunidades y marcas a través de soluciones digitales. En 2024 fundé, junto con mis socios, Migrantes Libres, un movimiento para migrantes. Soy nómada digital y me considero un eterno aprendiz de la verdad. En mí encontrarás confianza, proactividad, lealtad y autenticidad.',
          )}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {[
            'Ingeniero en sistemas',
            'Artista',
            'Emprendedor',
            'Nómada digital',
          ].map((quality) => (
            <li
              key={quality}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent"
            >
              {t(quality)}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

function ArtistAndCommunity() {
  const { t } = useLanguage()

  return (
    <Section id="arte-comunidad">
      <SectionHeading
        eyebrow={t('Arte & comunidad')}
        title={t('Voz, comunidad')}
        highlight={t('y propósito')}
        description={t(
          'La creatividad y el compromiso social también forman parte de quien soy. La música me ha llevado a distintos escenarios en Venezuela y Colombia; el voluntariado me permite acompañar a otras personas en su crecimiento.',
        )}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="glass flex flex-col items-center gap-5 rounded-2xl p-6 text-center sm:flex-row sm:text-left">
          <img
            src={img('gle-logo.png')}
            alt={t('Logo de GLE, Gen la elocuencia')}
            width={150}
            height={150}
            loading="lazy"
            className="size-32 shrink-0 rounded-full object-cover ring-1 ring-accent/30"
          />
          <div>
            <div className="flex items-center justify-center gap-2 text-accent sm:justify-start">
              <Music2 className="size-5" aria-hidden />
              <p className="text-xs font-semibold tracking-wider uppercase">
                {t('Cantante y compositor')}
              </p>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">
              {t('Gen la elocuencia')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                'A través de GLE (Gen la elocuencia), doy vida a canciones, poesía y freestyle. He participado en distintos escenarios en Venezuela y Colombia, explorando la palabra como expresión, encuentro y creación.',
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-accent">
            <HeartHandshake className="size-5" aria-hidden />
            <p className="text-xs font-semibold tracking-wider uppercase">
              {t('Voluntario cooperante')}
            </p>
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold">Huellatina</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t(
              'Desde 2025 colaboro como voluntario cooperante en Huellatina, en Porto, Portugal. Acompaño a personas emprendedoras migrantes a convertir sus ideas en negocios y a dar sus primeros pasos con más herramientas y confianza.',
            )}
          </p>
          <a
            href="https://www.huellatina.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Huellatina <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </Reveal>
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {huellatinaPhotos.map((photo, index) => (
          <Reveal
            as="li"
            key={photo.image}
            delay={(index % 3) * 70}
            className={`glass overflow-hidden rounded-2xl ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <img
              src={img(photo.image)}
              alt={t(photo.alt)}
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

function ArtistPlaylists() {
  const { t } = useLanguage()

  return (
    <Section id="talento">
      <SectionHeading
        eyebrow={t('Mi Talento')}
        title={t('Música y Palabras')}
        highlight={t('Compuestas en Arte')}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {artistPlaylists.map((playlist, index) => {
          const title =
            index === 0 ? 'Agilidad mental' : 'El arte de las palabras'
          return (
            <div
              key={playlist.playlistId}
              id={index === 0 ? 'playlist-freestyle' : 'playlist-poesia'}
            >
              <Reveal className="glass overflow-hidden rounded-2xl p-4 sm:p-5">
                <h3 className="mb-4 font-display text-xl font-bold">
                  {t(title)}
                </h3>
                <iframe
                  className="aspect-video w-full rounded-xl"
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlist.playlistId}`}
                  title={t(title)}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <a
                  href={`https://www.youtube.com/watch?v=${playlist.videoId}&list=${playlist.playlistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  {t('Escucha la playlist en YouTube')}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </Reveal>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function Testimonials() {
  const { t } = useLanguage()

  return (
    <Section>
      <SectionHeading
        eyebrow={t('Testimonios')}
        title={t('Lo que dicen')}
        highlight={t('quienes han trabajado conmigo')}
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial, i) => (
          <Reveal
            as="li"
            key={testimonial.name}
            delay={i * 80}
            className="glass flex flex-col rounded-2xl p-6"
          >
            <Quote className="size-7 text-primary" aria-hidden />
            <blockquote className="mt-4 flex-1 text-pretty">
              “{t(testimonial.quote)}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <img
                src={img(testimonial.image)}
                alt=""
                loading="lazy"
                width={44}
                height={44}
                className="size-11 rounded-full object-cover ring-2 ring-accent/40"
              />
              <div>
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t(testimonial.role)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <VideoTestimonialsCarousel />
    </Section>
  )
}

function FinalCta() {
  const { t } = useLanguage()

  return (
    <section id="contacto" className="px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="relative mx-auto max-w-content overflow-hidden rounded-[2rem] border border-accent/30 p-8 text-center sm:p-14">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/40 via-background to-accent/25"
        />
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-50"
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/40 blur-3xl"
        />
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
          <Sparkles className="size-3.5" aria-hidden /> {t('Hablemos')}
        </p>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold text-balance sm:text-5xl">
          {t('Todo comienza con una reunión sin compromiso')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
          {t(
            'Reserva 30 minutos para conversar sobre tu idea, tus necesidades y los próximos pasos.',
          )}
        </p>
        <div className="mt-10">
          <ContactActions />
        </div>
      </Reveal>
    </section>
  )
}

function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-content flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            {t(profile.role)}. {t('Soluciones IT escalables desde')}{' '}
            {t(profile.location)}.
          </p>
          <a
            href={mailtoHref(t)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            {CONTACT_EMAIL} <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
        <nav
          aria-label={t('Pie de página')}
          className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {t(l.label)}
            </a>
          ))}
        </nav>
        <ul className="flex flex-wrap gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-content text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}.{' '}
        {t('Todos los derechos reservados.')}
      </p>
    </footer>
  )
}
