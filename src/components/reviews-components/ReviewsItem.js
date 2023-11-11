import styles from "./ReviewsItem.module.css";

const ReviewsItem = (props) => {

    const review = props.productReview;

    return (
        <li className={styles["review__product"]}>
            <div className={styles["review__info"]}>
                <p className={styles["review__name"]}><span>Пользователь: </span> {review.userId} </p>
                <p className={styles["review__date"]}>{review.date}</p>
            </div>

            <div className={styles["review__description"]}>
                {review.reviewData}
            </div>
        </li>
    );
}

export default ReviewsItem;