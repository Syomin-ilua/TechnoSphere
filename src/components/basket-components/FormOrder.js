import { useState } from "react";
import styles from "./FormOrder.module.css";

const FormOrder = () => {

    const [isPaymentMethod, setIsPaymentMethod] = useState("Наличными");

    const [isFormFilledOut, setIsFormFilledOut] = useState(false);

    const selectMethodPaymentHandler = (event) => {
        setIsPaymentMethod(event.target.value);
    }

    const submutFormOrderHandler = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submutFormOrderHandler} className={styles.formOrder}>
            <label htmlFor="name">
                <p>Введите имя:</p>
                <input id="name" type="text" />
            </label>
            <label htmlFor="tel">
                <p>Введите номер телефона:</p>
                <input id="tel" type="tel" />
            </label>
            <label htmlFor="address">
                <p>Введите адрес:</p>
                <input id="address" type="text" />
            </label>
            <label className={styles["method__payment_wrapper"]} htmlFor="methodPayment">
                <p>Выберите метод оплаты:</p>
                <select id="methodPayment" onChange={selectMethodPaymentHandler}>
                    <option value="Наличными">Наличными</option>
                    <option value="Переводом">Переводом</option>
                </select>
            </label>
            <button className={styles.pushable}>
                <span className={styles.front}>
                    Заказать
                </span>
            </button>
        </form>
    )
}

export default FormOrder;