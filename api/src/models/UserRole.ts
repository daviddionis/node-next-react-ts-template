import pool from "../database";
import { dateToMySQLTimestamp } from "../utils/mysql.utils";
import ErrorControlled from "./ErrorControlled";
import { Role } from "./Role";

interface UserRoleMySQLModel {
    id: number;
    user_id: number;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export interface UserRoleModel {
    id: number;
    userId: number;
    roleId: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRoleAdminAPIModel {
    id: number;
    user_id: number;
    role_id: number;
    created_at: string;
    updated_at: string;
}

class UserRole implements UserRoleModel {

    constructor(
        public id: number,
        public userId: number,
        public roleId: Role,
        public createdAt: Date,
        public updatedAt: Date
    ) { }

    private static fromMySQLModel(userRole: UserRoleMySQLModel): UserRole {
        return new UserRole(
            userRole.id,
            userRole.user_id,
            userRole.role_id,
            new Date(userRole.created_at),
            new Date(userRole.updated_at)
        );
    }

    private static fromMySQLModels(userRoles: UserRoleMySQLModel[]): UserRole[] {
        return userRoles.map(userRole => UserRole.fromMySQLModel(userRole));
    }

    private toMySQLModel(): UserRoleMySQLModel {
        return {
            id: this.id,
            user_id: this.userId,
            role_id: this.roleId,
            created_at: dateToMySQLTimestamp(this.createdAt),
            updated_at: dateToMySQLTimestamp(this.updatedAt)
        };
    }

    public static fromAdminAPIModel(userRole: UserRoleAdminAPIModel): UserRole {
        return new UserRole(
            userRole.id,
            userRole.user_id,
            userRole.role_id,
            new Date(userRole.created_at),
            new Date(userRole.updated_at)
        );
    }

    public toAdminAPIModel(): UserRoleAdminAPIModel {
        return {
            id: this.id,
            user_id: this.userId,
            role_id: this.roleId,
            created_at: this.createdAt.toISOString(),
            updated_at: this.updatedAt.toISOString()
        };
    }

    public static empty(): UserRole {
        return new UserRole(
            0,
            0,
            0,
            new Date(),
            new Date()
        );
    }

    public create(): Promise<UserRole> {
        return new Promise(async (resolve, reject) => {
            try {
                this.createdAt = new Date();
                const [res] = await pool.query(`
                    INSERT INTO user_roles 
                    SET ?
                `, [this.toMySQLModel()]);
                this.id = res.insertId;
                return resolve(this);
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findByUserId(userId: number): Promise<UserRole[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const [res] = await pool.query(`
                    SELECT * FROM user_roles 
                    WHERE user_id = ?
                `, [userId]);
                return resolve(UserRole.fromMySQLModels(res));
            } catch (err) {
                return reject(err);
            }
        });
    }

    public static findByUserIdAndRoleId(userId: number, roleId: number): Promise<UserRole> {
        return new Promise(async (resolve, reject) => {
            try {
                const [res] = await pool.query(`
                    SELECT * FROM user_roles 
                    WHERE user_id = ? 
                    AND role_id = ?
                `, [userId, roleId]);
                if (res.length === 0)
                    throw new ErrorControlled("User role not found", 404);
                return resolve(UserRole.fromMySQLModel(res[0]));
            } catch (err) {
                return reject(err);
            }
        });
    }

    public update(): Promise<UserRole> {
        return new Promise(async (resolve, reject) => {
            try {
                this.updatedAt = new Date();
                await pool.query(`
                    UPDATE user_roles 
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
                    DELETE FROM user_roles 
                    WHERE id = ?
                `, [this.id]);
                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
}

export default UserRole;
