import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

interface NoteCuesProps {
	cues: {
		id: string;
		key: string;
		details: string;
	}[];
}

export const NoteCues = ({ cues }: NoteCuesProps) => {
	return (
		<Accordion type="single" collapsible className="w-full">
			{cues.map((item) => (
				<AccordionItem
					key={item.id}
					value={item.id}
					className="border-[3px] border-slate-200 px-4 rounded-md  mb-3">
					<AccordionTrigger className="text-sm text-blue-500 font-semibold">
						<div className="flex flex-row gap-2 items-center">
							<DrawingPinFilledIcon className="w-6 mt-1" />
							{item.key}
						</div>
					</AccordionTrigger>
					<AccordionContent className="text-sm text-slate-500 font-semibold">
						{item.details}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};
