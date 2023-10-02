import { Box, Stack, Typography, useTheme } from "@mui/material";
import { FeynmanCard } from "src/components/layouts/Feynman/FeynmanCard";
import { Loading } from "src/components/ui/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { colors } from "src/utils";
import { images } from "src/utils/resources";

export const FeynmanGallery = () => {
	const theme = useTheme();
	const { isLoading, data: response } = useGetQuery(
		"student/feynmen",
		`student/feynmen`
	);

	console.log(response);

	return (
		<Stack alignItems={"center"} py={2} bgcolor={"#ede9fe"}>
			<Stack
				spacing={5}
				width="50%"
				height={"100vh"}
				overflow={"auto"}
				sx={{
					p: 1,
					pb: 4,
					borderRadius: 4,
					bgcolor: colors.white,
				}}>
				<Stack
					alignItems="center"
					spacing={1}
					pt={2}
					pb={8}
					borderRadius={4}
					bgcolor={theme.palette.primary.light}>
					<Box component="img" src={images.feynman} width={250} alt="feynman" />
					<Typography
						variant="h2"
						fontWeight={700}
						color={theme.palette.primary.main}>
						Feynman Gallery
					</Typography>
				</Stack>
				<Stack alignItems={"center"} paddingBottom={32}>
					{isLoading ? (
						<Loading />
					) : response.data.length ? (
						response.data.map((item) => {
							return (
								<FeynmanCard key={item.id} id={item.id} data={item.data} />
							);
						})
					) : (
						<NotAvailable width={"100%"} contentType="feynman request" />
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};
