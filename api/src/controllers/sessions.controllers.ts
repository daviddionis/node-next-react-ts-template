import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { LoggedRequest } from "../middlewares/auth.middlewares";
import ErrorControlled, { generateErrorResponse } from "../models/ErrorControlled";
import { Role } from "../models/Role";
import User from "../models/User";

export const listUserInfo = async (req: LoggedRequest, res: Response) => {
    try {
        if (!req.session || !req.session.getUserId())
            throw new ErrorControlled('User not found.', 404);

        return res.status(200).json({
            success: true,
            message: 'User info retrieved.',
            user: req.user!.toNormalUserAPIModel()
        });
    } catch (error) {
        console.log(error);
        return generateErrorResponse(res, error);
    }
}