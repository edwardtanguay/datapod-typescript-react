import * as qstr from "../../scripts/qtools/qstr";
import * as qdev from "../../scripts/qtools/qdev";
import { LineBlock } from "./LineBlock";
import { DpodSchema } from "./DpodSchema";

export class DpodItemDataSourceParser {
	protected content = "";
	protected lines: string[] = [];
	protected lineBlocks: LineBlock[] = [];
	private dpodSchemas: DpodSchema[] = [];

	constructor(content: string) {
		this.content = content;
		this.createLines();
		this.createLineBlocks();
		this.createDpodSchemas();
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

	public createDpodSchemas(): void {
		for (const lineBlock of this.lineBlocks) {
			const lineBlockKind = lineBlock.getKind();
			if (lineBlockKind === "schema") {
				const dpodSchema = new DpodSchema(lineBlock);
				this.dpodSchemas.push(dpodSchema);
			}
		}
	}

	private debugSeparator(title: string) {
		const separatorLine =
			"==== " +
			title.toUpperCase() +
			" =============================================";
		return separatorLine.substring(0, 50);
	}

	private debugShowLines() {
		let r = "";
		r += this.debugSeparator("lines") + "\n";
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			r += (i + 1).toString().padStart(3, "0") + "| " + line + "\n";
		}
		return r;
	}

	private debugShowLineBlocks() {
		let r = "";
		r += qdev.log();
		r += qdev.log(this.debugSeparator("lineBlocks"));
		r += qdev.log();
		for (const lineBlock of this.lineBlocks) {
			r += qdev.log(lineBlock.debug());
		}
		return r;
	}

	private debugShowDpodSchemas() {
		let r = "";
		r += qdev.log();
		r += qdev.log(this.debugSeparator("dpodSchemas"));
		r += qdev.log();
		for (const dpodSchema of this.dpodSchemas) {
			r += dpodSchema.debug();
		}
		return r;
	}

	public debug() {
		let r = "";
		// r += this.debugShowLines();
		// r += this.debugShowLineBlocks();
		r += this.debugShowDpodSchemas();
		return r;
	}
}
