// qdev = quick tools to make development easier

/**
 * prints a debug line with timestamp
 *
 * 2025-04-14 18:18:06 ### was here ##############
 */
export const debug = (obj: unknown): void => {
	const now = new Date();
	const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

	if (typeof obj === "string") {
		console.log(`${timestamp} ### ${obj} #########`);
	} else {
		console.log(obj);
	}
};

/**
 * prints a debug line with timestamp
 *
 * 2025-04-14 18:18:06|was here
 */
export const log = (line: string = ""): string => {
	const now = new Date();
	const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
	return `${timestamp}|${line}\n`;
};
