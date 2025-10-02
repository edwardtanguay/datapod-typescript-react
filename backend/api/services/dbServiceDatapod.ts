import { Employee } from "../../types";

class DbServiceDatapod {
	getEmployees = (): Employee[] => {
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
				lastName: "Servicemalt",
				age: 35,
			},
		];
	};
}

export const dbServiceDatapod = new DbServiceDatapod();
