import { Document } from "@contentful/rich-text-types";
import { Edge, Node } from "reactflow";
import { z } from "zod";

export const userSchema = z.object({
	name: z.string(),
	email: z.string(),
	image: z.string(),
	id: z.string(),
});

export interface ResponseType {
	success: boolean;
	message: string;
}

export const subjectSchema = z.object({
	data: z.object({
		subjectCollection: z.object({
			items: z
				.object({
					sys: z.object({
						id: z.string(),
					}),
					name: z.string(),
					image: z.object({
						url: z.string(),
					}),
				})
				.array(),
		}),
	}),
});
export const topicSchema = z.object({
	data: z.object({
		contentCollection: z.object({
			items: z
				.object({
					sys: z.object({
						id: z.string(),
					}),
					title: z.string(),
					subjectRef: z.object({
						name: z.string(),
						sys: z.object({
							id: z.string(),
						}),
					}),
					image: z.object({
						url: z.string(),
					}),
				})
				.array(),
		}),
	}),
});
export const contentSchema = z.object({
	data: z.object({
		content: z.object({
			sys: z.object({
				id: z.string(),
				publishedAt: z.string().datetime(),
			}),
			details: z.object({
				json: z.any().transform((x) => x as Document),
			}),
			usefulLinks: z.object({
				json: z.any().transform((x) => x as Document),
			}),
			title: z.string(),
			subjectRef: z.object({
				name: z.string(),
			}),
			image: z.object({
				url: z.string(),
			}),
			authorRef: z.object({
				name: z.string(),
				authorImage: z.object({
					url: z.string(),
				}),
			}),
		}),
	}),
});

export const summarySchema = z.object({
	authorId: z.string(),
	details: z.string(),
	image: z.string(),
	imageUrl: z.string(),
	keywords: z.string().array(),
	title: z.string(),
	updated: z.string(),
	id: z.string(),
});

export const summariesSchema = summarySchema.array();

export const noteSchema = z.object({
	authorId: z.string(),
	details: z.string(),
	cues: z.array(
		z.object({
			id: z.string(),
			key: z.string(),
			details: z.string(),
		})
	),
	title: z.string(),
	updated: z.string(),
	id: z.string(),
});

export const notesSchema = noteSchema.array();

export const mindmapSchema = z.object({
	authorId: z.string(),
	title: z.string(),
	updated: z.string(),
	edges: z.string().transform((x) => JSON.parse(x) as Edge[]),
	nodes: z.string().transform((x) => JSON.parse(x) as Node[]),
	id: z.string(),
});

export const mindmapRawSchema = z.object({
	title: z.string(),
	edges: z.string().refine((x) => JSON.parse(x) as Edge[]),
	nodes: z.string().refine((x) => JSON.parse(x) as Node[]),
});

export const mindmapsSchema = mindmapSchema.array();

export const feynmanSchema = z.object({
	id: z.string(),
	content: z.object({
		id: z.string(),
		title: z.string(),
		imageUrl: z.string(),
	}),
	subject: z.string(),
	requested: z
		.object({
			id: z.string(),
			name: z.string(),
			email: z.string(),
			imageUrl: z.string(),
		})
		.array(),
});

export const feynmenSchema = feynmanSchema.array();

export interface TopicParams {
	params: {
		topic: string;
	};
}

export interface ContentParams {
	searchParams: {
		subjectId: string;
		topicId: string;
	};
}

export interface MindMapParams {
	params: {
		mindmapId: string;
	};
}

export interface InvitationType {
	sender: string;
	receivers: {
		id: string;
		name: string;
		email: string;
		imageUrl: string;
	}[];
	topic: string;
	subject: string;
	time: string;
	link: string;
}
