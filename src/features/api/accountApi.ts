import {createAsyncThunk} from "@reduxjs/toolkit";
import {baseUrl, createToken} from "../../utils/constants.ts";
import {Passwords, UserData, UserProfile, UserRegister} from "../../utils/types";
import {RootState} from "../../app/store.ts";


export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${baseUrl}/user`, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 409) {
            throw new Error(`user ${user.login} already exist`)
        }
        if (!response.ok) {
            console.log(response.status)
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return {token, user: data}
    }
)
export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'Post',
            headers: {
                Authorization: token
            }
        })
        if (response.status === 401) {
            throw new Error('wrong user login or password')
        }
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        const data = await response.json()
        return {token, user: data}
    }
)
export const updateUser = createAsyncThunk<UserProfile, UserData, { state: RootState }>(
    'user/update',
    async (user, {getState}) => {
        const response = await fetch(`${baseUrl}/user`, {
            method: 'Put',
            body: JSON.stringify(user),
            headers: {
                Authorization: getState().token,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        return await response.json();

    }
)

export const changePassword = createAsyncThunk<string, Passwords, { state: RootState }>(
    'user/password',
    async (passwords: Passwords, {getState}) => {
        // if (createToken(getState().user.login, passwords.oldPassword) === getState().token) {
            const response = await fetch(`${baseUrl}/user/password`, {
                method: 'Put',
                headers: {
                    Authorization: createToken(getState().user.login, passwords.oldPassword),
                    'X-Password': passwords.newPassword
                }
            })
            if (!response.ok) {
                throw new Error(`Something went wrong`)
            }
            return createToken(getState().user.login, passwords.newPassword)
        // }
        // alert('wrong password, needs to use actual password to change one')
        // return getState().token
    }
)