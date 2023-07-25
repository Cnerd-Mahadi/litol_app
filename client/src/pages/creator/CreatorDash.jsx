import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	Paper,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import * as React from "react";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FormImage } from "../../components/common/FormImage";
import { InputField } from "../../components/common/InputField";
import { useGetQuery } from "../../hooks/useGetQuery";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { apiPostDataHandler } from "../../services/apiManager";
import {
	getHeader,
	getLocalData,
	getSubjects,
	headerType,
} from "../../utilities/utility";
import { Loading } from "../Loading";
import { ContentCard } from "./../../components/cards/ContentCard";

const localUserData = getLocalData("userData");

const getContents = ({ content_id, subject_info, title, image }) => {
	return (
		<SwiperSlide key={content_id}>
			<ContentCard
				key={content_id}
				id={content_id}
				title={title}
				detail={subject_info.subject_name.toUpperCase()}
				image={image}
			/>
		</SwiperSlide>
	);
};

const handleSubmit = (event) => {
	event.preventDefault();
	const data = new FormData(event.currentTarget);
	const resultData = {
		title: data.get("title"),
		subject_id: parseInt(data.get("subject")),
		details: data.get("content"),
		image: data.get("image"),
		user_id: localUserData.userId,
	};
	console.log(resultData);
	apiPostDataHandler(
		"creator/submitContent",
		resultData,
		getHeader(headerType.multi, localUserData.token)
	);
};

export const CreatorDash = () => {
	const { isLoading, data: dashInfo } = useGetQuery(
		"creator-dash",
		`creator/dashboard/${localUserData.userInfo.details.user_id}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(dashInfo);

	if (isLoading) return <Loading />;

	return (
		<>
			<ContentForm
				maxWidth="sm"
				headerImage="/image/general/new_content.png"
				headerTitle="Create New Content"
				submitHandler={handleSubmit}>
				<Grid item xs={12} sm={6}>
					<InputField id="title" type="text" autoFocus={true} />
				</Grid>

				{
					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel id="subjectLabel">Subject</InputLabel>
							<Select
								id="subject"
								defaultValue={dashInfo.subjects[0].subject_id}
								label="Subject"
								name="subject">
								{dashInfo.subjects.map(getSubjects)}
							</Select>
						</FormControl>
					</Grid>
				}

				<FormImage />

				<Grid item xs={12}>
					<TextField
						required
						fullWidth
						multiline
						rows={4}
						maxRows={6}
						name="content"
						label="Write Something..."
						type="content"
						id="content"
					/>
				</Grid>
				<Grid item sm={6} xs={12}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Create New Content
					</Button>
				</Grid>
			</ContentForm>

			<Paper
				elevation={3}
				sx={{
					pt: 2,
					pb: 5,
					mt: 12,
					mb: 6,
					backgroundColor: "#fafafa",
					borderRadius: "48px 48px 0px 0px",
				}}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 700,
						textAlign: "center",
						mb: 3,
					}}>
					Content Gallery
				</Typography>
				<Box>
					{dashInfo.contents.length > 0 ? (
						<Swiper
							modules={[Pagination, A11y]}
							spaceBetween={20}
							slidesPerView={5}
							pagination={{ clickable: true }}
							onSwiper={(swiper) => console.log(swiper)}
							onSlideChange={() => console.log("slide change")}>
							<Box
								component={"div"}
								sx={{
									py: 3,
								}}>
								{dashInfo.contents.map(getContents)}
							</Box>
						</Swiper>
					) : (
						"Sorry There is no content available currently"
					)}
				</Box>
			</Paper>
		</>
	);
};
