import { NextFunction, Request, Response } from 'express';
import DeviceDetector from 'node-device-detector';

const detector = new DeviceDetector;

export interface AgentInfo {
    os: {
        name: string;
        version: string;
    },
    device: {
        brand: string;
        model: string;
    },
    browser: {
        name: string;
        version: string;
    }
}

export interface RequestWithAgent extends Request {
    client: {
        ip: string;
        agent: AgentInfo;
    }
}

export const getClientInfo = (req: any, res: Response, next: NextFunction) => {
    const userAgentInfo = detector.detect(req.useragent.source);

    req.client = {
        ip: getClientIp(req),
        agent: {
            os: {
                name: userAgentInfo.os.name,
                version: userAgentInfo.os.version
            },
            device: {
                brand: userAgentInfo.device.brand,
                model: userAgentInfo.device.model
            },
            browser: {
                name: userAgentInfo.client.name,
                version: userAgentInfo.client.version
            }
        }
    }

    next();
}

export const getClientIp = (req: Request) => (
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-cluster-client-ip'] ||
    req.headers['x-forwarded'] ||
    req.headers['forwarded-for'] ||
    req.headers['forwarded'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress
);