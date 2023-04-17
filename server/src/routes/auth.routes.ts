import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import z from "zod";
import { bodyValidator } from "../middlewares/zodValidator.middleware";
import { config } from "../utils/config";
import { JWTPayload } from "../types";

export const authRouter = Router();

const SignUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().nonempty().min(8),
		password2: z.string(),
	})
	.refine((value) => value.password === value.password2, {
		message: "Пароли не близнецы",
		path: ["password2"],
	});

type SignUpDto = z.infer<typeof SignUpSchema>;

const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().nonempty(),
});

type LoginDto = z.infer<typeof LoginSchema>;

//! auth
authRouter.post("/signup", bodyValidator(SignUpSchema), async (req, res) => {
	const { email, password } = req.body as SignUpDto;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (user) {
			return res
				.status(400)
				.json({ error: "Пользователь с таким email уже существует" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: { email, password: hashedPassword },
		});

		res.status(201).json({ ok: "Вы успешно зарегались" });
	} catch (e) {
		console.log(e);
	}
});

authRouter.post("/login", bodyValidator(LoginSchema), async (req, res) => {
	const { email, password } = req.body as LoginDto;

	const user = await prisma.user.findUniqueOrThrow({ where: { email } });

	const isPasswordsMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordsMatch) {
		return res.status(401).send({ message: "Password or Email missmatch" });
	}

	const accessToken = jwt.sign({ userId: user.id }, config.jwt.accessSecret, {
		expiresIn: "5m",
	});

	const refreshToken = jwt.sign({ userId: user.id }, config.jwt.refreshSecret, {
		expiresIn: "7d",
	});

	res.status(200).json({
		id: user.id,
		email: user.email,
		accessToken,
		refreshToken,
	});
});

authRouter.post("/refresh", async (req, res) => {
	const schema = z.object({ refresh: z.string() });

	const body = schema.parse(req.body);

	try {
		const decoded = jwt.verify(
			body.refresh,
			config.jwt.refreshSecret,
		) as JWTPayload;

		const payload: JWTPayload = { userId: decoded.userId };

		const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
			expiresIn: "5m",
		});

		res.status(200).json({
			accessToken,
		});
	} catch (error) {
		return res.status(401).send({ message: "ановторизет", error });
	}
});
