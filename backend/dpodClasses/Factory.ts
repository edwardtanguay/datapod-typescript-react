import * as qstr from "../../scripts/qtools/qstr";
import { DataTypeLine } from "./DataTypeLine";
import { DataTypeParagraph } from "./DataTypeParagraph";
import { DataTypeUnknown } from "./DataTypeUnknown";
import { DataTypeWholeNumber } from "./DataTypeWholeNumber";

export class Factory {
	public static instantiateDataType(dataTypeDefinitionLine: string) {
		if (!dataTypeDefinitionLine.includes(";")) {
			switch (dataTypeDefinitionLine) {
				case "dpodId":
					dataTypeDefinitionLine = "DpodId;dpodId";
					break;
				case "dpodWhenCreated":
					dataTypeDefinitionLine = "DpodWhenCreated;dpodWhenCreated";
					break;
				case "Date":
					dataTypeDefinitionLine += ";date";
					break;
				case "Url":
					dataTypeDefinitionLine += ";url";
					break;
				case "Kilometers":
					dataTypeDefinitionLine += ";km";
					break;
				case "Duration":
					dataTypeDefinitionLine += ";duration";
					break;
				default:
					dataTypeDefinitionLine += ";line";
					break;
			}
		}

		const parts = qstr.breakIntoParts(dataTypeDefinitionLine, ";");
		const idCode = parts[0];
		const dataTypeIdCode = parts[1]; // TODO: make a type
		switch (dataTypeIdCode) {
			case "line":
				return new DataTypeLine(idCode);
			case "wn":
			case "wholeNumber":
				return new DataTypeWholeNumber(idCode);
			case "p":
			case "paragraph":
				return new DataTypeParagraph(idCode);
			default:
				return new DataTypeUnknown(idCode, dataTypeIdCode);
		}
	}
}
