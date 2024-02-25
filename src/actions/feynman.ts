import { getCurrentUser } from "@/lib/firebase";
import { db } from "@/lib/firebase/client";
import { ResponseType, feynmanSchema, feynmenSchema } from "@/types";
import { feynmanFormSchema } from "@/types/forms";
import { entities, formatedDateTime } from "@/utils";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import * as z from "zod";
import { getContent } from "./learn";

export const getFeynmen = async () => {
	const response = await getDocs(collection(db, entities.feynmen));
	const raw = await Promise.all(
		response.docs.map(async (item) => {
			const content = await getContent(item.data().contentId);
			const requested = item.data().users.map((user: any) => {
				return {
					id: user.id,
					name: user.name,
					email: user.email,
					imageUrl: user.image,
				};
			});
			return {
				id: item.id,
				content: {
					id: content.sys.id,
					title: content.title,
					imageUrl: content.image.url,
				},
				subject: content.subjectRef.name,
				requested: requested,
			};
		})
	);
	const data = feynmenSchema.parse(raw);
	return data;
};

export const feynmanResolve = async (
	values: z.infer<typeof feynmanFormSchema>,
	item: z.infer<typeof feynmanSchema>
) => {
	const user = await getCurrentUser();
	const invitation = {
		sender: user.name,
		receivers: item.requested,
		topic: item.content.title,
		subject: item.subject,
		time: formatedDateTime(values.schedule!),
		link: values.meeting_link,
	};

	const response = await fetch("http://localhost:3000/api/invite", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(invitation),
	});
	const data: ResponseType = await response.json();
	if (data.success) await deleteDoc(doc(db, entities.feynmen, item.id));
	return data;
};
