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
            console.log(action.payload);
            state = action.payload;
        },
        logoutUser(state) {
            state = initialState;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;