import pool from "../database";
import { dateToMySQLTimestamp } from "../utils/mysql.utils";
import ErrorControlled from "./ErrorControlled";

interface UserMySQLModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    auth_uid: string;
    enabled: boolean;
    confirmed: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    authUid: string;
    enabled: boolean;
    confirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAdminAPIModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    auth_uid: string;
    enabled: boolean;
    confirmed: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserNormalUserAPIModel {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
}

class User implements UserModel {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public authUid: string,
        public enabled: boolean,
        public confirmed: boolean,
        public createdAt: Date,
        public updatedAt: Date
    ) { }

    private static fromMySQLModel(user: UserMySQLModel): User {
        return new User(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.auth_uid,
            user.enabled,
            user.confirmed,
            new Date(user.created_at),
            new Date(user.updated_at)
        );
    }

    private static fromMySQLModels(users: UserMySQLModel[]): User[] {
        return users.map(user => User.fromMySQLModel(user));
    }

    private toMySQLModel(): UserMySQLModel {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            auth_uid: this.authUid,
            enabled: this.enabled,
            confirmed: this.confirmed,
            created_at: dateToMySQLTimestamp(this.createdAt),
            updated_at: dateToMySQLTimestamp(this.updatedAt)
        };
    }

    public static fromAdminAPIModel(user: UserAdminAPIModel): User {
        return new User(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.auth_uid,
            user.enabled,
            user.confirmed,
            new Date(user.created_at),
            new Date(user.updated_at)
        );
    }

    public toAdminAPIModel(): UserAdminAPIModel {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            auth_uid: this.authUid,
            enabled: this.enabled,
            confirmed: this.confirmed,
            created_at: this.createdAt.toISOString(),
            updated_at: this.updatedAt.toISOString()
        };
    }

    public toNormalUserAPIModel(): UserNormalUserAPIModel {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            created_at: this.createdAt.toISOString(),
        };
    }

    public static empty(): User {
        return new User(
            0,
            "",
            "",
            "",
            "",
            false,
            false,
            new Date(),
            new Date()
        );
    }

    public create(): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                this.createdAt = new Date();
                const [res] = await pool.query(`
                    INSERT INTO users SET ?
                `, [this.toMySQLModel()]);
                this.id = res.insertId;
                return resolve(this);
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findById(id: number): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const [res] = await pool.query(`
                    SELECT * FROM users WHERE id = ?
                `, [id]);
                if (res.length === 0)
                    throw new ErrorControlled("User not found", 404);
                return resolve(User.fromMySQLModel(res[0]));
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findByAuthUid(authUid: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                const [res] = await pool.query(`
                    SELECT * FROM users 
                    WHERE auth_uid = ?
                `, [authUid]);
                if (res.length === 0)
                    throw new ErrorControlled("User not found", 404);
                return resolve(User.fromMySQLModel(res[0]));
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findPaginated(page: number, limit: number = 100): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const [res] = await pool.query(`
                    SELECT * FROM users
                    LIMIT ?, ?
                `, [(page - 1) * limit, limit]);
                return resolve(User.fromMySQLModels(res));
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findFreeTextPaginated(freeText: string, page: number, limit: number = 100): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            try {
                freeText = `%${freeText}%`;
                const [res] = await pool.query(`
                    SELECT * FROM users
                    WHERE (
                        first_name LIKE ? OR
                        last_name LIKE ? OR
                        email LIKE ?
                    )
                    LIMIT ?, ?
                `, [freeText, freeText, freeText, (page - 1) * limit, limit]);
                return resolve(User.fromMySQLModels(res));

            } catch (err) {
                return reject(err);
            }
        });
    }

    public update(): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                this.updatedAt = new Date();
                await pool.query(`
                    UPDATE users 
                    SET ?
                    WHERE id = ?
                `, [this.toMySQLModel(), this.id]);
                return resolve(this);
            } catch (err) {
                return reject(err);
            }
        });
    }

    public delete(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query(`
                    DELETE FROM users 
                    WHERE id = ?
                `, [this.id]);
                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
}

export default User;