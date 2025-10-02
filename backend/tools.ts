import fs from "fs";

export function readJsonFile(pathAndFileName: string): unknown {
	if (!fs.existsSync(pathAndFileName)) {
		return null;
	}
	const jsonData = fs.readFileSync(pathAndFileName, "utf-8");
	return JSON.parse(jsonData);
}
