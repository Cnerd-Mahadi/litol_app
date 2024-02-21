import { getCurrentUser } from "@/lib/firebase";
import { db, storage } from "@/lib/firebase/client";
import { summariesSchema, summarySchema } from "@/types";
import { summaryFormSchema } from "@/types/forms";
import { entities } from "@/utils";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { compressImage } from ".";

export const createSummary = async (
	values: z.infer<typeof summaryFormSchema>
) => {
	try {
		const imageRaw: File = values.image[0];
		const imageExtension = imageRaw.name.split(".").pop();
		const imageName = `summary_${uuidv4()}.${imageExtension}`;
		const user = await getCurrentUser();
		const updated = new Date().toLocaleString("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
		const image: Blob = await compressImage(imageRaw);
		await uploadBytes(ref(storage, `summaries/${imageName}`), image);
		await addDoc(collection(db, entities.summaries), {
			...values,
			image: imageName,
			authorId: user.id,
			updated: updated,
		});
		return true;
	} catch (error) {
		throw new Error("Sorry! Couldnt create new summary", { cause: error });
	}
};

export const getSummaries = async (id: string) => {
	const summaryQuery = query(
		collection(db, entities.summaries),
		where("authorId", "==", id)
	);
	const response = await getDocs(summaryQuery);
	const raw = await Promise.all(
		response.docs.map(async (item) => {
			const imageUrl = await getDownloadURL(
				ref(storage, `summaries/${item.data().image}`)
			);
			return {
				...item.data(),
				imageUrl: imageUrl,
				id: item.id,
			};
		})
	);
	const data = summariesSchema.parse(raw);
	return data;
};

export const getSummary = async (id: string) => {
	const response = await getDoc(doc(db, entities.summaries, id));
	const object: any = response.data();
	const imageUrl = await getDownloadURL(
		ref(storage, `summaries/${object.image}`)
	);
	const raw = {
		...object,
		imageUrl: imageUrl,
		id: response.id,
	};
	const data = summarySchema.parse(raw);
	return data;
};

export const deleteSummary = async (id: string, imageId: string) => {
	try {
		await deleteDoc(doc(db, entities.summaries, id));
		await deleteObject(ref(storage, `summaries/${imageId}`));
		return Response.json({
			success: true,
			message: `Summary Id ${id} deleted successfully`,
		});
	} catch (error) {
		throw new Error(`Sorry! Couldnt delete summary id ${id}`, { cause: error });
	}
};
