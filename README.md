# Showcase

A multi-page portfolio of twelve sample interfaces, each with its own identity: three sites, three dashboards, three navbars and three auth pages. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts and react-three-fiber.

## Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To check the production build:

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push the project to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Leave the framework preset on **Next.js** and the default build settings. No environment variables are needed.
4. Click **Deploy**.

Or with the CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Routes

| Route | Sample |
| --- | --- |
| `/` | Home |
| `/showcase` | Gallery hub with slide-in menu |
| `/showcase/sites/3d` | 3D website (WebGL sculpture, CSS 3D tilt) |
| `/showcase/sites/cyber` | Cybersecurity website |
| `/showcase/sites/modern` | Modern website |
| `/showcase/dashboard/system` | System dashboard |
| `/showcase/dashboard/security` | Security dashboard |
| `/showcase/dashboard/business` | Business dashboard |
| `/showcase/navbars/glass` | Liquid glass navbar |
| `/showcase/navbars/corporate` | Corporate navbar with mega-menu |
| `/showcase/navbars/bold` | Premium bold navbar |
| `/showcase/auth/modern` | Modern auth |
| `/showcase/auth/corporate` | Corporate auth |
| `/showcase/auth/cyber` | Cyber auth |

## Structure

```
app/            routes, root layout, page transition template
components/
  layout/       global navbar, footer, back link
  home/         hero, featured strip, contact form
  showcase/     hub menu
  icons/        brand icons
  samples/      one folder per sample family
data/           mock data and the gallery catalogue
lib/            fonts (one module per identity), hooks, helpers
```

Each sample loads only its own fonts through `lib/fonts/*`, and its palette lives in `tailwind.config.ts` under a named colour group (for example `orbit`, `sec`, `biz`).

## Notes

- Auth demos have no backend. In the login forms, the password `wrongpass` simulates a failed sign-in.
- Dashboards use generated data. The system and security dashboards update on a timer to feel live.
- The glass navbar uses `backdrop-filter`; browsers without support fall back to a flat translucent surface.
