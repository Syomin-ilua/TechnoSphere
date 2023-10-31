import { basketActions } from "../../store/basket-slice";
import { useDispatch } from "react-redux";
import styles from "./OrderItem.module.css";
import Image from "../UI-components/Image";

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

    return (
        <div className={styles.order}>
            <div className={styles.orderImageWrapper}>
                <Image src={orderImage} alt={orderName} className="imageOrder" />
            </div>
            <div className={styles.orderInformation}>
                <div className={styles.productInformation}>
                    <p className={styles.orderName}>{orderName}</p>
                    <p className={styles.cost}><span>Цена:</span> {price} руб. / 1 шт</p>
                </div>
                <div className={styles.orderInfo}>
                        <div className={styles.orderPriceWrapper}>
                            <p className={styles.orderPrice}><span>Колличество:</span> {quantity} шт. за {totalPrice} руб.</p>
                        </div>
                        <div className={styles.orderActions}>
                            <button className={styles.btnAddOrder} onClick={addOrderHandler}>+</button>
                            <button className={styles.btnRemoveOrder} onClick={removeOrderHandler}>-</button>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default OrderItem;