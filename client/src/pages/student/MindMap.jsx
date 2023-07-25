import { Link, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { A11y, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { MindMapCard } from "../../components/cards/MindMapCard";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const getContents = ({ mindmap_id, title, updated }) => {
	return (
		<SwiperSlide key={mindmap_id}>
			<MindMapCard
				key={mindmap_id}
				id={mindmap_id}
				title={title}
				updated={updated}
			/>
		</SwiperSlide>
	);
};

const localUserData = getLocalData("userData");

export const MindMap = () => {
	const { isLoading, data } = useGetQuery(
		"student/mindmaps",
		`student/mindmaps/${localUserData.userInfo.details.user_id}`,
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
					<img src="/image/basic/mindmap.png" width={"50%"} alt="" />
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h3" sx={{ textAlign: "center" }}>
						Create Mind Map
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Link
						href={
							"/student/mindmap/board/" + localUserData.userInfo.details.user_id
						}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Start Mapping
						</Button>
					</Link>
				</Grid>
			</Grid>

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
					Map Gallery
				</Typography>
				<Box>
					{data.length ? (
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
								{data.map(getContents)}
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
