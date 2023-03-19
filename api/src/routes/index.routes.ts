import { Router } from "express";
import fs from "fs";

const mainRouter = Router();

const routes = fs.readdirSync(__dirname).filter((file) => file !== "index.routes.ts");

for (const route of routes) {
    const routeName = route.split(".")[0];
    mainRouter.use(`/${routeName}`, require(`./${routeName}.routes`).default);
}

export default mainRouter;