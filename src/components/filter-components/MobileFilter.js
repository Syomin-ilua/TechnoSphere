import React from 'react';
import CategoriesFilter from "./CategoriesFilter";
import CostFilter from "./CostFilter";
import styles from "./MobileFilter.module.css";

const MobileFilter = ({ onHideMobileFilter }) => {

    const hideMobileFilter = () => {
        onHideMobileFilter()
    }

    return (
        <div className={styles.mobile__filter}>
            <div className={styles.mobile__filter_body}>
                <button onClick={hideMobileFilter} className={styles.mobile__filter_hide_btn}>
                    <span></span>
                    <span></span>
                </button>
                <h2 className={styles.filter__title}>Фильтр</h2>
                <div className={styles.mobile__filter_wrapper}>
                    <CategoriesFilter />
                    <CostFilter />
                </div>
            </div>
        </div>
    )
}

export default MobileFilter;