import ReviewsItem from "./ReviewsItem";
import styles from "./ReviewsList.module.css";

const ReviewsList = (props) => {

    const reviews = props.reviews;

    const reviewsEmpty =
        <div className={styles["reviews__empty"]}>
            <p>У этого товара пока нету отзывов</p>
        </div>;

    return (
        <div className="reviews__list_wrapper">
            {reviews.length === 0 ? reviewsEmpty :
                <ul className={styles["reviews__list"]}>
                    {
                        reviews.map(review => (
                            <ReviewsItem
                                key={review.id}
                                productReview={{
                                    id: Math.random(),
                                    date: review.date,
                                    reviewData: review.reviewData,
                                    productID: review.productId,
                                    userId: review.userId,
                                    userName: review.userName,
                                    gender: review.gender,
                                    address: review.address
                                }}
                            />
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default ReviewsList;