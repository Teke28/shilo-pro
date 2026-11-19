import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Phone, Play, X } from 'lucide-react'
import { creator } from './data/config.js'
import { projects, services } from './data/content.js'
import { tiktokVideos } from './data/tiktokVideos.js'
import { Localized, useLanguage } from './i18n/LanguageContext.jsx'
import { serviceIcons } from './components/serviceIcons.js'
import { Reveal, SectionIntro } from './components/Reveal.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SocialFollow from './components/SocialFollow.jsx'
import { InstagramBrandIcon, TelegramBrandIcon, TikTokIcon, WhatsAppBrandIcon } from './components/BrandIcons.jsx'
import { socialLinks } from './config/socialLinks.js'
import { responsivePhoto } from './utils/responsivePhoto.js'

const publishedTikTokVideos = tiktokVideos.filter(({ url }) => {
  try {
    const link = new URL(url)
    return link.protocol === 'https:' && (link.hostname === 'vt.tiktok.com' || (link.hostname === 'www.tiktok.com' && /\/@[^/]+\/video\/\d+/.test(link.pathname)))
  } catch { return false }
})

function App() {
  const reduceMotion = useReducedMotion()
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [draftRequested, setDraftRequested] = useState(false)
  const [tickerPaused, setTickerPaused] = useState(false)
  const modalRef = useRef(null)
  const modalCloseRef = useRef(null)
  const projectTriggerRef = useRef(null)
  const selectedRef = useRef(selected)
  selectedRef.current = selected
  const filters = ['All', 'Photography', 'Videography', 'Events', 'Creative Work']
  const shown = projects.filter(p => filter === 'All' || p.category === filter)
  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    const background = [document.querySelector('.header'), document.getElementById('main-content'), document.querySelector('.footer')].filter(Boolean)
    const previousInert = background.map(element => element.inert)
    document.body.style.overflow = 'hidden'
    background.forEach(element => { element.inert = true })
    modalCloseRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element, index) => { element.inert = previousInert[index] })
      projectTriggerRef.current?.focus({ preventScroll: true })
    }
  }, [Boolean(selected)])
  const handleModalKeyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); setSelected(null); return }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const current = selectedRef.current
      if (!current) return
      const index = projects.findIndex(project => project.title === current.title)
      const step = event.key === 'ArrowRight' ? 1 : -1
      setSelected(projects[(index + step + projects.length) % projects.length])
      return
    }
    if (event.key === 'Tab' && modalRef.current) {
      const focusable = [...modalRef.current.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')]
        .filter(element => element.getAttribute('aria-hidden') !== 'true' && window.getComputedStyle(element).visibility !== 'hidden')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) { event.preventDefault(); return }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modalRef.current)) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }
  }
  const handleSubmit = e => { e.preventDefault(); const data = new FormData(e.currentTarget); const body = `${t('Name:')} ${data.get('name')}\n${t('Email:')} ${data.get('email')}\n${t('Phone:')} ${data.get('phone') || t('Not provided')}\n${t('Service:')} ${t(data.get('service'))}\n\n${data.get('details')}`; window.location.href = `mailto:${creator.email}?subject=${encodeURIComponent(t('Portfolio enquiry'))}&body=${encodeURIComponent(body)}`; setDraftRequested(true) }
  return <Localized><>
    <a className="skip-link" href="#main-content">{t('Skip to content')}</a>
    <SiteHeader/>
    <main id="main-content">
      <section className="hero" id="home"><div className="hero-image"/><div className="hero-shade"/><div className="hero-content"><div className="hero-overline"><span className="pulse"/> SHILO PRODUCTION <span className="hero-place">BASED IN ADDIS ABABA, ETHIOPIA</span></div><h1>{language === 'am' ? t('Stories worth feeling.') : <>Stories worth<br/> <em>feeling.</em></>}</h1><p className="hero-copy">{t(creator.tagline)} {t(creator.heroDescription)}</p><div className="hero-actions"><a href="#work" className="button button-gold">{t('Explore our work')} <ArrowRight size={16}/></a><a href="#about" className="text-link">{t('About the studio')} <ArrowDown size={15}/></a></div><div className="hero-proof" aria-label={t('Portfolio overview')}><span className="hero-proof-count">{projects.length.toString().padStart(2, '0')}</span><span>{t('selected portfolio stories')}</span></div><div className="hero-bottom"><span>{t('SCROLL TO EXPLORE')} <ArrowDown size={13}/></span><span>PHOTO · FILM · DIGITAL</span></div></div><div className="hero-caption"><span>SHILO PRODUCTION</span> CAPTURING MOMENTS · CREATING STORIES</div></section>
      <div className={`ticker${tickerPaused ? ' ticker-paused' : ''}`} aria-label={t('Photography, film, and stories')}><div className="ticker-track" aria-hidden="true">{Array.from({length: 2}, (_, i) => <span key={i}>PHOTOGRAPHY <b>✳</b> FILMMAKING <b>✳</b> VISUAL STORIES <b>✳</b> GOOD PEOPLE, GOOD LIGHT <b>✳</b>&nbsp;</span>)}</div><button type="button" className="ticker-toggle" aria-pressed={tickerPaused} onClick={() => setTickerPaused(paused => !paused)}>{tickerPaused ? t('Resume motion') : t('Pause motion')}</button></div>

      <section className="about section-pad" id="about" aria-labelledby="about-heading">
        <Reveal className="about-photo-reveal">
          <div className="about-photo-wrap">
            <img className="about-photo" src={creator.profileImage} {...responsivePhoto(creator.profileImage, 852, '(max-width: 650px) 76vw, (max-width: 900px) 44vw, 34vw')} alt={t('Portrait of the SHILO Production creator')} loading="lazy" decoding="async" width="852" height="1280"/>
            <span className="photo-stamp">ALWAYS<br/>LOOKING<br/>CLOSER <i>✳</i></span>
            <span className="photo-label">THE PERSON BEHIND THE LENS</span>
            <a className="about-instagram" data-platform="instagram" href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('Open SHILO Production on Instagram')}><InstagramBrandIcon className="social-brand-icon social-brand-icon--instagram" size={17}/><span>@mame1431m</span><ArrowUpRight size={14} aria-hidden="true"/></a>
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

      <section className="services section-pad" id="services"><Reveal><SectionIntro kicker="What I do" title={<>A good story can<br/><em>take many forms.</em></>} side="01 — SERVICES">Whatever the brief, the approach stays the same: make it thoughtful, make it beautiful, make it matter.</SectionIntro></Reveal><div className="service-grid">{services.map((s, i) => { const Icon = serviceIcons[s.icon]; return <Reveal key={s.title} delay={i * .05}><article className="service-card"><span className="service-num">{s.num}</span><Icon className="service-icon" size={21} strokeWidth={1.5}/><h3>{s.title}</h3><p>{s.text}</p><a href="#contact" aria-label={`Ask about ${s.title}`}><ArrowUpRight size={17}/></a></article></Reveal> })}</div></section>

      <section className="work section-pad" id="work"><Reveal><SectionIntro kicker="Selected work · SHILO Production" title={language === 'am' ? t('Frames from the feeling.') : <>Frames from<br/><em>the feeling.</em></>} side="02 — PORTFOLIO">A collection of people, places and little moments captured by SHILO Production.</SectionIntro></Reveal><div className="filters" role="group" aria-label={t('Filter projects')}>{filters.map(f => <button className={filter === f ? 'filter active' : 'filter'} key={f} onClick={() => setFilter(f)}>{t(f)}<span>{f === 'All' ? String(projects.length).padStart(2, '0') : String(projects.filter(p => p.category === f).length).padStart(2, '0')}</span></button>)}</div><motion.div layout className="project-grid" transition={{ duration: reduceMotion ? 0 : .35 }}>{shown.map((p, i) => <motion.button layout key={p.title} className={`project-card ${p.size}`} onClick={event => { projectTriggerRef.current = event.currentTarget; setSelected(p) }} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : .35 }}><img src={p.image} {...responsivePhoto(p.image, p.width, '(max-width: 650px) 46vw, (max-width: 900px) 29vw, (max-width: 1100px) 30vw, (max-width: 1500px) 22vw, 18vw')} alt={`${t(p.title)} — ${t(p.isSample ? 'Sample — replace with SHILO work' : p.note)}`} loading="lazy" decoding="async" width={p.width} height={p.height}/><span className="project-overlay"><span className="project-meta"><span>{p.isSample ? t('Sample — replace with SHILO work') : t(p.note)}</span><ArrowUpRight size={17}/></span><span className="project-title">{t(p.title)}</span><span className="project-type">{t(p.type)}</span></span></motion.button>)}</motion.div><div className="work-foot"><span>{t('AN OPEN-ENDED COLLECTION, ALWAYS IN PROGRESS.')}</span><a href="#contact" className="under-link">{t('Have a project in mind?')} <ArrowUpRight size={16}/></a></div></section>

      <section className="film-band"><div className="film-image"/><div className="film-content"><Reveal><span className="eyebrow">Moving pictures</span><h2>Some stories<br/>need to <em>move.</em></h2><p>Follow SHILO Production for creative videos, cinematic moments and behind-the-scenes content.</p><a className="button button-outline" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">Find us on TikTok <ArrowUpRight size={16}/></a></Reveal></div><span className="film-vertical">SHILO PRODUCTION · MOTION PICTURE</span></section>

      <section className="tiktok-videos section-pad" id="tiktok-videos"><Reveal><SectionIntro kicker="SHILO PRODUCTION · TIKTOK" title={language === 'am' ? t('TikTok video gallery') : <>TikTok<br/><em>Videos</em></>} side="@SHILOPRODUCTION">Browse selected videos and watch them directly on TikTok.</SectionIntro></Reveal>{publishedTikTokVideos.length ? <div className="tiktok-video-grid">{publishedTikTokVideos.map((video, index) => { const title = video.title?.[language] || video.title?.en || ''; const description = video.description?.[language] || video.description?.en || ''; return <Reveal key={video.id} delay={index * .06}><a className="tiktok-video-card" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('Watch on TikTok:')} ${title}`}><span className="tiktok-video-thumb">{video.thumbnail ? <img src={video.thumbnail} alt="" loading="lazy" decoding="async"/> : <span className="tiktok-video-placeholder"><span>SHILO<br/>PRODUCTION</span></span>}<span className="tiktok-video-play"><Play size={21} fill="currentColor"/></span><span className="tiktok-video-logo"><TikTokIcon size={17}/></span></span><span className="tiktok-video-copy">{video.category && <span className="eyebrow">{video.category}</span>}<strong>{title}</strong>{description && <span>{description}</span>}</span></a></Reveal> })}</div> : <div className="tiktok-videos-empty"><span className="tiktok-empty-icon"><TikTokIcon size={23}/></span><div><h3>{t('TikTok videos are coming soon.')}</h3><p>{t('Visit our TikTok profile to see the latest videos.')}</p></div><a className="button button-gold" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">{t('Visit TikTok profile')} <ArrowUpRight size={16}/></a></div>}</section>

      <section className="tiktok-profile section-pad" id="tiktok"><Reveal><SectionIntro kicker="Find us on TikTok" title={<>Creative stories,<br/><em>in motion.</em></>} side="@SHILOPRODUCTION">{t('Follow us for creative videos, cinematic moments, and behind-the-scenes content.')}</SectionIntro></Reveal><div className="tiktok-profile-card"><a className="tiktok-avatar-link" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label={t('Open SHILO Production TikTok profile')}><img src={creator.profileImage} {...responsivePhoto(creator.profileImage, 852, '(max-width: 650px) 126px, 180px')} alt={t('SHILO Production profile')} loading="lazy" decoding="async" width="852" height="1280"/><span className="tiktok-avatar-badge"><TikTokIcon size={20}/></span></a><div className="tiktok-profile-copy"><a className="tiktok-brand-link" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"><span className="eyebrow">SHILO PRODUCTION</span><h3>{creator.brand}</h3></a><a className="tiktok-username" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">@shiloproduction <ArrowUpRight size={14}/></a><p>{t('Follow us for creative videos, cinematic moments, and behind-the-scenes content.')}</p><div className="tiktok-actions"><a className="button button-gold" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">{t('Watch Videos on TikTok')} <ArrowUpRight size={16}/></a><a className="button button-outline" href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">{t('Follow on TikTok')} <ArrowUpRight size={16}/></a></div></div></div></section>
      <SocialFollow/>

      <section className="process section-pad"><Reveal><SectionIntro kicker="How we’ll work" title={<>Good work starts<br/><em>with a conversation.</em></>} side="04 — THE PROCESS"/></Reveal><div className="process-list">{[['01','Listen closely','First, I want to hear what matters to you and what you want people to feel.'],['02','Find the story','Together we shape a clear idea, a simple plan and the details that make it yours.'],['03','Make the work','On the day, I’ll make space for the real moments while keeping the vision in focus.'],['04','Make it sing','Careful editing, a little color magic and a final delivery that’s ready to share.']].map(([n,t,d])=><div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={17}/></div>)}</div></section>

      <section className="contact section-pad" id="contact"><Reveal><div className="contact-heading"><span className="eyebrow">The beginning of something</span><h2>Have a story<br/>in <em>mind?</em></h2><p>Tell me a little about it. Big plans, half-formed ideas and “what ifs” are all welcome here.</p><a className="contact-email" href={`mailto:${creator.email}`}>{creator.email} <ArrowUpRight size={18}/></a><a className="contact-phone" href={`tel:${creator.phone}`} aria-label={t('Call SHILO Production')}><Phone size={16}/><span>{creator.phone}</span></a><div className="contact-social-links" aria-label="Message SHILO Production"><a className="contact-social-link" data-platform="telegram" href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Open SHILO Production on Telegram"><TelegramBrandIcon size={18}/><span>Telegram</span></a><a className="contact-social-link" data-platform="whatsapp" href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Message SHILO Production on WhatsApp"><WhatsAppBrandIcon size={18}/><span>WhatsApp</span></a></div><div className="contact-location"><span className="pulse"/>{creator.location}</div></div></Reveal><Reveal delay={.12}><form className="contact-form" onSubmit={handleSubmit}><div className="form-top"><span className="eyebrow">Send a note</span><span>01 — 05</span></div><label>Your name<input name="name" placeholder="What should I call you?" required/></label><label>Email address<input type="email" name="email" placeholder="you@example.com" required/></label><label>Phone number<input type="tel" name="phone" placeholder="+251 …" /></label><label>What are you dreaming up?<select name="service" defaultValue="" required><option value="" disabled>Choose a service</option><option>Photography</option><option>Film & videography</option><option>Social content</option><option>Event coverage</option><option>Something else</option></select></label><label>A few more details<textarea name="details" placeholder="The date, the feeling, the big idea…" rows="3" required/></label><button type="submit" className="button button-gold form-submit">{draftRequested ? <>{t('Opening email app…')} <ArrowRight size={16}/></> : <>{t('Open email draft')} <ArrowRight size={16}/></>}</button>{draftRequested && <p className="form-note" role="status">{t('Your email app should open with an email draft addressed to')} <a href={`mailto:${creator.email}`}>{creator.email}</a>. {t('If it does not open, email us directly at')} <a href={`mailto:${creator.email}`}>{creator.email}</a>.</p>}<p className="form-note">{t('This form opens your email app; it does not send or store your information.')}</p></form></Reveal></section>
    </main>
    <SiteFooter/>

    <AnimatePresence>{selected && <motion.div ref={modalRef} className="modal-backdrop" role="dialog" aria-modal="true" tabIndex={-1} aria-label={`${t(selected.title)} ${t('image preview')}`} onKeyDown={handleModalKeyDown} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}><button ref={modalCloseRef} className="modal-close" aria-label={t('Close image preview')} onClick={() => setSelected(null)}><X/></button><button className="image-nav image-nav-prev" aria-label={t('Previous image')} onClick={event => { event.stopPropagation(); const index = projects.findIndex(project => project.title === selected.title); setSelected(projects[(index - 1 + projects.length) % projects.length]) }}><ChevronLeft/></button><motion.div className="image-modal" initial={{scale:.96,y:12}} animate={{scale:1,y:0}} exit={{scale:.96}} onClick={e=>e.stopPropagation()}><img src={selected.image} {...responsivePhoto(selected.image, selected.width, '(max-width: 650px) 90vw, min(78vw, 1000px)')} alt={`${t(selected.title)} — ${t(selected.isSample ? 'Sample — replace with SHILO work' : selected.note)}`} decoding="async" width={selected.width} height={selected.height}/><div><span>{selected.isSample ? t('Sample — replace with SHILO work') : t(selected.note)}</span><h3>{t(selected.title)}</h3></div></motion.div><button className="image-nav image-nav-next" aria-label={t('Next image')} onClick={event => { event.stopPropagation(); const index = projects.findIndex(project => project.title === selected.title); setSelected(projects[(index + 1) % projects.length]) }}><ChevronRight/></button></motion.div>}</AnimatePresence>
  </></Localized>
}
export default App
