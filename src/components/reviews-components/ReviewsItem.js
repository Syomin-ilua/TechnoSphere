import styles from "./ReviewsItem.module.css";

const ReviewsItem = (props) => {

    const review = props.productReview;

    return (
        <li className={styles["review__product"]}>
            <div className={styles["review__user_info"]}>
                <div className={styles["avatar__wrapper"]}>
                    <img src={`${review.gender === "мужчина" ? "/users-images/men.png" : "/users-images/women.png"}`} alt="Фото пользователя" />
                </div>
                <div className={styles["review__info"]}>
                    <p className={styles["review__name"]}> 
                        {review.userName} 
                        <span className={styles["review__address"]}>г. {review.address}</span>
                    </p>
                    <p className={styles["review__date"]}>{review.date}</p>
                </div>
            </div>
                <div className={styles["review__description"]}>
                    {review.reviewData}
                </div>

        </li>
    );
}

export default ReviewsItem;