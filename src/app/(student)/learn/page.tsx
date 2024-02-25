import { getSubjects } from "@/actions/learn";
import { SubjectCard } from "@/components/layout/learn/subject-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function LearnPage() {
	const subjects = await getSubjects();
	return (
		<ScrollArea className="h-screen">
			<main className="py-8 pb-28 px-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 h-screen items-start">
				{subjects.map((item, index) => (
					<SubjectCard
						key={item.sys.id}
						id={item.sys.id}
						subject={item.name}
						image={item.image.url}
					/>
				))}
			</main>
		</ScrollArea>
	);
}
