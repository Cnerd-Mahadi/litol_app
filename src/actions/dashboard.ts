import { db } from "@/lib/firebase/client";
import { entities } from "@/utils";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getContentCount = async (id: string) => {
	try {
		const userStatQuery = (entity: string) =>
			query(collection(db, entity), where("authorId", "==", id));

		const summaryCount = (await getDocs(userStatQuery(entities.summaries)))
			.size;
		const noteCount = (await getDocs(userStatQuery(entities.notes))).size;
		const mindmapCount = (await getDocs(userStatQuery(entities.mindmaps))).size;
		return { summaryCount, mindmapCount, noteCount };
	} catch (err) {
		throw new Error("Sorry! Couldnt fetch content count", { cause: err });
	}
};
