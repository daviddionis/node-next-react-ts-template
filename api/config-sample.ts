import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { functionsEmailPasswordRecipe, functionsSessionRecipe } from "./src/implementations/supertokens.implementations";
import { validatorsSignUpFormFields } from "./src/validators/supertokens.validators";

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

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        connectionURI: "https://try.supertokens.io",
        // apiKey: 'a_mega_ultra_secret_api_key_very_strong_and_very_long'
    },
    appInfo: {
        appName: "OptimusTours Auth",
        apiDomain: Urls.ApiUrl,
        websiteDomain: Urls.WebsiteUrl,
    },
    recipeList: [
        EmailPassword.init({
            signUpFeature: {
                formFields: validatorsSignUpFormFields,
            },
            override: {
                functions: functionsEmailPasswordRecipe as any,
            }
        }),
        Session.init({
            override: {
                functions: functionsSessionRecipe,
            }
        }),
        UserMetadata.init(),
        Dashboard.init({ apiKey: "another_mega_ultra_secret_api_key_very_strong_and_very_long" }),
    ],
};