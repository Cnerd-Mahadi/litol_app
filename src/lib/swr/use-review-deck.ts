"use client";

import { getReviewNotes } from "@/actions/note";
import useSWR from "swr";

export type ReviewCue = {
	id: string;
	cue: string;
	details: string;
	noteId: string;
	noteTitle: string;
	subjectId: string;
};

// Pulls real cues from the user's most recent notes to seed the review deck.
// Spaced-repetition scheduling (due dates) can replace this fetch later without
// touching the UI — the card just consumes ReviewCue[].
export function useReviewDeck() {
	return useSWR<ReviewCue[]>("review-deck", async () => {
		const res = await getReviewNotes();
		if (res?.serverError) throw new Error(res.serverError);

		const deck: ReviewCue[] = [];
		for (const note of res?.data?.notes ?? []) {
			for (const c of note.cues) {
				deck.push({
					id: c.id,
					cue: c.cue,
					details: c.details,
					noteId: note.id,
					noteTitle: note.title,
					subjectId: note.subjectId,
				});
			}
		}
		return deck;
	});
}
