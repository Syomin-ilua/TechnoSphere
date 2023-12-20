import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ReviewsForm.module.css";
import { reviewsActions } from "../../store/reviews-slice";
import { changeReviews } from "../../store/reviews-slice";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

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
    
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    const productId = props.productId;
    const userId = useSelector((state) => state.user.user.id);

    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true);

            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userInfo = docSnap.data();
                setUser(userInfo);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                throw new Error("No such document!");
            }
        }

        getUserData().catch(error => {
            alert("Произошла ошибка - " + error);
        });
    }, []);

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

        if(isLoading || error) {
            return;
        }

        const review = {
            id: Math.random(),
            date: date.format(now),
            reviewData: comment,
            productID: productId,
            userId: userId,
        }

        dispatchAction(reviewsActions.addReviewProduct(review));
        setComment("");
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