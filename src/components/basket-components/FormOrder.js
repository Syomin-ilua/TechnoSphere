import { useEffect, useState } from "react";
import styles from "./FormOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ordersActions } from "../../store/orders-slice";
import { basketActions } from "../../store/basket-slice";
import useInput from "../../hooks/use-input";

const now = new Date();

const date = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

const regExpNumberCard = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}/;
const regExpDateCard = /^(?:0[1-9]|1[0-2])\/[0-9]{2}/;
const regExpCardCVC = /^\d {3}/;

const FormOrder = () => {

    const dispatchAction = useDispatch();

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
        value: enteredCardCVC,
        hasError: hasCardCVCInputError,
        isValid: isEnteredCardCVCValid,
        inputChangeHandler: cardCVCInputChangeHandler,
        inputLostFocusHandler: cardCVCInputLostFocusHandler,
        resetValues: resetCardCVCInputValues
    } = useInput((val) => regExpCardCVC.test(val));

    const userId = useSelector((state) => state.user.user.id);
    const basket = useSelector((state) => state.basket);

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [isPaymentMethod, setIsPaymentMethod] = useState("Банковская карта");

    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true);

            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userInfo = docSnap.data();
                setUser(userInfo);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                throw new Error("Документ не существует!");
            }
        }

        getUserData().catch(error => {
            console.log(error);
        });
    }, []);

    const selectMethodPaymentHandler = (event) => {
        setIsPaymentMethod(event.target.value);
    }

    const submutFormOrderHandler = (event) => {
        event.preventDefault();

        if(!user.surname || !user.patronymic || !user.tel || !user.address) {
            alert("Заполните все поля в профиле!")
            return;
        }
        
        
        if (!isEnteredNumberCardValid || !isEnteredCardDateValid || !isEnteredCardCVCValid) {
            return;
        }

        const order = {
            nameBuyer: user.name,
            surnameBuyer: user.surname,
            patronymicBuyer: user.patronymic,
            basket: basket.items,
            totalPrice: basket.totalCostBasket,
            tel: user.tel,
            address: user.address,
            methodPayment: isPaymentMethod,
            datepPlacingOrder: date.format(now)
        }

        dispatchAction(ordersActions.makingOrder(order));
        dispatchAction(basketActions.clearingBasket());

        resetNumberCardInputValues();
        resetCardDateInputValues();
        resetCardCVCInputValues();
    }

    const cardNumberInputClasses = hasNumberCardInputError
        ? "auth__label invalid"
        : "auth__label";

    const cardDateInputClasses = hasCardDateInputError
        ? "auth__label invalid"
        : "auth__label";

    const cardCVCInputClasses = hasCardCVCInputError
        ? "auth__label invalid"
        : "auth__label";

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
                <label className={styles["inputs__bankCard"]}>
                    <div className={styles["input__item"]}>
                        <input
                            type="number"
                            placeholder="Введите номер карты"
                            className={styles["input__bank_card"]}
                            onChange={numberCardInputChangeHandler}
                            onBlur={numberCardInputLostFocusHandler}
                            value={enteredNumberCard}
                        />
                        {hasNumberCardInputError && <p className="error__text">Введите корректный номер карты</p>}
                    </div>
                    <div className={styles["inputs__item"]}>
                        <div className={styles["input__item"]}>
                            <input
                                type="text"
                                placeholder="Введите срок действия карты"
                                className={styles["input__bank_card"]}
                                onChange={cardDateInputChangeHandler}
                                onBlur={cardDateInputLostFocusHandler}
                                value={enteredCardDate}
                            />
                            {hasCardDateInputError && <p className="error__text">Введите корректную срок действия</p>}
                        </div>
                        <div className={styles["input__item"]}>
                            <input
                                type="number"
                                placeholder="Введите CVV код" 
                                className={styles["input__bank_card"]}
                                onChange={cardCVCInputChangeHandler}
                                onBlur={cardCVCInputLostFocusHandler}
                                value={enteredCardCVC}
                            />
                            {hasCardCVCInputError && <p className="error__text">Введите корректный CVV код</p>}
                        </div>
                    </div>
                </label>
            }
            <button className={styles["btn__add_order"]}>
                Заказать
            </button>
        </form>
    )
}

export default FormOrder;