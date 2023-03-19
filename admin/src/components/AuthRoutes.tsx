import { useContext, useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { LoadedSessionContext } from "supertokens-auth-react/lib/build/recipe/session/types";
import { doesStrArrayIncludeStr } from "../utils/arrays.utils";
import { AuthPaths } from "../constants/auth.constants";
import { getSessionUserData } from "../providers/sessions.providers";
import { UserSessionContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Spin } from "antd";

interface AuthRoutesProps {
    children: React.ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
    const stSession = Session.useSessionContext() as LoadedSessionContext;
    const userSession = useContext(UserSessionContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (stSession.doesSessionExist && doesStrArrayIncludeStr(AuthPaths.OnlyLoggedOutRoutes, location.pathname))
            navigate("/");
    }, [stSession, navigate, location]);

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
        <Row justify="center" align="top" style={{ width: '100%', height: '100vh', padding: '40px 20px' }}>
            <Spin size="large" />
        </Row>
    ) : <>{children}</>;
}

export default AuthRoutes;