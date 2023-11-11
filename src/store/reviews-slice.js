import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const initialReviewsState = {
    error: null,
    status: null,
    reviews: [],
    reviewsAddState: false,
}

export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async function(idProduct, {rejectWithValue}) {

        const reviewsDocRef = doc(db, "reviews", idProduct);
        
        try {

            const docSnap = await getDoc(reviewsDocRef);

            if(docSnap.exists()) {

                const { reviews } = docSnap.data();
                return reviews;

            } else {
                throw new Error("Документ не существует!");
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const changeReviews = createAsyncThunk(
    "reviews/changeReviews", 
    async function (idProduct, {rejectWithValue, getState}) {
        
        const { reviews } = getState().reviews;

        const reviewsDocRef = doc(db, "reviews", idProduct);
        
        try {

            await updateDoc(reviewsDocRef, {
                reviews
            });

        } catch (error) {
            return rejectWithValue(error.message);
        }
    } 
)

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: initialReviewsState,
    reducers: {
        addReviewProduct(state, action) {
            const review = action.payload;
            state.reviews.push(review);
            state.reviewsAddState = true;  
        }
    },
    extraReducers: {
        [getReviews.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [getReviews.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getReviews.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.error = null;
            state.reviews = action.payload || [];
        }
    }
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice;


