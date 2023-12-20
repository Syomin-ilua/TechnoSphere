import { useSelector } from "react-redux";
import styles from "./BasketLink.module.css";
import BasketIcon from "../../images/basket_icon.svg";

const BasketLink = () => {

    const quantityProductsInBasket = useSelector((state) => state.basket.itemsQuantity);

    return (
        <div className={styles.basket}>
                <div className={styles.itemsQuantityWrapper}>
                    <p>{quantityProductsInBasket}</p>
                </div>
                <img src={BasketIcon} alt="Корзина" />
        </div>
    );
}

export default BasketLink;