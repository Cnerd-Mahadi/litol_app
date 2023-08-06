import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "swiper/css";
import "swiper/css/pagination";
import { FeynmanCard } from "../../components/cards/FeynmanCard";
import { NotAvailable } from "../../components/common/NotAvailable";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const localUserData = getLocalData("userData");

export const Feynman = () => {
	const { isLoading, data } = useGetQuery(
		"student/feynmen",
		`student/feynmen`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(data);

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
					<img src="/image/basic/feynman.png" width={"200px"} alt="" />
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
					{data.length ? (
						data.map((item) => {
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
