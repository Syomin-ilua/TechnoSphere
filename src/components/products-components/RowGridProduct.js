import { basketActions } from '../../store/basket-slice';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";
import styles from "./RowGridProduct.module.css";

const RowGridProduct = (props) => {

    const { id, image, productName, cost } = props.product;
    const basket = useSelector((state) => state.basket.items);

    const existingBasketProduct = basket.find((product) =>
        product.id === id
    );

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const dispatchAction = useDispatch();

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
            </div>
            <div className={styles["more__detailed_wrapper"]}>
                <Link className={styles["more__detailed"]} to={`/products/${id}`}>Подробнее → </Link>
            </div>
        </div>;

    const productNotExistsBasketContent =
        <div className={styles["product__actions"]}>
            <button onClick={addProductInBasketHandler} className={styles["btn__add_basket"]}>Добавить в корзину</button>
            <Link className={styles["more__detailed"]} to={`/products/${id}`}>Подробнее → </Link>
        </div>;

    return (
        <div className={styles["product"]}>
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