import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const favouritesInitialState = {
    favourites: [],
    status: null,
    error: null,
    isFavoritesProductsContentChanged: false,
}

export const getFavouritesProducts = createAsyncThunk(
    "favourites/getFavouritesProducts",
    async function (userId, { rejectWithValue }) {

        const favouritesDocRef = doc(db, "favourites", userId);

        try {
            const favouritesProductsDocSnap = await getDoc(favouritesDocRef);

            if (favouritesProductsDocSnap.exists()) {
                const favourites = favouritesProductsDocSnap.data();
                return favourites;
            } else {
                throw new Error("Произошла ошибка получения данных о избранных товарах!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeFavouritesProducts = createAsyncThunk(
    "favourites/changeFavouritesProducts",
    async function (userId, { rejectWithValue, getState }) {

        const favouritesDocRef = doc(db, "favourites", userId);
        const { favoritesProducts } = getState().favourites; 

        try {
            await updateDoc(favouritesDocRef, {
                favoritesProducts
            });
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const favouritesSlice = createSlice({
    name: "favourites",
    initialState: favouritesInitialState,
    reducers: {
        addFavouriteProduct(state, action) {
            const favoriteProduct = action.payload;
            state.favourites.push(favoriteProduct);
            state.isFavoritesProductsContentChanged = true;
        },
        removeProductFavourites(state, action) {
            const id = action.payload;
            state.favourites = state.favourites.filter(favouriteProduct =>
                favouriteProduct.id !== id
            );
            state.isFavoritesProductsContentChanged = true;
        },
        resetFavoritesStateChanged(state) {
            state.isFavoritesProductsContentChanged = false;
        }
    },
    extraReducers: {
        [getFavouritesProducts.pending]: (state, action) => {
            state.status = "loading";
            state.error = null;
        },
        [getFavouritesProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getFavouritesProducts.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.favoritesProducts = action.payload;
        },
        [changeFavouritesProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export const favouritesActions = favouritesSlice.actions;
export default favouritesSlice;