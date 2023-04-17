import { Router } from "express";
import { todoRoutes } from "./todo.routes";
import { authRouter } from "./auth.routes";

const apiRoutes = Router();

apiRoutes.use("/todos", todoRoutes);

apiRoutes.use("/auth", authRouter);

export default apiRoutes;
