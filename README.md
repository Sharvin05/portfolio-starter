# Portfolio Starter

A personal portfolio and resume site built with Next.js. All your details live in `src/content/`, so you can make it yours without touching the code.

## Getting started

### 1. Requirements

- [Node.js](https://nodejs.org) 20 or newer
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)

### 2. Get your own copy

```bash
git clone https://github.com/Sharvin05/portfolio-starter.git my-portfolio
cd my-portfolio
rm -rf .git
git init
```

This gives you a fresh copy with your own history. You can also press **Use this template** or **Fork** on GitHub instead.

### 3. Install and run

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000. You'll see the site with sample content.

### 4. Add your content

Edit the files in `src/content/`:

| File | What to change |
|---|---|
| `profile.ts` | Name, role, headline, intro, social links, navigation |
| `experience.ts` | Your jobs |
| `skills.ts` | Your skills, grouped by category |
| `education.ts` | Your degree and subjects |
| `contact.ts` | Contact section text and footer line |
| `comingSoon.ts` | The `/work` page |
| `site.ts` | Domain, language, page titles and descriptions |
| `brand.ts` | Your logo (also used for the favicon and app icons) |
| `themes.ts` | Colour themes |
| `ui.ts` | Button labels, menus and messages |

The dev server reloads as you save. Run `pnpm typecheck` to check nothing is missing or misspelled.

### 5. Set up the contact form

Locally the form already works: messages are printed in the terminal instead of emailed. To receive real emails:

1. **Cloudflare Turnstile** (spam protection): in the [Cloudflare dashboard](https://dash.cloudflare.com), open **Turnstile**, add your site, and copy the **site key** and **secret key**.
2. **Resend** (email delivery): sign up at [resend.com](https://resend.com), verify your domain, and create an **API key**.
3. Add these to `.env.local` (and to your host when you deploy):

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key |
   | `TURNSTILE_SECRET_KEY` | Turnstile secret key |
   | `RESEND_API_KEY` | Resend API key |
   | `CONTACT_FROM_EMAIL` | Sender on your verified domain, e.g. `Portfolio <contact@your-domain.com>` |
   | `CONTACT_TO_EMAIL` | The inbox that receives messages (never shown on the site) |

### 6. Deploy

1. Push your copy to GitHub.
2. Import it on [Vercel](https://vercel.com) (or any host that runs Next.js).
3. Add the environment variables from step 5.
4. Connect your domain, and set the same domain in `src/content/site.ts`.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm typecheck` | Check types, including your content |
