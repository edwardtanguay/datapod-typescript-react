import * as fs from "fs";
import * as qcli from "./qcli";

/**
 * Reads a file and returns its lines as an array of strings.
 *
 * const lines = qfil.getLinesFromFile('../data/flashcards.txt');
 */
export const getLinesFromFile = (filePath: string): string[] => {
	try {
		const fileContent = fs.readFileSync(filePath, "utf-8");
		return fileContent.split(/\r?\n/);
	} catch (error) {
		console.error(`Error reading file at ${filePath}:`, error);
		return [];
	}
};

// function that returns the content of a file
export const getStringBlockFromFile = (filePath: string): string => {
	try {
		const fileContent = fs.readFileSync(filePath, "utf-8");
		return fileContent;
	} catch (error) {
		console.error(`Error reading file at ${filePath}:`, error);
		return "";
	}
};

export default getLinesFromFile;

/**
 * Gets all files from a directory one level deep.
 *
 * const files = qfil.getFilesFromDirectoryOneLevel('../data/');
 */
export const getPathAndFileNamesFromDirectoryOneLevel = (
	directoryPath: string
): string[] => {
	try {
		const files = fs.readdirSync(directoryPath);
		return files
			.filter((file) => fs.statSync(`${directoryPath}/${file}`).isFile())
			.map((file) => `${directoryPath}/${file}`);
	} catch (error) {
		console.error(`Error reading directory at ${directoryPath}:`, error);
		return [];
	}
};

/**
 * e.g. D:\\
 */
export const getPathAndFileNamesFromAbsoluteDirectoryOneLevel = (
	directoryPath: string
): string[] => {
	try {
		const files = fs.readdirSync(directoryPath);
		return files
			.filter((file) => fs.statSync(`${directoryPath}/${file}`).isFile())
			.map((file) => `${directoryPath}/${file}`);
	} catch (error) {
		console.error(`Error reading directory at ${directoryPath}:`, error);
		return [];
	}
};

/**
 * Gets all files as string array from an an absolute directory
 *
 * const pathAndFileNames = qfil.getFileNamesFromAbsoluteDirectory("D:\\large\\running_pics")
 */
export const getFileNamesFromAbsoluteDirectory = (
	directoryPath: string
): string[] => {
	try {
		const dirents = fs.readdirSync(directoryPath, { withFileTypes: true });
		const fileNames: string[] = [];
		for (const dirent of dirents) {
			if (["DumpStack.log.tmp", "pagefile.sys"].includes(dirent.name))
				continue;
			if (dirent.isFile()) {
				fileNames.push(dirent.name);
			}
		}
		return fileNames;
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
};

/**
 * Gets all directories as string array from an absolute directory
 *
 * const directoryNames = getDirectoriesFromAbsoluteDirectory("D:\\large\\running_pics")
 */
export const getDirectoriesFromAbsoluteDirectory = (
	directoryPath: string
): string[] => {
	try {
		const dirents = fs.readdirSync(directoryPath, { withFileTypes: true });
		const directoryNames: string[] = [];
		for (const dirent of dirents) {
			if (["DumpStack.log.tmp", "pagefile.sys"].includes(dirent.name))
				continue;
			if (dirent.isDirectory()) {
				directoryNames.push(dirent.name);
			}
		}
		return directoryNames;
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
};

/**
 * Saves a string array to a JSON file.
 *
 * qfil.saveStringArrayToJsonFile(runDirectoryNames, "../../parseddata/runs.json");
 */
export const saveStringArrayToJsonFile = (
	str: string[],
	jsonFileName: string
): void => {
	try {
		const jsonData = JSON.stringify(str, null, 2);
		fs.writeFileSync(jsonFileName, jsonData, "utf-8");
		qcli.message(
			`Successfully saved ${str.length} strings to ${jsonFileName}`,
			"success"
		);
	} catch (error) {
		qcli.message(
			`Error saving strings to ${jsonFileName}: ${error.message}`,
			"error"
		);
	}
};

/**
 * Saves an array of objects to a JSON file.
 *
 * @param objects - The array of objects to save.
 * @param jsonFileName - The name of the JSON file to write to.
 */
export const saveArrayOfObjectsToJsonFile = (
	objects: unknown[],
	jsonFileName: string
): void => {
	try {
		const jsonData = JSON.stringify(objects, null, 2);
		fs.writeFileSync(jsonFileName, jsonData, "utf-8");
		qcli.message(
			`Successfully saved ${objects.length} objects to ${jsonFileName}`,
			"success"
		);
	} catch (error) {
		qcli.message(
			`Error saving objects to ${jsonFileName}: ${error.message}`,
			"error"
		);
	}
};

// if file is the same as the content, don't write
export const writeToFile = (pathAndFileName: string, content: string): void => {
	try {
		const existingContent = fs.readFileSync(pathAndFileName, "utf-8");
		if (existingContent === content) {
			qcli.message(
				`File ${pathAndFileName} is already up-to-date`,
				"info"
			);
			return;
		}
	} catch (error) {
		// if file doesn't exist, it's fine
	}
	fs.writeFile(pathAndFileName, content, (err) => {
		if (err) {
			console.error("Error writing to file:", err);
		} else {
			qcli.message(
				`Successfully saved ${content.length} characters to ${pathAndFileName}`,
				"success"
			);
		}
	});
};
