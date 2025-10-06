import { Employee } from "../types";
import * as qfil from "../../scripts/qtools/qfil";
import { DpodItemDataSourceParser } from "../dpodClasses/DpodItemDataSourceParser";

export class DpodEmployees {
	private jsonData: string = "";

	constructor() {
		this.parseDpodItemFile();

	}

	parseDpodItemFile = () => {
		const content = qfil.getStringBlockFromFile(
			"./backend/dpodData/employees.dpodItems.txt"
		);
		const didsp = new DpodItemDataSourceParser(content);
		this.jsonData = didsp.getJsonData();
		console.log(111, this.jsonData);
	};

	getAsObjectArray = (): Employee[] => {
		return JSON.parse(this.jsonData);
	};
}
