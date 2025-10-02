import { Request, Response, NextFunction } from "express";
import * as config from "../../config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  if (token !== config.getToken()) {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
  
  next();
};