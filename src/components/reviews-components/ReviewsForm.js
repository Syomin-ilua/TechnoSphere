import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewsActions } from "../../store/reviews-slice";
import useInput from "../../hooks/use-input";
import Modal from "../UI-components/Modal";
import { FaStar } from "react-icons/fa";
import styles from "./ReviewsForm.module.css";
import { toast } from "react-toastify";

const now = new Date();

const date = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

const ReviewsForm = (props) => {

    const productId = props.productId;

    const userId = useSelector((state) => state.user.user.id);
    const { status, error, reviews } = useSelector((state) => state.reviews);
    const dispatchAction = useDispatch();

    const {
        value: enteredDignities,
        hasError: hasDignitiesInputError,
        isValid: isEnteredDignitiesValid,
        inputChangeHandler: dignitiesInputChangeHandler,
        inputLostFocusHandler: dignitiesInputLostFocusHandler,
        resetValues: resetDignitiesInputValues
    } = useInput((val) => val.trim().length >= 3);

    const {
        value: enteredDisadvantages,
        hasError: hasDisadvantagesInputError,
        isValid: isEnteredDisadvantagesValid,
        inputChangeHandler: disadvantagesInputChangeHandler,
        inputLostFocusHandler: disadvantagesInputLostFocusHandler,
        resetValues: resetDisadvantagesInputValues
    } = useInput((val) => val.trim().length >= 3);

    const {
        value: enteredComment,
        hasError: hasCommentInputError,
        isValid: isEnteredCommentValid,
        inputChangeHandler: commentInputChangeHandler,
        inputLostFocusHandler: commentInputLostFocusHandler,
        resetValues: resetCommentInputValues
    } = useInput((val) => val.trim().length > 8);

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const formReviewsSubmitHandler = (event) => {
        event.preventDefault();

        if (!isEnteredDignitiesValid || !isEnteredDisadvantagesValid || !isEnteredCommentValid) {
            return;
        }

        const existingReviewUser = reviews.findIndex((review) => 
            review.userId === userId
        );

        if(existingReviewUser !== -1) {
            toast.warn("Больше одно отзыва от пользователя оставлять нельзя! Удалите прошлый и создайте новый");
            return;
        }

        const review = {
            id: Math.random(),
            date: date.format(now),
            estimation: rating,
            reviewDignities: enteredDignities,
            reviewDisadvantages: enteredDisadvantages,
            reviewData: enteredComment,
            productID: productId,
            userId: userId,
        }

        dispatchAction(reviewsActions.addReviewProduct(review));

        resetDignitiesInputValues();
        resetDisadvantagesInputValues();
        resetCommentInputValues();
    }

    return (
        <Modal onHideCart={props.onHideCart}>
            <form onSubmit={formReviewsSubmitHandler} className={styles["reviews__form"]}>
                <div className={styles["review__title_wrapper"]}>
                    <h2 className={styles["review__title"]}>Мой отзыв</h2>
                </div>
                <label className={styles["estimation__label"]}>
                    Оценка:
                    {[...Array(5)].map((star, idx) => {
                        const ratingValue = idx + 1;
                        return (
                            <label>
                                <input
                                    className={styles["estimation__input"]}
                                    value={ratingValue}
                                    type="radio"
                                    name="rating"
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className={styles["star__icon"]}
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        )
                    })}
                </label>
                <label className={styles["reviews__label"]} htmlFor="dignities">
                    Достоинства:
                    <textarea
                        className={styles["reviews__dignities_input"]}
                        id="dignities"
                        onChange={dignitiesInputChangeHandler}
                        onBlur={dignitiesInputLostFocusHandler}
                        value={enteredDignities}
                    >
                    </textarea>
                    {hasDignitiesInputError && <p className={styles["ivalid__text"]}>Это поле не должно быть пустым!</p>}
                </label>
                <label className={styles["reviews__label"]} htmlFor="disadvantages">
                    Недостатки:
                    <textarea
                        className={styles["reviews__disadvantages_input"]}
                        id="disadvantages"
                        onChange={disadvantagesInputChangeHandler}
                        onBlur={disadvantagesInputLostFocusHandler}
                        value={enteredDisadvantages}
                    >
                    </textarea>
                    {hasDisadvantagesInputError && <p className={styles["ivalid__text"]}>Это поле не должно быть пустым!</p>}
                </label>
                <label className={styles["reviews__label"]} htmlFor="comment">
                    Введите комментарий:
                    <textarea
                        className={styles["reviews__comment_input"]}
                        id="comment"
                        onChange={commentInputChangeHandler}
                        onBlur={commentInputLostFocusHandler}
                        value={enteredComment}
                    >
                    </textarea>
                    {hasCommentInputError && <p className={styles["ivalid__text"]}>Это поле не должно быть пустым!</p>}
                </label>
                <div className={styles["btn__add_review-wrapper"]}>
                    <button type="submit" className={styles["btn__add_review"]}>Оставить отзыв</button>
                </div>
            </form>
        </Modal>
    );
}

export default ReviewsForm;