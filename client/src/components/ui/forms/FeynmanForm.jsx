import { yupResolver } from "@hookform/resolvers/yup";
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import {
	ArrowDropDownIcon,
	DateTimePicker,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Modal from "src/components/layouts/Modal";
import { FeynmanContext } from "src/contexts/FeynmanProvider";
import { useAxios } from "src/hooks/useAxios";
import { useSnack } from "src/hooks/useSnack";
import { localUserData, queryClient } from "src/utils";
import { feynmanSchema } from "src/validations";
import { InputField } from "../InputField";
import SnackAlert from "../SnackAlert";

const container = {
	marginTop: 8,
	marginBottom: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

export const FeynmanForm = () => {
	const { snack, setSnack } = useSnack();
	const axios = useAxios();
	const feynmanContext = useContext(FeynmanContext);

	const { isLoading, mutate } = useMutation({
		mutationKey: ["student/feynman/resolve"],
		mutationFn: (params) =>
			axios.get("student/feynman/resolve", {
				params: params,
			}),
	});

	const { handleSubmit, control } = useForm({
		defaultValues: {
			meeting_link: "",
			schedule: dayjs(Date.now()),
		},
		mode: "onSubmit",
		resolver: yupResolver(feynmanSchema),
	});

	const onSubmit = (data) => {
		const formData = {
			feynman_id: feynmanContext.invitation.info.id,
			resolverName: localUserData.userInfo.name,
			topic: feynmanContext.invitation.info.contentData.title,
			subject: feynmanContext.invitation.info.contentData.subjectRef.name,
			link: data.meeting_link,
			time: data.schedule.toUTCString(),
		};
		mutate(formData, {
			onSuccess: (response) => {
				console.log(response);
				setSnack((prev) => ({
					...prev,
					open: true,
					status: "success",
					title: "Success",
					message: response.data,
				}));
				feynmanContext.setInvitation({
					...feynmanContext.invitation,
					open: false,
				});
				queryClient.invalidateQueries("student/feynman");
			},
			onError: (error) => {
				console.log(error);
				setSnack((prev) => ({
					...prev,
					open: true,
					status: "error",
					title: "Failed",
					message: "Something went wrong! Please try again.",
				}));
			},
		});
	};

	return (
		<>
			<Modal
				open={feynmanContext.invitation.open}
				setInvitation={feynmanContext.setInvitation}>
				<Container component="div" maxWidth="xs">
					<Box sx={container}>
						<Avatar
							sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
							<ArrowDropDownIcon
								sx={{
									fontSize: "60px",
								}}
							/>
						</Avatar>
						<Typography component="h1" variant="h5">
							Feyman Invitation
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit(onSubmit)}
							sx={{ mt: 8 }}>
							<Grid container spacing={3} sx={{ justifyContent: "center" }}>
								<Grid item xs={12}>
									<InputField
										id="meeting_link"
										label={"Meeting Link"}
										control={control}
										fullWidth
									/>
								</Grid>

								<Grid item xs={12}>
									<Controller
										name={"schedule"}
										control={control}
										render={({ field, fieldState: { error } }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DateTimePicker
													{...field}
													label={"Schedule"}
													slotProps={{
														textField: {
															fullWidth: true,
															variant: "outlined",
															error: error ? true : false,
															helperText: error?.message,
														},
													}}
												/>
											</LocalizationProvider>
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
									<Button
										type="submit"
										variant="contained"
										disabled={isLoading}
										sx={{ mt: 5, mb: 2 }}>
										Invite
										{isLoading && (
											<CircularProgress
												size={"1rem"}
												sx={{ ml: 1 }}
												color="inherit"
											/>
										)}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</Modal>
			<SnackAlert
				open={snack.open}
				status={snack.status}
				message={snack.message}
				title={snack.title}
				exit={snack.exit}
				setSnack={setSnack}
			/>
		</>
	);
};
