import { Router } from "express";
import statusRouter from "./status.routes";

const mainRouter = Router();

mainRouter.use("/status", statusRouter);

export default mainRouter;