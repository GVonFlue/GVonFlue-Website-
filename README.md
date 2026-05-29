# GVonFlue Real Estate

Personal brand website for **Garrett von Flue**, Realtor with **Real Broker LLC** — Wichita, KS.

Built on Next.js 14 (App Router) with custom CSS — no Tailwind, no UI library — so the design tokens live in one place and the bundle stays light. Scroll-linked storytelling is implemented with custom React hooks against `requestAnimationFrame`.

---

## 🚀 Deploy in 5 minutes (Vercel + GitHub)

1. **Create a GitHub repo.** On github.com click *New repository* → name it `gvonflue` → leave it empty.
2. **Push this project to it** from your terminal in the project folder:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gvonflue.git
   git push -u origin main
   ```
3. **Go to [vercel.com](https://vercel.com)** → *Add New Project* → import the GitHub repo. Vercel auto-detects Next.js. Click *Deploy*.
4. **Add your domain.** In the Vercel project: *Settings → Domains → Add* → enter `gvonflue.com`. Vercel will show you DNS records to set at your registrar (GoDaddy, Namecheap, etc.).
5. Done. Every `git push` to `main` re-deploys automatically.

---

## 🛠 Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires Node.js 18.17 or newer.

---

## 📁 Project structure

```
gvonflue/
├── app/                          # Next.js App Router
│   ├── layout.jsx                # Root layout + metadata
│   ├── page.jsx                  # Home (composes all sections)
│   ├── about/page.jsx            # /about
│   ├── listings/page.jsx         # /listings (IDX placeholder)
│   ├── contact/page.jsx          # /contact (working form)
│   ├── blog/page.jsx             # /blog (index)
│   ├── blog/[slug]/page.jsx      # /blog/:slug (post template)
│   ├── not-found.jsx             # 404
│   ├── sitemap.js                # Auto-generated /sitemap.xml
│   └── robots.js                 # Auto-generated /robots.txt
├── components/                   # All UI components (one per file)
│   ├── Nav.jsx
│   ├── Hero.jsx                  # Scroll-parallax hero
│   ├── Journey.jsx               # ⭐ Pinned scroll-story (house build → key)
│   ├── About.jsx
│   ├── Values.jsx
│   ├── LeadMagnet.jsx            # Guide download form
│   ├── Social.jsx
│   ├── Local.jsx
│   ├── FinalCTA.jsx
│   ├── Footer.jsx
│   ├── Lockup.jsx                # GVonFlue + divider + Real Broker LLC
│   ├── ScrollBar.jsx             # Top gold progress bar
│   ├── DrawPath.jsx              # Self-measuring SVG draw
│   ├── Reveal.jsx                # Fade-in on viewport entry
│   └── useScroll.js              # Hooks: useScrollProgress, usePinProgress, mapRange
├── styles/
│   └── globals.css               # ALL styling — design tokens at top
├── public/
│   ├── logos/
│   │   ├── gvonflue-logo.png     # Your script logo (transparent PNG)
│   │   └── real-broker.png       # Real Broker LLC mark (transparent PNG)
│   └── images/
│       └── farmhouse-finished.jpg# ⚠️ Replace before launch (see below)
├── package.json
├── next.config.js
├── jsconfig.json                 # @/* path alias
├── vercel.json
├── .env.example
├── .eslintrc.json
└── .gitignore
```

---

## ⚠️ Things to change before going live

1. **Replace the farmhouse photo.** `public/images/farmhouse-finished.jpg` is currently an Adobe Stock preview with a watermark on it. Either license a copy of that image from Adobe Stock, or replace it with one of your own listing photos (same dimensions work best — roughly 4:3).
2. **Update contact info.** Search the repo for `hello@gvonflue.com` and `(316) 555-0142` — they appear in `components/Footer.jsx`, `components/FinalCTA.jsx`, and `app/contact/page.jsx`.
3. **Update social links.** In `components/Social.jsx` and `components/Footer.jsx`, the Instagram/YouTube/Facebook URLs are placeholders.
4. **Hook up the email form.** `components/LeadMagnet.jsx` and `app/contact/page.jsx` both show success states but don't yet send anywhere. See `.env.example` for the providers wired in — the lead form has a `TODO` comment showing where to make the `fetch` call.
5. **Add your real headshot.** The hero photo and "On the job" photo are currently styled placeholders. Drop your photos into `public/images/` and reference them in `components/Hero.jsx` and `components/About.jsx`.
6. **Replace blog stubs.** `app/blog/[slug]/page.jsx` has 3 hardcoded post entries with placeholder bodies. Either fill them in or wire to a CMS (Sanity, Contentful, MDX).

---

## 🎨 Customizing the design

All design tokens are CSS variables at the top of `styles/globals.css`:

```css
:root {
  --cobalt: #1338DE;        /* Primary brand color */
  --gold:   #E7B53C;        /* Accent */
  --ink:    #0A0B14;        /* Deep black */
  --white:  #FFFFFF;
  --paper:  #F6F7FB;
  --mist:   #E9ECF6;
  --disp:   'Clash Display', sans-serif;
  --body:   'Satoshi', sans-serif;
}
```

Change those and the whole site shifts. Fonts come from Fontshare (free, no API key needed).

---

## ⭐ The scroll-linked storytelling

The home → keys construction sequence lives in `components/Journey.jsx`. As the user scrolls through that section, an inner container stays pinned (via `position: sticky`) while a modern farmhouse builds itself: blank lot → foundation → framing → siding → windows → door → crossfades into your real photo → golden key turns in the lock.

**Tuning knobs:**

- **Overall pacing:** change `.journey { height: 460vh }` in `globals.css`. Higher = slower.
- **Individual stages:** each element's `mapRange(p, start, end, ...)` in `Journey.jsx` controls when it appears (where `p` is 0..1 scroll progress through the pinned section).
- **The headline glow:** `litStart` and `litEnd` constants control when the headline words illuminate.
- **Which words turn gold:** the `GOLD_WORDS` set.

The technique works through two custom hooks in `components/useScroll.js`:
- `useScrollProgress(ref)` — for hero-style parallax that activates as a section moves through the viewport.
- `usePinProgress(ref)` — for the pinned scroll-story, returns 0..1 as the section is being pinned.

Both are batched with `requestAnimationFrame` and use passive listeners, so they don't cause scroll jank. A `prefers-reduced-motion` fallback in the CSS disables transforms for users who've requested reduced motion.

---

## 🔁 Swapping in Framer Motion (optional)

If you ever want to use the Framer Motion library for animations instead, the two custom hooks (`useScrollProgress`, `usePinProgress`) map cleanly onto Framer Motion's `useScroll` + `useTransform` — same scrub model. Components don't need to change structure.

---

## 📈 Adding analytics

Vercel Analytics is one click in the Vercel dashboard (Project → Analytics → Enable). Or set up Google Analytics or Plausible in `app/layout.jsx` — `.env.example` has the env vars stubbed in.

---

## License

Private. © Garrett von Flue / Real Broker LLC.
