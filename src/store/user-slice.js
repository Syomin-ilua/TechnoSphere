import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const userInitialState = {
    email: null,
    token: null,
    id: null,
    status: null,
    error: null,
    user: null,
    isUserContentChanged: false
}

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async function(userId, {rejectWithValue}) {
        
        const userDocRef = doc(db, "users", userId);
        
        try {
            const userSnap = await getDoc(userDocRef);

            if(userSnap.exists()) {
                const userData = userSnap.data();
                return userData;
            } else {
                throw new Error("Произошла ошибка!");
            }

        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeUserInfo = createAsyncThunk(
    "user/changeUserInfo",
    async function(userId, {rejectWithValue, getState}) {
        
        const { user } = getState().user.user;
        const userRef = doc(db, "users", userId);
        
        try {

            await updateDoc(userRef, user);

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


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
            state.user = null;
        },
        changeUser(state, action) {
            const userChangeData = action.payload;
            state.user.surname = userChangeData.surname;
            state.user.name = userChangeData.name;
            state.user.patronymic = userChangeData.patronymic;
            state.user.email = userChangeData.email;
            state.user.tel = userChangeData.tel;
            state.user.gender = userChangeData.gender;
            state.user.dateOfBirth = userChangeData.dateOfBirth;
            state.user.address = userChangeData.address;
            state.isUserContentChanged = true;
        }
    }, 
    extraReducers: {
        [getUserInfo.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getUserInfo.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.user = action.payload;
        },
        [changeUserInfo.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;
