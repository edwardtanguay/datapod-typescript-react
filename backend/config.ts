import dotenv from "dotenv";

dotenv.config();

export const getPort = () => {
	return process.env.VITE_API_PORT ? Number(process.env.VITE_API_PORT) : 9999;
};

export const getToken = () => {
	return process.env.VITE_API_TOKEN || "";
};

export const systemDataTypeIdCodes = (): string[] => {
	return ["dpodId", "dpodWhenCreated"];
};

export const blankLineMarker = (): string => {
	return "nn";
};

export const importDirectory = (): string => {
	return "backend/dpodData";
};
