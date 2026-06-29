# Future Things

Things deferred intentionally — not forgotten, just not now.

---

## Error Handling

### Retry mechanism for transient errors
Retry logic for `DbError` and `ExternalServerError` when the underlying cause is transient (network timeout, DB unreachable, 429 rate limit, 503). Not for constraint violations or 4xx errors.

- Needs: classify Prisma error codes + HTTP status codes as retryable vs not
- Shape: `withRetry(fn, { attempts, predicate })` utility wrapping the operation directly
- `AppError` — never retry (logic errors, deterministic)

### Error tracking (Sentry / Axiom)
Replace manual `logger.error` in `handleServerError` with a proper error tracker. Gives stack traces source-mapped back to TypeScript, grouping, alerts.

---

## Features

### AI "ask the document" for notes
Chat interface on the note workspace — user asks questions, AI answers from the note's cues/content. Backend ingestion pipeline (`ingestNoteChunks`) is already in place.

### Mobile layout
Stripped out for now. Rebuild properly once desktop is stable.
