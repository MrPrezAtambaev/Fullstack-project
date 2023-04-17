const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

const main = async () => {
	await prisma.todo.createMany({
		data: [{ title: "A" }, { title: "B" }, { title: "C" }, { title: "D" }],
	});

	const allTodos = await prisma.todo.findMany();
	console.log({ allTodos });
};

main()
	.catch(console.error)
	.finally(() => {
		console.log("SUCCESS!!!");
		process.exit(0);
	});
