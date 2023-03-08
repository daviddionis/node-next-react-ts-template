import { AgentInfo } from "../../src/middlewares/clientInfo.middlewares";

declare module 'express-serve-static-core' {
    export interface Request {
        client: {
            ip: string;
            agent: AgentInfo;
        }
    }
}