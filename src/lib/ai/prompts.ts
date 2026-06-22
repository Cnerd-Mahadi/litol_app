export const cleanQueryPrompt = (query: string) => `
You are a search query optimizer.
Extract only the semantically meaningful search intent from the user's query.
Remove all filler words, pleasantries, and irrelevant text.
Return only the cleaned query as a short phrase. No explanation, no extra text.

User query:
${query}
`;

export const generateQuizPrompt = (chunks: string[], numberOfQuizzes: number) => `
You are a quiz generator for students.
Generate exactly ${numberOfQuizzes} multiple choice questions strictly based on the content provided below.
Do not use any outside knowledge. Every question and answer must come directly from the provided content.

Each question must have:
- A clear question
- Exactly 4 options (labeled as plain strings, not A/B/C/D)
- The correct answer which must be exactly one of the 4 options

Content:
${chunks.map((c, i) => `[${i + 1}] ${c}`).join("\n\n")}
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
