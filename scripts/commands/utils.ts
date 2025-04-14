import * as qcli from "../qtools/qcli";
import * as fs from "fs";
import { Flashcard } from "../types";

/**
 * Saves an array of Flashcard objects to a JSON file.
 *
 * @param flashcards - The array of Flashcard objects to save.
 * @param jsonFileName - The name of the JSON file to write to.
 */
export const saveFlashcardsToJson = (
	flashcards: Flashcard[],
	jsonFileName: string
): void => {
	try {
		const jsonData = JSON.stringify(flashcards, null, 2);
		fs.writeFileSync(jsonFileName, jsonData, "utf-8");
		qcli.message(
			`Successfully saved ${flashcards.length} flashcards to ${jsonFileName}`,
			"success"
		);
	} catch (error) {
		qcli.message(
			`Error saving flashcards to ${jsonFileName}: ${error.message}`,
			"error"
		);
	}
};