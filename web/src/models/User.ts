import { Role } from "./Role";

export interface UserAPIModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
}

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    roleId: Role;
}

class User implements UserModel {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public createdAt: Date,
        public roleId: Role
    ) { }

    public static fromAPIModel(user: UserAPIModel): User {
        return new User(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            new Date(user.created_at),
            Role.User
        );
    }

    public toAPIModel(): UserAPIModel {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            created_at: this.createdAt.toISOString()
        };
    }
}

export default User;