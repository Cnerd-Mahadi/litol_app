import { CardActionArea, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const ContentCard = ({ id, title, detail, image }) => {
	console.log(title, detail, id);
	return (
		<Link href={"/creator/content/" + id} underline="none">
			<Card sx={{ width: 240, margin: "20px" }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image={require("../../../../server/storage/app/public/content/" +
							image)}
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h7" component="div">
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{detail}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};
