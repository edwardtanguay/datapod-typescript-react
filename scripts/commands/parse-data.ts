import * as qfil from "../qtools/qfil";
import * as qcli from "../qtools/qcli";
import * as qstr from "../qtools/qstr";
import * as utils from "./utils";
import { Flashcard } from "../types";

const lines = qfil.getLinesFromFile("../../data/flashcards.txt");
qcli.message(`Read ${lines.length} lines from flashcards.txt`);

const flashcards: Flashcard[] = [];
for (let i = 0; i < lines.length; i += 4) {
	const suuid = qstr.generateSuuid();
	const category = lines[i]?.trim() || "";
	const front = lines[i + 1]?.trim() || "";
	const back = lines[i + 2]?.trim() || "";

	if (category && front && back) {
		flashcards.push({ suuid, category, front, back });
	} else {
		qcli.message(
			`Skipping incomplete flashcard at lines ${i + 1}-${i + 3}`,
			"warning"
		);
	}
}

qcli.message(`Generated ${lines.length} flashcards`);
utils.saveFlashcardsToJson(flashcards, "../../parseddata/flashcards.json");
qcli.message(`Wrorte ${flashcards.length} flashcards to flashcards.json`);
