export type Employee = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
};

export interface ILineBlockDataItem {
	lines: string[];
}

export type ILineBlockKind = "schema" | "item" | "UNKNOWN";
