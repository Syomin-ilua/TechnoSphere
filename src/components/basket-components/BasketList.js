import React, { useState } from 'react';
import OrderItem from './OrderItem';
import FormOrder from './FormOrder';
import styles from "./BasketList.module.css";
import BasketEmpty from './BasketEmpty';

const BasketList = (props) => {

    const basketProducts = props.basketProducts;
    const totalCostBasket = props.totalCostBasket;

    const [isFormOrderVisible, setIsFormOrderVisible] = useState(false);

    const orderFormHandler = () => {
        setIsFormOrderVisible(true);
    }

    const orderFormCancelHandler = () => {
        setIsFormOrderVisible(false);
    }

    return (
        <div className={styles["basket__list"]}>
            <div className={styles["basket__body_wrapper"]}>
                {basketProducts.length === 0 ?
                    <BasketEmpty /> :
                    <div className={styles["basket__body"]}>
                        <div className={styles["basket__orders"]}>
                            {
                                basketProducts.map((basketProduct) => (
                                    <OrderItem
                                        key={basketProduct.id}
                                        order={{
                                            id: basketProduct.id,
                                            orderName: basketProduct.productName,
                                            orderImage: basketProduct.productImage,
                                            quantity: basketProduct.quantity,
                                            totalPrice: basketProduct.totalPrice,
                                            price: basketProduct.cost,
                                        }}
                                    />
                                ))
                            }
                        </div>
                        <div className={styles["basket__total_wrapper"]}>
                            <div className={styles["basket__total"]}>
                                <h3 className={styles["total__title"]}>Итого: </h3>
                                <p className={styles["total__text"]}>{totalCostBasket} руб.</p>
                            </div>
                            <div className={styles["order__actions"]}>
                                {isFormOrderVisible && <button className={styles["btn__cancel_formorder"]} onClick={orderFormCancelHandler}>Закрыть форму</button>}
                                {basketProducts.length !== 0 && !isFormOrderVisible && <button className={styles["btn__show_formorder"]} onClick={orderFormHandler}>Оформить заказ</button>}
                            </div>
                        </div>
                    </div>
                }
            </div>
            {isFormOrderVisible && <FormOrder />}
        </div>
    )
}

export default BasketList;