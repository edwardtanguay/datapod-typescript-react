import { DpodParserCore } from "./DpodParserCore";
import * as qstr from "../../scripts/qtools/qstr";

export class DpodParser extends DpodParserCore {

	constructor(content: string) {
		super();
		this.content = content;
		this.createLines();
	}

	private createLines() {
		this.lines = qstr.convertStringBlockToLines(this.content, false);
	}

	public debug() {
		this.debugShowLines();
	}
}
