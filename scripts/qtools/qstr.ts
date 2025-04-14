/**
 * Generates a 6-character unique identifier (suuid) consisting of random
 * upper and lower case letters and numbers.
 * Example: "nO57aL"
 */
export const generateSuuid = (): string => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let suuid = "";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		suuid += characters[randomIndex];
	}
	return suuid;
};

/**
 * Check if a string is empty.
 *
 * qstr.isEmpty('');
 *
 * true
 */
export const isEmpty = (line: string) => {
	if (line === undefined || line === null) {
		return true;
	}
	line = line.toString();
	return line.trim() === "";
};
