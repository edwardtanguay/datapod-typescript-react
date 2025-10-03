import { DpodItemDataSourceParser } from "./DpodItemDataSourceParser";
import { LineBlock } from "./LineBlock";
import * as qstr from "../../scripts/qtools/qstr";
import * as qdev from "../../scripts/qtools/qdev";
import { DpodSchema } from "./DpodSchema";

export class DpodItem {
	private lineBlock: LineBlock;
	private dpodItemDataSourceParser: DpodItemDataSourceParser;
	private singularSchemaIdCode: string;
	private schemaIdCode: string;
	private dpodSchema!: DpodSchema;

	constructor(
		lineBlock: LineBlock,
		dpodItemDataSourceParser: DpodItemDataSourceParser
	) {
		this.lineBlock = lineBlock;
		this.dpodItemDataSourceParser = dpodItemDataSourceParser;
		this.createSchemaCodes();
		this.defineDpodSchema();
	}

	private defineDpodSchema() {
		console.log(111, this.dpodItemDataSourceParser.getDpodSchemas().length);
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
