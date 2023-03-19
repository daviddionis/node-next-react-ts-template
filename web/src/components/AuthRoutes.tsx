import { useContext, useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { LoadedSessionContext } from "supertokens-auth-react/lib/build/recipe/session/types";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/router";
import { doesStrArrayIncludeStr } from "../utils/arrays.utils";
import { AuthPaths } from "../constants/auth.constants";
import { getSessionUserData } from "../providers/sessions.providers";
import { UserSessionContext } from "../context/UserContext";

interface AuthRoutesProps {
    children: React.ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
    const stSession = Session.useSessionContext() as LoadedSessionContext;
    const userSession = useContext(UserSessionContext);
    const router = useRouter();

    useEffect(() => {
        if (stSession.doesSessionExist && doesStrArrayIncludeStr(AuthPaths.OnlyLoggedOutRoutes, router.pathname))
            router.push("/");
    }, [stSession, router]);

    useEffect(() => {
        const verifySessionAndLoadUser = async () => {
            try {
                const user = await getSessionUserData();
                user.roleId = stSession.accessTokenPayload.roleId;
                userSession.setUser(user);
            } catch (err) {
                Session.signOut();
            }
        };
        if (!stSession.loading && stSession.doesSessionExist) verifySessionAndLoadUser();
    }, [stSession]);

    return stSession.loading ? (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner className="w-10 h-10" />
        </div>
    ) : <>{children}</>;
}

export default AuthRoutes;