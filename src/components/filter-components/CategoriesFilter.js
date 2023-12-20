import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../store/products-slice';
import styles from "./CategoriesFilter.module.css";

let isFirstRunning = true;

const CategoriesFilter = () => {

    const { status, error, categoriesProducts } = useSelector((state) => state.categoriesProducts);
    const dispatchAction = useDispatch();

    const [categoryProducts, setCategoryProducts] = useState("all");

    const selectTypeProductHandler = (event) => {
        setCategoryProducts(event.target.value);
    }

    useEffect(() => {

        if (isFirstRunning) {
            isFirstRunning = false;
            return;
        }

        dispatchAction(productsActions.changeCategorySettings(categoryProducts));
        dispatchAction(productsActions.filteredProducts());

    }, [categoryProducts]);

    return (
        <div className={styles["categories__filter"]}>
            <h3 className={styles["categories__filter_title"]}>Выберите категорию: </h3>
            {error && <p className={styles["loading__categories_products"]}>Произошла ошибка при загрузке категорий</p>}
            {status === "resolved" &&
                <select className={styles["sort__form"]} value={categoryProducts} onChange={selectTypeProductHandler} >
                    {
                        categoriesProducts.map((categorie, idx) => (
                            <option key={idx} value={categorie.filterValue}>
                                {categorie.filterTypeText}
                            </option>
                        )
                        )
                    }
                </select>
            }
        </div>
    )
}

export default CategoriesFilter;