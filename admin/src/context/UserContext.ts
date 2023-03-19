
import { createContext } from "react";
import User from "../models/User";

export type UserSessionContextProps = {
    user: User | null;
    setUser: (user: User) => void;
};

export const UserSessionContext = createContext({} as UserSessionContextProps);