import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { dbService } from "../services/dbService";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const employees = dbService.getEmployees();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			error: "GET /employees fetch error: " + error.message,
		});
	}
});
