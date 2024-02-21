import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Tailwind,
	Text,
} from "@react-email/components";

interface FeynmanInvitationProps {
	sender: string;
	receiver: string;
	topic: string;
	subject: string;
	time: string;
	invitation: string;
}

export default function FeynmanInvitation({
	sender,
	receiver,
	topic,
	subject,
	time,
	invitation,
}: FeynmanInvitationProps) {
	return (
		<Html>
			<Head />
			<Preview>Feynman Invitation</Preview>
			<Tailwind>
				<Body className="p-3 border-2 border-slate-300 max-w-fit rounded-lg mx-auto">
					<Container>
						<Img
							src="https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="classroom"
							className="w-full object-contain mb-10 rounded-lg"
						/>
					</Container>
					<Container className="mx-6 mb-24">
						<Heading
							as="h3"
							className="font-bold text-2xl text-center text-slate-800 pb-3">
							{`Greetings, ${receiver}!`}
						</Heading>
						<Heading
							as="h3"
							className="font-bold text-center text-slate-700 pb-6">
							{`You have an invitation for a feynman session from ${sender}`}
						</Heading>
						<Text className="text-slate-800 mb-4">
							<strong className="font-bold">Topic: </strong> {topic}
						</Text>
						<Text className="text-slate-800 mb-4">
							<strong className="font-bold">Subject: </strong> {subject}
						</Text>
						<Text className="text-slate-800 mb-4">
							<strong className="font-bold">Time: </strong> {time}
						</Text>
						<Text className="text-slate-800 mb-4">
							<strong className="font-bold">Meeting Link: </strong>
							<a href={invitation}>{invitation}</a>
						</Text>
						<Text className="text-slate-800 mb-4">
							You are cordially welcome to attend the session.
							<strong className="font-bold"> Thank you.</strong>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
