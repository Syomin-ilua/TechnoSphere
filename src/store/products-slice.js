import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URLFirebaseProducts = "https://react-course-http-cae26-default-rtdb.firebaseio.com/products.json";

const initialProductsState = {
    status: null,
    error: null,
    fetchedProducts: [],
    currentProducts: [],
    listSearchProducts: [],
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(URLFirebaseProducts);

            if (!response.ok) {
                throw new Error("Произошла ошибка при получении товаров!")
            }

            const productsData = response.json();

            return productsData;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        filteredProducts(state, action) {
            const filteredProductsType = action.payload;
            state.currentProducts = state.fetchedProducts;

            if (filteredProductsType === "all") {
                return;
            }

            state.currentProducts = state.currentProducts.filter((product) =>
                product.type === filteredProductsType
            );
        },
        searchProducts(state, action) {
            const searchValue = action.payload;

            state.listSearchProducts = state.fetchedProducts;

            if (searchValue.length === 0) {
                state.listSearchProducts = state.fetchedProducts;
                state.currentProducts = state.fetchedProducts;
            }

            state.listSearchProducts = state.listSearchProducts.filter(product =>
                product.productName.toLowerCase().includes(searchValue.toLowerCase())
            );
        },
        searchProduct(state, action) {
            const {queryCategory, querySearch} = action.payload;
            
            state.listSearchProducts = state.fetchedProducts; 

            if(querySearch.length === 0 && queryCategory === "all") {
                state.listSearchProducts = state.fetchedProducts;
                state.currentProducts = state.fetchedProducts;
                return;
            }
            
            if(querySearch.length === 0) {
                state.listSearchProducts = state.fetchedProducts.filter(product =>
                    product.type === queryCategory   
                );
                state.currentProducts = state.fetchedProducts.filter(product =>
                    product.type === queryCategory   
                );
                return;
            }

            if(querySearch.length !== 0 && queryCategory === "all") {
                state.listSearchProducts = state.fetchedProducts.filter(product => 
                    product.productName.toLowerCase().includes(querySearch.toLowerCase())
                );    
                return;
            } 

            state.listSearchProducts = state.listSearchProducts.filter(product => 
                product.productName.toLowerCase().includes(querySearch.toLowerCase()) && product.type === queryCategory
            );

            
        },
        showProduct(state, action) {
            const id = action.payload;

            state.currentProducts = state.fetchedProducts.filter(product => 
                product.id === id    
            )
        },
        addReviewProduct(state, action) {
            const review = action.payload;
            
            const reviewItem = state.fetchedProducts.find((product) => product.id === review.productID);
            console.log(reviewItem);
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
            state.fetchedProducts = action.payload;
            state.currentProducts = action.payload;
            state.listSearchProducts = action.payload;
        }
    }
});

export const productsActions = productsSlice.actions;
export default productsSlice;