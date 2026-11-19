import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { creator } from '../data/config.js'
import { Localized, useLanguage } from '../i18n/LanguageContext.jsx'

const navigation = [['About', '#about'], ['Services', '#services'], ['Work', '#work'], ['TikTok Videos', '#tiktok-videos']]
const workLinks = [['Portfolio', '#work'], ['TikTok Videos', '#tiktok-videos']]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const updateActiveSection = () => {
      let current = ''
      navigation.forEach(([label, id]) => {
        const section = document.querySelector(id)
        if (section && window.scrollY >= section.offsetTop - 140) current = label
      })
      setActive(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const closeMenu = () => setOpen(false)

  return <Localized><header className="header">
    <a className="brand" href="#home" aria-label={`${creator.brand} home`}><span className="brand-mark">SP</span><span>{creator.brand}<small>CAPTURING MOMENTS · CREATING STORIES</small></span></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>{open ? <X/> : <Menu/>}</button>
    <nav id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label={t('primary-navigation')}>
      {navigation.map(([label, href]) => label === 'Work'
        ? <details className="nav-dropdown" key={label}><summary className={active === 'Work' || active === 'TikTok Videos' ? 'active' : ''}>{t('Work')} <ChevronDown size={14}/></summary><div className="nav-submenu">{workLinks.map(([child, childHref]) => <a key={childHref} href={childHref} className={active === child || (child === 'Portfolio' && active === 'Work') ? 'active' : ''} onClick={event => { closeMenu(); const details = event.currentTarget.closest('details'); if (details) details.open = false }}>{t(child)}</a>)}</div></details>
        : label === 'TikTok Videos' ? null
          : <a key={label} className={active === label ? 'active' : ''} href={href} onClick={closeMenu}>{t(label)}</a>)}
      <div className="language-toggle" role="group" aria-label={t('Language')}>
        <button type="button" className={language === 'en' ? 'selected' : ''} aria-pressed={language === 'en'} aria-label={t('Switch to English')} onClick={() => { setLanguage('en'); closeMenu() }}><span>EN</span></button>
        <span className="language-divider" aria-hidden="true">|</span>
        <button type="button" className={language === 'am' ? 'selected' : ''} aria-pressed={language === 'am'} aria-label={t('Switch to Amharic')} onClick={() => { setLanguage('am'); closeMenu() }}><span>AM</span></button>
      </div>
      <a className="nav-contact" href="#contact" onClick={closeMenu}>{t('Let’s talk')} <ArrowUpRight size={15}/></a>
    </nav>
  </header></Localized>
}
