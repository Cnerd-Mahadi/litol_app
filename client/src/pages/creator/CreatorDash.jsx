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
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FormImage } from "../../components/common/FormImage";
import { InputField } from "../../components/common/InputField";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { baseURL, getSubjects } from "../../utilities/utility";
import { ContentCard } from "./../../components/cards/ContentCard";

const getContents = ({ content_id, subject, topic }) => {
	return (
		<SwiperSlide key={content_id}>
			<ContentCard
				key={content_id}
				id={content_id}
				title={topic.title}
				detail={subject.subject_name}
				image={topic.image}
			/>
		</SwiperSlide>
	);
};

const handleSubmit = (event) => {
	event.preventDefault();
	const data = new FormData(event.currentTarget);
	const resultData = {
		title: data.get("title"),
		subject: data.get("subject"),
		detail: data.get("content"),
		image: data.get("image"),
		creator_id: JSON.parse(localStorage.getItem("userData")).user.creator_id,
	};
	console.log(resultData);

	axios
		.post(baseURL + "creator/content", resultData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
			console.log(response.data);
		});
};

export const CreatorDash = () => {
	const [dashInfo, setDashInfo] = React.useState([]);
	const dashItemExists =
		dashInfo && dashInfo.contents && dashInfo.contents.length;
	const navigate = useNavigate();

	console.log(dashInfo);

	React.useEffect(() => {
		axios
			.get(
				baseURL +
					`creator/dashboard?creator_id=${
						JSON.parse(localStorage.getItem("userData")).user.creator_id
					}`
			)
			.then((response) => {
				setDashInfo(response.data);
				console.log(response.data);
				navigate("/creator");
			});
	}, [navigate]);

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

				{dashInfo.subjects && (
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
				)}

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
				<Box
					sx={{
						display: "flex",
						flexWrap: "nowrap",
						justifyContent: "center",
					}}>
					{dashItemExists ? (
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
			{/* {dashItemExists && (
				<MuiPagination count={dashInfo.contents.length / 5} color="primary" />
			)} */}
		</>
	);
};
