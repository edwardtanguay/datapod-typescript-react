/* eslint-disable @typescript-eslint/no-explicit-any */
import * as qstr from "../../scripts/qtools/qstr";

export class DataType {
	protected idCode = "";
	protected label = "";
	protected dataTypeIdCode = "";
	protected abbreviatedDataTypeIdCode = "";
	public value = "";

	constructor(label: string) {
		this.label = label;
		this.idCode = qstr.forceCamelNotation(this.label);
		this.dataTypeIdCode = "BASETYPE";
	}

	public getDataTypeIdCode() {
		return this.dataTypeIdCode;
	}

	public debugSimpleInfo() {
		if (
			this.getIdCode() === "dpodId" ||
			this.getIdCode() === "dpodWhenCreated"
		) {
			return this.idCode;
		} else {
			return `${this.idCode} (${this.dataTypeIdCode})`;
		}
	}

	public getIdCode() {
		return this.idCode;
	}

	public getValue() {
		return this.value;
	}

	public getLabel() {
		return this.label;
	}

	public getTextValue() {
		return this.value ? this.value : "";
	}

	public getJsonDataLine() {
		// return `\t"${this.idCode}": "${this.getTextValue()}"`;
		let theValue = this.getTextValue();
		theValue = qstr.replaceAll(theValue, "\t", "\\t");
		theValue = qstr.replaceAll(theValue, '"', '\\"');
		return `\t"${this.idCode}": "${theValue}"`;
	}

	public getDatapodDataLine() {
		return `${this.idCode}::${this.getTextValue()}`;
	}

	public getDataItem() {
		return {
			label: qstr.forceTitleNotation(this.idCode),
			idCode: this.idCode,
			dataTypeIdCode: this.dataTypeIdCode,
			value: this.value,
		};
	}

	public setValue(value: string) {
		this.value = value;
	}

	private getAbbreviatedDataTypeIdCode() {
		return this.abbreviatedDataTypeIdCode === ""
			? this.dataTypeIdCode
			: this.abbreviatedDataTypeIdCode;
	}

	public getSchemaLine() {
		const suffix =
			this.dataTypeIdCode !== "line"
				? `;${this.getAbbreviatedDataTypeIdCode()}`
				: "";
		return qstr.forceTitleNotation(this.idCode) + suffix;
	}

	public forceDefaultValue() {
		if (this.value === undefined) {
			this.value = this.getDefaultValue();
		}
	}

	protected getDefaultValue(): any {
		return "";
	}

	public debug() {
		let r = "";
		r += `${this.idCode} (${this.dataTypeIdCode})`;
		return r;
	}
}
