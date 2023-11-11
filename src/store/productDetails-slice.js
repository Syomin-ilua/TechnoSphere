import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const productDetailsInitialState = {
    status: null,
    error: null,
    product: null,
};

export const getProduct = createAsyncThunk(
    "productDetails/getProduct",
    async function (idProduct, { rejectWithValue }) {

        const docRef = doc(db, "products", "products");

        try {

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const products = docSnap.data();
                if (!products.items[idProduct]) {
                    throw new Error("Такого товара не сущетсвует!");
                }
                return products.items[idProduct];
            } else {
                throw new Error("Документ не существует!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// export const productChangeReviews = createAsyncThunk(
//     "productDetails/productChangeReviews",
//     async function (_, {rejectWithValue, getState}) {
        
//         const { fetchedProducts } = getState().products;
//         console.log(fetchedProducts);
//         const docRef = doc(db, "products", "products");

//         try {

//             await updateDoc(docRef, {
//                 items: fetchedProducts
//             });


//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: productDetailsInitialState,
    reducers: {
        
    },
    extraReducers: {
        [getProduct.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getProduct.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.product = action.payload;
        }
    }
});

export const productActions = productDetailsSlice.actions;
export default productDetailsSlice;