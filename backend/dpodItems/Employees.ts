import { Employee } from "../types";
import * as qfil from "../../scripts/qtools/qfil";
import { DpodItemDataSourceParser } from "../dpodClasses/DpodItemDataSourceParser";

export class DpodEmployees {
	private jsonData: string = "";

	constructor() {
		this.parseDpodItemFile();
	}

	private parseDpodItemFile = () => {
		const content = qfil.getStringBlockFromFile(
			"./backend/dpodData/employees.dpodItems.txt"
		);
		const didsp = new DpodItemDataSourceParser(content);
		this.jsonData = didsp.getJsonData();
	};

	public getAsObjectArray = (): Employee[] => {
		return JSON.parse(this.jsonData) as Employee[];
	};
}
