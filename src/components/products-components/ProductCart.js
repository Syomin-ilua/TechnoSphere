import { useState } from "react";
import { useDispatch } from "react-redux";
import { basketActions } from "../../store/basket-slice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from "./ProductCart.module.css";
import Image from "../UI-components/Image";
import { useAuth } from "../../hooks/use-auth";

const ProductCart = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAuth();

    const { id, productName, type, description, cost, image, options } = props.product;

    const [productQuantity, setProductQuantity] = useState(0);

    const [isLinkReviewsState, setIsLinkReviewsState] = useState(true);

    const reviewsShowLinkHandler = () => {
        setIsLinkReviewsState(false);
    }

    const reviewsHideLinkHandler = () => {
        setIsLinkReviewsState(true);
        navigate(-1);
    }

    const dispatchAction = useDispatch();

    let content;

    const incrementQuontityHandler = () => {
        setProductQuantity(productQuantity => productQuantity + 1);
    }

    const decrementQuontityHandler = () => {
        if (productQuantity === 0) {
            return;
        }

        setProductQuantity(productQuantity => productQuantity - 1);
    }

    const addProductBasketHandler = () => {

        if (!isAuth) {
            navigate("/auth/login");
            return;
        }

        dispatchAction(basketActions.addItem({
            id: id,
            image: image,
            productName: productName,
            cost: cost,
            quantity: productQuantity
        }));
        setProductQuantity(0);
    }

    if (type === "smartphone") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    } else if (type === "laptop") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    } else if (type === "smartwatch") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    }

    return (
        <div className={styles["product"]}>
            <div className={styles["img__wrapper"]}>
                <Image src={image} alt={`Изображение: ${productName}`} />
            </div>
            <div className={styles["product__information"]}>
                <div className={styles["product__info"]}>
                    <p className={styles["product__name"]}>{productName}</p>
                    <p className={styles["cost"]}><span>Цена: </span>{cost} руб.</p>
                    <p className={styles["description"]}><span>Описание: </span> {description}</p>
                </div>
                <div className={styles["product__options"]}>
                    {content}
                </div>
                <div className={styles["product__actions"]}>
                    <div className={styles["choise__quontity_actions"]}>
                        <button className={styles["increment__button"]} onClick={incrementQuontityHandler}>+</button>
                        <div className={styles["product__quantity"]}>
                            <p>{productQuantity}</p>
                        </div>
                        <button className={styles["decrement__button"]} onClick={decrementQuontityHandler}>-</button>
                    </div>
                    <div className={styles["product__action"]}>
                        <button className={styles["btn__add_basket"]} onClick={addProductBasketHandler}>Добавить в корзину</button>
                        {
                            isLinkReviewsState && location.pathname !== `/products/${id}/reviews` ?
                                <Link className={styles["reviews__link"]} onClick={reviewsShowLinkHandler} to={`reviews`}>Смотреть отзывы</Link>
                                :
                                <p className={styles["btn__reviews_hide"]} onClick={reviewsHideLinkHandler}>Закрыть отзывы</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;