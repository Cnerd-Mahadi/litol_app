import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { AppError, DbError, ExternalServerError } from "./errors";
import { logger } from "./logger";
import { generalLimiter, aiLimiter, checkRateLimit } from "./lib/rate-limit";

export const actionClient = createSafeActionClient({
	handleServerError(error) {
		if (error instanceof AppError || error instanceof DbError || error instanceof ExternalServerError) {
			logger.error(`[${error.label}] ${error.message}`, { cause: error.cause });
			return error.clientMessage;
		}

		logger.error(`[UNHANDLED_ERROR] ${error.message}`, { cause: error });
		return "Something went wrong";
	},
}).use(async ({ next }) => {
	const headersList = await headers();
	const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
	await checkRateLimit(generalLimiter, ip);
	return next();
});

export const authActionClient = actionClient.use(async ({ next }) => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		throw new AppError("Not authenticated");
	}

	const isDemo = session.user.isDemo ?? false;
	return next({ ctx: { user: session.user, session: session.session, isDemo } });
});

export const aiActionClient = authActionClient.use(async ({ next, ctx }) => {
	const headersList = await headers();
	const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
	const identifier = ctx.isDemo ? `demo:${ip}` : ctx.user.id;
	await checkRateLimit(aiLimiter, identifier);
	return next({ ctx });
});

export const demoAuthActionClient = authActionClient.use(async ({ next, ctx }) => {
	if (ctx.isDemo) throw new AppError("Not available in demo mode.");
	return next({ ctx });
});

export const demoAiActionClient = aiActionClient.use(async ({ next, ctx }) => {
	if (ctx.isDemo) throw new AppError("Not available in demo mode.");
	return next({ ctx });
});
