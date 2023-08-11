import { CardActionArea, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const SubjectCard = ({ image, subject, id }) => {
	console.log(image);
	return (
		<Link href={"/student/learn/subject/" + id} underline="none">
			<Card sx={{ width: 280, margin: "20px" }}>
				<CardActionArea>
					<CardMedia component="img" height="140" image={image} alt="none" />
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{subject}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};
