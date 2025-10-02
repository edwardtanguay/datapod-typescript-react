import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { dbServiceDatapod } from "../services/dbServiceDatapod";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const employees = dbServiceDatapod.getEmployees();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			error: "GET /employees fetch error: " + error.message,
		});
	}
});
