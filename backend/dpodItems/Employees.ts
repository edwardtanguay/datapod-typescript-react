import { Employee } from "../types";
import * as qfil from "../../scripts/qtools/qfil";
import { DpodParser } from "../dpodClasses/DpodParser";

export class DpodEmployees {
	constructor() {
		this.parseDpodItemFile();
	}

	parseDpodItemFile = () => {
		const content = qfil.getStringBlockFromFile(
			"./backend/dpodData/employees.dpodItem.txt"
		);
		const dpodParser = new DpodParser(content);
		console.log(dpodParser.debug());
	};

	getAsObjectArray = (): Employee[] => {
		return [
			{
				id: 1,
				firstName: "Gregor",
				lastName: "Mittelwald",
				age: 30,
			},
			{
				id: 2,
				firstName: "Walter",
				lastName: "Skowonrek",
				age: 35,
			},
			{
				id: 3,
				firstName: "Renee",
				lastName: "Dpodette",
				age: 35,
			},
		];
	};
}
