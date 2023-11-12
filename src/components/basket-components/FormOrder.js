import { useEffect, useState } from "react";
import styles from "./FormOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ordersActions } from "../../store/orders-slice";
import { basketActions } from "../../store/basket-slice";

const now = new Date();

const date = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
});

const FormOrder = () => {

    const dispatchAction = useDispatch();

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

        if (!user.surname || !user.patronymic || !user.address) {
            console.log("Заполните профиль для оформления заказа!");
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
                <label className={styles["input__bankCard"]}>
                    <div className={styles["input__item"]}>
                        <input className={styles["input__bank_card"]} type="number" />
                    </div>
                    <div>
                        <div className={styles["input__item"]}>
                            <input type="text" className={styles["input__bank_card"]} />
                        </div>
                        <div className={styles["input__item"]}>
                            <input type="number" className={styles["input__bank_card"]} />
                        </div>
                    </div>
                </label>
            }
            <button className={styles["pushable"]}>
                <span className={styles["front"]}>
                    Заказать
                </span>
            </button>
        </form>
    )
}

export default FormOrder;