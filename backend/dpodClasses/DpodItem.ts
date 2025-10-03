import { DpodItemDataSourceParser } from "./DpodItemDataSourceParser";
import { LineBlock } from "./LineBlock";
import * as qstr from "../../scripts/qtools/qstr";
import * as qdat from "../../scripts/qtools/qdat";
import * as qdev from "../../scripts/qtools/qdev";
import { DpodSchema } from "./DpodSchema";
import { DpodSyntaxType } from "../types";
import { Factory } from "./Factory";
import * as config from "../config";
import { DataType } from "./DataType";

export class DpodItem {
	private lineBlock: LineBlock;
	private dpodItemDataSourceParser: DpodItemDataSourceParser;
	private singularSchemaIdCode: string;
	private schemaIdCode: string;
	private dpodSchema!: DpodSchema;
	private dataTypes: DataType[] = [];

	constructor(
		lineBlock: LineBlock,
		dpodItemDataSourceParser: DpodItemDataSourceParser
	) {
		this.lineBlock = lineBlock;
		this.dpodItemDataSourceParser = dpodItemDataSourceParser;
		this.createSchemaCodes();
		this.defineDpodSchema();
		this.createDataTypes();
	}

	private createDataTypes() {
		if (this.getSyntaxType() === "simple") {
			this.createDataTypesBasedOnSimpleSyntax();
		} else {
			this.createDataTypesBasedOnVerboseSyntax();
		}
	}

	private getDpodIdFromVerboseItem() {
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		const firstLine = fieldLines[0]; // "dpodId::7SaDSw"
		const parts = qstr.breakIntoParts(firstLine, "::");
		const dpodId = parts[1];
		return dpodId;
	}

	private getDpodWhenCreatedFromVerboseItem() {
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		const firstLine = fieldLines[1]; // "dpodWhenCreated::2024-07-21 23:32:20"
		const parts = qstr.breakIntoParts(firstLine, "::");
		const fieldIdCode = parts[0]; // dpodWhenCreated might not be present (during version upgrade), so this will be the first custom field
		let dpodWhenCreated = "";
		if (fieldIdCode !== "dpodWhenCreated") {
			dpodWhenCreated = qdat.getCurrentIsoDateTime(); // dpodWhenCreated is not present, so give it a timestamp
		} else {
			dpodWhenCreated = parts[1]; // dpodWhenCreated is already present
		}
		return dpodWhenCreated;
	}

	private removeSystemFieldsFromFieldLinesAndStripPrefixes(
		fieldLines: string[]
	): string[] {
		const newFieldLines: string[] = [];
		for (const fieldLine of fieldLines) {
			if (
				!fieldLine.startsWith("dpodId::") &&
				!fieldLine.startsWith("dpodWhenCreated::")
			) {
				const parts = qstr.breakIntoParts(fieldLine, "::");
				if (parts.length !== 2) {
					newFieldLines.push(fieldLine);
				} else {
					const value = parts[1];
					newFieldLines.push(value);
				}
			}
		}
		return newFieldLines;
	}

	private createDataTypesBasedOnVerboseSyntax() {
		const _dataTypes = this.dpodSchema.getDataTypes();
		let fieldLines = this.lineBlock.getAllLinesButFirst();
		const dpodId = this.getDpodIdFromVerboseItem();
		const dpodWhenCreated = this.getDpodWhenCreatedFromVerboseItem();
		fieldLines =
			this.removeSystemFieldsFromFieldLinesAndStripPrefixes(fieldLines);
		if (this.dpodSchema) {
			let index = -2;
			for (const _dataType of _dataTypes) {
				const creationLine =
					_dataType.getLabel() + ";" + _dataType.getDataTypeIdCode();
				const __dataType = Factory.instantiateDataType(creationLine);
				if (index >= 0) {
					let fieldLine = fieldLines[index];
					if (fieldLine) {
						if (fieldLine.endsWith("[[")) {
							let innerContent = "";
							let innerFieldLine = "";
							while (innerFieldLine !== "]]") {
								innerContent += innerFieldLine + "\n";
								index++;
								innerFieldLine = fieldLines[index];
							}
							fieldLine = innerContent.trim();
						}
						if (fieldLine === config.blankLineMarker()) {
							__dataType.setValue("");
						} else {
							__dataType.setValue(fieldLine);
						}
					} else {
						// console.log('ERROR: fieldLine is empty in DpodItem.ts');
						// this is intentional, i.e. blank line at end of item
					}
				} else if (index === -2) {
					__dataType.setValue(dpodId);
				} else {
					__dataType.setValue(dpodWhenCreated);
				}
				this.dataTypes.push(__dataType);
				index++;
			}
		}
	}

	private createDataTypesBasedOnSimpleSyntax() {
		const _dataTypes = this.dpodSchema.getDataTypes();
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		if (this.dpodSchema) {
			let index = -2;
			for (const _dataType of _dataTypes) {
				const creationLine =
					_dataType.getLabel() + ";" + _dataType.getDataTypeIdCode();
				const __dataType = Factory.instantiateDataType(creationLine);
				if (index >= 0) {
					let fieldLine = fieldLines[index];
					if (fieldLine) {
						if (fieldLine.endsWith("[[")) {
							let innerContent = "";
							let innerFieldLine = "";
							while (innerFieldLine !== "]]") {
								innerContent += innerFieldLine + "\n";
								index++;
								innerFieldLine = fieldLines[index];
							}
							fieldLine = innerContent.trim();
						}
						if (fieldLine === config.blankLineMarker()) {
							__dataType.setValue("");
						} else {
							__dataType.setValue(fieldLine);
						}
					}
				} else if (index === -2) {
					__dataType.setValue(qstr.generateSuuid());
				} else {
					__dataType.setValue(qdat.getCurrentIsoDateTime());
				}
				this.dataTypes.push(__dataType);
				index++;
			}
		}
	}

	private getSyntaxType(): DpodSyntaxType {
		const fieldLines = this.lineBlock.getAllLinesButFirst();
		const firstLine = fieldLines[0];
		if (firstLine) {
			if (firstLine.startsWith("dpodId::")) {
				return "verbose";
			} else {
				return "simple";
			}
		} else {
			return "simple";
		}
	}

	private defineDpodSchema() {
		for (const dpodSchema of this.dpodItemDataSourceParser.getDpodSchemas()) {
			if (dpodSchema.getIdCode() === this.schemaIdCode) {
				this.dpodSchema = dpodSchema;
			}
		}
	}
	private createSchemaCodes() {
		this.singularSchemaIdCode = qstr
			.chopLeft(this.lineBlock.getFirstLine(), "==")
			.trim();
		this.schemaIdCode = qstr.forceCamelNotation(
			qstr.forcePlural(this.singularSchemaIdCode)
		);
	}

	debug() {
		let r = "";
		r += qdev.log(">>> " + this.singularSchemaIdCode);
		// r += qdev.log("schemaIdCode: " + this.schemaIdCode);
		// r += this.lineBlock.debug();
		r += this.dpodSchema.debug();
		r += qdev.log(`LINES: ${this.lineBlock.getNumberOfLines()}`);
		r += qdev.log();
		return r;
	}
}
