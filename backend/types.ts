export type Employee = {
	firstName: string;
	lastName: string;
	age: number;
};

export interface ILineBlockDataItem {
	lines: string[];
}

export type ILineBlockKind = "schema" | "item" | "UNKNOWN";

export type DpodSyntaxType = "simple" | "verbose";
