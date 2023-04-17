import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../utils/config";
import { JWTPayload } from "../types";

export interface AuthRequest extends Request {
	user?: JWTPayload;
}

export const authMiddleware = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).send({ message: "ановторизет" });
	}

	const decoded = jwt.decode(token);

	try {
		jwt.verify(token, config.jwt.accessSecret);
	} catch (error) {
		return res.status(401).send({ message: "ановторизет", error });
	}

	const user = jwt.decode(token) as JWTPayload;

	req.user = user;

	next();
};
