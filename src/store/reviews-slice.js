import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const initialReviewsState = {
    error: null,
    status: null,
    reviews: [],
    rating: 0,
    reviewsAddState: false,
}

export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async function(idProduct, {rejectWithValue}) {

        const reviewsDocRef = doc(db, "reviews", idProduct);
        
        try {

            const docSnap = await getDoc(reviewsDocRef);

            if(docSnap.exists()) {

                const reviews = docSnap.data();
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
        
        const { reviews, rating } = getState().reviews;

        const reviewsDocRef = doc(db, "reviews", idProduct);
        
        try {

            await updateDoc(reviewsDocRef, {
                reviews,
                rating
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
            const sumRating = state.reviews.reduce((acc, item) => {
                return acc + item.estimation
            }, 0);
            const countRating = state.reviews.length;
            state.rating = Number(sumRating) / Number(countRating);
            state.reviewsAddState = true;  
        },
        resetReviewProductContentChangedState(state) {
            state.reviewsAddState = false;
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
            const { reviews, rating } = action.payload;
            state.status = "resolved";
            state.error = null;
            state.reviews = reviews || [];
            state.rating = rating
        }
    }
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice;


