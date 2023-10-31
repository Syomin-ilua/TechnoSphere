import { useDispatch } from "react-redux";
import { productsActions } from "../../store/products-slice";
import styles from "./SearchProduct.module.css";

const SearchProduct = (props) => {
    
    const { id, productName } = props.product;
    const dispatchAction = useDispatch();

    const productListHandler = (event) => {
        props.onClickProduct(productName);
        dispatchAction(productsActions.showProduct(id))
    }

    return (
        <li onClick={productListHandler} className={styles.productItem}>{productName}</li>
    );
}

export default SearchProduct;