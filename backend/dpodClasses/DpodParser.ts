import * as qstr from "../../scripts/qtools/qstr";

export class DpodParser {
	private content = "";
	private lines: string[] = [];

	constructor(content: string) {
		this.content = content;
		this.createLines();
	}

	private createLines() {
		this.lines = qstr.convertStringBlockToLines(this.content, false);
	}

	private debugSeparator(title: string) {
		const separatorLine =
			"==== " +
			title.toUpperCase() +
			" =============================================";
		return separatorLine.substring(0, 50);
	}

	public debug() {
		console.log(this.debugSeparator("lines"));
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			console.log(i + ": " + line);
		}
	}
}
