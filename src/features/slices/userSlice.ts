import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserProfile} from "../../utils/types";
import {fetchUser, registerUser, updateUser} from "../api/accountApi.ts";

const userSlice = createSlice({
    name: "user",
    initialState: {} as UserProfile,
    reducers: {
        setUser: (_state, action: PayloadAction<UserProfile>) => action.payload,
        deleteUser: () => ({} as UserProfile),
        changeFirstName: (state, action: PayloadAction<UserProfile>) => {
            state.firstName = action.payload.firstName;
        },
        changeLastName: (state, action: PayloadAction<UserProfile>) => {
            state.lastName = action.payload.lastName;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(fetchUser.fulfilled, (_state, action) => action.payload.user)
            .addCase(updateUser.fulfilled, (_state, action) => action.payload)
    }
})
export const {setUser, deleteUser, changeFirstName, changeLastName} = userSlice.actions;
export default userSlice.reducer;