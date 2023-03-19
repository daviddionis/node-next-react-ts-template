import { Router } from "express";
import { listUserInfo } from "../controllers/sessions.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const sessionsRouter = Router();

sessionsRouter.route("/")
    .get(isLoggedIn(), listUserInfo);

export default sessionsRouter;