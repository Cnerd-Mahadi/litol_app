import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Main({ content }) {
	return (
		<Grid
			item
			xs={12}
			sx={{
				mt: 4,
			}}>
			<Typography variant="h3" gutterBottom>
				{content.title}
			</Typography>
			<Divider />
			<article className="prose prose-stone">
				<Typography gutterBottom>
					{documentToReactComponents(content.details.json, {
						renderMark: {
							[MARKS.CODE]: (text) => (
								<pre>
									<code>{text}</code>
								</pre>
							),
						},
					})}
				</Typography>

				<Typography gutterBottom>
					{documentToReactComponents(content.usefulLinks.json, {
						renderMark: {
							[MARKS.CODE]: (text) => (
								<pre>
									<code>{text}</code>
								</pre>
							),
						},
					})}
				</Typography>
			</article>
		</Grid>
	);
}
export default Main;
