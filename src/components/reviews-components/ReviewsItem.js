import styles from "./ReviewsItem.module.css";

const ReviewsItem = (props) => {

    const review = props.productReview;

    return (
        <li className={styles["review__product"]}>
            <div className={styles["review__info"]}>
                <p className={styles["review__name"]}><span>От кого:</span> {review.userSurname} {review.userName} {review.userPatronymic}</p>
                <p className={styles["review__date"]}><span>Время публикации:</span> {review.date}</p>
            </div>

            <div className={styles["review__description"]}>
                <span>Комментарий: </span>
                {review.reviewData}
            </div>
        </li>
    );
}

export default ReviewsItem;