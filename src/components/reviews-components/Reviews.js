import styles from "./Reviews.module.css";
import { useEffect, useState } from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UI-components/Loader";
import { changeReviews, getReviews } from "../../store/reviews-slice";

let isInitialRunning = true;

const Reviews = (props) => {

    const { productId } = props;
    const [isFormShowState, setIsFormShowState] = useState(false);
    
    const { status, error, reviews, reviewsAddState } = useSelector((state) => state.reviews);
    const dispatchAction = useDispatch();

    const toggleFormAddReviewState = () => {
        setIsFormShowState(prevState => prevState = !prevState);
    }

    useEffect(() => {
        dispatchAction(getReviews(productId));
    }, []);

    useEffect(() => {
        
        if(isInitialRunning) {
            isInitialRunning = false;
            return;
        }

        if(reviewsAddState) {
            dispatchAction(changeReviews(productId));
        }

    }, [reviews]);

    return (
        <div className={styles["reviews"]}>
            <div className={styles["add__reviews_wrapper"]}>
                <button onClick={toggleFormAddReviewState} className={styles["add__reviews"]}>{isFormShowState ? "Закрыть форму" : "Добавить отзыв"}</button>
            </div>
            {isFormShowState && <ReviewsForm productId={productId} />}
            {status === "loading" && <Loader/>}
            {error && <p className={styles["reviews__error"]}>Произошла ошибка - {error} </p>}
            {status === "resolved" && <ReviewsList reviews={reviews} />}
        </div>
    );
}

export default Reviews;