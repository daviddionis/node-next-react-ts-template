
export enum Role {
    Admin = 1,
    User = 2,
}

export const RoleNames = {
    [Role.Admin]: 'Admin',
    [Role.User]: 'User',
};

export const Roles = Object.keys(RoleNames).map(key => parseInt(key));