import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { DpodItems } from "../../dpodItems/DpodItems";
import { Employee } from "../../types";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const dpodItems = new DpodItems<Employee>("employees");
		const employees = dpodItems.getAsObjectArray();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			error: "GET /employees fetch error: " + error.message,
		});
	}
});
