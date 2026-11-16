import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Camera, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Mail, MapPin, Menu, Palette, Phone, Play, Scissors, Share2, Sparkles, Video, X } from 'lucide-react'
import { creator } from './data/config.js'
import { socialLinks } from './config/socialLinks.js'
import { projects, services } from './data/content.js'
import { tiktokVideos } from './data/tiktokVideos.js'
import { Localized, useLanguage } from './i18n/LanguageContext.jsx'

const photo = (id, w = 1000) => id.startsWith('/') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
const iconMap = { camera: Camera, video: Video, sparkles: Sparkles, scissors: Scissors, calendar: CalendarDays, share: Share2 }
const socialPlatforms = [
  { key: 'facebook', title: 'Facebook', username: 'SHILO Production', Icon: FacebookBrandIcon },
  { key: 'instagram', title: 'Instagram', username: '@mame1431m', Icon: InstagramBrandIcon },
  { key: 'tiktok', title: 'TikTok', username: '@shiloproduction', Icon: TikTokIcon },
  { key: 'telegram', title: 'Telegram', username: '@shilo1431MK', Icon: TelegramBrandIcon },
  { key: 'whatsapp', title: 'WhatsApp', username: '+251994326761', Icon: WhatsAppBrandIcon },
]
const nav = [['About', '#about'], ['Services', '#services'], ['Work', '#work'], ['TikTok Videos', '#tiktok-videos']]
const publishedTikTokVideos = tiktokVideos.filter(({ url }) => {
  try {
    const link = new URL(url)
    return link.protocol === 'https:' && (link.hostname === 'vt.tiktok.com' || (link.hostname === 'www.tiktok.com' && /\/@[^/]+\/video\/\d+/.test(link.pathname)))
  } catch { return false }
})

function FacebookBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="12" fill="#1877F2"/>
    <path fill="#fff" d="M13.42 21v-8.22h2.76l.41-3.2h-3.17V7.54c0-.93.26-1.56 1.59-1.56h1.69V3.12c-.29-.04-1.3-.12-2.48-.12-2.46 0-4.14 1.5-4.14 4.26v2.32H7.3v3.2h2.78V21h3.34Z"/>
  </svg>
}

