import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { listStatus } from "../controllers/status.controllers";

const statusRouter = Router();

statusRouter.route("/").get(listStatus);

export default statusRouter;