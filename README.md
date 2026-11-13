# SHILO Production portfolio

A cinematic, responsive portfolio built with React, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Get started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Personalize the site

- Update creator details and contact information in `src/data/config.js`.
- The studio location is set to Addis Ababa, Ethiopia. Add a real Ethiopian phone and WhatsApp number in `src/data/config.js` when available; contact form phone entry uses the +251 country code.
- Replace the sample portfolio entries in `src/data/content.js` with SHILO Production projects.
- The ten optimized sample JPEGs live in `public/images/`. Replace them with SHILO Production-owned or licensed photography before launch.
- Official Facebook, Instagram and TikTok profile links are configured in `src/config/socialLinks.js` and shared by the TikTok profile section, social cards and footer.
- Set the email address in `config.js`. The contact form validates required fields and opens the visitor’s email app with an enquiry draft. It does not send or store form submissions.
- Replace the clearly marked sample client quote with approved client feedback.
- Update the page title and SEO/social sharing metadata in `index.html`.

The sample portfolio images are placeholders. Add media paths under `public/` or provide hosted URLs in the content data.

## Deployment

Deploy to Vercel or Netlify by importing this repository. Use `npm run build` as the build command and `dist` as the publish/output directory. No server-side routes are required; use the host’s SPA fallback if you later add client-side routes.

## Accessibility and performance

The page uses semantic sections, keyboard accessible buttons, descriptive image alternatives, lazy-loaded gallery imagery and no autoplay video. Replace placeholder information and verify media licensing and links before launch.
