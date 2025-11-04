# OakDAO — Web3 Learning Platform

Modern React + Vite frontend with a TypeScript/Express backend scaffold. Learn Web3 concepts with clean UI, dark mode, and AI‑quiz placeholders.

## Tech stack

- Frontend: React 19, TypeScript, Vite 7, Tailwind CSS v4, shadcn/ui, lucide-react, Simple Icons
- Backend: Express (TypeScript), pg, dotenv
- Tooling: ESLint, ts-node-dev, Vercel (frontend), any Node host (backend)

## Repository structure

```
oakdao/
├── app/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/            # REST calls to server (/api/...)
│   │   ├── components/     # UI + layout (Header, Hero, Footer, Cards, etc.)
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/          # Landing, Dashboard
│   │   └── types/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig*.json
│   └── package.json
└── server/                 # Express TypeScript backend scaffold
		├── src/
		│   ├── controllers/
		│   ├── db/
		│   ├── middlewares/
		│   ├── routes/
		│   └── services/
		├── tsconfig.json
		└── package.json
```

## Features

- Landing page with fixed header, smooth in‑page nav, Hero, How it works, and About sections
- Dark/light theme via ThemeProvider + ModeToggle
- shadcn/ui components (Button, Card, Badge, Dropdown)
- Social links in footer using Simple Icons (GitHub, X/Twitter, Telegram, Gmail)
- Placeholder API and AI quiz generation service on the backend

## Prerequisites

- Node.js 18+ (LTS recommended)

## Getting started — Frontend (app)

In one terminal:

```bash
cd app
npm install
npm run dev
```

- Vite will start on http://localhost:5173 (or the next free 517x port; check the terminal output).

### Build & preview

```bash
cd app
npm run build
npm run preview
```

## Getting started — Backend (server)

In another terminal:

```bash
cd server
npm install
npm run dev
```

The server starts on http://localhost:4000 by default.

### Environment variables

Create `server/.env` and set a Postgres connection string (optional — logic has fallbacks and placeholders):

```
DATABASE_URL=postgres://user:password@host:5432/dbname
```

The code also respects `POSTGRES_URL`.

### Build & run

```bash
cd server
npm run build
npm start
```

## Calling the API from the app

The frontend uses relative URLs like `/api/lessons`. In development, add a Vite proxy to forward `/api` to the backend (optional but recommended):

```ts
// app/vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
```

Without a proxy, the app will call its own origin. In production, deploy the frontend and backend to the same domain or configure CORS.

## Deploying

### Vercel (frontend)

- Project Root: `app`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm ci` (or default)

Dependencies to ensure in `app/package.json`:

- `@icons-pack/react-simple-icons` (used for footer social icons)

Common pitfall: If the Root Directory isn’t set to `app`, Vercel may not install `app` dependencies, causing errors like `TS2307: Cannot find module '@icons-pack/react-simple-icons'`.

### Backend (options)

- Any Node host (Render, Railway, Fly, etc.) works. Build with `npm run build` and run `npm start`.
- For serverless (Vercel/Netlify functions), you’ll need to adapt the Express app to handler functions (not included yet).

## Scripts reference

Frontend (`app/package.json`):

- `npm run dev` — Vite dev server
- `npm run build` — Type check then production build
- `npm run preview` — Preview built app locally

Backend (`server/package.json`):

- `npm run dev` — Run Express with ts-node-dev (reload)
- `npm run build` — TypeScript build
- `npm start` — Run compiled server

## Contributing

1. Create a feature branch
2. Commit with Conventional Commits (`feat:`, `fix:`, `chore:`…)
3. Open a PR

## License

MIT — see `LICENSE` (or update to your preferred license).
