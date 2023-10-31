import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./BasketLink.module.css";
import BasketIcon from "../../images/basket_icon.svg";

const BasketLink = () => {

    const quantityProductsInBasket = useSelector((state) => state.basket.itemsQuantity);

    return (
        <div className={styles.basket}>
            <Link to="/basket">
                <div className={styles.itemsQuantityWrapper}>
                    <p>{quantityProductsInBasket}</p>
                </div>
                <img src={BasketIcon} alt="Корзина" />
            </Link>
        </div>
    );
}

export default BasketLink;