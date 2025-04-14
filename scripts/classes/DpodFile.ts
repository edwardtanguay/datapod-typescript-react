//dpod
import * as qfil from "../qtools/qfil";
import * as qstr from "../qtools/qstr";
import { DpodLineBlock } from "./DpodLineBlock";

export class DpodFile {
	private pathAndFileName: string;
	private lines: string[] = [];
	public dpodLineBlocks: DpodLineBlock[] = [];

	constructor(pathAndFileName: string) {
		this.pathAndFileName = pathAndFileName;
		this.lines = qfil.getLinesFromFile(this.pathAndFileName);
		this.createLineBlocks();
	}

	private createLineBlocks() {
		let dpodLineBlock = new DpodLineBlock();
		let isRecordingLineBlock = false;
		let isInsideMultilineBlock = false;
		for (const line of this.lines) {
			// don't let a blank line inside a multiline block end the item
			if (isInsideMultilineBlock && qstr.isEmpty(line)) {
				dpodLineBlock.addLine(line);
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
				dpodLineBlock.addLine(line);
				continue;
			}

			// ignore empty lines in file
			if (!isRecordingLineBlock && qstr.isEmpty(line)) {
				continue;
			}

			// we need to start recording a line block again
			if (!isRecordingLineBlock && !qstr.isEmpty(line)) {
				dpodLineBlock = new DpodLineBlock();
				isRecordingLineBlock = true;
			}

			// we are recording a line block and we need to add the current line
			if (isRecordingLineBlock && !qstr.isEmpty(line)) {
				dpodLineBlock.addLine(line);
			}

			// we need to finish recording a line block
			if (isRecordingLineBlock && qstr.isEmpty(line)) {
				this.dpodLineBlocks.push(dpodLineBlock);
				isRecordingLineBlock = false;
			}
		}

		// record last one
		if (isRecordingLineBlock) {
			this.dpodLineBlocks.push(dpodLineBlock);
		}
	}

	public debug() {
		console.log("pathAndFileName: " + this.pathAndFileName);
		console.log("lines: " + this.lines.length);
		this.dpodLineBlocks.forEach((dpodLineBlock) => {
			dpodLineBlock.debug();
		});
	}
}
