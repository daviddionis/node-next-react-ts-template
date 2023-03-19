import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import UserRole from "../models/UserRole";
import User from "../models/User";
import { Role } from "../models/Role";

export const roledEmailToEmailAndRoleId = (email: string) => ({
    roleId: parseInt(email.split("-")[0]),
    email: email.split("-")[1]
});

export const getFormFieldsFromInput = (input: any) => {
    const formFields = input.userContext._default.request.request.body.formFields;
    return formFields.reduce((acc: any, field: any) => {
        acc[field.id] = field.value;
        return acc;
    }, {});
};

export const functionsEmailPasswordRecipe = (originalImplementation: EmailPassword.RecipeInterface) => ({
    ...originalImplementation,
    signUp: async (input: any) => {
        try {
            const response = await originalImplementation.signUp(input);

            const { first_name: firstName, last_name: lastName } = getFormFieldsFromInput(input);

            if (response.status !== "OK") return response;

            await UserMetadata.updateUserMetadata(response.user.id, {
                first_name: firstName,
                last_name: lastName,
            });

            const user = User.empty();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = input.email;
            user.authUid = response.user.id;
            user.enabled = true;
            user.confirmed = true;

            await user.create();

            const userRole = UserRole.empty();
            userRole.userId = user.id;
            userRole.roleId = Role.User;

            await userRole.create();

            return response;
        } catch (err) {
            return {
                status: "EMAIL_ALREADY_EXISTS_ERROR"
            };
        }
    },
    signIn: async (input: any) => {
        try {
            const { email, roleId } = roledEmailToEmailAndRoleId(input.email);
            input.email = email;

            const response = await originalImplementation.signIn(input);

            if (response.status !== "OK") return response;

            const user = await User.findByAuthUid(response.user.id);

            if (!user.enabled || !user.confirmed)
                throw new Error("User not enabled or confirmed");

            const userRole = await UserRole.findByUserIdAndRoleId(user.id, roleId);

            if (!userRole) throw new Error("User role not found");

            return response;
        } catch (err) {
            return {
                status: "WRONG_CREDENTIALS_ERROR"
            };
        }

    },
});

export const functionsSessionRecipe = (originalImplementation: Session.RecipeInterface) => ({
    ...originalImplementation,
    createNewSession: async (input: any) => {

        const { email } = getFormFieldsFromInput(input);

        const { roleId } = roledEmailToEmailAndRoleId(email);

        input.accessTokenPayload = {
            ...input.accessTokenPayload,
            roleId
        };

        const response = await originalImplementation.createNewSession(input);
        return response;
    }
})