import { TypeInputFormField } from "supertokens-node/lib/build/recipe/emailpassword/types";


export const validatorsSignUpFormFields: TypeInputFormField[] = [
    {
        id: "first_name",
        validate: async (value) => {
            if (value === "") {
                return "Please enter your first name";
            }
            return undefined;
        },
    },
    {
        id: "last_name",
        validate: async (value) => {
            if (value === "") {
                return "Please enter your last name";
            }
            return undefined;
        },
    },
];