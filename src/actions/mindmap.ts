import { getCurrentUser } from "@/lib/firebase";
import { db } from "@/lib/firebase/client";
import { mindmapRawSchema, mindmapSchema, mindmapsSchema } from "@/types";
import { entities } from "@/utils";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export const newNodeId = () => `node_${uuidv4()}`;

export const getMindMaps = async (id: string) => {
	const mindmapQuery = query(
		collection(db, entities.mindmaps),
		where("authorId", "==", id)
	);
	const response = await getDocs(mindmapQuery);
	const raw = response.docs.map((item) => {
		return {
			...item.data(),
			id: item.id,
		};
	});
	const data = mindmapsSchema.parse(raw);
	return data;
};

export const getMindMap = async (id: string) => {
	const response = await getDoc(doc(db, entities.mindmaps, id));
	const object: any = response.data();
	const raw = {
		...object,
		id: response.id,
	};
	const data = mindmapSchema.parse(raw);
	return data;
};

export const createMindMap = async (
	values: z.infer<typeof mindmapRawSchema>
) => {
	try {
		const user = await getCurrentUser();
		const updated = new Date().toDateString();
		await addDoc(collection(db, entities.mindmaps), {
			...values,
			authorId: user.id,
			updated: updated,
		});

		return true;
	} catch (error) {
		throw new Error("Sorry! Couldnt create new mindmap", { cause: error });
	}
};

export const updateMindMap = async (
	values: z.infer<typeof mindmapRawSchema>,
	id: string
) => {
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
		await setDoc(doc(db, entities.mindmaps, id), {
			...values,
			authorId: user.id,
			updated: updated,
		});

		return Response.json({
			success: true,
			message: `Mindmap Id ${id} updated successfully`,
		});
	} catch (error) {
		throw new Error(`Sorry! Couldnt update mindmap id ${id}`, { cause: error });
	}
};

export const deleteMindMap = async (id: string) => {
	try {
		await deleteDoc(doc(db, entities.mindmaps, id));
		return Response.json({
			success: true,
			message: `Mindmap Id ${id} deleted successfully`,
		});
	} catch (error) {
		throw new Error(`Sorry! Couldnt delete mindmap id ${id}`, { cause: error });
	}
};
