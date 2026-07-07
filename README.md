# Litol

An AI-powered study companion that helps students take notes with recall cues, generate summaries, and test themselves with quizzes — all grounded in their own material.

**Live:** https://litol.vercel.app

---

## Features

- **Notes with Cues** — Write notes and attach Q&A cue pairs. Cues are embedded into a vector store for semantic retrieval.
- **Recall Deck** — Dashboard card that surfaces your cues as a flip-card review deck.
- **AI Summarizer** — Generate structured summaries from selected notes using Gemini, or write them manually.
- **AI Quiz** — Generate grounded multiple-choice questions from your notes. Tracks attempt history with scores.
- **Subjects** — Organise notes and summaries by subject. Create and manage subjects inline.
- **Google OAuth** — Sign in with Google via Better Auth.
- **Dark / Light theme** — System-aware with manual toggle.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Auth | Better Auth (Google OAuth) |
| Database | PostgreSQL (with pgvector) |
| ORM | Prisma 7 |
| AI SDK | Vercel AI SDK v6 |
| AI Model | Google Gemini (via `@ai-sdk/google`) |
| Server Actions | next-safe-action v7 |
| Client Fetching | SWR |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |
| Runtime | Bun |

---

## AI Pipeline

### Ingestion (on note save)
1. Each cue pair (`cue` + `details`) is concatenated into a single text chunk.
2. All chunks are batch-embedded using Gemini's embedding model via Vercel AI SDK (`embedMany`).
3. Embeddings (3072-dim vectors) are written to the `chunk` table in PostgreSQL using `pgvector`.
4. Runs inside a Prisma transaction — all chunks commit atomically.

### Retrieval (for quiz generation)
1. Relevant chunks are retrieved via cosine similarity search against the `chunk` table.
2. Retrieved context is injected into the quiz generation prompt.
3. Gemini generates grounded multiple-choice questions from the retrieved material.

### Summary Generation
1. Selected notes (full content + cues) are passed directly to Gemini.
2. Gemini returns a structured summary with title, content, and extracted keywords.
3. User reviews and edits before saving.

---

## Data Model

```
User
 ├── Subject (organises notes & summaries)
 ├── Note
 │    ├── Cue[]          (Q&A pairs)
 │    └── Chunk[]        (vector embeddings of cues)
 ├── Summary
 └── QuizAttempt        (score history)
```

---

## Folder Structure

```
src/
├── actions/          # next-safe-action server actions (note, quiz, summary, user)
├── app/
│   ├── (public)/     # Sign-in page (unauthenticated)
│   └── (student)/    # Protected app pages (dashboard, note, summary, quiz)
├── components/ui/    # shadcn/ui base components
├── lib/
│   ├── ai/           # AI pipeline: config, ingestion, retrieval, prompts
│   ├── auth.ts       # Better Auth server config
│   ├── auth-client.ts
│   └── swr/          # SWR data-fetching hooks
├── schemas/          # Zod input schemas
├── services/         # DB query logic (called from actions)
├── ui/               # Feature UI components (note, summary, quiz, dashboard, layout)
└── prisma.ts         # Prisma client singleton
prisma/
└── schema.prisma     # DB schema (User, Note, Cue, Chunk, Summary, QuizAttempt)
```

---

## Running Locally

### Prerequisites
- [Bun](https://bun.sh) installed
- PostgreSQL instance with `pgvector` extension enabled
- Google OAuth credentials
- Google Gemini API key

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd litol_app
bun install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Run database migrations
bunx prisma migrate dev

# 4. Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Random secret for Better Auth session signing |
| `BETTER_AUTH_URL` | App base URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key |

> Enable the `pgvector` extension on your database before running migrations: `CREATE EXTENSION vector;`
