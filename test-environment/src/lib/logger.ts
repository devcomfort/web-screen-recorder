import pino from "pino";

// NOTE: https://github.com/pinojs/pino/blob/main/docs/pretty.md
const logger = pino({
	browser: {
		asObject: true,
	},
	transport: {
		target: "pino-pretty",
	},
});

export default logger;
