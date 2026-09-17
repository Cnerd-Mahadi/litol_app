# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Students at secondary and early-university level, studying subject material they have written down themselves (demo content spans biology, physics, history, maths, computer science). They arrive with notes to make or notes already made, and want to condense and test themselves on that material.

A second audience is real and confirmed: visitors evaluating the app itself. Litol is primarily a portfolio piece the owner shares publicly ("check my app out"). These visitors have no account and no content; demo mode exists so they can feel the AI generation within a minute without creating anything.

## Product Purpose

An AI study companion. A student signs in, writes notes as cue-and-answer pairs plus details, then uses those notes two ways: generate a structured summary (or write one by hand), and take an AI-generated quiz. The point is recall: notes are structured for retrieval from the moment they are written, and every AI output tests or condenses the student's own material.

Success for the student: they trust that what the app quizzes and summarizes is their material, and they come back to review. Success for the owner: the app is a finished, credible piece of work that a visitor can try in one minute and remember.

## Positioning

Every AI output is grounded only in the student's own notes. Quizzes are retrieved from embedded note chunks on the backend; summaries are generated from the selected notes. The app never answers from general knowledge and never pretends to. Neighbouring "AI study" products generate from a topic name; Litol generates from what you wrote.

There is no chat or question-answering feature. Any surface copy implying one is wrong.

## Operating Context

- Notes are the input to everything. A note has a title, a subject, optional description and keywords, and a list of cues, each a question paired with an answer. Cues are chunked and embedded on save.
- Summaries can be written manually or generated from one or more selected notes, then edited before saving.
- Quizzes are generated from selected notes and scored; attempts are recorded for signed-in users.
- Subjects group notes and summaries.
- Demo mode: a shared, seeded account any visitor can enter with one click. Demo users can read everything and run AI generation, but cannot create, edit, or delete; generated results are shown, never saved. A persistent banner states this.
- Sign-in is Google only.
- Used on desktop and on phones; mobile has a bottom navigation bar.

## Capabilities and Constraints

- Confirmed capabilities: notes with cues, manual and AI summaries, AI quizzes, subjects, demo mode, Google OAuth, light and dark themes.
- Not a capability: chat, Q&A against notes, generation from a bare topic name. Do not build surfaces that imply these.
- Terminology: "note", "cue" (a question), "details" (the answer), "summary", "quiz", "subject". The word "recall" is the app's own framing for its purpose.
- Small expected audience; no scale, pricing, or team features are planned. Undecided: none material.

## Brand Commitments

- The name **Litol** is binding. It abbreviates "live to learn"; that phrase is the origin of the name and can be used on-surface.
- User-volunteered visual constraint, recorded without expansion: keep the current theme colours roughly as they are (dark ground, orange primary, the functional hue set). Tweaking is fine; replacing the palette wholesale is not.
- Register: this is a student's app, not an enterprise product. It must not read as black, austere, or "serious product being sold". The owner's words: fun, vibey, student. Energy is wanted.
- Explicitly open to change: the icon/mark, page structure, layout, and the whole visual design otherwise.
- Standing direction preference (2026-09-10): the category standard, executed at the finish level of the best SaaS dashboards (Linear, Vercel, Notion as the bar). The owner explicitly does not want novel, quirky, or "never seen before" directions; a category-fluent SaaS user should recognise it instantly as a well-made SaaS app. Do not roll creative visual worlds for this product; refine the canon.

## Evidence on Hand

- Real seeded demo content: notes with cues, summaries, and embeddings, in `scripts/demo-data.ts` and populated by `scripts/seed-demo-content.ts`. This is genuine app content, usable on any surface.
- Live deployment at litol.vercel.app.
- No testimonials, user counts, benchmarks, or press. Do not fabricate any.
- No logo asset beyond the current icon mark; the mark is open to redesign.

## Product Principles

1. The student's own notes are the only source of truth. Every AI surface makes that visible; nothing implies the app knows things outside them.
2. A visitor with no account must feel the mechanism in under a minute. Demo mode is the front door, not an afterthought, and it must be honest about what it blocks.
3. Built for a student's desk, not a boardroom. Approachability and energy win over gravitas; consistency and scanability still win over decoration.
4. Every claim on a surface is true of the shipped app. No invented features, stats, or social proof.
5. Small audience, finished craft. The app is itself the portfolio piece; finish quality is the product.
