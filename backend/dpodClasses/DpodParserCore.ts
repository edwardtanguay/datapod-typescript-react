import { LineBlock } from "./LineBlock";

export class DpodParserCore {
	protected content = "";
	protected lines: string[] = [];
	protected lineBlocks: LineBlock[] = [];

	private debugSeparator(title: string) {
		const separatorLine =
			"==== " +
			title.toUpperCase() +
			" =============================================";
		return separatorLine.substring(0, 50);
	}

	protected debugShowLines() {
		let r = "";
		r += this.debugSeparator("lines") + "\n";
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			r += (i + 1).toString().padStart(3, "0") + "| " + line + "\n";
		}
		return r;
	}

	protected debugShowLineBlocks() {
		let r = "";
		r += this.debugSeparator("lineBlocks") + "\n";
		for (const lineBlock of this.lineBlocks) {
			r += lineBlock.debug() + "\n";
		}
		return r;
	}
}
