import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./main-slice";
import basketSlice from "./basket-slice";
import productsSlice from "./products-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        main: mainSlice.reducer,
        products: productsSlice.reducer,
        basket: basketSlice.reducer,
    }
});

export default store;