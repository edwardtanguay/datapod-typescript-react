import { DataType } from "./DataType.js";
import * as qstr from "../../scripts/qtools/qstr";

export class DataTypeUnknown extends DataType {

	protected dataTypeIdCode = 'UNKNOWN';
	private attemptedDataTypeIdCode = '';

	constructor(idCode: string, attemptedDataTypeIdCode: string) {
		super(idCode);
		this.attemptedDataTypeIdCode = attemptedDataTypeIdCode;
	}

	public getDataItem() {
		return {
			label: qstr.forceTitleNotation(this.idCode),
			idCode: this.idCode,
			dataTypeIdCode: this.dataTypeIdCode + `(${this.attemptedDataTypeIdCode})`,
			value: ''
		}
	}
}