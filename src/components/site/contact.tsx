import { ArrowUpRight, CalendarDays, HeartHandshake } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CONTACT_EMAIL } from '@/lib/content'
import { useLanguage } from '@/lib/i18n'

const calendarUrl =
  'https://calendar.google.com/appointments/schedules/AcZssZ1ohVbMtFI65zMINN5CyyucerUXBUQ_JnwkHgdM5W5wCncfg5Md1Sw-J1EoFXU3TuuL1uZmdtFN'
const communityUrl = 'https://migranteslibres.com/unete'

export function mailtoHref(t: (text: string) => string) {
  const subject = encodeURIComponent(t('Hablemos sobre un proyecto'))
  const body = encodeURIComponent(
    t('Hola Gen, me gustaría conversar sobre un proyecto.'),
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export function ContactActions() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="h-14 rounded-2xl px-8 text-base glow-primary"
        >
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
            <CalendarDays className="size-5" /> {t('Agéndate y Hablemos 30min')}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-14 rounded-2xl border-border bg-secondary/40 px-6 text-base"
        >
          <a href={communityUrl} target="_blank" rel="noopener noreferrer">
            <HeartHandshake className="size-5" />
            {t('Conocer más sobre la comunidad')}
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
