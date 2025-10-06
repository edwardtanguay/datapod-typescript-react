import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { DpodItems } from "../../dpodClasses/DpodItems";

export const itemRouter = Router();

itemRouter.get("/:itemIdCode", authenticateToken, async (req, res) => {
	try {
		const { itemIdCode } = req.params;
		const dpodItems = new DpodItems(itemIdCode);
		const items = dpodItems.getAsObjectArray();
		res.status(200).json(items);
	} catch (error) {
		res.status(500).json({
			error: "fetch error: " + error.message,
		});
	}
});
