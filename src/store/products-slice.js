import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const initialProductsState = {
    products: [],
    currentProducts: [],
    status: null,
    error: null,
    filteredSettings: {
        searchValue: "",
        categoryProducts: "all",
        minCost: 0,
        maxCost: 200000
    }
}

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async function (_, { rejectWithValue }) {
        try {
            const productsSnapshot = await getDocs(collection(db, "products"));

            const product = productsSnapshot.docs.map((doc) => {
                return doc.data();
            });

            return product;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeProducts = createAsyncThunk(
    "products/changeProducts",
    async function (newProduct, { rejectWithValue }) {
        try {

            await setDoc(doc(db, "products", `${newProduct.id}`), {
                ...newProduct
            });

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        changeSearchValue(state, action) {
            const searchValue = action.payload;
            state.filteredSettings.searchValue = searchValue;
        },
        changeCategorySettings(state, action) {
            const categoryProducts = action.payload;
            state.filteredSettings.categoryProducts = categoryProducts;
        },
        changeMinMaxCost(state, action) {
            const { minCost, maxCost } = action.payload;
            state.filteredSettings.minCost = Number(minCost);
            state.filteredSettings.maxCost = Number(maxCost);
        },
        filteredProducts(state) {
            const { searchValue, minCost, maxCost, categoryProducts } = state.filteredSettings;

            if (state.filteredSettings.categoryProducts === "all") {
                state.currentProducts = state.products;
                if (state.filteredSettings.searchValue.length === 0) {
                    state.currentProducts = state.currentProducts.filter((product) =>
                        product.cost > minCost && product.cost < maxCost
                    );
                    state.currentProducts = state.currentProducts.filter((product) =>
                        product.cost > minCost && product.cost < maxCost
                    );
                    return;
                }

                state.currentProducts = state.currentProducts.filter((product) =>
                    product.cost > minCost && product.cost < maxCost
                );
                state.currentProducts = state.currentProducts.filter(product =>
                    product.productName.toLowerCase().includes(searchValue.toLowerCase())
                );
                return;
            }

            state.currentProducts = state.products.filter((product) =>
                product.type === categoryProducts
            );

            state.currentProducts = state.currentProducts.filter((product) =>
                product.cost > minCost && product.cost < maxCost
            );

            state.currentProducts = state.currentProducts.filter(product =>
                product.productName.toLowerCase().includes(searchValue.toLowerCase())
            );

        },
        resetProductsContentChangedState(state) {
            state.isProductsContentChanged = false;
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.products = action.payload;
            state.currentProducts = action.payload;
        },
        [changeProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;