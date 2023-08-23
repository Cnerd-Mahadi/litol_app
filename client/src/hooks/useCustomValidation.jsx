import { useEffect } from "react";
import { checkUniqueValue } from "src/utils";

export const useCustomValidation = (field, url, methods, label, params) => {
	const {
		watch,
		setError,
		clearErrors,
		formState: { errors, isSubmitted },
	} = methods;
	const value = watch(field);

	useEffect(() => {
		const uniqueCheck = async function (value) {
			if (!value) return true;
			const isUnique = await checkUniqueValue(url, params);
			console.log(isUnique);
			if (!isUnique) {
				setError(field, {
					type: "unique",
					message: `${label} is not available`,
				});
			} else {
				if (errors?.[field]?.type === "unique") clearErrors(field);
			}
		};
		if (isSubmitted) {
			uniqueCheck(value);
		}
	}, [
		value,
		setError,
		clearErrors,
		isSubmitted,
		url,
		field,
		label,
		errors,
		params,
	]);
};
