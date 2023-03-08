import { NextPage, NextPageContext } from "next";
import Link from "next/link";

interface LoginPageProps {
    query: NextPageContext['query'];
}

const LoginPage: NextPage<LoginPageProps> = ({ query }) => {
    return (
        <div>
            <h1>Login Page</h1>
            Query String: {JSON.stringify(query)}
        </div>
    )
}

LoginPage.getInitialProps = async (ctx: NextPageContext): Promise<LoginPageProps> => {
    return {
        query: ctx.query
    };
}

export default LoginPage;