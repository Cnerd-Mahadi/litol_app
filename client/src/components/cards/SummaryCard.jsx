import { CardActionArea, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const SummaryCard = ({ id, title, detail, image }) => {
	console.log(title, detail, id);
	return (
		<Link href={"/student/summary/" + id} underline="none">
			<Card sx={{ width: 240, margin: "20px" }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image={require("../../../../server/storage/app/public/summary/" +
							image)}
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
							{detail}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};
