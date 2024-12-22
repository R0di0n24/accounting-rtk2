export enum UpdateMode {
    DEFAULT, EDIT_PROFILE, CHANGE_PASSWORD
}

export interface UserProfile {
    "login": string,
    "firstName": string,
    "lastName": string,
    "roles": string[]
}

export interface UserRegister {
    "firstName": string,
    "lastName": string,
    "login": string,
    "password": string,

}

export interface UserData {
    firstName: string,
    lastName: string
}

export interface Passwords {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}