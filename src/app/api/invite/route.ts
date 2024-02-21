import FeynmanInvitation from "@/components/layout/feynman/feynman-invitation";
import { InvitationType } from "@/types";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	const params: InvitationType = await request.json();
	try {
		await Promise.all(
			params.receivers.map(async (item) => {
				const html = render(
					FeynmanInvitation({
						sender: params.sender,
						receiver: item.name,
						topic: params.topic,
						subject: params.subject,
						time: params.time,
						invitation: params.link,
					}),
					{
						pretty: true,
					}
				);

				await transporter.sendMail({
					from: '"LITOL APP" litol@app',
					to: `"${item.name}" ${item.email}`,
					subject: "Feynman Invitation from LITOL APP",
					html: html,
				});
			})
		);

		return Response.json({
			success: true,
			message: "Invitations are sent successfully",
		});
	} catch (error) {
		throw new Error("Sorry! Couldnt send the invitations", { cause: error });
	}
}
