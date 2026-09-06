import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "../env";
import { prisma } from "../prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	baseURL: env.BETTER_AUTH_URL,
	emailAndPassword: { enabled: true },
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	user: {
		additionalFields: {
			isDemo: {
				type: "boolean",
				defaultValue: false,
			},
		},
	},
});
