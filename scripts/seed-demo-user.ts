import { auth } from "../src/lib/auth";
import { prisma } from "../src/prisma";

const DEMO_EMAIL = process.env.DEMO_EMAIL;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;

if (!DEMO_EMAIL || !DEMO_PASSWORD) {
	console.error("Missing DEMO_EMAIL or DEMO_PASSWORD in .env");
	process.exit(1);
}

async function main() {
	const existing = await prisma.user.findUnique({ where: { email: DEMO_EMAIL! } });

	if (existing) {
		await prisma.user.update({ where: { email: DEMO_EMAIL! }, data: { isDemo: true } });
		console.log("Demo user already exists, ensured isDemo=true:", existing.id);
		process.exit(0);
	}

	await auth.api.signUpEmail({
		body: {
			email: DEMO_EMAIL!,
			password: DEMO_PASSWORD!,
			name: "Demo User",
		},
	});

	const created = await prisma.user.findUnique({ where: { email: DEMO_EMAIL! } });
	if (created) {
		await prisma.user.update({ where: { id: created.id }, data: { isDemo: true } });
	}
	console.log("Demo user created:", created?.id);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
