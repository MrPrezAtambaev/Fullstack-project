import express from "express";
import dotenv from "dotenv";
import path from "path";
import apiRoutes from "./routes/api.routes";
import { engine } from "express-handlebars";
import { prisma } from "./db";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(cors());

app.use(express.json());

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
//Sets handlebars configurations (we will go through them later on)
app.engine(
	"hbs",
	engine({
		layoutsDir: path.join(__dirname, "../views/layouts"),
		extname: "hbs",
		defaultLayout: "index",
		partialsDir: path.join(__dirname, "../views/partials"),
	}),
);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", async (req, res) => {
	//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"

	const todos = await prisma.todo.findMany();
	res.render("main", { todos });
});

app.use("/api", apiRoutes);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
