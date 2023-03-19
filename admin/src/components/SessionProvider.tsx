import React from 'react'
import Session from "supertokens-auth-react/recipe/session";

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }: SessionProviderProps) => {
    return (
        <Session.SessionAuth requireAuth={false}>
            {children}
        </Session.SessionAuth>
    );
}


export default SessionProvider;