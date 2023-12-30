import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { basketActions } from '../../store/basket-slice';
import { favouritesActions } from '../../store/favourites-slice';
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { FaStar } from 'react-icons/fa';
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";
import styles from "./FavouriteProduct.module.css";

const FavouriteProduct = (props) => {

    const { id, productName, cost, image } = props.product;

    const basket = useSelector((state) => state.basket.items);
    const dispatchAction = useDispatch();

    const existingBasketProduct = basket.find((product) =>
        product.id === id
    );

    const { isAuth } = useAuth();
    const navigate = useNavigate();

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

    const addProductInBasketHandler = () => {

        if (!isAuth) {
            navigate("/auth/login");
            return;
        }

        dispatchAction(basketActions.addItem({
            id: id,
            image: image,
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    const addProductHandler = () => {
        dispatchAction(basketActions.addItem({
            id: id,
            image: image,
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    const removeProductHandler = () => {
        dispatchAction(basketActions.removeItem(id));
    }

    const deleteProductBasketHandler = () => {
        dispatchAction(basketActions.deleteProductInBasket(id));
    }

    const removeProductFavouritesHandler = () => {
        dispatchAction(favouritesActions.removeProductFavourites(id));
    }

    const productExistsBasketContent =
        <div className={styles["product__actions_ex"]}>
            <div className={styles["product__actions_exsisting"]}>
                <div className={styles["product__actions_wrapper"]}>
                    <div className={styles["actions__wrapper"]}>
                        <button className={styles["btn__add_product"]} onClick={addProductHandler}>+</button>
                        <div className={styles["product__quantity_wrapper"]}>
                            <p>{existingBasketProduct && existingBasketProduct.quantity}</p>
                        </div>
                        <button className={styles["btn__remove_product"]} onClick={removeProductHandler}>-</button>
                    </div>
                    <div className={styles["delete__product_wrapper"]}>
                        <button onClick={deleteProductBasketHandler} className={styles["btn__delete_product-basket"]}>
                            <DeleteProductInBasketIcon />
                        </button>
                    </div>
                </div>
                <button onClick={removeProductFavouritesHandler} className={styles["btn__remove_favourites"]}>
                    Удалить из избранное
                </button>
            </div>
        </div>;

    const productNotExistsBasketContent =
        <div className={styles["product__actions"]}>
            <div className={styles["product__actions_wrapp"]}>
                <button onClick={addProductInBasketHandler} className={styles["btn__add_basket"]}>Добавить в корзину</button>
                <button onClick={removeProductFavouritesHandler} className={styles["btn__remove_favourites"]}>
                    Удалить из избранное
                </button>
            </div>
        </div>;

    return (
        <div className={styles["favorite__product"]}>
            <div className={styles["favorite__product_production"]}>
                <div className={styles["favorite__product_image-wrapper"]}>
                    <img src={`/products-images/${image}`} alt='' />
                </div>
            </div>
            <div className={styles["favorite__product_actions"]}>
                <div className={styles["favourite__product_info"]}>
                    <Link to={`/products/${id}`}>{productName}</Link>
                    <p><span>Цена: </span>{cost} руб. / 1 шт.</p>
                </div>
                {existingBasketProduct ?
                    productExistsBasketContent :
                    productNotExistsBasketContent
                }
            </div>
            <div className={styles['rating__product']}>
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
            </div>
        </div>
    )
}

export default FavouriteProduct;