function InstagramBrandIcon({ size = 24, className = '', ...props }) {
  const gradientId = `instagram-gradient-${useId().replaceAll(':', '')}`
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <defs><linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse"><stop stopColor="#FEDA75"/><stop offset=".28" stopColor="#FA7E1E"/><stop offset=".52" stopColor="#D62976"/><stop offset=".76" stopColor="#962FBF"/><stop offset="1" stopColor="#4F5BD5"/></linearGradient></defs>
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke={`url(#${gradientId})`} strokeWidth="1.9"/>
    <circle cx="12" cy="12" r="4.05" stroke={`url(#${gradientId})`} strokeWidth="1.9"/>
    <circle cx="17.65" cy="6.45" r="1.15" fill="#FEDA75"/>
  </svg>
}
function TikTokIcon({ size = 24, className = '' }) {
  const mark = 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.43v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.19-.02-.38-.05-.56v-3.5a6.34 6.34 0 1 0 3.48 5.65V8.28a8.16 8.16 0 0 0 4.77 1.54V6.4c-.34 0-.68-.04-1-.11Z'
  return <svg className={`brand-tiktok ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path className="brand-tiktok-cyan" d={mark} transform="translate(-.8 .45)"/><path className="brand-tiktok-red" d={mark} transform="translate(.8 -.35)"/><path className="brand-tiktok-core" d={mark}/></svg>
}
function TelegramBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="12" fill="#0088CC"/><path fill="#fff" d="m19.82 6.18-2.98 12.2c-.22.86-.8 1.07-1.62.67l-4.48-3.3-2.16 2.07c-.24.24-.44.44-.89.44l.32-4.55 8.28-7.48c.36-.32-.08-.5-.56-.18l-10.24 6.45-4.41-1.38c-.95-.3-.97-.95.2-1.42l17.23-6.65c.79-.29 1.48.18 1.21 1.13Z"/></svg>
}
function WhatsAppBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="12" fill="#25D366"/><path fill="#fff" d="M20.01 15.38c-1.12 0-2.22-.18-3.26-.54a1 1 0 0 0-1.02.24l-1.45 1.45a15.1 15.1 0 0 1-6.6-6.6l1.45-1.45a1 1 0 0 0 .24-1.02 10.4 10.4 0 0 1-.54-3.26 1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.87a1 1 0 0 0-1-1Z" transform="translate(2 2) scale(.8)"/></svg>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { language, setLanguage, t } = useLanguage()
  useEffect(() => {
    const onScroll = () => { let current = ''; nav.forEach(([label, id]) => { const el = document.querySelector(id); if (el && window.scrollY >= el.offsetTop - 140) current = label }); setActive(current) }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return <Localized><header className="header"><a className="brand" href="#home" aria-label={`${creator.brand} home`}><span className="brand-mark">SP</span><span>{creator.brand}<small>CAPTURING MOMENTS · CREATING STORIES</small></span></a><button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><nav id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label={t('primary-navigation')}>{nav.map(([label, href]) => label === 'Work' ? <details className="nav-dropdown" key={label}><summary className={active === 'Work' || active === 'TikTok Videos' ? 'active' : ''}>{t('Work')} <ChevronDown size={14}/></summary><div className="nav-submenu">{[['Portfolio', '#work'], ['TikTok Videos', '#tiktok-videos']].map(([child, childHref]) => <a key={childHref} href={childHref} className={active === child || (child === 'Portfolio' && active === 'Work') ? 'active' : ''} onClick={event => { setOpen(false); const details = event.currentTarget.closest('details'); if (details) details.open = false }}>{t(child)}</a>)}</div></details> : label === 'TikTok Videos' ? null : <a key={label} className={active === label ? 'active' : ''} href={href} onClick={() => setOpen(false)}>{t(label)}</a>)}<div className="language-toggle" role="group" aria-label={t('Language')}><button type="button" className={language === 'en' ? 'selected' : ''} aria-pressed={language === 'en'} aria-label={t('Switch to English')} onClick={() => { setLanguage('en'); setOpen(false) }}><span>EN</span></button><span className="language-divider" aria-hidden="true">|</span><button type="button" className={language === 'am' ? 'selected' : ''} aria-pressed={language === 'am'} aria-label={t('Switch to Amharic')} onClick={() => { setLanguage('am'); setOpen(false) }}><span>AM</span></button></div><a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>{t('Let’s talk')} <ArrowUpRight size={15}/></a></nav></header></Localized>
}
function Reveal({ children, className = '', delay = 0 }) { const reduceMotion = useReducedMotion(); return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: reduceMotion ? 0 : .65, delay: reduceMotion ? 0 : delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div> }
function SectionIntro({ kicker, title, children, side }) { return <div className="section-intro"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{children && <p>{children}</p>}{side && <span className="intro-side">{side}</span>}</div> }
function SocialFollow() {
  return <Localized><section className="social-follow section-pad" id="social"><Reveal><SectionIntro kicker="Stay connected" title={<>CONNECT WITH <em>SHILO Production</em></>} side="SOCIAL">Follow SHILO Production across our official social media profiles.</SectionIntro></Reveal><div className="social-cards">{socialPlatforms.map(({ key, title, username, Icon }) => { const url = socialLinks[key]; return <Reveal key={key}><article className="social-card"><a className="social-icon-link" data-platform={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${key === 'whatsapp' ? 'Message' : 'Open'} SHILO Production on ${title}`}><Icon className={`social-brand-icon social-brand-icon--${key}`} size={24} strokeWidth={1.5}/></a><span className="eyebrow">SHILO PRODUCTION</span><h3>{title}</h3><p>{username}</p><a className="button button-outline" href={url} target="_blank" rel="noopener noreferrer">{key === 'whatsapp' ? 'Message on WhatsApp' : key === 'telegram' ? 'Open Telegram' : `Follow on ${title}`} <ArrowUpRight size={15}/></a></article></Reveal>})}</div></section></Localized>
}

