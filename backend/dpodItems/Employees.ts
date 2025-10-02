import { Employee } from "../types";

export class DpodEmployees {
	getAsObjectArray = (): Employee[] => {
		return [
			{
				id: 1,
				firstName: "Gregor",
				lastName: "Mittelwald",
				age: 30,
			},
			{
				id: 2,
				firstName: "Walter",
				lastName: "Skowonrek",
				age: 35,
			},
			{
				id: 3,
				firstName: "Renee",
				lastName: "Dpodette",
				age: 35,
			},
		];
	};
}
