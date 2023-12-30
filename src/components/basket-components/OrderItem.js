import { basketActions } from "../../store/basket-slice";
import { useDispatch } from "react-redux";
import styles from "./OrderItem.module.css";
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { favouritesActions } from "../../store/favourites-slice";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const OrderItem = (props) => {

    const { id, orderName, orderImage, quantity, totalPrice, price } = props.order;

    const dispatchAction = useDispatch();

    const favouritesProducts = useSelector((state) => state.favourites.favouritesProducts);

    const existingFavouritesProduct = favouritesProducts.find((favouritesProduct) =>
        favouritesProduct.id === id
    );

    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getRattingProduct = async () => {
            setIsLoading(true);
            const reviewsDocRef = doc(db, "reviews", id);

            const docSnap = await getDoc(reviewsDocRef);

            if (docSnap.exists()) {

                const { rating } = docSnap.data();
                setRating(rating);
                setIsLoading(false);

            } else {
                setIsLoading(false);
                throw new Error("Произошла ошибка при загрузке рейтинга товара!");
            }

        }

        getRattingProduct().catch((error) => {
            toast.warning(error);
        });
    }, []);


    const addOrderHandler = () => {
        dispatchAction(basketActions.addItem({
            id: id,
            image: orderImage,
            productName: orderName,
            cost: price,
            quantity: 1
        }));
    }

    const removeOrderHandler = () => {
        dispatchAction(basketActions.removeItem(id));
    }

    const deleteProductBasketHandler = () => {
        dispatchAction(basketActions.deleteProductInBasket(id));
    }


    const addProductFavouritesHandler = () => {
        dispatchAction(favouritesActions.addFavouriteProduct({
            id: id,
            image: orderImage,
            productName: orderName,
            cost: price,
        }));
    }

    const removeProductFavouritesHandler = () => {
        dispatchAction(favouritesActions.removeProductFavourites(id));
    }

    return (
        <div className={styles.order}>
            {
                isLoading ?
                    <div className={styles["rating__wrapper"]}>
                        <Skeleton
                            speed={2}
                            width={20}
                            height={20}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            borderRadius={`50%`}
                        />
                        <Skeleton
                            speed={2}
                            width={40}
                            height={15}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        />
                    </div>
                    :
                    <div className={styles["rating__wrapper"]}>
                        <FaStar color={rating === 0 ? "#e4e5e9" : "#ffc107"} />
                        <p className={styles["rating__number"]}>{rating !== 0 ? rating : null}</p>
                    </div>
            }
            <div className={styles.orderImageWrapper}>
                <img src={`/products-images/${orderImage}`} alt={orderName} className="imageOrder" />
                <div className={styles.productInformation}>
                    <Link to={`/products/${id}`} className={styles.orderName}>{orderName}</Link>
                    <p className={styles.cost}><span>Цена:</span> {price} руб. / 1 шт</p>
                </div>
            </div>
            <div className={styles.orderInformation}>
                <div className={styles.orderInfo}>
                    <div className={styles.orderPriceWrapper}>
                        <p className={styles.orderPrice}><span>Колличество:</span> {quantity} шт. за {totalPrice} руб.</p>
                    </div>
                </div>
                <div className={styles.orderActions}>
                    <div className={styles["order__change_actions"]}>
                        <button className={styles.btnAddOrder} onClick={addOrderHandler}>
                            +
                        </button>
                        <button className={styles["btnRemoveOrder"]} onClick={removeOrderHandler}>
                            -
                        </button>
                        <button onClick={deleteProductBasketHandler} className={styles["btn__delete_product-basket"]}>
                            <DeleteProductInBasketIcon />
                            <p>Убрать из корзины</p>
                        </button>
                    </div>
                    <button onClick={!existingFavouritesProduct ? addProductFavouritesHandler : removeProductFavouritesHandler} className={styles["btn__favorites"]}>
                        {
                            !existingFavouritesProduct ?
                                <MdFavoriteBorder /> :
                                <IoIosHeart color="red" />
                        }
                    </button>
                </div>
            </div>
        </div>
    );

}

export default OrderItem;