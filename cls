warning: in the working copy of 'src/brand.css', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.jsx b/src/App.jsx[m
[1mindex 6f4e240..fc4c954 100644[m
[1m--- a/src/App.jsx[m
[1m+++ b/src/App.jsx[m
[36m@@ -1,6 +1,6 @@[m
 import { useEffect, useId, useState } from 'react'[m
 import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'[m
[31m-import { ArrowDown, ArrowRight, ArrowUpRight, Camera, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Facebook, Mail, MapPin, Menu, Palette, Phone, Play, Scissors, Share2, Sparkles, Video, X } from 'lucide-react'[m
[32m+[m[32mimport { ArrowDown, ArrowRight, ArrowUpRight, Camera, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Mail, MapPin, Menu, Palette, Phone, Play, Scissors, Share2, Sparkles, Video, X } from 'lucide-react'[m
 import { creator } from './data/config.js'[m
 import { socialLinks } from './config/socialLinks.js'[m
 import { projects, services } from './data/content.js'[m
[36m@@ -10,7 +10,7 @@[m [mimport { Localized, useLanguage } from './i18n/LanguageContext.jsx'[m
 const photo = (id, w = 1000) => id.startsWith('/') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`[m
 const iconMap = { camera: Camera, video: Video, sparkles: Sparkles, scissors: Scissors, calendar: CalendarDays, share: Share2 }[m
 const socialPlatforms = [[m
[31m-  { key: 'facebook', title: 'Facebook', username: 'SHILO Production', Icon: Facebook },[m
[32m+[m[32m  { key: 'facebook', title: 'Facebook', username: 'SHILO Production', Icon: FacebookBrandIcon },[m
   { key: 'instagram', title: 'Instagram', username: '@mame1431m', Icon: InstagramBrandIcon },[m
   { key: 'tiktok', title: 'TikTok', username: '@shiloproduction', Icon: TikTokIcon },[m
   { key: 'telegram', title: 'Telegram', username: '@shilo1431MK', Icon: TelegramBrandIcon },[m
[36m@@ -24,6 +24,13 @@[m [mconst publishedTikTokVideos = tiktokVideos.filter(({ url }) => {[m
   } catch { return false }[m
 })[m
 [m
[32m+[m[32mfunction FacebookBrandIcon({ size = 24, className = '', ...props }) {[m
[32m+[m[32m  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>[m
[32m+[m[32m    <circle cx="12" cy="12" r="12" fill="#1877F2"/>[m
[32m+[m[32m    <path fill="#fff" d="M13.42 21v-8.22h2.76l.41-3.2h-3.17V7.54c0-.93.26-1.56 1.59-1.56h1.69V3.12c-.29-.04-1.3-.12-2.48-.12-2.46 0-4.14 1.5-4.14 4.26v2.32H7.3v3.2h2.78V21h3.34Z"/>[m
[32m+[m[32m  </svg>[m
[32m+[m[32m}[m
[32m+[m
 function InstagramBrandIcon({ size = 24, className = '', ...props }) {[m
   const gradientId = `instagram-gradient-${useId().replaceAll(':', '')}`[m
   return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>[m
[36m@@ -38,10 +45,10 @@[m [mfunction TikTokIcon({ size = 24, className = '' }) {[m
   return <svg className={`brand-tiktok ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path className="brand-tiktok-cyan" d={mark} transform="translate(-.8 .45)"/><path className="brand-tiktok-red" d={mark} transform="translate(.8 -.35)"/><path className="brand-tiktok-core" d={mark}/></svg>[m
 }[m
 function TelegramBrandIcon({ size = 24, className = '', ...props }) {[m
[31m-  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M21.8 4.2 18.6 20c-.24 1.12-.88 1.4-1.78.87l-4.92-3.63-2.38 2.29c-.26.26-.48.48-.98.48l.35-5 9.1-8.22c.4-.35-.09-.55-.62-.2L6.12 13.68l-4.85-1.52c-1.05-.33-1.07-1.05.22-1.56L20.46 3.1c.87-.32 1.63.2 1.34 1.1Z"/></svg>[m
[32m+[m[32m  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="12" fill="#0088CC"/><path fill="#fff" d="m19.82 6.18-2.98 12.2c-.22.86-.8 1.07-1.62.67l-4.48-3.3-2.16 2.07c-.24.24-.44.44-.89.44l.32-4.55 8.28-7.48c.36-.32-.08-.5-.56-.18l-10.24 6.45-4.41-1.38c-.95-.3-.97-.95.2-1.42l17.23-6.65c.79-.29 1.48.18 1.21 1.13Z"/></svg>[m
 }[m
 function WhatsAppBrandIcon({ size = 24, className = '', ...props }) {[m
[31m-  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path fill="currentColor" d="M12.04 2a9.86 9.86 0 0 0-8.48 14.9L2 22l5.22-1.53A9.93 9.93 0 1 0 12.04 2Zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.1.91.92-3.02-.2-.31a8.14 8.14 0 1 1 6.81 3.73Zm4.47-6.1c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.52.11-.1.25-.27.37-.41.13-.15.17-.25.25-.42.09-.16.05-.31-.02-.44-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.14.16 1.57.1.48-.07 1.48-.61 1.69-1.2.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.48-.29Z"/></svg>[m
[32m+[m[32m  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="12" fill="#25D366"/><path fill="#fff" d="M20.01 15.38c-1.12 0-2.22-.18-3.26-.54a1 1 0 0 0-1.02.24l-1.45 1.45a15.1 15.1 0 0 1-6.6-6.6l1.45-1.45a1 1 0 0 0 .24-1.02 10.4 10.4 0 0 1-.54-3.26 1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.87a1 1 0 0 0-1-1Z" transform="translate(2 2) scale(.8)"/></svg>[m
 }[m
 [m
 function Header() {[m
[1mdiff --git a/src/brand.css b/src/brand.css[m
[1mindex e295749..ebfd852 100644[m
[1m--- a/src/brand.css[m
[1m+++ b/src/brand.css[m
[36m@@ -431,15 +431,15 @@[m [mmain:focus{outline:0}[m
 .brand-tiktok{overflow:visible}[m
 .brand-tiktok-cyan{fill:#25f4ee}[m
 .brand-tiktok-red{fill:#fe2c55}[m
[31m-.brand-tiktok-core{fill:#fff}[m
[32m+[m[32m.brand-tiktok-core{fill:#000}[m
 .tiktok-avatar-badge .brand-tiktok-core{fill:#171612}[m
 .social-icon-link[data-platform],.about-instagram[data-platform]{transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease}[m
 .social-icon-link[data-platform]:hover,.about-instagram[data-platform]:hover{transform:translateY(-2px) scale(1.045)}[m
 .social-icon-link[data-platform="facebook"]:hover,.footer-socials a[data-platform="facebook"]:hover{border-color:#1877f2;background:rgba(24,119,242,.12);box-shadow:0 0 18px rgba(24,119,242,.18)}[m
 .social-icon-link[data-platform="instagram"]:hover,.about-instagram[data-platform="instagram"]:hover,.footer-socials a[data-platform="instagram"]:hover{border-color:#d62976;background:rgba(214,41,118,.12);box-shadow:0 0 18px rgba(214,41,118,.2)}[m
[31m-.social-icon-link[data-platform="tiktok"]:hover,.footer-socials a[data-platform="tiktok"]:hover{border-color:#25f4ee;background:rgba(37,244,238,.09);box-shadow:0 0 18px rgba(37,244,238,.16)}[m
[31m-.footer-socials a[data-platform="tiktok"]{color:#fff}[m
[31m-.tiktok-video-logo .brand-tiktok-core{fill:#fff}[m
[32m+[m[32m.social-icon-link[data-platform="tiktok"],.footer-socials a[data-platform="tiktok"]{background:#fff;border-color:#fff}[m
[32m+[m[32m.social-icon-link[data-platform="tiktok"]:hover,.footer-socials a[data-platform="tiktok"]:hover{border-color:#25f4ee;background:#fff;box-shadow:0 0 18px rgba(37,244,238,.24)}[m
[32m+[m[32m.tiktok-video-logo{background:#fff;color:#000}[m
 .social-icon-link:focus-visible,.about-instagram:focus-visible,.footer-socials a:focus-visible{outline:2px solid #f1d49d;outline-offset:4px}[m
 @media(prefers-reduced-motion:reduce){.social-icon-link[data-platform],.about-instagram[data-platform]{transition:none}}[m
 [m
