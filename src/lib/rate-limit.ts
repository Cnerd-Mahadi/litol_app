import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { AppError } from "../errors";

const redis = Redis.fromEnv();

export const generalLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(30, "1 m"),
	prefix: "rl:general",
});

export const aiLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(10, "1 h"),
	prefix: "rl:ai",
});

export async function checkRateLimit(limiter: Ratelimit, identifier: string) {
	try {
		const { success } = await limiter.limit(identifier);
		if (!success)
			throw new AppError("Too many requests. Please try again later.");
	} catch (error) {
		if (error instanceof AppError) throw error;
	}
}
