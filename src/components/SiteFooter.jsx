import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Palette,
  Phone,
} from 'lucide-react';
import { socialLinks } from '../config/socialLinks.js';
import { creator } from '../data/config.js';
import { services } from '../data/content.js';
import { socialPlatforms } from '../data/socialPlatforms.js';
import { Localized, useLanguage } from '../i18n/LanguageContext.jsx';
import { serviceIcons } from './serviceIcons.js';

const footerNavigation = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Portfolio', '#work'],
  ['TikTok Videos', '#tiktok-videos'],
  ['Contact', '#contact'],
];

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <Localized>
      <footer className="footer">
        <div className="footer-main">
          <section
            className="footer-brand-col"
            aria-label={t('SHILO Production')}
          >
            <a
              className="brand"
              href="#home"
              aria-label={t('SHILO Production home')}
            >
              <span className="brand-mark">SP</span>
              <span>
                {creator.brand}
                <small>CAPTURING MOMENTS · CREATING STORIES</small>
              </span>
            </a>
            <p className="footer-description">{creator.bio}</p>
            <p className="footer-slogan">{t(creator.tagline)}</p>
            <div className="footer-socials" aria-label={t('Connect with us')}>
              {socialPlatforms.map(({ key, title, Icon }) => (
                <a
                  key={key}
                  data-platform={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(
                    key === 'facebook'
                      ? 'Open Facebook link'
                      : key === 'telegram'
                        ? 'Open SHILO Production on Telegram'
                        : key === 'whatsapp'
                          ? 'Message SHILO Production on WhatsApp'
                          : `Follow ${title} profile`,
                  )}
                >
                  <Icon
                    className={`social-brand-icon social-brand-icon--${key}`}
                    size={19}
                    strokeWidth={1.6}
                  />
                </a>
              ))}
            </div>
          </section>

          <nav className="footer-column" aria-label={t('Footer navigation')}>
            <h2>{t('Quick navigation')}</h2>
            <ul>
              {footerNavigation.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{t(label)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <section className="footer-column">
            <h2>{t('Our services')}</h2>
            <ul className="footer-service-list">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon];
                return (
                  <li key={service.num}>
                    <a href="#services">
                      <Icon size={16} strokeWidth={1.5} />
                      <span>{t(service.title)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <address className="footer-column footer-contact">
            <h2>{t('Contact information')}</h2>
            {creator.phone && (
              <a className="footer-contact-link" href={`tel:${creator.phone}`}>
                <Phone size={17} />
                <span>{creator.phone}</span>
              </a>
            )}
            <a
              className="footer-contact-link"
              href={`mailto:${creator.email}`}
              aria-label={t('Email SHILO Production')}
            >
              <Mail size={17} />
              <span>{creator.email}</span>
            </a>
            <p className="footer-contact-link">
              <MapPin size={17} />
              <span>{t(creator.location)}</span>
            </p>
          </address>

          <section className="footer-column footer-design">
            <h2>{t('Graphic Designer')}</h2>
            <p className="footer-design-copy">
              {t(
                'Thoughtful graphic design for brands, campaigns, and stories that deserve to stand out.',
              )}
            </p>
            <a className="footer-design-link" href="#contact">
              <Palette size={17} strokeWidth={1.6} />
              <span>{t('Contact us to discuss graphic design')}</span>
              <ArrowRight size={15} />
            </a>
          </section>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {creator.brand}.{' '}
            {t('All rights reserved.')}
          </p>
          <a
            href="#home"
            className="back-top"
            aria-label={t('BACK TO THE TOP')}
          >
            {t('BACK TO THE TOP')} <ArrowUpRight size={15} />
          </a>
        </div>
      </footer>
    </Localized>
  );
}
