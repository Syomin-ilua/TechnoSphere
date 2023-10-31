import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Basket.module.css";
import OrderItem from "../components/basket-components/OrderItem";
import BasketEmpty from "../components/basket-components/BasketEmpty";
import FormOrder from "../components/basket-components/FormOrder";
import Container from "../components/layout-components/Container";

const Basket = () => {

    const orders = useSelector((state) => state.basket.items);

    const [isFormOrderVisible, setIsFormOrderVisible] = useState(false);

    const orderFormHandler = () => {
        setIsFormOrderVisible(true);
    }

    const orderFormCancelHandler = () => {
        setIsFormOrderVisible(false);
    }


    return (
        <Container class="basket__container">
            <div className={styles["basket"]}>
                    <div className={styles["basket__header"]}>
                        <h1 className={styles["basket__header_text"]}>Корзина</h1>
                    </div>
                <div className={styles["basket__body"]}>
                    {
                        orders.length === 0 ?
                            <BasketEmpty /> :
                            <div className={styles["basket__orders"]}>
                                {
                                    orders.map((item) => (
                                        <OrderItem
                                            key={item.id}
                                            order={{
                                                id: item.id,
                                                orderName: item.productName,
                                                orderImage: item.productImage,
                                                quantity: item.quantity,
                                                totalPrice: item.totalPrice,
                                                price: item.cost,
                                            }}
                                        />
                                    ))
                                }
                            </div>
                    }
                    <div className={styles["order__actions"]}>
                        {isFormOrderVisible && <button className={styles["btn__cancel_formorder"]} onClick={orderFormCancelHandler}>Закрыть форму</button>}
                        {orders.length !== 0 && !isFormOrderVisible && <button className={styles["btn__show_formorder"]} onClick={orderFormHandler}>Оформить заказ</button>}
                    </div>
                    {isFormOrderVisible && <FormOrder />}
                </div>
            </div>
        </Container>
    );
}

export default Basket;