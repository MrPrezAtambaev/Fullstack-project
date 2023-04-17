import { Router } from "express";
import { prisma } from "../db";
import { bodyValidator } from "../middlewares/zodValidator.middleware";
import z from "zod";
import { Prisma } from "@prisma/client";
import { AuthRequest, authMiddleware } from "../middlewares/auth.middleware";

export const todoRoutes = Router();

const todoSchema = z.object({
	id: z.string(),
	title: z.string(),
	completed: z.boolean(),
});

const createTodoSchema = todoSchema.omit({ id: true });
type CreateTodoDto = z.infer<typeof createTodoSchema>;

const updateTodoSchema = todoSchema.omit({ id: true }).partial();
type UpdateTodoDto = z.infer<typeof updateTodoSchema>;

const todoFiltersQuerySchema = z.object({
	searchText: z.string().optional(),
	page: z
		.preprocess(
			(val) => (typeof val === "string" ? parseInt(val) : val),
			z.number(),
		)
		.default(1),
	limit: z
		.preprocess(
			(val) => (typeof val === "string" ? parseInt(val) : val),
			z.number(),
		)
		.default(10),
});

todoRoutes.get("/", async (req, res) => {
	const query = todoFiltersQuerySchema.parse(req.query);

	const filters: Prisma.TodoWhereInput[] = [];

	if (query.searchText) {
		filters.push({
			title: {
				contains: query.searchText,
				mode: "insensitive",
			},
		});
	}

	const [todos, count] = await Promise.all([
		prisma.todo.findMany({
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
			include: {
				author: {
					select: {
						id: true,
						email: true,
					},
				},
			},
			take: query.limit,
			skip: (query.page - 1) * query.limit,
			orderBy: [{ createdAt: "desc" }],
		}),
		prisma.todo.count({
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
		}),
	]);

	const result = {
		total: count,
		next:
			count > query.limit * query.page
				? {
						page: query.page + 1,
						limit: query.limit,
				  }
				: null,
		prev:
			query.page > 1
				? {
						page: query.page - 1,
						limit: query.limit,
				  }
				: null,
		results: todos,
	};

	res.send(result);
});

todoRoutes.post(
	"/",
	authMiddleware,
	bodyValidator(createTodoSchema),
	async (req: AuthRequest, res) => {
		const data = req.body as CreateTodoDto;

		const todo = await prisma.todo.create({
			data: {
				...data,
				authorId: req.user?.userId,
			},
		});

		res.send(todo);
	},
);

todoRoutes.patch("/:id", bodyValidator(updateTodoSchema), async (req, res) => {
	const id = req.params.id;
	const data = req.body as UpdateTodoDto;

	const todo = await prisma.todo.update({
		where: { id },
		data,
	});

	res.send(todo);
});

todoRoutes.get("/:id", async (req, res) => {
	const id = req.params.id;
	const todo = await prisma.todo.findUnique({ where: { id } });
	res.send(todo);
});

todoRoutes.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const todo = await prisma.todo.delete({ where: { id } });
	res.send(todo);
});

//! live search
