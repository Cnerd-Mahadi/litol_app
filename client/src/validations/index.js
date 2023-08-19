import { checkUniqueValue, isValidImage, localUserData } from "src/utils";
import * as yup from "yup";

export const signInSchema = yup
	.object({
		username: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export const signUpSchema = yup
	.object({
		username: yup
			.string()
			.required()
			.min(3)
			.max(20)
			.test(
				"usernameCheck",
				"Username is not available",
				async function (value) {
					return await checkUniqueValue("student/usernameCheck", {
						username: value,
					});
				}
			),
		dob: yup
			.date()
			.max(new Date(), "Date must be before today")
			.min(new Date(Date.parse("1900-01-01")), "Date must be after year 1900")
			.typeError("Date must be a valid date"),
		email: yup
			.string()
			.email()
			.required()
			.max(50)
			.test("emailCheck", "Email is not available", async function (value) {
				return await checkUniqueValue("student/emailCheck", {
					email: value,
				});
			}),
		password: yup
			.string()
			.required()
			.min(5)
			.max(20)
			.matches(
				/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/,
				"Password must contain at least one number and one letter"
			),
		confirmPassword: yup
			.string()
			.required()
			.oneOf([yup.ref("password"), ""], "Passwords must match"),
	})
	.required();

export const summarySchema = yup
	.object({
		title: yup
			.string()
			.required()
			.min(3)
			.max(20)
			.test("titleCheck", "Title is not available", async function (value) {
				return await checkUniqueValue("student/titleCheck", {
					title: value,
					collection: "summaries",
					user_id: localUserData.userInfo.id,
				});
			}),
		details: yup.string().required().max(350),
		keywords: yup
			.array()
			.test("lengthLeast", "Atleast 3 keywords required", (value) => {
				return value && value.length >= 3;
			})
			.test("lengthHighest", "Maximum 6 keywords allowed", (value) => {
				return value && value.length <= 6;
			}),
		image: yup
			.mixed()
			.test("required", "You need to provide a file", (value) => {
				const res = value && value.length;
				console.log(res);
				return res;
			})
			.test("fileSize", "The file is too large", (value) => {
				return value && value[0] && value[0].size <= 600000;
			})
			.test("type", "We only support jpeg, png, webp type", function (value) {
				return isValidImage(value);
			}),
	})
	.required();

export const noteSchema = yup.object().shape({
	title: yup
		.string()
		.required()
		.min(3)
		.max(20)
		.test("titleCheck", "Title is not available", async function (value) {
			return await checkUniqueValue("student/titleCheck", {
				title: value,
				collection: "notes",
				user_id: localUserData.userInfo.id,
			});
		}),
	cues: yup.array().of(
		yup.object().shape({
			key: yup
				.string()
				.required("Key field is required")
				.min(3, "Key must be at least 3 characters")
				.max(20, "Key can be maximum 20 characters"),
			details: yup
				.string()
				.required("Details field is required")
				.max(350, "Details can be maximum 350 characters"),
		})
	),
	details: yup.string().required().min(3).max(100),
});

export const mindmapTitleSchema = yup.object().shape({
	title: yup
		.string()
		.required()
		.min(3)
		.max(20)
		.test("titleCheck", "Title is not available", async function (value) {
			return await checkUniqueValue("student/titleCheck", {
				title: value,
				collection: "mindmaps",
				user_id: localUserData.userInfo.id,
			});
		}),
});

export const mindmapTitleUpdatedSchema = (mindmapId) =>
	yup.object().shape({
		title: yup
			.string()
			.required()
			.min(3)
			.max(20)
			.test("titleCheck", "Title is not available", async function (value) {
				return await checkUniqueValue("student/titleUpdateCheck", {
					title: value,
					id: mindmapId,
					collection: "mindmaps",
					user_id: localUserData.userInfo.id,
				});
			}),
	});

export const feynmanSchema = yup
	.object({
		meeting_link: yup
			.string()
			.required("Meeting link must be provided")
			.matches(
				/^https:\/\/meet\.google\.com\/[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3}$/,
				"Google Meet link must be valid"
			),
		schedule: yup
			.date()
			.min(new Date(), "Schedule must be in the future")
			.typeError("Date must be a valid date"),
	})
	.required();
