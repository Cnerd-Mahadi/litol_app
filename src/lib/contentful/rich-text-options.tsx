import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const textRenderOptions: Options = {
	renderMark: {
		[MARKS.BOLD]: (text) => <span className="font-medium">{text}</span>,
		[MARKS.CODE]: (text) => (
			<span className="bg-slate-800 text-white md:px-8 px-6 md:py-6 py-4 rounded-lg my-2 block overflow-x-auto whitespace-pre-wrap text-sm leading-8">
				{text}
			</span>
		),
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => (
			<div
				className={`${inter.className} text-slate-600 leading-8 md:leading-8 text-justify text-sm md:text-base font-medium`}>
				{children}
			</div>
		),
		[BLOCKS.HEADING_1]: (node, children) => (
			<h1
				className={`text-gray-700 ${inter.className} text-xl font-semibold leading-8 py-6`}>
				{children}
			</h1>
		),
		[INLINES.HYPERLINK]: (node, children) => {
			return (
				<a
					href={node.data.uri}
					className={`${inter.className} font-medium leading-8 underline text-blue-500`}>
					{children}
				</a>
			);
		},
	},
};
