import { LineBlock } from "./LineBlock";

export class DpodItem {
	private lineBlock: LineBlock;

	constructor(lineBlock: LineBlock) {
		this.lineBlock = lineBlock;
	}

	debug() {
		return this.lineBlock.debug();
	}
}
