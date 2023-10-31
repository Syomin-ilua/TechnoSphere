import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productDetailsInitialState = {    
    reviews: [],
    status: null,
    error: null,
};

const productDetails = createSlice({
    name: "productDetails",
    initialState: productDetailsInitialState,
    reducers: {

    },
    extraReducers: {

    }
});

export const productActions = productDetails.actions;
export default productDetails;