import dayjs from "dayjs";

export function getNiceDate(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return date.toLocaleDateString("en-US", options);
}

export const getCurrentIsoDateTime = (): string => {
	return dayjs().format("YYYY-MM-DD HH:mm:ss");
};
