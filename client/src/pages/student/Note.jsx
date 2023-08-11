import { Add, Clear } from "@mui/icons-material";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Controller, useFieldArray } from "react-hook-form";
import { NoteCard } from "../../components/cards/NoteCard";
import { NotAvailable } from "../../components/common/NotAvailable";
import { ProgressButton } from "../../components/common/ProgressButton";
import { SnackAlert } from "../../components/common/SnackAlert";
import { InputField } from "../../components/input-fields/InputField";
import { useGetQuery } from "../../hooks/useGetQuery";
import { ContentForm } from "../../layouts/forms/ContentForm";
import { NoteServices } from "../../services/NoteServices";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const getContents = ({ data, id }) => {
	return (
		<NoteCard key={id} id={id} title={data.title} updated={data.updated} />
	);
};

const localUserData = getLocalData("userData");

export const Note = () => {
	const { isLoading, data } = useGetQuery(
		"student/notes",
		`student/notes/${localUserData.userInfo.id}`,
		getHeader(headerType.tokenize, localUserData.token)
	);
	const {
		handleSubmit,
		control,
		onSubmit,
		loading,
		snack: { open, message, severity },
		setSnack,
	} = NoteServices();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "cues",
	});

	if (isLoading) return <Loading />;

	return (
		<>
			<ContentForm
				maxWidth="sm"
				headerImage="/image/basic/cornell.png"
				headerTitle="Create New Note"
				submitHandler={handleSubmit}
				onSubmit={onSubmit}>
				<Grid item xs={12}>
					<InputField id="title" type="text" label="Title" control={control} />
				</Grid>

				<Grid item xs={12}>
					<Controller
						name={"details"}
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								required
								label="Details"
								fullWidth
								multiline
								rows={2}
								onChange={field.onChange}
								onBlur={field.onBlur}
								value={field.value}
								error={fieldState.error ? true : false}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Grid>

				{fields.map((item, index) => (
					<Grid
						key={item.id}
						width={"100%"}
						container
						spacing={2}
						marginTop={1}
						marginLeft={0}>
						<Grid item xs={3}>
							<Controller
								name={`cues[${index}].key`}
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										required
										fullWidth
										label="Key"
										value={field.value}
										onChange={field.onChange}
										onBlur={field.onBlur}
										error={fieldState.error ? true : false}
										helperText={fieldState.error?.message}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={7}>
							<Controller
								name={`cues[${index}].details`}
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										required
										fullWidth
										label="Details"
										multiline
										rows={1}
										value={field.value}
										onChange={field.onChange}
										onBlur={field.onBlur}
										error={fieldState.error ? true : false}
										helperText={fieldState.error?.message}
									/>
								)}
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
								aria-label="add"
								color="primary"
								onClick={() => {
									console.log(index, "INFD", fields.length);
									append({
										key: "",
										details: "",
									});
								}}>
								<Add />
							</IconButton>
						</Grid>
						<Grid item xs={1}>
							<IconButton
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									mt: 1,
								}}
								aria-label="delete"
								color="primary"
								disabled={fields.length === 1}
								onClick={() => {
									remove(index);
								}}>
								<Clear color={fields.length === 1 ? "inherit" : "error"} />
							</IconButton>
						</Grid>
					</Grid>
				))}

				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<ProgressButton loading={loading} text={"Create New Note"} />
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
					{data.notes.length ? (
						<Box
							component={"div"}
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								py: 3,
							}}>
							{data.notes.map(getContents)}
						</Box>
					) : (
						<NotAvailable contentType="note" />
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
