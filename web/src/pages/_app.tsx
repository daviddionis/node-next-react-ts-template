import '../styles/globals.css'
import React from "react";
import { AppContext, AppProps } from "next/app";
import CookieConstent, { CookieInfo } from "../components/CookieConstent";
import { cookiesInfo } from '../constants/cookies.constants';

function RootApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            Imagine this is a footer
            <CookieConstent cookies={cookiesInfo} />
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