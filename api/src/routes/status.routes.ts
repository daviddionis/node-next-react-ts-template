import { Router } from "express";
import { listStatus } from "../controllers/status.controllers";

const statusRouter = Router();

statusRouter.route("/").get(listStatus);

export default statusRouter;