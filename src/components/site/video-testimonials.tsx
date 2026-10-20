import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import { videoTestimonials } from '@/lib/content'
import { useLanguage } from '@/lib/i18n'
import { img } from '@/lib/img'

function subscribeToMotionPreference(listener: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', listener)
  return () => preference.removeEventListener('change', listener)
}

function getMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function VideoTestimonialsCarousel() {
  const railRef = useRef<HTMLDivElement>(null)
  const slides = videoTestimonials
    .filter(
      (video, index, videos) =>
        videos.findIndex((candidate) => candidate.src === video.src) === index,
    )
    .slice(0, 5)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const [autoPlayOverride, setAutoPlayOverride] = useState<boolean | null>(null)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => true,
  )
  const isAutoPlaying = autoPlayOverride ?? !prefersReducedMotion
  const { t } = useLanguage()

  function scrollToSlide(index: number) {
    const rail = railRef.current
    const slide = rail?.children.item(index)
    if (!rail || !(slide instanceof HTMLElement)) return

    rail.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () =>
      document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(rail)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (
      !isAutoPlaying ||
      !isVisible ||
      !isDocumentVisible ||
      isHovered ||
      isFocused ||
      isPlaying
    ) {
      return
    }

    const timer = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length
      setActiveIndex(nextIndex)
      scrollToSlide(nextIndex)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [
    activeIndex,
    isAutoPlaying,
    isDocumentVisible,
    isFocused,
    isHovered,
    isPlaying,
    isVisible,
    slides.length,
  ])

  function scrollTo(index: number) {
    const nextIndex = (index + slides.length) % slides.length
    setActiveIndex(nextIndex)
    scrollToSlide(nextIndex)
  }

  function updateActiveIndex() {
    const rail = railRef.current
    if (!rail) return

    const railLeft = rail.getBoundingClientRect().left
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    Array.from(rail.children).forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railLeft)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
  }

  return (
    <div
      className="glass mt-10 rounded-3xl p-5 sm:p-7"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false)
        }
      }}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-xl font-bold sm:text-2xl">
          {t('Experiencias en video')}
        </h3>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            aria-label={
              isAutoPlaying ? t('Pausar carrusel') : t('Reanudar carrusel')
            }
            aria-pressed={!isAutoPlaying}
            onClick={() => setAutoPlayOverride(!isAutoPlaying)}
            className="grid size-10 place-items-center rounded-full border border-border bg-secondary/50 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {isAutoPlaying ? (
              <Pause className="size-4" aria-hidden />
            ) : (
              <Play className="size-4" aria-hidden />
            )}
          </button>
          <button
            type="button"
            aria-label={t('Video anterior')}
            onClick={() => scrollTo(activeIndex - 1)}
            className="grid size-10 place-items-center rounded-full border border-border bg-secondary/50 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t('Video siguiente')}
            onClick={() => scrollTo(activeIndex + 1)}
            className="grid size-10 place-items-center rounded-full border border-border bg-secondary/50 transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={railRef}
        role="region"
        aria-label={t('Testimonios en video')}
        aria-roledescription={t('carrusel')}
        onScroll={updateActiveIndex}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3"
      >
        {slides.map((video, index) => (
          <article
            key={video.name}
            data-video-card
            role="group"
            aria-roledescription={t('diapositiva')}
            aria-label={`${index + 1} ${t('de')} ${slides.length}: ${video.name}`}
            className="w-[min(82vw,17rem)] shrink-0 snap-start"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-black">
              <video
                controls
                playsInline
                preload="none"
                poster={img(video.poster)}
                className="aspect-[9/16] w-full object-contain"
                aria-label={`${t('Testimonio en video de')} ${video.name}`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={video.src} type="video/mp4" />
                {t('Tu navegador no admite la reproducción de vídeo.')}
              </video>
            </div>
            <h4 className="mt-3 text-center font-semibold">{video.name}</h4>
          </article>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {t('Video')} {activeIndex + 1} {t('de')} {slides.length}
      </p>
    </div>
  )
}
