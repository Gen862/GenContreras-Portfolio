import { describe, expect, it } from 'vitest'

import { isLanguage, translate } from './i18n'

describe('portfolio translations', () => {
  it('keeps Spanish as the default copy', () => {
    expect(translate('Soluciones Digitales.', 'es')).toBe(
      'Soluciones Digitales.',
    )
    expect(translate('Para tus ideas Tradicionales', 'es')).toBe(
      'Para tus ideas Tradicionales',
    )
  })

  it.each([
    ['pt', 'Soluções Digitais.', 'Para as suas Ideias Tradicionais'],
    ['en', 'Digital Solutions.', 'For your Traditional Ideas'],
  ] as const)(
    'translates the hero headline into %s',
    (language, firstLine, secondLine) => {
      expect(translate('Soluciones Digitales.', language)).toBe(firstLine)
      expect(translate('Para tus ideas Tradicionales', language)).toBe(
        secondLine,
      )
    },
  )

  it.each([
    ['pt', 'Vamos criar o seu projeto?'],
    ['en', 'Shall we build your project?'],
  ] as const)('translates the project CTA into %s', (language, expected) => {
    expect(translate('¿creamos tu proyecto?', language)).toBe(expected)
  })

  it('falls back to the original copy for a missing translation', () => {
    expect(translate('AWS', 'en')).toBe('AWS')
  })

  it.each([
    ['es', true],
    ['pt', true],
    ['en', true],
    ['fr', false],
  ])('validates language code %s', (language, expected) => {
    expect(isLanguage(language)).toBe(expected)
  })
})
