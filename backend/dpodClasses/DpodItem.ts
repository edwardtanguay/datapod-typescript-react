import { DpodItemDataSourceParser } from "./DpodItemDataSourceParser";
import { LineBlock } from "./LineBlock";
import * as qstr from "../../scripts/qtools/qstr";
import * as qdev from "../../scripts/qtools/qdev";

export class DpodItem {
	private lineBlock: LineBlock;
	private dpodItemDataSourceParser: DpodItemDataSourceParser;
	private singularSchemaIdCode: string;
	private schemaIdCode: string;

	constructor(
		lineBlock: LineBlock,
		dpodItemDataSourceParser: DpodItemDataSourceParser
	) {
		this.lineBlock = lineBlock;
		this.dpodItemDataSourceParser = dpodItemDataSourceParser;
		this.createSchemaCodes();
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
		r += qdev.log("singularSchemaIdCode: " + this.singularSchemaIdCode);
		r += qdev.log("schemaIdCode: " + this.schemaIdCode);
		r += this.lineBlock.debug();
		return r;
	}
}
