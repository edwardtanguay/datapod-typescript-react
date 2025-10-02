export class DpodParserCore {
	protected content = "";
	protected lines: string[] = [];

	private debugSeparator(title: string) {
		const separatorLine =
			"==== " +
			title.toUpperCase() +
			" =============================================";
		return separatorLine.substring(0, 50);
	}

	protected debugShowLines() {
		console.log(this.debugSeparator("lines"));
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];
			console.log(i + 1 + ": " + line);
		}
	}
}
