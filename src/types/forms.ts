import { checkUniqueValue, checkUniqueValueUpdated } from "@/actions";
import { acceptedImageTypes, entities, maxFileSize } from "@/utils";
import { z } from "zod";

export const summaryFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "This field is required" })
		.min(3, { message: "Title must be atleast 3 characters" })
		.max(50, { message: "Title can be upto 50 characters" })
		.refine(
			async (value) =>
				await checkUniqueValue(entities.summaries, "title", value),
			{ message: "Title already exist" }
		),
	details: z
		.string()
		.min(1, { message: "This field is required" })
		.max(350, { message: "Details can be upto 350 characters" }),
	keywords: z.array(z.string()).min(3),
	image: z
		.any()
		.refine((files) => files?.length >= 1, { message: "Image is required." })
		.refine(
			(files) => {
				return acceptedImageTypes.includes(files?.[0]?.type);
			},
			{
				message: ".jpg, .jpeg, .png and .webp files are accepted.",
			}
		)
		.refine((files) => files?.[0]?.size <= maxFileSize, {
			message: `Max file size is 5MB.`,
		}),
});

export const noteFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "This field is required" })
		.min(3, { message: "Title must be atleast 3 characters" })
		.max(50, { message: "Title can be upto 50 characters" })
		.refine(
			async (value) => await checkUniqueValue(entities.notes, "title", value),
			{ message: "Title already exist" }
		),
	details: z
		.string()
		.min(1, { message: "This field is required" })
		.max(350, { message: "Details can be upto 350 characters" }),
	cues: z
		.array(
			z.object({
				id: z.string(),
				key: z
					.string()
					.min(1, { message: "This field is required" })
					.max(50, { message: "Cue key can be upto 50 characters" }),
				details: z
					.string()
					.min(1, { message: "This field is required" })
					.max(200, { message: "Cue details can be upto 200 characters" }),
			})
		)
		.min(1),
});

export const mindmapFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "This field is required" })
		.min(3, { message: "Title must be atleast 3 characters" })
		.max(50, { message: "Title can be upto 50 characters" })
		.refine(
			async (value) =>
				await checkUniqueValue(entities.mindmaps, "title", value),
			{ message: "Title already exist" }
		),
});

export const mindmapFormUpdateSchema = (id: string) =>
	z.object({
		title: z
			.string()
			.min(1, { message: "This field is required" })
			.min(3, { message: "Title must be atleast 3 characters" })
			.max(50, { message: "Title can be upto 50 characters" })
			.refine(
				async (value) =>
					await checkUniqueValueUpdated(entities.mindmaps, id, "title", value),
				{ message: "Title already exist" }
			),
	});

export const feynmanFormSchema = z.object({
	meeting_link: z
		.string()
		.regex(
			/^https:\/\/meet\.google\.com\/[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3}$/,
			"Google Meet link must be valid"
		),
	schedule: z.nullable(z.date()),
});
