import express, { Application } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware as supertokensMiddleware } from "supertokens-node/framework/express";
import { EnviormentMode, Mode, SuperTokensConfig, Urls } from "../config";
import { createServer } from 'http';
import { Server } from "socket.io";
import morgan from "morgan";
import { getClientInfo } from "./middlewares/clientInfo.middlewares";
import useragent from 'express-useragent';
import mainRouter from "./routes/index.routes";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

export const __dirnameAtAPILevel = __dirname.replace(/src$/, '');

const PORT = process.env.PORT || 4000;

supertokens.init(SuperTokensConfig);

const app: Application = express();

app.use(cors({
    origin: (_, callback) => callback(null, true),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));


if (EnviormentMode == Mode.Development) app.use(morgan('dev'));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(useragent.express(), getClientInfo);

app.use(supertokensMiddleware());

app.use('/', mainRouter);

const server = createServer(app);
export const io = new Server(server, {
    maxHttpBufferSize: 100 * 1024 * 1024,
    cors: { origin: '*' }
});
require('./sockets/index.sockets');

// app.use(supertokensErrorHandler());

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;