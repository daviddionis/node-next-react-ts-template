import '../styles/globals.css'
import React, { useMemo, useState } from "react";
import { AppContext, AppProps } from "next/app";
import SuperTokens from 'supertokens-auth-react';
import { SuperTokensConfig } from '../config';
import { Toaster } from 'react-hot-toast';
import SessionProvider from '../components/SessionProvider';
import AuthRoutes from '../components/AuthRoutes';
import Head from 'next/head';
import { UserSessionContext } from '../context/UserContext';
import User from '../models/User';

if (typeof window !== 'undefined') {
    SuperTokens.init(SuperTokensConfig);
}

const RootApp = ({ Component, pageProps }: AppProps) => {

    const [user, setUser] = useState<User | null>(null);

    const userSessionState = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <UserSessionContext.Provider value={userSessionState}>
                <SessionProvider>
                    <AuthRoutes>
                        <Component {...pageProps} />
                        <Toaster />
                    </AuthRoutes>
                </SessionProvider >
            </UserSessionContext.Provider>
        </>
    );
};

RootApp.getInitialProps = async (appContext: AppContext) => {
    //intialProps other componentss
    let pageProps = {};

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { pageProps }
}
export default RootApp;