import * as qstr from "../qtools/qstr";
import * as qcli from "../qtools/qcli";

export class DpodLineBlock {
	public lines: string[] = [];

	constructor(line = "") {
		if (!qstr.isEmpty(line)) {
			this.lines.push(line);
		}
	}

	public addLine(line: string) {
		this.lines.push(line);
	}

	public debug() {
		qcli.message("DPOD LINE BLOCK", "bluedot");
		this.lines.forEach((line) => {
			qcli.message(line, "yellowdot");
		});
	}
}
