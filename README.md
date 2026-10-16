# Sadhna Circle

> **"Prove what you can build. Not where you studied."**

A selective builder syndicate for engineering and business students. Top students work identity-blind (no college, gender, or status tags) for 7 days on real-world problems. Real work &rarr; verifiable evidence &rarr; trust &rarr; direct founder access.

---

## ⚡ Cohort 1 Specifications

- **Seats:** Exactly 36 builders (18 Engineering + 18 Business)
- **Groups:** 9 groups of 4 builders
- **Tracks:** 3 tracks (Engineering, Business, Mixed 2+2)
- **Duration:** 7 days (asynchronous-first, text-first)
- **Judges:** 3 vetted industry founders & operators
- **Identity Evaluation:** 100% identity-blind via persistent pseudonymous Builder IDs
- **Cost:** Free

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** `Plus Jakarta Sans` via `next/font/google`
- **Hosting Targets:** Vercel / Netlify

---

## 📁 Repository Structure

```
Sadhna Circle/
├── public/
│   ├── assets/
│   │   └── logo.png              # Brand logo (replaceable)
│   ├── favicon.ico               # Favicon fallback
│   └── og-image.png              # OpenGraph 1200x630 share card
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── apply/
│   │   │       └── route.ts      # Serverless submission endpoint
│   │   ├── globals.css           # Tailwind v4 styles, saffron glow theme
│   │   ├── icon.svg              # Modern vector SVG favicon
│   │   ├── layout.tsx            # Root layout, Plus Jakarta Sans, SEO/OG
│   │   └── page.tsx              # Assembled single-page landing site
│   └── components/
│       ├── Navbar.tsx            # Sticky header, logo slot, Apply anchor
│       ├── Hero.tsx              # Headline, subline, CTAs, redacted review card
│       ├── Problem.tsx           # 3 points on pedigree bias
│       ├── HowItWorks.tsx        # 4 steps: Apply -> ID -> 7 Days -> Founder Access
│       ├── Tracks.tsx            # Engineering, Business, and Mixed (2+2) cards
│       ├── FactsStrip.tsx        # 36 seats, 9 groups, 7 days, 3 judges, anonymous IDs
│       ├── WhoShouldApply.tsx    # Selection criteria & alignment checklist
│       ├── ApplicationForm.tsx   # Validated application form + success state
│       ├── Faq.tsx               # 5-item accessible accordion FAQ
│       ├── Footer.tsx            # Contact email, Instagram @suryakant.notes
│       └── Logo.tsx              # Logo renderer with image-fallback support
├── .env.example                  # Environment configuration template
├── .env.local                    # Local environment variables
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md                     # Documentation
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js 18+** or **20+** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your submission endpoint (optional in development):
```env
APPLICATION_WEBHOOK_URL=https://formspree.io/f/YOUR_FORM_ID
```
*Note: If left empty, applications submit successfully and are logged locally in the server console.*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Production

### Deploying on Vercel (Recommended)
1. Push this repository to GitHub/GitLab.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset: **Next.js** (auto-detected).
4. Environment Variables:
   - Key: `APPLICATION_WEBHOOK_URL`
   - Value: Your Formspree / Google Sheets / Zapier webhook URL.
5. Click **Deploy**.

### Deploying on Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Build Settings:
   - Build Command: `npm run build`
   - Publish Directory: `.next`
3. Add Environment Variable:
   - `APPLICATION_WEBHOOK_URL`
4. Deploy the site.

---

## 🎨 Customizing the Logo

To replace the placeholder logo with your own asset:
1. Place your PNG/SVG file at `public/assets/logo.png`.
2. The navbar will automatically render it while preserving dimensions and accessibility.

---

## 📄 License
© 2026 Sadhna Circle. All rights reserved.
Selective. Not for everyone.
