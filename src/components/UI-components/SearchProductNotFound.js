import { useDispatch } from "react-redux";
import { productsActions } from "../../store/products-slice";
import styles from "./SearchProductNotFound.module.css";

const SearchProductNotFound = (props) => {

    const dispatchAction = useDispatch();

    const notSearchProductCancelHandler = () => {
        dispatchAction(productsActions.toggleSearchNotFound());
    }

    return (
        <div className={styles.notSearchProduct}>
            <div className={styles.notSearchProductContent}>
                <button onClick={notSearchProductCancelHandler}>❌</button>
                <p>Товаров с названием {props.value} не найдено</p>
            </div>
        </div>
    );
}

export default SearchProductNotFound;