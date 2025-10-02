import { DpodParserCore } from "./DpodParserCore";
import * as qstr from "../../scripts/qtools/qstr";
import { LineBlock } from "./LineBlock";

export class DpodParser extends DpodParserCore {
	constructor(content: string) {
		super();
		this.content = content;
		this.createLines();
		this.createLineBlocks();
	}

	private createLines() {
		this.lines = qstr.convertStringBlockToLines(this.content, false);
	}

	private createLineBlocks() {
		let lineBlock = new LineBlock();
		let isRecordingLineBlock = false;
		let isInsideMultilineBlock = false;
		for (const line of this.lines) {
			// don't let a blank line inside a multiline block end the item
			if (isInsideMultilineBlock && qstr.isEmpty(line)) {
				lineBlock.addLine(line);
				continue;
			}

			// ignore multiline begin and end markers
			if (line.endsWith("[[") || line.endsWith("]]")) {
				if (line.endsWith("[[")) {
					isInsideMultilineBlock = true;
				}
				if (line === "]]") {
					isInsideMultilineBlock = false;
				}
				lineBlock.addLine(line);
				continue;
			}

			// ignore empty lines in file
			if (!isRecordingLineBlock && qstr.isEmpty(line)) {
				continue;
			}

			// we need to start recording a line block again
			if (!isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock = new LineBlock();
				isRecordingLineBlock = true;
			}

			// we are recording a line block and we need to add the current line
			if (isRecordingLineBlock && !qstr.isEmpty(line)) {
				lineBlock.addLine(line);
			}

			// we need to finish recording a line block
			if (isRecordingLineBlock && qstr.isEmpty(line)) {
				this.lineBlocks.push(lineBlock);
				isRecordingLineBlock = false;
			}
		}

		// record last one
		if (isRecordingLineBlock) {
			this.lineBlocks.push(lineBlock);
		}
	}

	public debug() {
		let r = "";
		// r += this.debugShowLines();
		r += this.debugShowLineBlocks();
		return r;
	}
}
