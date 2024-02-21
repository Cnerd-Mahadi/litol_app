import { db } from "@/lib/firebase/client";
import Compressor from "compressorjs";
import {
	collection,
	documentId,
	getDocs,
	query,
	where,
} from "firebase/firestore";

export const checkUniqueValue = async (
	collectionName: string,
	field: string,
	value: string
) => {
	const uniqueValueQuery = query(
		collection(db, collectionName),
		where(field, "==", value)
	);
	try {
		const response = await getDocs(uniqueValueQuery);
		if (response.empty) return true;
		return false;
	} catch (error) {
		throw new Error("Failed to check unique value", { cause: error });
	}
};

export const checkUniqueValueUpdated = async (
	collectionName: string,
	id: string,
	field: string,
	value: string
) => {
	const uniqueValueQuery = query(
		collection(db, collectionName),
		where(field, "==", value),
		where(documentId(), "!=", id)
	);
	try {
		const response = await getDocs(uniqueValueQuery);
		if (response.empty) return true;
		return false;
	} catch (error) {
		throw new Error("Failed to check unique value", { cause: error });
	}
};

export const compressImage = async (image: File) => {
	const response: Blob = await new Promise((resolve, reject) => {
		new Compressor(image, {
			quality: 0.7,
			success: (result) => resolve(result),
			error: reject,
		});
	});
	return response;
};
