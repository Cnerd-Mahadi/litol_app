import { prisma } from "../src/prisma";
import { ingestNoteChunks } from "../src/lib/ai/ingestion";
import { DEMO_SUBJECTS, DEMO_NOTES, DEMO_SUMMARIES } from "./demo-data";

const DEMO_EMAIL = process.env.DEMO_EMAIL;

if (!DEMO_EMAIL) {
	console.error("Missing DEMO_EMAIL in .env");
	process.exit(1);
}

async function main() {
	const user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL! } });

	if (!user) {
		console.error("Demo user not found. Run seed-demo-user.ts first.");
		process.exit(1);
	}

	// Wipe existing demo content to allow re-seeding
	await prisma.subject.deleteMany({ where: { userId: user.id } });
	console.log("Cleared existing demo content.");

	// Create subjects
	const subjectMap = new Map<string, string>();
	for (const name of DEMO_SUBJECTS) {
		const subject = await prisma.subject.create({
			data: { name, userId: user.id },
		});
		subjectMap.set(name, subject.id);
		console.log("Created subject:", name);
	}

	// Create notes with cues
	for (const note of DEMO_NOTES) {
		const subjectId = subjectMap.get(note.subject);
		if (!subjectId) continue;

		const created = await prisma.note.create({
			data: {
				title: note.title,
				description: note.description,
				keywords: note.keywords,
				userId: user.id,
				subjectId,
				cues: {
					create: note.cues.map((c) => ({
						cue: c.cue,
						details: c.details,
					})),
				},
			},
			include: { cues: true },
		});
		console.log("Created note:", note.title);

		await ingestNoteChunks({ noteId: created.id, cues: created.cues });
		console.log("  Ingested chunks:", created.cues.length);
	}

	// Create summaries
	for (const summary of DEMO_SUMMARIES) {
		const subjectId = subjectMap.get(summary.subject);
		if (!subjectId) continue;

		await prisma.summary.create({
			data: {
				title: summary.title,
				description: summary.description,
				keywords: summary.keywords,
				content: summary.content,
				userId: user.id,
				subjectId,
			},
		});
		console.log("Created summary:", summary.title);
	}

	console.log("\nDemo content seeded successfully.");
	console.log(`User: ${user.email} (${user.id})`);
	console.log(`Subjects: ${DEMO_SUBJECTS.length}`);
	console.log(`Notes: ${DEMO_NOTES.length}`);
	console.log(`Summaries: ${DEMO_SUMMARIES.length}`);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
