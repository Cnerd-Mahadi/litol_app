import { getCurrentUser } from "@/lib/firebase";
import { db } from "@/lib/firebase/client";
import { noteSchema, notesSchema } from "@/types";
import { noteFormSchema } from "@/types/forms";
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
import * as z from "zod";

export const getNotes = async (id: string) => {
	const noteQuery = query(
		collection(db, entities.notes),
		where("authorId", "==", id)
	);
	const response = await getDocs(noteQuery);
	const raw = response.docs.map((item) => {
		return {
			...item.data(),
			id: item.id,
		};
	});
	const data = notesSchema.parse(raw);
	return data;
};

export const getNote = async (id: string) => {
	const response = await getDoc(doc(db, entities.notes, id));
	const object: any = response.data();
	const raw = {
		...object,
		id: response.id,
	};
	const data = noteSchema.parse(raw);
	return data;
};

export const createNote = async (values: z.infer<typeof noteFormSchema>) => {
	try {
		const user = await getCurrentUser();
		const updated = new Date().toLocaleString("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
		await addDoc(collection(db, entities.notes), {
			...values,
			authorId: user.id,
			updated: updated,
		});

		return true;
	} catch (error) {
		throw new Error("Sorry! Couldnt create new note", { cause: error });
	}
};

export const deleteNote = async (id: string) => {
	try {
		await deleteDoc(doc(db, entities.notes, id));
		return Response.json({
			success: true,
			message: `Note Id ${id} deleted successfully`,
		});
	} catch (error) {
		throw new Error(`Sorry! Couldnt delete note id ${id}`, { cause: error });
	}
};
