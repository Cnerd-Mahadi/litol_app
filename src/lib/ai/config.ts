import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "../../env";

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const llm = google("gemini-2.5-flash-lite");
export const embedder = google.embedding("gemini-embedding-001");
