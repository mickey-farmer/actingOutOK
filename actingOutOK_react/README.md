# Acting Out OK (React)

React/Next.js version of [Acting Out OK](https://actingoutok.com), a one-stop shop for new actors in Oklahoma. Built for deployment on **Vercel** with support for server-side APIs (e.g. IMDb lookups).

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- Static data in `public/data/` (casting calls, resources, directory, news, spotlight)
- Global CSS ported from the original site (variables, main, pages, splash, spotlight, forms)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy (Vercel)

```bash
npm run build
npm start
```

Deploy to Vercel: connect this repo to Vercel and use the existing domain. No extra config needed; `vercel.json` and `next.config.js` are set for Vercel.

## Data

- Copy updated JSON from the main Acting Out OK project into `public/data/` (e.g. after running `node scripts/build-from-content.js` in the original repo), or point the app at an API later.
- Images: `public/images/logo.png` (add more under `public/images/` as needed).

## API routes (server-side)

- **`/api/imdb`** — Placeholder for server-side IMDb lookups.  
  `GET /api/imdb?name=nm1234567` returns a stub; replace with your IMDb API or permitted service when ready.

Add more routes under `app/api/` for other server-side logic (e.g. form submission, external APIs).

## Pages (1:1 with original)

| Route | Description |
|-------|-------------|
| `/` | Splash home (Casting Calls, Resources, Directory, News) |
| `/casting-calls` | Casting calls list |
| `/casting-call/[slug]` | Single casting call detail |
| `/resources` | Resources by section |
| `/directory` | Directory with search (name, description, section) |
| `/about` | About page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of Service |
| `/submit-casting` | Submit casting call (mailto for now) |
| `/submit-resource` | Suggest resource (mailto for now) |
| `/submit-news` | Suggest news story (mailto for now) |
| `/report-issue` | Report issue / suggest (mailto for now) |

News links out to `https://news.actingoutok.com`.

## Low-cost setup

- Vercel free tier: sufficient for this app and serverless API routes.
- Use your existing domain in Vercel project settings.
- No separate backend required; add server-side logic in `app/api/` as needed.
