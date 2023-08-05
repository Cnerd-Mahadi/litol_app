import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { MuiChipsInput } from "mui-chips-input";
import * as React from "react";
import { Controller } from "react-hook-form";
import "swiper/css";
import "swiper/css/pagination";
import { ProgressButton } from "../../components/common/ProgressButton";
import { SnackAlert } from "../../components/common/SnackAlert";
import { InputField } from "../../components/input-fields/InputField";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { SummaryServices } from "../../services/SummaryServices";
import "../../styles/styles.css";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { SummaryCard } from "./../../components/cards/SummaryCard";
import { FormImage } from "./../../components/input-fields/FormImage";
import { useGetQuery } from "./../../hooks/useGetQuery";

const getContents = ({ data, id, imageUrl }) => {
	return (
		<SummaryCard
			key={id}
			id={id}
			title={data.title}
			details={data.details}
			image={imageUrl}
		/>
	);
};

const localUserData = getLocalData("userData");

export const Summary = () => {
	const {
		handleSubmit,
		control,
		onSubmit,
		register,
		loading,
		snack: { open, message, severity },
		setSnack,
	} = SummaryServices();
	const { isLoading, data } = useGetQuery(
		"student/summaries",
		`student/summaries/${localUserData.userInfo.id}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	if (isLoading) return <Loading />;

	return (
		<>
			<ContentForm
				maxWidth="sm"
				headerImage="/image/general/summary.png"
				headerTitle="Create New Summary"
				submitHandler={handleSubmit}
				onSubmit={onSubmit}>
				<Grid item xs={12} sm={12}>
					<InputField
						type="text"
						id="title"
						label={"Title"}
						control={control}
					/>
				</Grid>

				<Grid item xs={12}>
					<Controller
						name={"keywords"}
						control={control}
						render={({ field, fieldState }) => (
							<Paper
								sx={{
									display: "flex",
									justifyContent: "flex-start",
									flexWrap: "wrap",
									listStyle: "none",
									p: 0.5,
									m: 0,
								}}>
								<MuiChipsInput
									size="small"
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									error={fieldState.error ? true : false}
									helperText={fieldState.error?.message}
									hideClearAll={false}
									placeholder="Add Keywords"
								/>
							</Paper>
						)}
					/>
				</Grid>

				<FormImage id={"image"} control={control} register={register} />

				<Grid item xs={12}>
					<Controller
						name={"details"}
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								required
								label="Write Something..."
								id="content"
								fullWidth
								multiline
								minRows={4}
								maxRows={6}
								onChange={field.onChange}
								onBlur={field.onBlur}
								value={field.value}
								error={fieldState.error ? true : false}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<ProgressButton loading={loading} text={"Create New Summary"} />
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
				<Box>
					{data.summaries.length ? (
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								py: 3,
							}}>
							{data.summaries.map(getContents)}
						</Box>
					) : (
						"Sorry There is no content available currently"
					)}
				</Box>
			</Paper>
			<SnackAlert
				open={open}
				severity={severity}
				message={message}
				handleSnack={setSnack}
			/>
		</>
	);
};
