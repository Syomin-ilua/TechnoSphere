import { useState } from "react";
import { useDispatch } from "react-redux";
import { productsActions } from "../../store/products-slice";
import styles from "./ReviewsForm.module.css";

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


    const dispatchAction = useDispatch();
    const [comment, setComment] = useState("");
    const [InvalidMessage, setInvalidMessage] = useState(null);
    const productId = props.productId;

    const commentHandler = (event) => {
        setComment(event.target.value);
    }

    const formReviewsSubmitHandler = (event) => {
        event.preventDefault();

        if (comment.trim().length === 0) {
            setInvalidMessage("Отзыв не должен быть пустым!");
            return;
        }

        if (comment.trim().length < 4) {
            setInvalidMessage("Отзыв не должен быть меньше 4 символов!");
            return;
        }

        setInvalidMessage(null);

        const review = {
            id: Math.random(),
            date: date.format(now),
            reviewData: comment,
            productID: productId,
            userId: 1,
            userSurname: "Сёмин",
            userName: "Илья",
            userPatronymic: "Александрович"
        }

        
        dispatchAction(productsActions.addReviewProduct(review))
        
    }

    return (
        <form onSubmit={formReviewsSubmitHandler} className={styles["reviews__form"]}>
            <label className={styles["reviews__label"]} htmlFor="comment">
                Введите комментарий:
                <textarea className={styles["reviews__comment_input"]} id="comment" onChange={commentHandler} value={comment}></textarea>
                {InvalidMessage && <p className={styles["ivalid__text"]}>{InvalidMessage}</p>}
            </label>
            <button type="submit" className={styles["btn__add_review"]}>Добавить</button>
        </form>
    );
}

export default ReviewsForm;