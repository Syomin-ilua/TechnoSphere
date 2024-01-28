import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import styles from "./ReviewsItem.module.css";
import 'react-loading-skeleton/dist/skeleton.css'

const ReviewsItem = (props) => {

    const review = props.productReview;

    const { id } = useSelector((state) => state.user.user) || "";
    const [userDataReview, setUserDataReview] = useState(null);
    const { userRole } = useSelector((state) => state.user.user.user) || "";

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getUserReview = async (id) => {
            setIsLoading(true);

            const userDocRef = doc(db, "users", id);

            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                setUserDataReview(userData);
                setIsLoading(false)
            } else {
                setIsLoading(false);
                throw new Error("Произошла ошибка!");
            }

        }

        getUserReview(review.userId).catch((error) => {
            toast.warning(`Произошла ошибка - ${error}`);
        });

    }, []);

    return (
        <li className={styles["review__product"]}>
            <div>
                <div className={styles["review__user_info"]}>
                    <div className={styles["avatar__wrapper"]}>
                        {isLoading ?
                            <Skeleton
                                speed={2}
                                width={50}
                                height={50}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                                borderRadius={`50%`}
                            /> :
                            <img src={`${userDataReview.gender === "мужчина" ? "/users-images/men.png" : "/users-images/women.png"}`} alt="Фото пользователя" />
                        }
                    </div>
                    <div className={styles["review__info"]}>
                        <p className={styles["review__name"]}>
                            {isLoading ?
                                <Skeleton
                                    speed={2}
                                    width={50}
                                    height={10}
                                    viewBox="0 0 400 160"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                /> :
                                userDataReview.name
                            }
                            {isLoading ?
                                <Skeleton
                                    speed={2}
                                    height={10}
                                    viewBox="0 0 400 160"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                /> :
                                review.userId === id && <p className={styles["user__review"]}>Ваш отзыв</p>
                            }
                        </p>
                        <div className={styles["review__dateAndRatting"]}>
                            {isLoading ?
                                <Skeleton
                                    height={10}
                                    speed={2}
                                    width={162}
                                    viewBox="0 0 400 160"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                /> :
                                <p className={styles["review__date"]}>{review.date}</p>
                            }
                            {isLoading ?
                                <Skeleton
                                    height={5}
                                    speed={2}
                                    width={162}
                                    viewBox="0 0 400 160"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                /> :
                                <div className={styles["rating__wrapper"]}>
                                    <FaStar color={review.estimation === 0 ? "#e4e5e9" : "#ffc107"} />
                                    <p className={styles["rating__number"]}>{review.estimation}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles["review__text"]}>
                    <span>Достоинства: </span>
                    {isLoading ?
                        <div>
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                        </div> :
                        <p>{review.reviewDignities}</p>
                    }
                </div>
                <div className={styles["review__text"]}>
                    <span>Недоастатки: </span>
                    {isLoading ?
                        <div>
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                        </div> :
                        <p>{review.reviewDisadvantages}</p>
                    }
                </div>
                <div className={styles["review__text"]}>
                    <span>Комментарий: </span>
                    {isLoading ?
                        <div>
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                            <Skeleton
                                height={10}
                                speed={2}
                                viewBox="0 0 400 160"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            />
                        </div> :
                        <p>{review.reviewData}</p>
                    }
                </div>
            </div>
            <ToastContainer />
        </li>
    );
}

export default ReviewsItem;