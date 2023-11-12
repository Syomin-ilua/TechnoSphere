import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Basket.module.css";
import OrderItem from "../components/basket-components/OrderItem";
import BasketEmpty from "../components/basket-components/BasketEmpty";
import FormOrder from "../components/basket-components/FormOrder";
import Container from "../components/layout-components/Container";

const Basket = () => {

    const { items, totalCostBasket } = useSelector((state) => state.basket);

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
                <div className={styles["basket__body_wrapper"]}>
                    {
                        items.length === 0 ?
                            <BasketEmpty /> :
                            <div className={styles["basket__body"]}>
                                <div className={styles["basket__orders"]}>
                                    {
                                        items.map((item) => (
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
                                <div className={styles["basket__total_wrapper"]}>
                                    <div className={styles["basket__total"]}>
                                        <h3 className={styles["total__title"]}>Итого: </h3>
                                        <p className={styles["total__text"]}>{totalCostBasket} руб.</p>
                                    </div>
                                    <div className={styles["order__actions"]}>
                                        {isFormOrderVisible && <button className={styles["btn__cancel_formorder"]} onClick={orderFormCancelHandler}>Закрыть форму</button>}
                                        {items.length !== 0 && !isFormOrderVisible && <button className={styles["btn__show_formorder"]} onClick={orderFormHandler}>Оформить заказ</button>}
                                    </div>
                                </div>
                            </div>
                    }
                    {isFormOrderVisible && <FormOrder />}
                </div>
            </div>
        </Container>
    );
}

export default Basket;