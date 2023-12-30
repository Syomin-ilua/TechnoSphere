import React from 'react';
import { useSelector } from 'react-redux';
import { SlBasket } from "react-icons/sl";
import styles from "./BasketMobileLink.module.css";

const BasketMobileLink = () => {

    const quantityProductsInBasket = useSelector((state) => state.basket.itemsQuantity);

    return (
        <div className={styles["mobile__navigation_link-wrapper"]}>
            <SlBasket />
            <p className={styles["link__title"]}>Корзина</p>
            <div className={styles["basket__quantity_wrapper"]}>
                <span>{quantityProductsInBasket}</span>
            </div>
        </div>
    )
}

export default BasketMobileLink;