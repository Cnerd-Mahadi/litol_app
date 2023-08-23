import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FeynmanCard } from "src/components/cards/FeynmanCard";
import { FormHead } from "src/components/layouts/FormHead";
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

	return (
		<>
			<Container component="main" maxWidth="md">
				<FormHead icon={images.feynman} title="Feynman Gallery" />
				<Grid item xs={12}>
					{isLoading ? (
						<Loading />
					) : response.data.length ? (
						response.data.map((item) => {
							return (
								<FeynmanCard key={item.id} id={item.id} data={item.data} />
							);
						})
					) : (
						<NotAvailable contentType="feynman request" />
					)}
				</Grid>
			</Container>
		</>
	);
};
