import morgan from 'morgan';
import cors from 'cors';
import express, { Application } from 'express';
import { EnviormentMode, Mode } from '../config';
import { createServer } from 'http';
import { Server } from "socket.io";
import useragent from 'express-useragent';
import { getClientInfo } from './middlewares/clientInfo.middlewares';
import mainRouter from './routes/index.routes';

export const __dirnameAtAPILevel = __dirname.replace(/src$/, '');

const PORT = process.env.PORT || 4000;

const app: Application = express();

app.use(cors());

if (EnviormentMode == Mode.Development) app.use(morgan('dev'));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(useragent.express(), getClientInfo);

app.use('/', mainRouter);

const server = createServer(app);
export const io = new Server(server, {
    maxHttpBufferSize: 100 * 1024 * 1024,
    cors: { origin: '*' }
});
require('./sockets/index.sockets');

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;