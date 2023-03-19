import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import Session from "supertokens-auth-react/recipe/session";
import { useContext } from "react";
import { UserSessionContext } from "../context/UserContext";

const IndexPage: NextPage = () => {
    const userSession = useContext(UserSessionContext);

    const signOut = () => {
        Session.signOut();
        userSession.setUser(null);
    }

    return (
        <>

            <div className="flex flex-col items-center justify-center h-screen">
                <div className="max-w-xs w-full">
                    {userSession.user
                        ? <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl font-normal mb-2">Welcome {userSession.user.firstName} {userSession.user.lastName}</h1>
                            <Button type="button" onClick={signOut}>Logout</Button>
                        </div>
                        : <Link href="/login">
                            <Button type="button">Login</Button>
                        </Link>
                    }
                </div>
            </div >
        </>
    )
}

// IndexPage.getInitialProps = async (ctx: NextPageContext) => {
//     return { ctx };
// }

export default IndexPage;