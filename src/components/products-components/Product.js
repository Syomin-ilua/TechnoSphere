import styles from "./Product.module.css";
import Image from "../UI-components/Image";
import { basketActions } from "../../store/basket-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const Product = (props) => {

    const { id, images, productName, cost } = props.product;

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const dispatchAction = useDispatch();

    const addProductInBasketHandler = () => {

        if(!isAuth) {
            navigate("/auth/login");
            return;
        }

        dispatchAction(basketActions.addItem({
            id: id,
            image: images[0],
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    return (
        <div className={styles.product}>
            <div className={styles.imageWrapper}>
                <Image src={images[0]} alt={`Изображение: ${productName}`} className="imageProduct" />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.productName}>{productName}</p>
                <p className={styles.productCost}><span>Цена: </span>{cost} руб. / 1 шт</p>
                {/* <p className={styles.productDescription}>
                    <span>Описание: </span>
                    {description}
                </p> */}
            </div>
            <button onClick={addProductInBasketHandler} className={styles.btnAddBasket}>Добавить в корзину</button>
            <Link className={styles.moreDetailed} to={`/products/${id}`}>Подробнее → </Link>
        </div>
    );
}

export default Product;