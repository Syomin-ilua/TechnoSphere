import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const initialCategoriesProductsState = {
    status: null,
    error: null,
    categoriesProducts: [],
    isCategoriesProductsContentChanges: false
}

export const getCategoriesProducts = createAsyncThunk(
    "categoriesProducts/getCategoriesProducts",
    async function (_, { rejectWithValue }) {
        const categoriesProductsDocRef = doc(db, "categoriesProducts", "categoriesProducts");

        try {
            const categoriesProductsDocSnap = await getDoc(categoriesProductsDocRef);

            if (categoriesProductsDocSnap.exists()) {
                const { categoriesProducts } = categoriesProductsDocSnap.data();
                return categoriesProducts;
            } else {
                throw new Error("Произошла ошибка!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeCategoriesProducts = createAsyncThunk(
    "categoriesProducts/changeCategoriesProducts",
    async function (_, { rejectWithValue, getState }) {
        const categoriesProductsDocRef = doc(db, "categoriesProducts", "categoriesProducts");
        const { categoriesProducts } = getState().categoriesProducts;
        
        try {
            await updateDoc(categoriesProductsDocRef, {
                categoriesProducts
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const categoriesProductsSlice = createSlice({
    name: "categoriesProducts",
    initialState: initialCategoriesProductsState,
    reducers: {
        addCategories(state, action) {
            const categorieProducts = action.payload;
            state.categoriesProducts.push(categorieProducts);
            state.isCategoriesProductsContentChanges = true;
        },
        editCategories(state, action) {
            const { categorieProducts } = action.payload;
            const existingCategorie = state.categoriesProducts.find((categorie) => {
                return categorie.id === categorieProducts.idCategorie
            });
            existingCategorie.filterValue = categorieProducts.filterValue;
            existingCategorie.filterTypeText = categorieProducts.filterTypeText;
            state.isCategoriesProductsContentChanges = true;
        },
        removeCategorie(state, action) {
            const idCategorie = action.payload;
            state.categoriesProducts = state.categoriesProducts.filter((categorie) => {
                return categorie.id !== idCategorie
            });
            state.isCategoriesProductsContentChanges = true;
        },
        resetCategoriesProductsContentChangedState(state) {
            state.isCategoriesProductsContentChanges = false;
        }
    },
    extraReducers: {
        [getCategoriesProducts.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getCategoriesProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getCategoriesProducts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.categoriesProducts = action.payload;
        },
        [changeCategoriesProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const categoriesProductsActions = categoriesProductsSlice.actions;
export default categoriesProductsSlice;