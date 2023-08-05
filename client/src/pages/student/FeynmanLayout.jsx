import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	ClickAwayListener,
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
import React from "react";
import { Controller } from "react-hook-form";
import { SnackAlert } from "../../components/common/SnackAlert";
import { InputField } from "../../components/input-fields/InputField";
import { SignUpContainerStyle } from "../../styles/mui-styles/containers";
import {
	FeynmanContext,
	FeynmanServices,
} from "./../../services/FeymanServices";
import { Feynman } from "./Feynman";

export const FeynmanLayout = () => {
	const {
		control,
		handleSubmit,
		onSubmit,
		value,
		loading,
		snack: { open, message, severity },
		setSnack,
	} = FeynmanServices();

	return (
		<div
			style={{
				position: "relative",
			}}>
			<FeynmanContext.Provider value={value}>
				<Feynman />
			</FeynmanContext.Provider>
			{value.overlay && (
				<Box
					width={"100%"}
					height={"100%"}
					sx={{
						position: "absolute",
						zIndex: 5,
						backgroundColor: "black",
						opacity: 0.9,
						top: 0,
						bottom: 0,
					}}></Box>
			)}
			{value.overlay && (
				<ClickAwayListener
					onClickAway={() => {
						value.setOverlay(false);
						value.setContentInfo(null);
					}}>
					<Container
						component="div"
						maxWidth="xs"
						sx={{
							zIndex: 10,
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "white",
							borderRadius: "20px",
						}}>
						<Box sx={SignUpContainerStyle}>
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
											type="text"
											id="meeting_link"
											label={"Meeting Link"}
											control={control}
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
											disabled={loading}
											sx={{ mt: 5, mb: 2 }}>
											Invite
											{loading && (
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
				</ClickAwayListener>
			)}
			<SnackAlert
				open={open}
				severity={severity}
				message={message}
				handleSnack={setSnack}
			/>
		</div>
	);
};
