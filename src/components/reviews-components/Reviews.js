import styles from "./Reviews.module.css";
import { useState } from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";

const Reviews = (props) => {

    const {productId, reviews} = props;
    const [isFormShowState, setIsFormShowState] = useState(false);

    const toggleFormAddReviewState = () => {
        setIsFormShowState(prevState => prevState = !prevState);
    }

    return (
        <div className={styles["reviews"]}>
            <div className={styles["add__reviews_wrapper"]}>
                <button onClick={toggleFormAddReviewState} className={styles["add__reviews"]}>{isFormShowState ? "Закрыть форму" : "Добавить отзыв"}</button>
            </div>
            {isFormShowState && <ReviewsForm productId={productId} />}
            {
                reviews.length === 0 ?
                    <p className={styles["reviews__emty_text"]}>У этого товара пока нет отзывов</p> :
                    <ReviewsList reviews={reviews} />
            }
        </div>
    );
}

export default Reviews;