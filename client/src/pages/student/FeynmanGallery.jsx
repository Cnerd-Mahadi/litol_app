import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FeynmanCard } from "src/components/cards/FeynmanCard";
import { Loading } from "src/components/layouts/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { images } from "src/utils/resources";

export const FeynmanGallery = () => {
	const { isLoading, data: response } = useGetQuery(
		"student/feynmen",
		`student/feynmen`
	);

	console.log(response);

	if (isLoading) return <Loading />;

	return (
		<>
			<Grid
				container
				spacing={2}
				maxWidth={"sm"}
				display={"flex"}
				justifyContent={"center"}
				sx={{
					m: "auto",
				}}>
				<Grid item xs={12} textAlign={"center"}>
					<Box
						component="img"
						src={images.feynman}
						width={"200px"}
						alt="feynman-list"
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 700,
							textAlign: "center",
							mb: 3,
						}}>
						Feyman Gallery
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{response.data.length ? (
						response.data.map((item) => {
							return (
								<FeynmanCard key={item.id} id={item.id} data={item.data} />
							);
						})
					) : (
						<NotAvailable contentType="feynman request" />
					)}
				</Grid>
			</Grid>
		</>
	);
};
