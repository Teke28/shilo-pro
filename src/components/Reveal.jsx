import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: reduceMotion ? 0 : .65, delay: reduceMotion ? 0 : delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>
}

export function SectionIntro({ kicker, title, children, side }) {
  return <div className="section-intro"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{children && <p>{children}</p>}{side && <span className="intro-side">{side}</span>}</div>
}
