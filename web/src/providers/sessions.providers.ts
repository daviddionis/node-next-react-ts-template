import User from "../models/User";
import { apiInstance } from "./api.providers";

export const getSessionUserData = () =>
    new Promise<User>(async (resolve, reject) => {
        try {
            const response = await apiInstance.get('/sessions');
            return resolve(User.fromAPIModel(response.data.user));
        } catch (error) {
            return reject(error);
        }
    });