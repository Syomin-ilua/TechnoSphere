import { basketActions } from "../../store/basket-slice";
import { useDispatch } from "react-redux";
import styles from "./OrderItem.module.css";
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";

const OrderItem = (props) => {

    const { id, orderName, orderImage, quantity, totalPrice, price } = props.order;

    const dispatchAction = useDispatch();

    const addOrderHandler = () => {
        dispatchAction(basketActions.addItem({
            id: id,
            image: orderImage,
            productName: orderName,
            cost: price,
            quantity: 1
        }));
    }

    const removeOrderHandler = () => {
        dispatchAction(basketActions.removeItem(id));
    }

    const deleteProductBasketHandler = () => {
        dispatchAction(basketActions.deleteProductInBasket(id));
    }

    return (
        <div className={styles.order}>
            <div className={styles.orderImageWrapper}>
                <img src={`/products-images/${orderImage}`} alt={orderName} className="imageOrder" />
                <div className={styles.productInformation}>
                    <p className={styles.orderName}>{orderName}</p>
                    <p className={styles.cost}><span>Цена:</span> {price} руб. / 1 шт</p>
                </div>
            </div>
            <div className={styles.orderInformation}>
                <div className={styles.orderInfo}>
                    <div className={styles.orderPriceWrapper}>
                        <p className={styles.orderPrice}><span>Колличество:</span> {quantity} шт. за {totalPrice} руб.</p>
                    </div>
                </div>
                <div className={styles.orderActions}>
                    <div className={styles["order__change_actions"]}>
                        <button className={styles.btnAddOrder} onClick={addOrderHandler}>
                            +
                        </button>
                        <button className={styles["btnRemoveOrder"]} onClick={removeOrderHandler}>
                            -
                        </button>
                    </div>
                    <button onClick={deleteProductBasketHandler} className={styles["btn__delete_product-basket"]}>
                        <DeleteProductInBasketIcon />
                        Убрать из корзины
                    </button>
                </div>
            </div>
        </div>
    );

}

export default OrderItem;