import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersActions } from "../../store/orders-slice";
import { basketActions } from "../../store/basket-slice";
import { toast, ToastContainer } from "react-toastify";
import InputMask from "react-input-mask";
import useInput from "../../hooks/use-input";
import styles from "./FormOrder.module.css";

const now = new Date();

const date = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

const regExpNumberCard = /\d{4}-\d{4}-\d{4}-\d{4}/;
const regExpDateCard = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
const regExpCardCVV = /^[0-9]{3}$/;

const FormOrder = ({ onOrderFormCancelHandler }) => {

    const dispatchAction = useDispatch();
    const userId = useSelector((state) => state.user.user.id);

    const {
        value: enteredNumberCard,
        hasError: hasNumberCardInputError,
        isValid: isEnteredNumberCardValid,
        inputChangeHandler: numberCardInputChangeHandler,
        inputLostFocusHandler: numberCardInputLostFocusHandler,
        resetValues: resetNumberCardInputValues
    } = useInput((val) => regExpNumberCard.test(val));

    const {
        value: enteredCardDate,
        hasError: hasCardDateInputError,
        isValid: isEnteredCardDateValid,
        inputChangeHandler: cardDateInputChangeHandler,
        inputLostFocusHandler: cardDateInputLostFocusHandler,
        resetValues: resetCardDateInputValues
    } = useInput((val) => regExpDateCard.test(val));

    const {
        value: enteredCardCVV,
        hasError: hasCardCVVInputError,
        isValid: isEnteredCardCVVValid,
        inputChangeHandler: cardCVVInputChangeHandler,
        inputLostFocusHandler: cardCVVInputLostFocusHandler,
        resetValues: resetCardCVVInputValues
    } = useInput((val) => regExpCardCVV.test(val));

    const basket = useSelector((state) => state.basket);
    const user = useSelector((state) => state.user.user.user);

    const [isPaymentMethod, setIsPaymentMethod] = useState("Банковская карта");

    const selectMethodPaymentHandler = (event) => {
        setIsPaymentMethod(event.target.value);
    }

    const submutFormOrderHandler = (event) => {
        event.preventDefault();

        if (!user.surname || !user.patronymic || !user.tel || !user.address) {
            toast.warning("Заполните профиль для оформления заказа!");
            return;
        }


        if (!isEnteredNumberCardValid || !isEnteredCardDateValid || !isEnteredCardCVVValid) {
            toast.warning("Заполните поля для оформления заказа!");
            return;
        }

        const order = {
            id: Math.random(),
            userBuyerId: userId,
            fioBuyer: user.name + " " + user.surname + " " + user.patronymic,
            tel: user.tel,
            address: user.address,
            orderProducts: basket.items,
            totalPrice: basket.totalCostBasket,
            methodPayment: isPaymentMethod,
            cardInfo: {
                numberCard: enteredNumberCard,
                dateCard: enteredCardDate,
                CVV: enteredCardCVV
            },
            datePlacingOrder: date.format(now)
        }

        dispatchAction(ordersActions.makingOrder(order));
        dispatchAction(basketActions.clearingBasket());

        resetNumberCardInputValues();
        resetCardDateInputValues();
        resetCardCVVInputValues();
        onOrderFormCancelHandler();
        toast.success("Заказ оформлен!");
    }

    return (
        <form onSubmit={submutFormOrderHandler} className={styles["form__order"]}>
            <div className={styles["order__form_title-wrapper"]}>
                <h1 className={styles["order__form_title"]}>Проверьте информацию и заполните поля!</h1>
                <p className={styles["order__form_subtitle"]}>Пожайлуста, заполните все поля в профиле, так как без этого вы не сможете оформить заказ!</p>
            </div>
            <div className={styles["order__info"]}>
                <div className={styles["order__info_item"]}>
                    <span>ФИО покупателя: </span>
                    <p>{user.surname} {user.name} {user.patronymic}</p>
                </div>
                <div className={styles["order__info_item"]}>
                    <span>Адрес доставки: </span>
                    <p>{user.address}</p>
                </div>
                <div className={styles["order__info_item"]}>
                    <span>Номер телефона: </span>
                    <p>{user.tel}</p>
                </div>
                <div className={styles["order__info_item"]}>
                    <span>Стоимость заказа: </span>
                    <p>{basket.totalCostBasket} руб.</p>
                </div>
            </div>

            <label className={styles["method__payment_wrapper"]} htmlFor="methodPayment">
                <p>Выберите метод оплаты:</p>
                <select id="methodPayment" onChange={selectMethodPaymentHandler}>
                    <option value="Банковская карта">Банковская карта</option>
                </select>
            </label>
            {isPaymentMethod === "Банковская карта" &&
                <div className={styles["inputs__bankCard"]}>
                    <div className={styles["input__item"]}>
                        <label htmlFor="numberCard">
                            <p className={styles["card__text"]}>Введите номер карты: </p>
                            <InputMask
                                id="numberCard"
                                mask="9999-9999-9999-9999"
                                className={styles["input__bank_card"]}
                                onChange={numberCardInputChangeHandler}
                                onBlur={numberCardInputLostFocusHandler}
                                value={enteredNumberCard}
                            />
                            {hasNumberCardInputError && <p className="error__text">Введите корректный номер карты</p>}
                        </label>
                    </div>
                    <div className={styles["inputs__item"]}>
                        <div className={styles["input__item"]}>
                            <label htmlFor="cardDate">
                                <p className={styles["card__text"]}>Введите срок действия - мес./год: </p>
                                <InputMask
                                    id="cardDate"
                                    mask="99/99"
                                    className={styles["input__bank_card"]}
                                    onChange={cardDateInputChangeHandler}
                                    onBlur={cardDateInputLostFocusHandler}
                                    value={enteredCardDate}
                                />
                                {hasCardDateInputError && <p className="error__text">Введите корректную срок действия</p>}
                            </label>
                        </div>
                        <div className={styles["input__item"]}>
                            <label htmlFor="cardCVV">
                                <p className={styles["card__text"]}>Введите CVV код: </p>
                                <InputMask
                                    id="cardCVV"
                                    mask="999"
                                    className={styles["input__bank_card"]}
                                    onChange={cardCVVInputChangeHandler}
                                    onBlur={cardCVVInputLostFocusHandler}
                                    value={enteredCardCVV}
                                />
                                {hasCardCVVInputError && <p className="error__text">Введите корректный CVV код</p>}
                            </label>
                        </div>
                    </div>
                </div>
            }
            <button className={styles["btn__add_order"]}>
                Заказать
            </button>
            <ToastContainer />
        </form>
    )
}

export default FormOrder;