import styles from "./Product.module.css";
import Image from "../UI-components/Image";
import { basketActions } from "../../store/basket-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const Product = (props) => {

    const { id, image, productName, cost, description } = props.product;

    const dispatchAction = useDispatch();

    const addProductInBasketHandler = () => {
        dispatchAction(basketActions.addItem({
            id: id, 
            image: image,
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    return (
        <div className={styles.product}>
            <div className={styles.imageWrapper}>
                <Image src={image} alt={`Изображение: ${productName}`} className="imageProduct" />
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