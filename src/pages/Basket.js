import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Basket.module.css";
import OrderItem from "../components/basket-components/OrderItem";
import BasketEmpty from "../components/basket-components/BasketEmpty";
import FormOrder from "../components/basket-components/FormOrder";
import Container from "../components/layout-components/Container";
import Loader from "../components/UI-components/Loader";
import { MdError } from "react-icons/md";
import BasketList from "../components/basket-components/BasketList";
import { SlBasket } from "react-icons/sl";

const Basket = () => {

    const { items, totalCostBasket, status, error } = useSelector((state) => state.basket);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);


    return (
        <Container class="basket__container">
            <div className={styles["basket"]}>
                <div className={styles["basket__header"]}>
                    <h1 className={styles["basket__header_text"]}>
                        <SlBasket />
                        Корзина
                    </h1>
                </div>
                {status === "loading" &&
                    <div className={styles["loader__wrapper"]}>
                        <Loader />
                    </div>
                }
                {status === "resolved" &&
                    <BasketList
                        basketProducts={items}
                        totalCostBasket={totalCostBasket}
                    />
                }
                {error &&
                    <div className={styles["error__wrapper"]}>
                        <MdError
                            size={100}
                            color="red"
                        />
                        <p className={styles["error__text"]}>Произошла ошибка!</p>
                    </div>
                }
            </div>
        </Container>
    );
}

export default Basket;