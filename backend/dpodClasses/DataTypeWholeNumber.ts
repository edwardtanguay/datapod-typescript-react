import { DataType } from "./DataType";
import * as qstr from "../../scripts/qtools/qstr";

export class DataTypeWholeNumber extends DataType {
	constructor(idCode: string) {
		super(idCode);
		this.dataTypeIdCode = "wholeNumber";
		this.abbreviatedDataTypeIdCode = "wn";
	}

	public getJsonDataLine() {
		return `\t"${this.idCode}": ${this.getTextValue()}`;
	}

	public getTextValue(): string {
		if (qstr.isEmpty(this.value)) {
			return this.getDefaultValue().toString();
		} else {
			return this.value;
		}
	}

	protected getDefaultValue() {
		return 0;
	}
}
