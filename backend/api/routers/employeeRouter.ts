import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const employees = [
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
				id: 2,
				firstName: "Renee",
				lastName: "Tiglerweid",
				age: 35,
			},
		]
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			error: "GET /employees fetch error: " + error.message,
		});
	}
});