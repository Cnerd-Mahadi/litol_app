import { generateText, Output } from "ai";
import { z } from "zod";
import { llm } from "../lib/ai/config";
import { suggestCuePrompt } from "../lib/ai/prompts";

export async function suggestCue(detail: string): Promise<{ cue: string } | { error: string }> {
  const parsed = z.string().min(1, "Note detail required").safeParse(detail);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: z.object({ cue: z.string() }) }),
    prompt: suggestCuePrompt(parsed.data),
  });

  return { cue: output.cue };
}
