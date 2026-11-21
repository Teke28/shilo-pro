import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../config/socialLinks.js';
import { socialPlatforms } from '../data/socialPlatforms.js';
import { Localized } from '../i18n/LanguageContext.jsx';
import { Reveal, SectionIntro } from './Reveal.jsx';

export default function SocialFollow() {
  return (
    <Localized>
      <section className="social-follow section-pad" id="social">
        <Reveal>
          <SectionIntro
            kicker="Stay connected"
            title={
              <>
                CONNECT WITH <em>SHILO Production</em>
              </>
            }
            side="SOCIAL"
          >
            Follow SHILO Production across our official social media profiles.
          </SectionIntro>
        </Reveal>
        <div className="social-cards">
          {socialPlatforms.map(
            ({ key, title, username, Icon, actionLabel }) => {
              const url = socialLinks[key];
              const action =
                actionLabel ||
                (key === 'whatsapp'
                  ? 'Message on WhatsApp'
                  : key === 'telegram'
                    ? 'Open Telegram'
                    : `Follow on ${title}`);
              const accessibleName =
                key === 'facebook'
                  ? 'Open Facebook link'
                  : `${key === 'whatsapp' ? 'Message' : 'Open'} SHILO Production on ${title}`;

              return (
                <Reveal key={key}>
                  <article className="social-card">
                    <a
                      className="social-icon-link"
                      data-platform={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={accessibleName}
                    >
                      <Icon
                        className={`social-brand-icon social-brand-icon--${key}`}
                        size={24}
                        strokeWidth={1.5}
                      />
                    </a>
                    <span className="eyebrow">SHILO PRODUCTION</span>
                    <h3>{title}</h3>
                    <p>{username}</p>
                    <a
                      className="button button-outline"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {action} <ArrowUpRight size={15} />
                    </a>
                  </article>
                </Reveal>
              );
            },
          )}
        </div>
      </section>
    </Localized>
  );
}
