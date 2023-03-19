import { Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { generateErrorResponse } from "../models/ErrorControlled";

export const listStatus = async (req: SessionRequest, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Server is running.',
            client_info: req.client
        });
    } catch (error) {
        return generateErrorResponse(res, error);
    }
}