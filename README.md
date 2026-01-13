# CodeCoach

CodeCoach is an open-source, personalized daily practice platform for competitive programmers, focused on building consistent problem-solving habits using Codeforces.

Built with **Next.js** and **TypeScript**, and designed to deploy seamlessly on **Vercel**.

**Why CodeCoach**

Most platforms focus on contests or large problem sets. CodeCoach focuses on **daily consistency**.

Users receive **1–10 carefully selected problems per day**, based on their chosen topics, rating range, and past activity — making practice focused, manageable, and sustainable.

**Highlights**

- **Daily personalized practice**  
  Choose topics, rating range, and daily problem count (1–10).

- **Smart problem selection**  
  Problems are filtered and scored using custom logic, with AI selecting the final best set.

- **Progress tracking**  
  Track solved problems, total solves, and daily streaks.

- **Codeforces integration**  
  Sync solved problems to maintain accurate practice history.

- **Modern, Vercel-friendly stack**  
  Next.js (App Router), TypeScript, React, PostCSS, Redis/DB.

**How It Works**

1. User selects preferred topics, rating range, and daily problem limit  
2. CodeCoach filters and scores Codeforces problems based on relevance  
3. AI selects the most suitable problems for that day  
4. User solves problems and builds a daily streak  

**Features**

- Personalized daily problem queue  
- Codeforces problem sync  
- Practice history (today & past days)  
- Solve count and streak tracking  

**Tech Stack**

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React
- **Styling:** PostCSS
- **Data:** Redis / Database
- **Deployment:** Vercel

**Architecture & Key Folders**
- **app/**: Next.js app routes, pages, and layouts
- **app/api/**: Server routes and API endpoints (auth, ai, codeforces sync)
- **components/**: Reusable UI components and feature widgets
- **services/**: Business logic and API wrappers
- **lib/**: Utilities and helper functions
- **provider/**: DB and Redis connection providers
- **store/**: Client-side stores for state management

**Getting Started (Local)**

Prerequisites:
- Node 18+ (or the version your team uses)
- npm or pnpm

1. Clone the repo

```bash
git clone <your-repo-url>
cd codecoach
```

2. Install dependencies

```bash
npm install
# or: pnpm install
```

3. Environment variables

Create a `.env.local` file in the project root with the required variables.

Notes:
- The repository includes server routes that expect DB and cache connections — ensure `MONGODB_URI`/`REDIS_URL` match your environment or mock them locally.

4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

**Scripts**
- **dev**: Runs the Next.js dev server (`npm run dev`)
- **build**: Builds for production (`npm run build`)
- **start**: Starts the production server (`npm run start`)
- **lint/test**: Add or adapt linters/tests as needed

**Deployment (Vercel)**

1. Import the repository into Vercel.
2. Set environment variables in Vercel dashboard (mirror `.env.local`).
3. Use default Next.js build command (`npm run build`) and output directory.
4. Enable any required integrations (Redis, MongoDB Atlas) through environment connections.

Tips for Vercel Open Source Program submission:
- Include this README and the `CONTRIBUTING.md` + `CODE_OF_CONDUCT.md` files.
- Provide a clear demo link (Vercel preview or live deployment) and brief usage notes in your submission.

**Contributing**

Thank you for considering contributing! See **CONTRIBUTING.md** for guidelines on filing issues, coding standards, branch names, PR process, and tests.

**Code of Conduct**

Please follow the community guidelines in **CODE_OF_CONDUCT.md**. Be respectful and collaborative.

**License**

This repository does not include a license file by default. For open source program submission, we recommend adding a license (MIT is common). If you want, I can add a `LICENSE` file for you.

**Acknowledgements**
- Built with Next.js and community libraries. Thanks to contributors and maintainers.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
