import { DpodItemDataSourceParser } from "./DpodItemDataSourceParser";
import { LineBlock } from "./LineBlock";

export class DpodItem {
	private lineBlock: LineBlock;
	private dpodItemDataSourceParser: DpodItemDataSourceParser;

	constructor(lineBlock: LineBlock, dpodItemDataSourceParser: DpodItemDataSourceParser) {
		this.lineBlock = lineBlock;
		this.dpodItemDataSourceParser = dpodItemDataSourceParser;
	}

	debug() {
		return this.lineBlock.debug();
	}
}
