import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "src/components/ui/ImageUpload";
import { useCustomValidation } from "src/hooks/useCustomValidation";
import { useMutateQuery } from "src/hooks/useMutateQuery";
import { useSnack } from "src/hooks/useSnack";
import { localUserData, queryClient } from "src/utils";
import { fileAllowed } from "src/utils/resources";
import { summarySchema } from "src/validations";
import { InputField } from "../../ui/InputField";
import { ProgressButton } from "../../ui/ProgressButton";
import SnackAlert from "../../ui/SnackAlert";

const muiChip = {
	display: "flex",
	justifyContent: "flex-start",
	flexWrap: "wrap",
	listStyle: "none",
	p: 0.5,
	m: 0,
};

export const SummaryForm = () => {
	const { snack, setSnack } = useSnack();
	const navigate = useNavigate();

	const { isLoading, mutate } = useMutateQuery(
		"student/submitSummary",
		"student/submitSummary",
		fileAllowed
	);

	const { handleSubmit, control, ...methods } = useForm({
		defaultValues: {
			title: "",
			details: "",
			keywords: [],
			image: undefined,
		},
		mode: "onSubmit",
		resolver: yupResolver(summarySchema),
	});

	useCustomValidation("title", "student/titleCheck", methods, "Title", {
		title: methods.watch("title"),
		collection: "summaries",
		user_id: localUserData().uid,
	});

	const onSubmit = (data) => {
		console.log(data);
		mutate(
			{
				...data,
				image: data.image[0],
				user_id: localUserData().uid,
			},
			{
				onSuccess: (response) => {
					console.log(response);
					setSnack((prev) => ({
						...prev,
						open: true,
						status: "success",
						title: "Success",
						message: response.data,
					}));
					queryClient.invalidateQueries("student/summaries");
					navigate(0);
				},
				onError: () => {
					setSnack((prev) => ({
						...prev,
						open: true,
						status: "error",
						title: "Failed",
						message: "Something went wrong! Please try again.",
					}));
				},
			}
		);
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				mt: 3,
			}}>
			<Grid container spacing={2} justifyContent={"center"}>
				<Grid item xs={12} sm={12}>
					<InputField id="title" label={"Title"} control={control} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Controller
						name={"keywords"}
						control={control}
						render={({ field, fieldState }) => (
							<Box sx={muiChip}>
								<MuiChipsInput
									size="small"
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
									error={fieldState.error ? true : false}
									helperText={fieldState.error?.message}
									hideClearAll={false}
									placeholder="Add keywords separated by 'Enter' key"
									fullWidth
								/>
							</Box>
						)}
					/>
				</Grid>
				<ImageUpload id={"image"} control={control} />
				<Grid item xs={12}>
					<InputField
						label="Write Something..."
						id="details"
						fullWidth
						control={control}
						multiline
						minRows={4}
						maxRows={6}
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
					<ProgressButton loading={isLoading} text={"Create New Summary"} />
				</Grid>
			</Grid>
			<SnackAlert
				open={snack.open}
				status={snack.status}
				message={snack.message}
				title={snack.title}
				exit={snack.exit}
				setSnack={setSnack}
			/>
		</Box>
	);
};
