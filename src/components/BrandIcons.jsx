import { useId } from 'react'

export function FacebookBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="12" fill="#1877F2"/>
    <path fill="#fff" d="M13.42 21v-8.22h2.76l.41-3.2h-3.17V7.54c0-.93.26-1.56 1.59-1.56h1.69V3.12c-.29-.04-1.3-.12-2.48-.12-2.46 0-4.14 1.5-4.14 4.26v2.32H7.3v3.2h2.78V21h3.34Z"/>
  </svg>
}

export function InstagramBrandIcon({ size = 24, className = '', ...props }) {
  const gradientId = `instagram-gradient-${useId().replaceAll(':', '')}`
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <defs><linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse"><stop stopColor="#FEDA75"/><stop offset=".28" stopColor="#FA7E1E"/><stop offset=".52" stopColor="#D62976"/><stop offset=".76" stopColor="#962FBF"/><stop offset="1" stopColor="#4F5BD5"/></linearGradient></defs>
    <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke={`url(#${gradientId})`} strokeWidth="1.9"/>
    <circle cx="12" cy="12" r="4.05" stroke={`url(#${gradientId})`} strokeWidth="1.9"/>
    <circle cx="17.65" cy="6.45" r="1.15" fill="#FEDA75"/>
  </svg>
}

export function TikTokIcon({ size = 24, className = '' }) {
  const mark = 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.43v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.19-.02-.38-.05-.56v-3.5a6.34 6.34 0 1 0 3.48 5.65V8.28a8.16 8.16 0 0 0 4.77 1.54V6.4c-.34 0-.68-.04-1-.11Z'
  return <svg className={`brand-tiktok ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path className="brand-tiktok-cyan" d={mark} transform="translate(-.8 .45)"/><path className="brand-tiktok-red" d={mark} transform="translate(.8 -.35)"/><path className="brand-tiktok-core" d={mark}/></svg>
}

export function TelegramBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><circle cx="12" cy="12" r="12" fill="#0088CC"/><path fill="#fff" d="m19.82 6.18-2.98 12.2c-.22.86-.8 1.07-1.62.67l-4.48-3.3-2.16 2.07c-.24.24-.44.44-.89.44l.32-4.55 8.28-7.48c.36-.32-.08-.5-.56-.18l-10.24 6.45-4.41-1.38c-.95-.3-.97-.95.2-1.42l17.23-6.65c.79-.29 1.48.18 1.21 1.13Z"/></svg>
}

export function WhatsAppBrandIcon({ size = 24, className = '', ...props }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect width="24" height="24" fill="#25D366"/>
    <path d="M12 3.2a8.2 8.2 0 0 0-7.08 12.34L4 19.7l4.28-1.14A8.2 8.2 0 1 0 12 3.2Z" fill="none" stroke="#fff" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="#fff" d="M16.64 14.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.85 1.06-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.33-1.6-1.49-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.29.4-.44.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.46-.07-.14-.61-1.47-.83-2.01-.22-.53-.44-.45-.61-.46h-.51c-.18 0-.46.07-.69.34-.24.27-.92.9-.92 2.2 0 1.29.94 2.55 1.07 2.72.13.18 1.85 2.83 4.47 3.97.62.27 1.11.43 1.5.55.62.2 1.18.17 1.63.1.49-.08 1.59-.65 1.81-1.28.22-.63.22-1.16.15-1.27-.06-.11-.24-.17-.51-.31Z"/>
  </svg>
}
