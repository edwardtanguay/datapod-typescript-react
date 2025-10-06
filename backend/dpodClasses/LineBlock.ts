/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILineBlockDataItem, ILineBlockKind } from "../types";
import * as qdev from "../../scripts/qtools/qdev";

export class LineBlock {
	private lines: string[] = [];

	public addLine(line: string) {
		this.lines.push(line);
	}

	public getFirstLine() {
		return this.lines[0];
	}

	public getAllLinesButFirst() {
		return this.lines.slice(1);
	}

	public setDataItem(dataItem: any) {
		this.lines = dataItem.lines;
	}

	public getNumberOfLines() {
		return this.lines.length;
	}

	public blankOutLines() {
		return (this.lines = []);
	}

	public getLineBlockDataItem(): ILineBlockDataItem {
		return {
			lines: this.lines,
		};
	}

	public getKind(): ILineBlockKind {
		const marker = this.lines[0].slice(0, 2);
		switch (marker) {
			case "**":
				return "schema";
			case "==":
				return "item";
			default:
				return "UNKNOWN";
		}
	}

	public static instantiateLineBlock(lineBlockDataItem: any) {
		const lineBlock = new LineBlock();
		lineBlock.setDataItem(lineBlockDataItem);
		return lineBlock;
	}

	public static instantiateLineBlocks(lineBlockDataItems: any) {
		const lineBlocks: LineBlock[] = [];
		for (const lineBlockDataItem of lineBlockDataItems) {
			lineBlocks.push(LineBlock.instantiateLineBlock(lineBlockDataItem));
		}
		return lineBlocks;
	}

	private debugSeparator(title: string) {
		const separatorLine =
			"-".repeat(4) +
			" " +
			title.toUpperCase() +
			" " + "-".repeat(50)
		return separatorLine.substring(0, 50);
	}

	public debug() {
		let r = "";
		r += this.debugSeparator("LineBlock" + ": " + this.getKind()) + '\n';
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			r += qdev.log((i + 1).toString().padStart(3, "0") + "| " + line);
		}
		return r;
	}
}
