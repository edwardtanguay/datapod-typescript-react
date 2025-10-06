import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { DpodItems } from "../../dpodClasses/DpodItems";

export const employeeRouter = Router();

employeeRouter.get("/", authenticateToken, async (req, res) => {
	try {
		const bookDpodItems = new DpodItems("books");
		const books = bookDpodItems.getAsObjectArray();
		console.log(333, books);
		const employeeDpodItems = new DpodItems("employees");
		const employees = employeeDpodItems.getAsObjectArray();
		res.status(200).json(employees);
	} catch (error) {
		res.status(500).json({
			error: "fetch error: " + error.message,
		});
	}
});
