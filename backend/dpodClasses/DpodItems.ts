import * as qfil from "../../scripts/qtools/qfil";
import { DpodItemDataSourceParser } from "./DpodItemDataSourceParser";

export class DpodItems {
	private itemTypeIdCode = "";
	private jsonData: string = "";

	constructor(itemTypeIdCode: string) {
		this.itemTypeIdCode = itemTypeIdCode;
		this.parseDpodItemFile();
	}

	private parseDpodItemFile = () => {
		const content = qfil.getStringBlockFromFile(
			`./backend/dpodData/${this.itemTypeIdCode}.dpodItems.txt`
		);
		const didsp = new DpodItemDataSourceParser(content);
		this.jsonData = didsp.getJsonData();
	};

	public getAsObjectArray = () => {
		return JSON.parse(this.jsonData);
	};
}
