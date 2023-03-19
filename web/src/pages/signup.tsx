import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signUp } from "supertokens-auth-react/recipe/emailpassword";
import Button from "../components/Button";
import Input from "../components/Input";
import { EmailPasswordResponse } from "../constants/supertokens.constants";
import { classNames } from "../utils/classNames.utils";

interface LoginPageProps {
    query: NextPageContext['query'];
}

const LoginPage: NextPage<LoginPageProps> = ({ query }) => {

    const [emailPasswordData, setEmailPasswordData] = useState({
        first_name: "", last_name: "",
        email: "", password: "", confirmPassword: ""
    });
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const handleChangeEP = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmailPasswordData({ ...emailPasswordData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailPasswordData.password !== emailPasswordData.confirmPassword)
            return toast.error("Passwords do not match");

        setLoadingSignIn(true);

        const response = await signUp({
            formFields: [
                { id: "first_name", value: emailPasswordData.first_name },
                { id: "last_name", value: emailPasswordData.last_name },
                { id: "email", value: emailPasswordData.email },
                { id: "password", value: emailPasswordData.password },
            ]
        });

        if (response.status == EmailPasswordResponse.FIELD_ERROR)
            toast.error("Please fill all fields");
        else if (response.status == EmailPasswordResponse.OK)
            toast.success("Logged in successfully");

        setLoadingSignIn(false);
    }

    return (
        <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full">
                <div className="bg-white w-full rounded-xl shadow-lg p-10">
                    <h1 className="text-center text-3xl font-bold">Login</h1>
                    <div className="mt-2 text-sm text-center font-light">
                        Not registered? <Link href="/register"><a className="text-indigo-500 hover:text-indigo-700">Create an account</a></Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="col-span-1">
                                <Input
                                    label="First Name"
                                    name="first_name"
                                    value={emailPasswordData.first_name}
                                    onChange={handleChangeEP}
                                    placeholder="First Name"
                                    type="text"
                                />
                            </div>
                            <div className="col-span-1">
                                <Input
                                    label="Last Name"
                                    name="last_name"
                                    value={emailPasswordData.last_name}
                                    onChange={handleChangeEP}
                                    placeholder="Last Name"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Input
                                label="Email"
                                name="email"
                                value={emailPasswordData.email}
                                onChange={handleChangeEP}
                                placeholder="Email"
                                type="email"
                            />
                        </div>
                        <div className="mt-4">
                            <Input
                                label="Password"
                                name="password"
                                value={emailPasswordData.password}
                                onChange={handleChangeEP}
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                        <div className="mt-4">
                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                value={emailPasswordData.confirmPassword}
                                onChange={handleChangeEP}
                                placeholder="Confirm Password"
                                type="password"
                            />
                        </div>
                        <div className="mt-5">
                            <Button type="submit" loading={loadingSignIn}>Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

LoginPage.getInitialProps = async (ctx: NextPageContext): Promise<LoginPageProps> => {
    return {
        query: ctx.query
    };
}

export default LoginPage;