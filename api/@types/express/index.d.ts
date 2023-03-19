import { SessionRequest } from "supertokens-node/framework/express";
import { AgentInfo } from "../../src/middlewares/clientInfo.middlewares";

declare module 'express-serve-static-core' {
    export interface Request implements SessionRequest {
        client: {
            ip: string;
            agent: AgentInfo;
        }
    }
}