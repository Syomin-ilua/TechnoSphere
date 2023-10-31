import { useState } from "react";
import { useDispatch } from "react-redux";
import { basketActions } from "../../store/basket-slice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from "./ProductCart.module.css";
import Image from "../UI-components/Image";

const ProductCart = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

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
        dispatchAction(basketActions.addItem({
            id: id,
            image: image,
            productName: productName,
            cost: cost,
            quantity: productQuantity
        }));
    }

    if (type === "smartphone") {
        content =
            <div className={styles.productOptions}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    } else if (type === "laptop") {
        content =
            <div className={styles.productOptions}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    } else if (type === "smartwatch") {
        content =
            <div className={styles.productOptions}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    }

    return (
        <div className={styles.product}>
            <div className={styles.imgWrapper}>
                <Image src={image} alt={`Изображение: ${productName}`} />
            </div>
            <div className={styles.productInformation}>
                <div className={styles.productInfo}>
                    <p className={styles.productName}>{productName}</p>
                    <p className={styles.cost}><span>Цена: </span>{cost} руб.</p>
                    <p className={styles.description}><span>Описание: </span> {description}</p>
                </div>
                <div className={styles.productOptions}>
                    {content}
                </div>
                <div className={styles.productActions}>
                    <div className={styles.choiseQuontityActions}>
                        <button className={styles.incrementButton} onClick={incrementQuontityHandler}>+</button>
                        <div className={styles.productQuantity}>
                            <p>{productQuantity}</p>
                        </div>
                        <button className={styles.decrementButton} onClick={decrementQuontityHandler}>-</button>
                    </div>
                    <div className={styles["product__action"]}>
                        <button className={styles.btnAddBasket} onClick={addProductBasketHandler}>Добавить в корзину</button>
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