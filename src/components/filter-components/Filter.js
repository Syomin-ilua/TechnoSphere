import React from 'react';
import styles from "./Filter.module.css";
import CategoriesFilter from './CategoriesFilter';
import CostFilter from './CostFilter';

const Filter = () => {
    return (
        <div className={styles["products__filter"]}>
            <div className={styles["filter__title_wrapper"]}>
                <h2 className={styles["filter__title"]}>Фильтры</h2>
            </div>

            <CategoriesFilter />
            <CostFilter />
        </div>
    )
}

export default Filter;