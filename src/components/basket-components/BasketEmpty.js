import { Link } from "react-router-dom"; 
import styles from "./BasketEmpty.module.css";
import EmptyBasketIcon from "../../images/emptyBasketIcon.png";

const BasketEmpty = () => {

    return (
        <div className={styles.basketEmpty}>
            <img src={EmptyBasketIcon} alt="Иконка пустой корзины"/>  
            <p className={styles["basket__empty_text"]}>В корзине нет товаров</p>        
            <Link to="/products" className={styles["add__products_btn"]}>Перейти в каталог</Link>
        </div>
    );
}

export default BasketEmpty;