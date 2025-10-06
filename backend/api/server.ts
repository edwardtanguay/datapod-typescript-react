import express from "express";
import cors from "cors";
import { employeeRouter } from "./routers/employeeRouter";
import { itemRouter } from "./routers/itemRouter";
import * as config from '../config'

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Unauthorized: No token provided" });
	}
	const token = authHeader.split(" ")[1];
	if (config.getToken() !== token) {
		return res.status(403).json({ error: "Forbidden: Invalid token" });
	}

	res.json({
		apiName: "Datapod for TypeScript React API",
		version: "0.1"
	});
});

app.use("/employees", employeeRouter);
app.use("/items", itemRouter);
