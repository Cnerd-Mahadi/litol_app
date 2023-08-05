import { CardActionArea, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export const TopicCard = ({ id, title, image, subject }) => {
	return (
		<Link href={"/student/learn/topic/" + id} underline="none">
			<Card sx={{ width: 240, margin: "20px" }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image={image}
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							{title}
						</Typography>
						<Typography
							variant="body2"
							color="text.primary"
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "1",
								WebkitBoxOrient: "vertical",
							}}>
							{subject}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};
