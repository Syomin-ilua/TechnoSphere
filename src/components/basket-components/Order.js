import React, { useState } from 'react';
import styles from "./Order.module.css";
import { Link } from 'react-router-dom';

const Order = (props) => {

    const order = props.order;
    console.log(order);

    const [orderActiveState, setOrderActiveState] = useState(false);

    const btnOpenOrderHandler = () => {
        setOrderActiveState((prevState) => prevState = !prevState);
    }

    return (
        <li className={`${styles["order__wrapper"]} ${orderActiveState ? `${styles["active__order"]}` : ""}`}>
            <div className={styles["order__prev"]}>
                <p><b>Заказ от: </b> {order.datePlacingOrder}</p>
                <p><b>Итоговая цена: </b> {order.totalPrice} рублей</p>
                <button onClick={btnOpenOrderHandler} type='button' className={styles["btn__open_order"]}>
                    {orderActiveState ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.99992 16H6.99992L6.99992 4L1.49992 9.5L0.0799217 8.08L7.99992 0.16L15.9199 8.08L14.4999 9.5L8.99992 4L8.99992 16Z" fill="#333333" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.0001 4H13.0001V16L18.5001 10.5L19.9201 11.92L12.0001 19.84L4.08008 11.92L5.50008 10.5L11.0001 16V4Z" fill="#333333" />
                        </svg>
                    }
                </button>
            </div>
            <div className={`${styles["order__description"]} ${orderActiveState ? `${styles["active__order_description"]}` : ""}`}>
                <div className={styles["about__order_title"]}>
                    <h2>О заказе</h2>
                </div>
                <div className={styles["order__products"]}>
                    {
                        order.orderProducts.map((order) => {
                            return (
                                <div key={order.id} className={styles["order__product"]}>
                                    <div className={styles["image__product"]} >
                                        <img src={`/products-images/` + order.productImage} alt="Изображение товара" />
                                        <div className={styles["order__product_info"]}>
                                            <Link className={styles["order__productName_link"]} to={`/products/${order.id}`}>{order.productName}</Link>
                                            <p>Кол-во: {order.quantity} шт.</p>
                                        </div>
                                    </div>
                                    <p className={styles["order__price"]}>{order.totalPrice} руб.</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </li>
    )
}

export default Order;