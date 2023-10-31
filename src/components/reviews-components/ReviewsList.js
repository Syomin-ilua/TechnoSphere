import ReviewsItem from "./ReviewsItem";
import styles from "./ReviewsList.module.css";

const ReviewsList = (props) => {

    const reviews = props.reviews;

    return (
        <ul className={styles["reviews__list"]}>
            {
                reviews.map(review => (
                    <ReviewsItem
                        key={review.id}
                        productReview={{
                            id: review.id,
                            userSurname: review.userSurname,
                            userName: review.userName,
                            userPatronymic: review.userPatronymic,
                            date: review.date,
                            reviewData: review.reviewData
                        }}
                    />
                ))
            }
        </ul>
    )
}

export default ReviewsList;