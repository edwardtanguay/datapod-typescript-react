import { Employee } from "../types";
import * as qfil from "../../scripts/qtools/qfil";
import { DpodItemDataSourceParser } from "../dpodClasses/DpodItemDataSourceParser";

export class DpodEmployees {
	constructor() {
		this.parseDpodItemFile();
	}

	parseDpodItemFile = () => {
		const content = qfil.getStringBlockFromFile(
			"./backend/dpodData/employees.dpodItem.txt"
		);
		const didsp = new DpodItemDataSourceParser(content);
		console.log(didsp.debug());
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
