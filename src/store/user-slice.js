import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
    email: null,
    token: null,
    id: null,
}

const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        }, 
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;
