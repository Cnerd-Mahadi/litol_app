import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as React from "react";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { FormImage } from "../../components/common/FormImage";
import { InputField } from "../../components/common/InputField";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { baseURL } from "../../utilities/utility";
import { SummaryCard } from "./../../components/cards/SummaryCard";

const getContents = ({ summary_id, title, detail, image }) => {
	return (
		<SwiperSlide key={summary_id}>
			<SummaryCard
				key={summary_id}
				id={summary_id}
				title={title}
				detail={detail}
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
		detail: data.get("content"),
		image: data.get("image"),
		student_id: JSON.parse(localStorage.getItem("userData")).user.student_id,
	};
	console.log(resultData);

	axios
		.post(baseURL + "student/summarySubmit", resultData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
			console.log(response.data);
		});
};

export const Summary = () => {
	const [summary, setSummary] = React.useState([]);

	React.useEffect(() => {
		axios.get(baseURL + `student/summary`).then((response) => {
			setSummary(response.data);
			console.log(response.data);
		});
	}, []);

	return (
		<>
			<ContentForm
				maxWidth="sm"
				headerImage="/image/general/summary.png"
				headerTitle="Create New Summary"
				submitHandler={handleSubmit}>
				<Grid item xs={12} sm={12}>
					<InputField id="title" type="text" autoFocus={true} />
				</Grid>

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
						Create New Summary
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
					Summary Gallery
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexWrap: "nowrap",
						justifyContent: "center",
					}}>
					{summary.length ? (
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
								{summary.map(getContents)}
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
