import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { AppError, DbError, ExternalServerError } from "./errors";
import { logger } from "./logger";

export const actionClient = createSafeActionClient({
	handleServerError(error) {
		if (error instanceof AppError || error instanceof DbError || error instanceof ExternalServerError) {
			logger.error(`[${error.label}] ${error.message}`, { cause: error.cause });
			return error.clientMessage;
		}

		logger.error(`[UNHANDLED_ERROR] ${error.message}`, { cause: error });
		return "Something went wrong";
	},
});

export const authActionClient = actionClient.use(async ({ next }) => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		throw new AppError("Not authenticated");
	}

	return next({ ctx: { user: session.user, session: session.session } });
});
