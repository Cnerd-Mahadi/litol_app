import { getTopics } from "@/actions/learn";
import { TopicCard } from "@/components/layout/learn/topic-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blurImage } from "@/lib/plaiceholder";
import { TopicParams } from "@/types";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }: TopicParams) {
	const subjectId = params.topic;
	const topics = await getTopics(subjectId);
	const blurs = await Promise.all(
		topics.map((item) => blurImage(item.image.url))
	);
	return (
		<ScrollArea className="h-screen">
			<main className="py-8 pb-28 px-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 h-screen items-start">
				{topics.map((item, index) => (
					<TopicCard
						key={item.sys.id}
						id={item.sys.id}
						subjectId={item.subjectRef.sys.id}
						subject={item.subjectRef.name}
						title={item.title}
						image={item.image.url}
						blur={blurs[index]!}
					/>
				))}
			</main>
		</ScrollArea>
	);
}
