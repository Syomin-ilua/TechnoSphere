import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { basketActions } from '../../store/basket-slice';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import Skeleton from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";
import { useAuth } from '../../hooks/use-auth';
import { favouritesActions } from '../../store/favourites-slice';
import { MdFavoriteBorder } from 'react-icons/md';
import { IoIosHeart } from 'react-icons/io';
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";
import styles from "./RowGridProduct.module.css";

const RowGridProduct = (props) => {

    const { id, image, productName, cost } = props.product;

    const basket = useSelector((state) => state.basket.items);
    const favourites = useSelector((state) => state.favourites.favouritesProducts);

    const existingBasketProduct = basket.find((product) =>
        product.id === id
    );

    const existingFavouritesProduct = favourites.find((favouritesProduct) =>
        favouritesProduct.id === id
    );

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const dispatchAction = useDispatch();

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

    const addProductFavouritesHandler = () => {
        dispatchAction(favouritesActions.addFavouriteProduct({
            id: id,
            image: image,
            productName: productName,
            cost: cost,
        }));
    }

    const removeProductFavouritesHandler = () => {
        dispatchAction(favouritesActions.removeProductFavourites(id));
    }

    const productExistsBasketContent =
        <div className={styles["product__actions_content"]}>
            <div className={styles["product__actions_wrapper"]}>
                <div className={styles["actions__wrapper"]}>
                    <button className={styles["btn__add_product"]} onClick={addProductHandler}>+</button>
                    <div className={styles["product__quantity_wrapper"]}>
                        <p>{existingBasketProduct && existingBasketProduct.quantity}</p>
                    </div>
                    <button className={styles["btn__remove_product"]} onClick={removeProductHandler}>-</button>
                </div>
                <div className={styles["delete__product_basket-wrapper"]}>
                    <button onClick={deleteProductBasketHandler} className={styles["btn__delete_product-basket"]}>
                        <DeleteProductInBasketIcon />
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
            <div className={styles["more__detailed_wrapper"]}>
                <Link className={styles["more__detailed"]} to={`/products/${id}`}>Подробнее → </Link>
            </div>
        </div>;

    const productNotExistsBasketContent =
        <div className={styles["product__actions"]}>
            <div className={styles["product__actions_add"]}>
                <button onClick={addProductInBasketHandler} className={styles["btn__add_basket"]}>Добавить в корзину</button>
                <button onClick={!existingFavouritesProduct ? addProductFavouritesHandler : removeProductFavouritesHandler} className={styles["btn__favorites"]}>
                    {
                        !existingFavouritesProduct ?
                            <MdFavoriteBorder /> :
                            <IoIosHeart color="red" />
                    }
                </button>
            </div>
            <Link className={styles["more__detailed"]} to={`/products/${id}`}>Подробнее → </Link>
        </div>;

    return (
        <div className={styles["product"]}>
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
                        <p className={styles["rating__number"]}>{rating === 0 ? "нет отзывов" : rating}</p>
                    </div>
            }
            <div className={styles["product__front_wrapper"]}>
                <div className={styles["image__wrapper"]}>
                    <img src={`/products-images/` + image} alt={`Изображение: ${productName}`} className="imageProduct" />
                </div>
                <div className={styles["product__info"]}>
                    <p className={styles["product__name"]}>{productName}</p>
                    <p className={styles["product__cost"]}><span>Цена: </span>{cost} руб. / 1 шт</p>
                </div>
            </div>
            {
                existingBasketProduct ?
                    productExistsBasketContent :
                    productNotExistsBasketContent
            }
        </div>
    )
}

export default RowGridProduct;