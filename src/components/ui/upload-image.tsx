import blankImage from "@/../public/assets/no-image.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { Button } from "./button";
import { Input } from "./input";

interface UploadImageProps {
	register: UseFormRegisterReturn<"image">;
}

export const UploadImage = ({ register }: UploadImageProps) => {
	const [displayImage, setDisplayImage] = useState<FileList | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	console.log(displayImage, "LOKI MEN");

	return (
		<div className="flex md:flex-row flex-col gap-3 justify-between items-center">
			<Image
				src={
					displayImage && displayImage.length > 0
						? URL.createObjectURL(displayImage[0])
						: blankImage
				}
				alt="no-image"
				width={520}
				height={520}
				className="w-72 h-56 object-cover rounded-md"
			/>
			<Button
				type="button"
				onClick={() => {
					if (inputRef && inputRef.current) inputRef.current.click();
				}}
				variant="outline"
				className="gap-3 py-2 px-6 text-blue-500 hover:text-blue-500">
				<FiUpload size={20} />
				Upload
			</Button>
			<Input
				id={register.name}
				type="file"
				className="hidden"
				{...register}
				ref={(e) => {
					register.ref(e);
					inputRef.current = e;
				}}
				onChange={(event) => {
					register.onChange(event);
					setDisplayImage(event.currentTarget.files);
				}}
			/>
		</div>
	);
};
