export const cleanQueryPrompt = (query: string) => `
You are a search query optimizer preparing a query for two types of retrieval:
1. Sparse search (keyword/full-text): needs individual important terms
2. Dense search (semantic/vector): needs a clean natural language phrase capturing the intent

From the user's query below, extract:
- keywords: array of the most important individual terms (nouns, concepts, technical words — no filler)
- semanticQuery: a clean, concise natural language phrase capturing the full search intent

User query:
${query}
`;

export const generateQuizPrompt = (
  chunks: { cueId: string; content: string }[],
  numberOfQuizzes: number
) => `
You are a quiz generator for students.
Generate exactly ${numberOfQuizzes} multiple choice questions strictly based on the content provided below.
Do not use any outside knowledge. Every question and answer must come directly from the provided content.

Each question must have:
- A clear question
- Exactly 4 options (labeled as plain strings, not A/B/C/D)
- The correct answer which must be exactly one of the 4 options
- sourceCueId: the exact cue ID of the chunk this question was generated from

Content:
${chunks.map((c) => `[CUE_ID: ${c.cueId}]\n${c.content}`).join("\n\n")}
`;

export const generateSummaryPrompt = (
  notes: { title: string; cues: { cue: string; details: string }[] }[],
  maxWords: number
) => `
You are creating a last-minute revision summary for a student.
Given the notes below, write a concise summary under ${maxWords} words.
The summary should capture the core essence of every topic so a student can quickly refresh their memory before an exam — no fluff, no filler, just the key ideas explained clearly.
Also suggest a short title and a list of keywords for the summary.

Notes:
${notes
  .map(
    (n, i) => `
[Note ${i + 1}] ${n.title}
${n.cues.map((c) => `- ${c.cue}: ${c.details}`).join("\n")}
`
  )
  .join("\n")}
`;

export const suggestCuePrompt = (detail: string) => `
You are a study assistant helping a student using the Cornell Notes method.
Given the following note, suggest ONE cue. The cue must be either:
- A question whose answer is the content of the note (e.g. "What causes inflation?")
- A sentence that points to what the note is about (e.g. "The effect of inflation on purchasing power")

Do not use single keywords. The cue must be a full sentence or question.
Return only the cue. No explanation, no extra text.

Note:
${detail}
`;
