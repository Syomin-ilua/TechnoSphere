import styles from "./Reviews.module.css";
import { useEffect, useState } from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../UI-components/Loader";
import { changeReviews } from "../../store/reviews-slice";
import { useAuth } from "../../hooks/use-auth";

let isInitialRunning = true;

const Reviews = (props) => {

    const { isAuth } = useAuth();

    const { productId } = props;
    const [isFormShowState, setIsFormShowState] = useState(false);

    const { status, error, reviews, reviewsAddState } = useSelector((state) => state.reviews);
    const dispatchAction = useDispatch();

    const showFormAddReviewStateHandler = () => {
        setIsFormShowState(true);
    }

    const hideFormAddReviewStateHandler = () => {
        setIsFormShowState(false);
    }

    useEffect(() => {

        if (isInitialRunning) {
            isInitialRunning = false;
            return;
        }

        if (reviewsAddState) {
            dispatchAction(changeReviews(productId));
        }

    }, [reviews]);

    return (
        <div className={styles["reviews"]}>
            {
                isAuth &&
                <div className={styles["add__reviews_wrapper"]}>
                    <button onClick={showFormAddReviewStateHandler} className={styles["add__reviews"]}>Оставить отзыв</button>
                </div>
            }
            {isFormShowState && <ReviewsForm onHideCart={hideFormAddReviewStateHandler} productId={productId} />}
            {status === "loading" && <Loader />}
            {error && <p className={styles["reviews__error"]}>Произошла ошибка - {error} </p>}
            {status === "resolved" && <ReviewsList reviews={reviews} />}
        </div>
    );
}

export default Reviews;