import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import mainSlice from "./main-slice";
import basketSlice from "./basket-slice";
import productsSlice from "./products-slice";
import userSlice from "./user-slice";
import productDetailsSlice from "./productDetails-slice";
import reviewsSlice from "./reviews-slice";
import ordersSlice from "./orders-slice";
import categoriesProductsSlice from "./categoriesProducts-slice";

const userReducer = combineReducers({
    user: userSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
        main: mainSlice.reducer,
        products: productsSlice.reducer,
        product: productDetailsSlice.reducer,
        reviews: reviewsSlice.reducer,
        basket: basketSlice.reducer,
        orders: ordersSlice.reducer,
        categoriesProducts: categoriesProductsSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };