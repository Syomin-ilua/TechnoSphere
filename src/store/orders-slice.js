import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ordersInitialState = {
    orders: [],
    status: null,
    error: null,
    isOrdersContentChanged: false
}

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async function (userId, { rejectWithValue }) {

        const docRef = doc(db, "orders", userId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { orders } = docSnap.data();
                return orders;
            } else {
                throw new Error("Документ не существует!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeOrders = createAsyncThunk(
    "orders/changeOrders",
    async function (userId, { rejectWithValue, getState }) {

        const { orders } = getState().orders;
        const docRef = doc(db, "orders", userId);

        try {

            await updateDoc(docRef, {
                orders
            });

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState: ordersInitialState,
    reducers: {
        makingOrder(state, action) {
            const order = action.payload;
            state.orders.push(order);
            state.isOrdersContentChanged = true
        },
        resetOrdersContentChangedState(state) {
            state.isOrdersContentChanged = false;
        }
    },
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getOrders.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.orders = action.payload;
        },
        [changeOrders.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;