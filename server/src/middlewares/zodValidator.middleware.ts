import z from "zod";
import { RequestHandler } from "express";

export const bodyValidator =
	<T extends z.ZodSchema>(schema: T): RequestHandler =>
	(req, res, next) => {
		const result = schema.safeParse(req.body);
		if (result.success) {
			req.body = result.data;
			return next();
		}

		res.status(400).send(result.error.format());
	};

export const queryStringValidator =
	<T extends z.ZodSchema>(schema: T): RequestHandler =>
	(req, res, next) => {
		const result = schema.safeParse(req.query);
		if (result.success) {
			req.query = result.data;
			return next();
		}

		res.status(400).send(result.error.format());
	};
