import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Row } from "antd"
import { useState } from "react";
import { signIn } from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordResponse } from "../constants/supertokens.constants";
import { Role } from "../models/Role";


const generateRoledEmail = (email: string, role: Role) =>
    role + "-" + email;

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = () => {

    const [emailPasswordData, setEmailPasswordData] = useState({
        email: "", password: ""
    });
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const handleChangeEP = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmailPasswordData({ ...emailPasswordData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadingSignIn(true);

        const response = await signIn({
            formFields: [
                { id: "email", value: generateRoledEmail(emailPasswordData.email, Role.Admin) },
                { id: "password", value: emailPasswordData.password }
            ],
        });

        if (response.status == EmailPasswordResponse.WRONG_CREDENTIALS_ERROR)
            message.error("Wrong credentials");
        else if (response.status == EmailPasswordResponse.FIELD_ERROR)
            message.error("Please fill all fields");
        else if (response.status == EmailPasswordResponse.OK)
            message.success("Logged in successfully");

        setLoadingSignIn(false);
    }


    return (
        <Row justify="center" align="top" style={{ width: '100%', height: '100vh', padding: '40px 20px' }}>
            <Card title="Login" style={{ width: '420px' }}>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col span={24}>
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Email"
                                name="email"
                                value={emailPasswordData.email}
                                onChange={handleChangeEP}
                            />
                        </Col>
                        <Col span={24} style={{ marginTop: '12px' }}>
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
                                placeholder="Password"
                                name="password"
                                value={emailPasswordData.password}
                                onChange={handleChangeEP}
                                type="password"
                            />
                        </Col>
                        <Col span={24} style={{ marginTop: '12px' }}>
                            <Button type="primary" htmlType="submit" block loading={loadingSignIn}>Login</Button>
                        </Col>
                    </Row>
                </form>
            </Card>
        </Row>
    );
}

export default LoginPage;