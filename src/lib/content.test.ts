import { describe, expect, it } from 'vitest'

import { cvDocuments, projects, videoTestimonials } from './content'

describe('video testimonials', () => {
  it('contains exactly five distinct video sources', () => {
    expect(videoTestimonials).toHaveLength(5)
    expect(new Set(videoTestimonials.map((video) => video.src)).size).toBe(5)
    expect(videoTestimonials.every((video) => video.poster)).toBe(true)
    expect(new Set(videoTestimonials.map((video) => video.poster)).size).toBe(5)
  })

  it('provides a localized requirement, solution and outcome for every project', () => {
    for (const project of projects) {
      for (const language of ['es', 'pt', 'en'] as const) {
        expect(project.details[language].requirement).toBeTruthy()
        expect(project.details[language].solution).toBeTruthy()
        expect(project.details[language].achievement).toBeTruthy()
      }
    }
  })

  it('swaps the e-commerce and CRM cards and appends the advertising card', () => {
    const titles = projects.map((project) => project.title)

    expect(titles.indexOf('CRM Migrantes Libres')).toBe(4)
    expect(titles.indexOf('E-commerce')).toBe(15)
    expect(projects.at(-1)).toMatchObject({
      title: 'Publicidad digital',
      image: 'publicidad.png',
      category: 'diseno',
    })
  })

  it('provides downloadable CV files in all three languages', () => {
    expect(cvDocuments.map((document) => document.href)).toEqual([
      '/cv/Curriculum%20Vitae%20ESPA%C3%91OL%20-%20Gen%20Contreras.pdf',
      '/cv/Curriculum%20Vitae%20PORTUGUES%20-%20Gen%20Contreras.pdf',
      '/cv/Curriculum%20Vitae%20ENGLISH%20-%20Gen%20Contreras.pdf',
    ])
  })
})
