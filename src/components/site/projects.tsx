import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

import { projectFilters, projects } from '@/lib/content'
import { useLanguage } from '@/lib/i18n'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

type FilterId = (typeof projectFilters)[number]['id']
const INITIAL_PROJECT_COUNT = 9

export function ProjectsGallery() {
  const [filter, setFilter] = useState<FilterId>('todos')
  const [showAll, setShowAll] = useState(false)
  const { language, t } = useLanguage()
  const filteredProjects =
    filter === 'todos'
      ? projects
      : projects.filter((project) => project.category === filter)
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT)

  return (
    <div>
      <div
        role="group"
        aria-label={t('Filtrar proyectos')}
        className="glass mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl p-1.5"
      >
        {projectFilters.map((projectFilter) => (
          <button
            key={projectFilter.id}
            type="button"
            aria-pressed={filter === projectFilter.id}
            onClick={() => {
              setFilter(projectFilter.id)
              setShowAll(false)
            }}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-medium transition-colors motion-reduce:transition-none',
              filter === projectFilter.id
                ? 'bg-primary text-primary-foreground glow-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t(projectFilter.label)}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => {
          const details = project.details[language]

          return (
            <li
              key={project.title + project.image}
              className="animate-in fade-in zoom-in-95 duration-500 motion-reduce:animate-none"
            >
              <article className="group glass h-full overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={img(project.image)}
                    alt={`${t(project.title)}: ${t(project.subtitle)}`}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                        {t(
                          projectFilters.find(
                            (projectFilter) =>
                              projectFilter.id === project.category,
                          )?.label ?? '',
                        )}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        {t(project.title)}
                      </h3>
                    </div>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t('Ver sitio (abre en una pestaña nueva)')}: ${t(project.title)}`}
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-secondary/60 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <ArrowUpRight className="size-4" aria-hidden />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(project.subtitle)}
                  </p>

                  <details className="group/details mt-4 border-t border-border/70 pt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                      {t('Ver detalles del proyecto')}
                      <ChevronDown
                        aria-hidden
                        className="size-4 shrink-0 transition-transform group-open/details:rotate-180 motion-reduce:transition-none"
                      />
                    </summary>
                    <dl className="mt-3 space-y-3 text-sm">
                      {[
                        ['Requerimiento', details.requirement],
                        ['Solución', details.solution],
                        ['Logro', details.achievement],
                      ].map(([label, description]) => (
                        <div key={label}>
                          <dt className="font-semibold">{t(label)}</dt>
                          <dd className="mt-0.5 text-muted-foreground">
                            {description}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      {filteredProjects.length > INITIAL_PROJECT_COUNT && (
        <div className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" aria-hidden />
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((previous) => !previous)}
            className="rounded-xl border border-border bg-secondary/50 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {showAll ? t('Ver menos') : t('Ver más')}
          </button>
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
      )}
    </div>
  )
}
