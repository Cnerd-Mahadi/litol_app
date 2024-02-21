import { contentfulFetch } from "@/lib/contentful";
import {
	contentQuery,
	contentsQuery,
	subjectsQuery,
} from "@/lib/contentful/contentful-queries";
import { db } from "@/lib/firebase/client";
import { contentSchema, subjectSchema, topicSchema, userSchema } from "@/types";
import { entities } from "@/utils";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { z } from "zod";

export const getSubjects = async () => {
	try {
		const response = await contentfulFetch(subjectsQuery);
		const data = subjectSchema.parse(response).data.subjectCollection.items;
		return data;
	} catch (error) {
		throw new Error("Sorry couldnt fetch the subjects", { cause: error });
	}
};

export const getTopics = async (subjectId: string) => {
	try {
		const response = await contentfulFetch(contentsQuery(subjectId));
		const data = topicSchema.parse(response).data.contentCollection.items;
		return data;
	} catch (error) {
		throw new Error("Sorry couldnt fetch the topics", { cause: error });
	}
};

export const getContent = async (contentId: string) => {
	try {
		const response = await contentfulFetch(contentQuery(contentId));
		const data = contentSchema.parse(response).data.content;
		return data;
	} catch (error) {
		throw new Error("Sorry couldnt fetch the content", { cause: error });
	}
};

export const feynmanRequest = async (
	contentId: string,
	user: z.infer<typeof userSchema>
) => {
	const eligibility = await checkRequest(contentId, user.id);
	if (!eligibility)
		return Response.json({
			success: false,
			message: "Sorry! content already requested from this user",
		});
	else {
		const queryRequest = query(
			collection(db, entities.feynmen),
			where("contentId", "==", contentId)
		);
		const requested = await getDocs(queryRequest);
		if (requested.empty) {
			return addFeynman(contentId, [user.id], [user]);
		} else {
			const latestRequest = requested.docs[requested.size - 1].data();
			if (latestRequest.slots.length > 3) {
				return addFeynman(contentId, [user.id], [user]);
			} else {
				const docId = requested.docs[requested.size - 1].id;
				latestRequest.slots.push(user.id);
				latestRequest.users.push(user);
				return updateFeynman(docId, latestRequest.slots, latestRequest.users);
			}
		}
	}
};

export const checkRequest = async (contentId: string, userId: string) => {
	const queryUniqueRequest = query(
		collection(db, entities.feynmen),
		where("contentId", "==", contentId),
		where("slots", "array-contains", userId)
	);
	try {
		const requestUnique = await getDocs(queryUniqueRequest);
		if (!requestUnique.empty) return false;
		return true;
	} catch (error) {
		throw new Error("Sorry! Feynman request check failed", { cause: error });
	}
};

export const addFeynman = async (
	contentId: string,
	slots: string[],
	users: z.infer<typeof userSchema>[]
) => {
	try {
		await addDoc(collection(db, entities.feynmen), {
			contentId: contentId,
			slots: slots,
			users: users,
		});
		return Response.json({
			success: true,
			message: "Feynman session requested successfully",
		});
	} catch (error) {
		throw new Error("Sorry! Feynman session request failed", { cause: error });
	}
};

export const updateFeynman = async (
	docId: string,
	slots: string[],
	users: z.infer<typeof userSchema>[]
) => {
	try {
		await updateDoc(doc(db, entities.feynmen, docId), {
			slots: slots,
			users: users,
		});
		return Response.json({
			success: true,
			message: `Feynman session requested updated at position ${slots.length}`,
		});
	} catch (error) {
		throw new Error("Sorry! Feynman session request failed", { cause: error });
	}
};
