import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

export enum Mode {
    Development = 0,
    Production = 1,
    Sandbox = 2,
}
export const EnviormentMode = Mode.Development;

export const Urls = {
    ApiUrl: [
        "http://localhost:4000",
        "http://localhost:4000",
        "http://localhost:4000"
    ][EnviormentMode],
    WebsiteUrl: [
        "http://localhost:3000",
        "http://localhost:3000",
        "http://localhost:3000"
    ][EnviormentMode],
}

export const SuperTokensConfig = {
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: Urls.ApiUrl,
        websiteDomain: Urls.WebsiteUrl,
    },
    recipeList: [
        EmailPassword.init({
            signInAndUpFeature: {
                disableDefaultUI: true,
            },
        }),
        Session.init()
    ],
};