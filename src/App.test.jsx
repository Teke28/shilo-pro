import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { socialLinks } from './config/socialLinks.js'
import { creator } from './data/config.js'
import { projects } from './data/content.js'
import { vlogs } from './data/vlogs.js'
import { responsivePhoto } from './utils/responsivePhoto.js'

function renderApp() {
  return render(<LanguageProvider><App /></LanguageProvider>)
}

describe('SHILO Production homepage', () => {
  it('opens mobile navigation and closes it after choosing a section', async () => {
    const user = userEvent.setup()
    renderApp()
    const menu = screen.getByRole('button', { name: 'Open menu' })

    await user.click(menu)
    expect(menu.getAttribute('aria-expanded')).toBe('true')

    await user.click(within(screen.getByRole('navigation', { name: 'primary-navigation' })).getByRole('link', { name: 'About' }))
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
  })

  it('points every responsive photograph candidate to an existing variant and keeps original JPEG fallbacks', () => {
    const responsiveImages = [
      ...projects.map(project => ({ path: project.image, width: project.width })),
      { path: creator.profileImage, width: 852 },
    ]

    for (const { path, width } of responsiveImages) {
      expect(existsSync(resolve('public', path.slice(1)))).toBe(true)
      const { srcSet = '' } = responsivePhoto(path, width, '100vw')
      expect(srcSet).not.toBe('')

      for (const candidate of srcSet.split(', ')) {
        const [variantPath, descriptor] = candidate.split(' ')
        const pixelWidth = Number.parseInt(descriptor, 10)
        expect(pixelWidth).toBeLessThanOrEqual(width)
        expect(existsSync(resolve('public', variantPath.slice(1)))).toBe(true)
      }
    }

    expect(responsivePhoto('/images/outside-source.jpg', 2000, '100vw')).toEqual({})
  })

  it('switches to Amharic and persists the selected language', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: 'Switch to Amharic' }))

    expect(await screen.findByRole('heading', { name: 'ስለ ስቱዲዮው በጥቂቱ' })).toBeTruthy()
    const amharicVlogTitle = document.querySelector('#tiktok-videos h2').textContent
    expect(amharicVlogTitle).toContain('ታሪኮች')
    expect(amharicVlogTitle).toContain('በእንቅስቃሴ')
    expect(document.documentElement.lang).toBe('am')
    expect(localStorage.getItem('shilo-production-language')).toBe('am')
  })

  it('renders four verified Vlog links that open the original TikTok posts safely', () => {
    renderApp()

    const vlogTitle = document.querySelector('#tiktok-videos h2').textContent.replace(/\s+/g, '')
    expect(vlogTitle).toBe('StoriesinMotion')
    const cards = [...document.querySelectorAll('.vlog-card')]
    expect(cards).toHaveLength(4)

    cards.forEach((card, index) => {
      expect(card.getAttribute('href')).toBe(vlogs[index].videoUrl)
      expect(card.target).toBe('_blank')
      expect(card.rel).toContain('noopener')
      expect(card.rel).toContain('noreferrer')
      expect(within(card).getByText('Watch on TikTok')).toBeTruthy()
    })
  })

  it('filters portfolio projects by category', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /^Events/ }))

    expect(screen.getByRole('button', { name: /A Day to Remember/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /The Celebration/ })).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Into the Golden Hour/ })).toBeNull()
  })

  it('opens the portfolio lightbox, closes with Escape, and restores focus', async () => {
    const user = userEvent.setup()
    renderApp()
    const project = screen.getByRole('button', { name: /Into the Golden Hour/ })

    await user.click(project)

    const dialog = screen.getByRole('dialog')
    const closeButton = within(dialog).getByRole('button', { name: 'Close image preview' })
    expect(document.activeElement).toBe(closeButton)

    const nextButton = within(dialog).getByRole('button', { name: 'Next image' })
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(nextButton)
    await user.tab()
    expect(document.activeElement).toBe(closeButton)

    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    await waitFor(() => expect(document.activeElement).toBe(project))
  })

  it('keeps configured social destinations secure and unchanged', () => {
    renderApp()

    for (const [platform, url] of Object.entries(socialLinks)) {
      const links = [...document.querySelectorAll('a[href]')].filter(link => link.getAttribute('href') === url)
      expect(links.length, `${platform} should have a visible link`).toBeGreaterThan(0)
      for (const link of links) {
        expect(link.target).toBe('_blank')
        expect(link.rel).toContain('noopener')
        expect(link.rel).toContain('noreferrer')
      }
    }
  })
})
