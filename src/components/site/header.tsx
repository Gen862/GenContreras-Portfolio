import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { isLanguage, useLanguage } from '@/lib/i18n'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks, profile } from '@/lib/content'
import { cn } from '@/lib/utils'

export function Logo() {
  const { t } = useLanguage()

  return (
    <a
      href="#inicio"
      className="group flex items-center gap-2.5 rounded-md font-display text-base font-bold tracking-tight sm:text-lg"
      aria-label={`${profile.name}, ${t('inicio')}`}
    >
      <img
        src="/img/gle-logo.png"
        alt=""
        width={36}
        height={36}
        className="size-9 shrink-0 rounded-full object-contain"
      />
      <span>
        Gen<span className="text-gradient">Contreras</span>
      </span>
    </a>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-content items-center justify-between rounded-2xl px-4 transition-all duration-300 motion-reduce:transition-none sm:px-5',
          scrolled ? 'glass' : 'border border-transparent',
        )}
      >
        <Logo />

        <nav aria-label={t('Principal')} className="hidden lg:block">
          <ul className="flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="site-language">
            {t('Idioma')}
          </label>
          <select
            id="site-language"
            aria-label={t('Idioma')}
            value={language}
            onChange={(event) => {
              const nextLanguage = event.currentTarget.value
              if (isLanguage(nextLanguage)) setLanguage(nextLanguage)
            }}
            className="h-10 w-[4.25rem] rounded-xl border border-border bg-secondary/60 px-1 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-28 sm:px-2 sm:text-sm"
          >
            <option value="es">{t('Español')}</option>
            <option value="pt">{t('Portugués')}</option>
            <option value="en">{t('Inglés')}</option>
          </select>
          <Button
            asChild
            className="hidden rounded-xl glow-primary sm:inline-flex"
          >
            <a href="#contacto">
              {t('¿creamos tu proyecto?')} <ArrowUpRight />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t('Abrir menú')}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-border bg-popover"
            >
              <SheetTitle className="px-6 pt-6 font-display">
                {t('Menú')}
              </SheetTitle>
              <SheetDescription className="px-6">
                {t('Navega por las secciones del portafolio.')}
              </SheetDescription>
              <nav aria-label={t('Móvil')} className="px-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <a
                          href={link.href}
                          className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                        >
                          {t(link.label)}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 pt-2">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-xl glow-primary">
                    <a href="#contacto">
                      {t('¿creamos tu proyecto?')} <ArrowUpRight />
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
