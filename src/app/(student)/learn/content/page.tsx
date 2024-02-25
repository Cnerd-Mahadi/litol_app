import { getContent, getTopics } from "@/actions/learn";
import { Learn } from "@/components/layout/learn";
import { TopicCardSidebar } from "@/components/layout/learn/topic-card-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentParams } from "@/types";

export const dynamic = "force-dynamic";

export default async function ContentPage({ searchParams }: ContentParams) {
	const contentId = searchParams.topicId;
	const subjectId = searchParams.subjectId;
	const content = await getContent(contentId);
	const topics = await getTopics(subjectId);
	console.log(contentId);
	return (
		<main className="flex flex-row justify-between h-screen">
			<ScrollArea className="h-full w-full px-6">
				<Learn
					id={contentId}
					title={content.title}
					published={content.sys.publishedAt}
					author={content.authorRef.name}
					authorImage={content.authorRef.authorImage.url}
					image={content.image.url}
					subject={content.subjectRef.name}
					details={content.details.json}
					useful={content.usefulLinks.json}
				/>
			</ScrollArea>
			<ScrollArea className="h-screen w-full hidden md:block pr-4 pl-3 py-8 max-w-72">
				<h4 className="text-center text-slate-500 font-semibold pb-6">
					See Recent Contents
				</h4>
				{topics.map((item) => (
					<TopicCardSidebar
						key={item.sys.id}
						id={item.sys.id}
						subjectId={item.subjectRef.sys.id}
						subject={item.subjectRef.name}
						title={item.title}
						image={item.image.url}
					/>
				))}
			</ScrollArea>
		</main>
	);
}
