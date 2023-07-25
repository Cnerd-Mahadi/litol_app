import { Add, Clear } from "@mui/icons-material";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState } from "react";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { NoteCard } from "../../components/cards/NoteCard";
import { InputField } from "../../components/common/InputField";
import { useGetQuery } from "../../hooks/useGetQuery";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { apiPostDataHandler } from "../../services/apiManager";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const getContents = ({ note_id, title, updated }) => {
	return (
		<SwiperSlide key={note_id}>
			<NoteCard key={note_id} id={note_id} title={title} updated={updated} />
		</SwiperSlide>
	);
};

const localUserData = getLocalData("userData");

export const Note = () => {
	const { isLoading, data: notes } = useGetQuery(
		"student/notes",
		`student/notes/${localUserData.userInfo.details.user_id}`,
		getHeader(headerType.tokenize, localUserData.token)
	);
	const [cueFieldData, setCueFieldData] = useState([
		{
			id: 0,
			key: "",
			details: "",
			active: true,
		},
	]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const cue = {
			value: cueFieldData,
		};
		const resultData = {
			title: data.get("title"),
			note_details: JSON.stringify(cue),
			user_id: localUserData.userInfo.details.user_id,
		};

		console.log(resultData);

		apiPostDataHandler(
			"student/submitNote",
			resultData,
			getHeader(headerType.tokenize, localUserData.token)
		);
	};

	const handleCueChange = (event) => {
		const { id, value } = event.target;

		const dotIndex = id.indexOf(".");
		const cueField = id.substring(0, dotIndex);
		const cueId = parseInt(id.substring(dotIndex + 1));

		if (cueField === "key") {
			const updatedCue = cueFieldData.map((cue) => {
				if (cue.id === cueId) {
					return { ...cue, key: value };
				}
				return cue;
			});
			setCueFieldData(updatedCue);
		} else {
			const updatedCue = cueFieldData.map((cue) => {
				if (cue.id === cueId) {
					return { ...cue, details: value };
				}
				return cue;
			});
			setCueFieldData(updatedCue);
		}
	};

	const cueInputFields = ({ id, active, key, details }) => {
		// console.log(id, active, key, details);
		return (
			<Grid
				key={id}
				width={"100%"}
				container
				spacing={2}
				marginTop={1}
				marginLeft={0}>
				<Grid item xs={4}>
					<TextField
						required
						fullWidth
						id={`key.${id}`}
						label="Key"
						name={`key.${id}`}
						autoComplete="true"
						autoFocus
						value={key}
						onChange={handleCueChange}
					/>
				</Grid>
				<Grid item xs={7}>
					<TextField
						required
						fullWidth
						id={`details.${id}`}
						label="Details"
						name={`details.${id}`}
						autoComplete="true"
						autoFocus
						value={details}
						onChange={handleCueChange}
					/>
				</Grid>
				<Grid item xs={1}>
					<IconButton
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mt: 1,
						}}
						id={`btn.${id}`}
						aria-label="add"
						color="primary"
						onClick={(event) => {
							const btnId = event.currentTarget.id;
							const cueId = parseInt(btnId.substring(btnId.indexOf(".") + 1));
							const cue = cueFieldData.find((cue) => cue.id === cueId);

							const isSelectedActive = cue.active;

							if (!isSelectedActive) {
								const updateCue = cueFieldData.filter(
									(cue) => cue.id !== cueId
								);
								setCueFieldData([...updateCue]);
							} else {
								const updateCue = cueFieldData.map((cue) => {
									if (cue.id === cueId) return { ...cue, active: false };
									return cue;
								});

								setCueFieldData([
									...updateCue,
									{
										id: cueFieldData[cueFieldData.length - 1].id + 1,
										key: "",
										details: "",
										active: true,
									},
								]);
							}
						}}>
						{active ? (
							<Add />
						) : (
							<Clear
								sx={{
									color: "#FF6D60",
								}}
							/>
						)}
					</IconButton>
				</Grid>
			</Grid>
		);
	};

	if (isLoading) return <Loading />;

	return (
		<>
			<ContentForm
				maxWidth="sm"
				headerImage="/image/basic/cornell.png"
				headerTitle="Create New Note"
				submitHandler={handleSubmit}>
				<Grid item xs={12}>
					<InputField id="title" type="text" autoFocus={true} />
				</Grid>
				{cueFieldData.map(cueInputFields)}
				<Grid item sm={6} xs={12}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Create New Note
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
					Note Gallery
				</Typography>
				<Box>
					{notes.length ? (
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
								{notes.map(getContents)}
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
