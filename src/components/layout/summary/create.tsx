import summaryImage from "@/../public/assets/summary.png";
import Image from "next/image";
import { SummaryForm } from "./summary-form";

export const CreateSummary = () => {
	return (
		<section>
			<Image src={summaryImage} alt="summary-pic" className="mx-auto w-60" />
			<h2 className="font-semibold text-slate-600 text-2xl text-center">
				Create New Summary
			</h2>
			<div className="mx-auto pt-8 pb-40 max-w-lg">
				<SummaryForm />
			</div>
		</section>
	);
};
