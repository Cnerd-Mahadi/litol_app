import summaryImage from "@/../public/assets/summary.png";
import Image from "next/image";
import { SummaryForm } from "./summary-form";

export const CreateSummary = () => {
	return (
		<section>
			<Image src={summaryImage} alt="summary-pic" className="w-60 mx-auto" />
			<h2 className="text-2xl font-semibold text-slate-600 text-center">
				Create New Summary
			</h2>
			<div className="mx-auto max-w-lg pt-8 pb-40">
				<SummaryForm />
			</div>
		</section>
	);
};
