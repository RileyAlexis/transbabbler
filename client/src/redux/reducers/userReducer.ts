import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "src/Types/UserType";

const initialState: UserType = {
    username: null,
    is_admin: false
};


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            console.log(action.payload.username);
            state.username = action.payload.username;
            state.is_admin = action.payload.is_admin;
        },
        logoutUser(state) {
            state.username = null;
            state.is_admin = false;
            return state;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;