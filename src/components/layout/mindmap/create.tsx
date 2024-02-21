import mindmapImage from "@/../public/assets/mindmap.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const CreateMindMap = () => {
	return (
		<section>
			<Image
				src={mindmapImage}
				alt="mindmap-pic"
				className="w-60 mx-auto mt-8"
			/>
			<div className="mx-auto max-w-lg pt-16 flex flex-row justify-center">
				<Button asChild className="px-16">
					<Link
						href={{
							pathname: `/mindmap/board`,
						}}>
						Create New MindMap
					</Link>
				</Button>
			</div>
		</section>
	);
};
