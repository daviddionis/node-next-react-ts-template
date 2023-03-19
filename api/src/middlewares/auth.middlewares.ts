import { NextFunction, Request, Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { verifySession as verifySessionST } from "supertokens-node/recipe/session/framework/express";
import ErrorControlled, { generateErrorResponse } from "../models/ErrorControlled";
import { Role } from "../models/Role";
import User from "../models/User";
import UserRole from "../models/UserRole";

export interface LoggedRequest extends SessionRequest {
    user?: User;
    roleId?: Role;
}

export const isLoggedIn = (sessionRequired: boolean = true) =>
    async (req: LoggedRequest, res: Response, next: NextFunction) => {
        await verifySessionST({ sessionRequired: sessionRequired })(req, res, async () => {
            try {
                if (!req.session || !req.session.getUserId())
                    return sessionRequired ? undefined : next();


                // check not revoked
                await req.session?.getSessionData().catch(_ => { throw new ErrorControlled("Session revoked", 401) });

                const roleId = await req.session?.getAccessTokenPayload().roleId;

                const user = await User.findByAuthUid(req.session.getUserId());

                await UserRole.findByUserIdAndRoleId(user.id, roleId);

                let newReq = req as LoggedRequest;
                newReq.user = user;
                newReq.roleId = roleId;

                return next();
            } catch (err) {
                console.log(err);
                return generateErrorResponse(res, err);
            }

        });
    }

export const isRole = (...roles: Role[]) => (req: SessionRequest, res: Response, next: NextFunction) => {
    // if (roles.includes(req.user.role))
    return next();
    return res.status(403).json({ success: false, message: "Forbidden" });
}
