import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const basketChangeOrders = createAsyncThunk(
    "basket/basketChangeOrders",
    async function({userId}, {rejectWithValue, getState}) {

        const {items, itemsQuantity} = getState().basket;
        const userBasketDocRef = doc(db, "baskets", userId);

        try {

            await updateDoc(userBasketDocRef, {
                items,
                itemsQuantity
            });


        } catch(error) {
            return rejectWithValue(error.message);
        }

    }
);

export const basketGetOrders = createAsyncThunk(
    "basket/basketGetOrders",
    async function({userId}, {rejectWithValue}) {
        const docRef = doc(db, "baskets", userId);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
				const basket = docSnap.data();
                return basket;
			} else {
				throw new Error("No such document!");
			}

        } catch(error) {
            return rejectWithValue(error.message);
        }
    }    
)

const basketActionsInitialState = {
    items: [],
    itemsQuantity: 0,
    status: null,
    error: null,
    isBasketContentChanged: false,
}

const basketSlice = createSlice({
    name: "basket",
    initialState: basketActionsInitialState,
    reducers: {
        addItem(state, action) {
            const newProduct = action.payload;
            const existingItem = state.items.find((item) => item.id === newProduct.id);
            state.itemsQuantity += newProduct.quantity;
            state.isBasketContentChanged = true;
            if (!existingItem) {
                state.items.push({
                    id: newProduct.id,
                    productName: newProduct.productName,
                    productImage: newProduct.image,
                    quantity: newProduct.quantity,
                    cost: newProduct.cost,
                    totalPrice: newProduct.cost
                });
            } else {
                existingItem.quantity += newProduct.quantity;
                existingItem.totalPrice = existingItem.cost * existingItem.quantity;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.itemsQuantity--;
            state.isBasketContentChanged = true;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.cost;
            }
        },
        updatedBasket(state, action) {
            state.items = action.payload.items;
            state.itemsQuantity = action.payload.itemsQuantity;
        }
    },
    extraReducers: {
        [basketGetOrders.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [basketGetOrders.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [basketGetOrders.fulfilled]: (state, action) => {
            const payload = action.payload; 
            state.status = "resolved";
            state.items = payload.items || [];
            state.itemsQuantity = payload.itemsQuantity;
        },
        [basketChangeOrders.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});


export const basketActions = basketSlice.actions;
export default basketSlice;

