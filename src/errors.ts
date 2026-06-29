abstract class BaseError extends Error {
	readonly label: string;
	readonly clientMessage: string;
	readonly cause?: unknown;

	constructor(
		label: string,
		message: string,
		clientMessage: string,
		cause?: unknown,
	) {
		super(message);
		this.name = this.constructor.name;
		this.label = label;
		this.clientMessage = clientMessage;
		this.cause = cause;
	}
}

export class DbError extends BaseError {
	constructor(message: string, cause?: unknown) {
		super("DB_ERROR", message, "Something went wrong", cause);
	}
}

export class ExternalServerError extends BaseError {
	constructor(message: string, cause?: unknown) {
		super("EXTERNAL_SERVER_ERROR", message, "Something went wrong", cause);
	}
}

export class AppError extends BaseError {
	constructor(message: string, cause?: unknown) {
		super("APP_ERROR", message, message, cause);
	}
}