function App() {
  const reduceMotion = useReducedMotion()
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [sent, setSent] = useState(false)
  const filters = ['All', 'Photography', 'Videography', 'Events', 'Creative Work']
  const shown = projects.filter(p => filter === 'All' || p.category === filter)
  useEffect(() => { document.body.style.overflow = selected ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [selected])
  useEffect(() => {
    if (!selected) return
    const onKeyDown = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = projects.findIndex(project => project.title === selected.title)
        const step = event.key === 'ArrowRight' ? 1 : -1
        setSelected(projects[(index + step + projects.length) % projects.length])
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])
  const handleSubmit = e => { e.preventDefault(); const data = new FormData(e.currentTarget); const body = `${t('Name:')} ${data.get('name')}\n${t('Email:')} ${data.get('email')}\n${t('Phone:')} ${data.get('phone') || t('Not provided')}\n${t('Service:')} ${t(data.get('service'))}\n\n${data.get('details')}`; window.location.href = `mailto:${creator.email}?subject=${encodeURIComponent(t('Portfolio enquiry'))}&body=${encodeURIComponent(body)}`; setSent(true) }
  return <Localized><>
    <a className="skip-link" href="#main-content">{t('Skip to content')}</a>
    <Header/>
    <main id="main-content">
      <section className="hero" id="home"><div className="hero-image"/><div className="hero-shade"/><div className="hero-content"><div className="hero-overline"><span className="pulse"/> SHILO PRODUCTION <span className="hero-place">BASED IN ADDIS ABABA, ETHIOPIA</span></div><h1>{language === 'am' ? t('Stories worth feeling.') : <>Stories worth<br/> <em>feeling.</em></>}</h1><p className="hero-copy">{t(creator.tagline)} {t(creator.heroDescription)}</p><div className="hero-actions"><a href="#work" className="button button-gold">{t('Explore our work')} <ArrowRight size={16}/></a><a href="#about" className="text-link">{t('About the studio')} <ArrowDown size={15}/></a></div><div className="hero-proof" aria-label={t('Portfolio overview')}><span className="hero-proof-count">{projects.length.toString().padStart(2, '0')}</span><span>{t('selected portfolio stories')}</span></div><div className="hero-bottom"><span>{t('SCROLL TO EXPLORE')} <ArrowDown size={13}/></span><span>PHOTO · FILM · DIGITAL</span></div></div><div className="hero-caption"><span>SHILO PRODUCTION</span> CAPTURING MOMENTS · CREATING STORIES</div></section>
      <div className="ticker" aria-label="Photography, film, and stories"><div className="ticker-track">{Array.from({length: 2}, (_, i) => <span key={i}>PHOTOGRAPHY <b>✳</b> FILMMAKING <b>✳</b> VISUAL STORIES <b>✳</b> GOOD PEOPLE, GOOD LIGHT <b>✳</b>&nbsp;</span>)}</div></div>

      <section className="about section-pad" id="about" aria-labelledby="about-heading">
        <Reveal className="about-photo-reveal">
          <div className="about-photo-wrap">
            <img className="about-photo" src={creator.profileImage} alt="Portrait of the creator" loading="lazy" decoding="async" width="852" height="1280"/>
            <span className="photo-stamp">ALWAYS<br/>LOOKING<br/>CLOSER <i>✳</i></span>
            <span className="photo-label">THE PERSON BEHIND THE LENS</span>
            <a className="about-instagram" data-platform="instagram" href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('Open SHILO Production on Instagram')}><InstagramBrandIcon className="social-brand-icon social-brand-icon--instagram" size={17}/><span>@shiloproduction</span><ArrowUpRight size={14} aria-hidden="true"/></a>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal className="about-reveal" delay={.05}><span className="eyebrow">{t('01 — THE STUDIO')}</span><h2 id="about-heading">{t('A LITTLE ABOUT THE STUDIO')}</h2></Reveal>
          <Reveal className="about-reveal" delay={.12}><p className="about-motto"><strong>{t('Curiosity first.')}</strong> {t('Camera second.')}</p><p className="lead">I believe the best images don’t just show you something. They make you feel something.</p></Reveal>
          <Reveal className="about-reveal" delay={.19}><p className="body-copy">From the quiet in-between moments to the energy of a packed dance floor, I make photographs and films that feel honest, considered and unmistakably human. Every project starts with listening, then finding the light in the story only you can tell.</p></Reveal>
          <Reveal className="about-reveal" delay={.26}><div className="skill-list">{['Photography', 'Cinematography', 'Creative direction', 'Video editing', 'Social content'].map(service => <a key={service} href="#services" aria-label={`${t('Services')}: ${t(service)}`}>{t(service)} <ArrowUpRight size={13} aria-hidden="true"/></a>)}</div></Reveal>
          <Reveal className="about-reveal" delay={.33}><a className="about-cta" href="#contact"><span>{t('Let’s make something meaningful')}</span><ArrowRight size={19} aria-hidden="true"/></a></Reveal>
        </div>
      </section>

      <section className="services section-pad" id="services"><Reveal><SectionIntro kicker="What I do" title={<>A good story can<br/><em>take many forms.</em></>} side="01 — SERVICES">Whatever the brief, the approach stays the same: make it thoughtful, make it beautiful, make it matter.</SectionIntro></Reveal><div className="service-grid">{services.map((s, i) => { const Icon = iconMap[s.icon]; return <Reveal key={s.title} delay={i * .05}><article className="service-card"><span className="service-num">{s.num}</span><Icon className="service-icon" size={21} strokeWidth={1.5}/><h3>{s.title}</h3><p>{s.text}</p><a href="#contact" aria-label={`Ask about ${s.title}`}><ArrowUpRight size={17}/></a></article></Reveal> })}</div></section>

      <section className="work section-pad" id="work"><Reveal><SectionIntro kicker="Selected work · SHILO Production" title={language === 'am' ? t('Frames from the feeling.') : <>Frames from<br/><em>the feeling.</em></>} side="02 — PORTFOLIO">A collection of people, places and little moments captured by SHILO Production.</SectionIntro></Reveal><div className="filters" role="group" aria-label="Filter projects">{filters.map(f => <button className={filter === f ? 'filter active' : 'filter'} key={f} onClick={() => setFilter(f)}>{f}<span>{f === 'All' ? String(projects.length).padStart(2, '0') : String(projects.filter(p => p.category === f).length).padStart(2, '0')}</span></button>)}</div><motion.div layout className="project-grid" transition={{ duration: reduceMotion ? 0 : .35 }}>{shown.map((p, i) => <motion.button layout key={p.title} className={`project-card ${p.size}`} onClick={() => setSelected(p)} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : .35 }}><img src={photo(p.image, 1100)} alt={`${t(p.title)} — ${t(p.note)}`} loading="lazy" decoding="async" width={p.width} height={p.height}/><span className="project-overlay"><span className="project-meta"><span>{p.note}</span><ArrowUpRight size={17}/></span><span className="project-title">{p.title}</span><span className="project-type">{p.type}</span></span></motion.button>)}</motion.div><div className="work-foot"><span>AN OPEN-ENDED COLLECTION, ALWAYS IN PROGRESS.</span><a href="#contact" className="under-link">Have a project in mind? <ArrowUpRight size={16}/></a></div></section>

      <section className="film-band"><div className="film-image"/><div className="film-content"><Reveal><span className="eyebrow">Moving pictures</span><h2>Some stories<br/>need to <em>move.</em></h2><p>Follow SHILO Production for creative videos, cinematic moments and behind-the-scenes content.</p><a className="button button-outline" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">Find us on TikTok <ArrowUpRight size={16}/></a></Reveal></div><span className="film-vertical">SHILO PRODUCTION · MOTION PICTURE</span></section>

      <section className="tiktok-videos section-pad" id="tiktok-videos"><Reveal><SectionIntro kicker="SHILO PRODUCTION · TIKTOK" title={language === 'am' ? t('TikTok video gallery') : <>TikTok<br/><em>Videos</em></>} side="@SHILOPRODUCTION">Browse selected videos and watch them directly on TikTok.</SectionIntro></Reveal>{publishedTikTokVideos.length ? <div className="tiktok-video-grid">{publishedTikTokVideos.map((video, index) => { const title = video.title?.[language] || video.title?.en || ''; const description = video.description?.[language] || video.description?.en || ''; return <Reveal key={video.id} delay={index * .06}><a className="tiktok-video-card" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('Watch on TikTok:')} ${title}`}><span className="tiktok-video-thumb">{video.thumbnail ? <img src={video.thumbnail} alt="" loading="lazy" decoding="async"/> : <span className="tiktok-video-placeholder"><span>SHILO<br/>PRODUCTION</span></span>}<span className="tiktok-video-play"><Play size={21} fill="currentColor"/></span><span className="tiktok-video-logo"><TikTokIcon size={17}/></span></span><span className="tiktok-video-copy">{video.category && <span className="eyebrow">{video.category}</span>}<strong>{title}</strong>{description && <span>{description}</span>}</span></a></Reveal> })}</div> : <div className="tiktok-videos-empty"><span className="tiktok-empty-icon"><TikTokIcon size={23}/></span><div><h3>{t('TikTok videos are coming soon.')}</h3><p>{t('Visit our TikTok profile to see the latest videos.')}</p></div><a className="button button-gold" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">{t('Visit TikTok profile')} <ArrowUpRight size={16}/></a></div>}</section>

      <section className="tiktok-profile section-pad" id="tiktok"><Reveal><SectionIntro kicker="Find us on TikTok" title={<>Creative stories,<br/><em>in motion.</em></>} side="@SHILOPRODUCTION">Follow us for creative videos, cinematic moments, and behind-the-scenes content.</SectionIntro></Reveal><div className="tiktok-profile-card"><a className="tiktok-avatar-link" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Open SHILO Production TikTok profile"><img src={creator.profileImage} alt="SHILO Production profile" loading="lazy" decoding="async" width="852" height="1280"/><span className="tiktok-avatar-badge"><TikTokIcon size={20}/></span></a><div className="tiktok-profile-copy"><a className="tiktok-brand-link" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"><span className="eyebrow">SHILO PRODUCTION</span><h3>{creator.brand}</h3></a><a className="tiktok-username" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">@shiloproduction <ArrowUpRight size={14}/></a><p>Follow us for creative videos, cinematic moments, and behind-the-scenes content.</p><div className="tiktok-actions"><a className="button button-gold" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">Watch Videos on TikTok <ArrowUpRight size={16}/></a><a className="button button-outline" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">Follow on TikTok <ArrowUpRight size={16}/></a></div></div></div></section>
      <SocialFollow/>

      <section className="process section-pad"><Reveal><SectionIntro kicker="How we’ll work" title={<>Good work starts<br/><em>with a conversation.</em></>} side="04 — THE PROCESS"/></Reveal><div className="process-list">{[['01','Listen closely','First, I want to hear what matters to you and what you want people to feel.'],['02','Find the story','Together we shape a clear idea, a simple plan and the details that make it yours.'],['03','Make the work','On the day, I’ll make space for the real moments while keeping the vision in focus.'],['04','Make it sing','Careful editing, a little color magic and a final delivery that’s ready to share.']].map(([n,t,d])=><div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={17}/></div>)}</div></section>

      <section className="quote-section"><div className="quote-mark">“</div><Reveal><blockquote>“It felt less like a shoot and more like having a friend who happens to know exactly where the light is.”</blockquote><div className="quote-credit"><span className="quote-line"/> CLIENT NOTE <span>·</span> SAMPLE TESTIMONIAL</div></Reveal><div className="quote-count">KIND WORDS <span>01 / 01</span></div></section>

    <section className="contact section-pad" id="contact"><Reveal><div className="contact-heading"><span className="eyebrow">The beginning of something</span><h2>Have a story<br/>in <em>mind?</em></h2><p>Tell me a little about it. Big plans, half-formed ideas and “what ifs” are all welcome here.</p><a className="contact-email" href={`mailto:${creator.email}`}>{creator.email} <ArrowUpRight size={18}/></a><a className="contact-phone" href={`tel:${creator.phone}`} aria-label={t('Call SHILO Production')}><Phone size={16}/><span>{creator.phone}</span></a><div className="contact-social-links" aria-label="Message SHILO Production"><a className="contact-social-link" data-platform="telegram" href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Open SHILO Production on Telegram"><TelegramBrandIcon size={18}/><span>Telegram</span></a><a className="contact-social-link" data-platform="whatsapp" href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message SHILO Production on WhatsApp"><WhatsAppBrandIcon size={18}/><span>WhatsApp</span></a></div><div className="contact-location"><span className="pulse"/>{creator.location}</div></div></Reveal><Reveal delay={.12}><form className="contact-form" onSubmit={handleSubmit}><div className="form-top"><span className="eyebrow">Send a note</span><span>01 — 05</span></div><label>Your name<input name="name" placeholder="What should I call you?" required/></label><label>Email address<input type="email" name="email" placeholder="you@example.com" required/></label><label>Phone number<input type="tel" name="phone" placeholder="+251 …" /></label><label>What are you dreaming up?<select name="service" defaultValue="" required><option value="" disabled>Choose a service</option><option>Photography</option><option>Film & videography</option><option>Social content</option><option>Event coverage</option><option>Something else</option></select></label><label>A few more details<textarea name="details" placeholder="The date, the feeling, the big idea…" rows="3" required/></label><button type="submit" className="button button-gold form-submit">{sent ? <>Email draft opened <Check size={16}/></> : <>Open email draft <ArrowRight size={16}/></>}</button>{sent && <p className="form-note" role="status">{t("Your email app should open with your message addressed to")} {creator.email}. {t("If the email draft does not open, write directly to that address.")}</p>}<p className="form-note">This form opens your email app; it does not send or store your information.</p></form></Reveal></section>
    </main>
    <footer className="footer">
      <div className="footer-main">
        <section className="footer-brand-col" aria-label={t('SHILO Production')}>
          <a className="brand" href="#home" aria-label={t('SHILO Production home')}><span className="brand-mark">SP</span><span>{creator.brand}<small>CAPTURING MOMENTS · CREATING STORIES</small></span></a>
          <p className="footer-description">{creator.bio}</p>
          <p className="footer-slogan">{creator.tagline}</p>
          <div className="footer-socials" aria-label={t('Connect with us')}>
            {socialPlatforms.map(({ key, title, Icon }) => <a key={key} data-platform={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer" aria-label={t(`Follow ${title} profile`)}><Icon className={`social-brand-icon social-brand-icon--${key}`} size={19} strokeWidth={1.6}/></a>)}
          </div>
        </section>

        <nav className="footer-column" aria-label={t('Footer navigation')}>
          <h2>{t('Quick navigation')}</h2>
          <ul>{[['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Portfolio', '#work'], ['TikTok Videos', '#tiktok-videos'], ['Contact', '#contact']].map(([label, href]) => <li key={href}><a href={href}>{t(label)}</a></li>)}</ul>
        </nav>

        <section className="footer-column">
          <h2>{t('Our services')}</h2>
          <ul className="footer-service-list">{services.map(service => { const Icon = iconMap[service.icon]; return <li key={service.num}><a href="#services"><Icon size={16} strokeWidth={1.5}/><span>{t(service.title)}</span></a></li> })}</ul>
        </section>

        <address className="footer-column footer-contact">
          <h2>{t('Contact information')}</h2>
          {creator.phone && <a className="footer-contact-link" href={`tel:${creator.phone}`}><Phone size={17}/><span>{creator.phone}</span></a>}
          <a className="footer-contact-link" href={`mailto:${creator.email}`} aria-label={t('Email SHILO Production')}><Mail size={17}/><span>{creator.email}</span></a>
          <p className="footer-contact-link"><MapPin size={17}/><span>{t(creator.location)}</span></p>
        </address>

        <section className="footer-column footer-design">
          <h2>{t('Graphic Designer')}</h2>
          <p className="footer-design-copy">{t('Thoughtful graphic design for brands, campaigns, and stories that deserve to stand out.')}</p>
          <a className="footer-design-link" href="#work"><Palette size={17} strokeWidth={1.6}/><span>{t('Explore Designs')}</span><ArrowRight size={15}/></a>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {creator.brand}. {t('All rights reserved.')}</p>
        <a href="#home" className="back-top" aria-label={t('BACK TO THE TOP')}>{t('BACK TO THE TOP')} <ArrowUpRight size={15}/></a>
      </div>
    </footer>

    <AnimatePresence>{selected && <motion.div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${t(selected.title)} ${t('image preview')}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}><button className="modal-close" aria-label={t('Close image preview')} onClick={() => setSelected(null)}><X/></button><button className="image-nav image-nav-prev" aria-label={t('Previous image')} onClick={event => { event.stopPropagation(); const index = projects.findIndex(project => project.title === selected.title); setSelected(projects[(index - 1 + projects.length) % projects.length]) }}><ChevronLeft/></button><motion.div className="image-modal" initial={{scale:.96,y:12}} animate={{scale:1,y:0}} exit={{scale:.96}} onClick={e=>e.stopPropagation()}><img src={photo(selected.image, 1800)} alt={`${t(selected.title)} — ${t(selected.note)}`} decoding="async"/><div><span>{selected.note}</span><h3>{selected.title}</h3></div></motion.div><button className="image-nav image-nav-next" aria-label={t('Next image')} onClick={event => { event.stopPropagation(); const index = projects.findIndex(project => project.title === selected.title); setSelected(projects[(index + 1) % projects.length]) }}><ChevronRight/></button></motion.div>}</AnimatePresence>
  </></Localized>
}
export default App
