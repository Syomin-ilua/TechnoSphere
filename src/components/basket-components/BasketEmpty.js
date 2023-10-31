import { Link } from "react-router-dom"; 
import styles from "./BasketEmpty.module.css";
import EmptyBasketIcon from "../../images/emptyBasketIcon.png";

const BasketEmpty = () => {

    return (
        <div className={styles.basketEmpty}>
            <img src={EmptyBasketIcon} alt="Иконка пустой корзины"/>          
            <p className={styles.basketEmptyText}>Корзина пустая</p>
            <Link to="/products" className={styles.addProductsBtn}>Добавить товары</Link>
        </div>
    );
}

export default BasketEmpty;