# SHILO Production

A responsive, bilingual portfolio for SHILO Production, featuring photography and videography work, services, TikTok links, contact information, and social profiles. The site is a client-side React application; its contact form opens an email draft and does not send or store submissions.

## Technology

- React 19 and Vite 6
- Tailwind CSS 4 processing and project styles in plain CSS
- Framer Motion for section and interaction animation
- Lucide React and custom SVG brand marks
- Vitest, jsdom, and React Testing Library for interaction tests

## Project structure

```text
public/
  favicon.svg
  images/
    photo1.jpg … photo20.jpg          # original JPEG sources
    optimized/                        # responsive WebP derivatives
src/
  App.jsx                             # homepage sections and page interactions
  App.test.jsx                        # homepage integration tests
  main.jsx                            # React entry point
  index.css                           # global styles and typography tokens
  brand.css                           # site layout, components, and responsive rules
  config/socialLinks.js               # configured social destinations
  data/config.js                      # brand and contact information
  data/content.js                     # portfolio and service data
  data/tiktokVideos.js                # TikTok link cards
  i18n/LanguageContext.jsx            # language preference and translations
  i18n/translations.js                # English/Amharic strings
  test/setup.js                       # test environment cleanup
index.html                            # document metadata and application mount
vite.config.js                        # Vite plugins and Vitest configuration
```

The original JPEGs are retained as source and fallback assets. The gallery, profile, and lightbox can select matching WebP sizes from `public/images/optimized/`. Keep each source image’s responsive variants available when changing its path or dimensions.

## Requirements

- Node.js 20 or newer
- npm

## Install and run

```bash
npm ci
npm run dev
```

Open the local address printed by Vite.

## Tests and production build

Run the tests once:

```bash
npm run test:run
```

Run Vitest in watch mode:

```bash
npm run test
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

Vite prints the local preview address. The production output is written to `dist/`.

## Updating content and contact details

- Update the brand name, phone, email, location, and profile image in `src/data/config.js`.
- Update service and portfolio records in `src/data/content.js`. The ten entries identified as samples are marked with `isSample` so they are not presented as confirmed SHILO projects.
- Add or edit TikTok cards in `src/data/tiktokVideos.js`. Use actual video links; the cards open on TikTok and do not embed or host video files.
- Update configured destinations for Facebook, Instagram, TikTok, Telegram, and WhatsApp in `src/config/socialLinks.js`.
- Add matching Amharic strings in `src/i18n/translations.js` when adding visible English copy.
- Store original photographs in `public/images/` and responsive derivatives in `public/images/optimized/`. Existing assets use 480, 800, 1200, 1600 pixel widths where the source supports them, plus the source-width derivative.

## Language support

The language selector switches between English and Amharic. The selected language is saved in local storage and updates the document’s `lang` attribute and page title.

## Social integrations

The five configured social destinations—Facebook, Instagram, TikTok, Telegram, and WhatsApp—are defined centrally in `src/config/socialLinks.js` and reused by the social, footer, and contact areas. Contact phone and email values are maintained in `src/data/config.js`.

## Deployment

The project builds to static files in `dist/`. The repository does not currently specify a confirmed production domain or a deployment provider. Configure those in the chosen hosting service before publishing canonical and absolute social-sharing URLs.
