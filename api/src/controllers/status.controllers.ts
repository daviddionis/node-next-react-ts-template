import { Request, Response } from "express";
import { generateErrorResponse } from "../models/ErrorControlled";

export const listStatus = async (req: Request, res: Response) => {
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