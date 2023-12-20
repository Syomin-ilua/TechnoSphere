import React, { useEffect, useState } from 'react';
import styles from "./CostFilter.module.css";
import { useDispatch } from 'react-redux';
import { productsActions } from '../../store/products-slice';

const CostFilter = () => {

    const dispatchAction = useDispatch();

    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(200000);

    const minCostChangeHandler = (event) => {
        setMinCost(event.target.value);
    }

    const maxCostChangeHandler = (event) => {
        setMaxCost(event.target.value);
    }

    useEffect(() => {
        
        dispatchAction(productsActions.changeMinMaxCost({minCost, maxCost}));
        dispatchAction(productsActions.filteredProducts());

    }, [minCost, maxCost]);

    return (
        <div className={styles["cost__filter"]}>
            <h3 className={styles["cost__filter_title"]}>Цена(руб.): </h3>
            <div className={styles["costs__wrapper"]}>
                <div className={styles["cost__wrapper"]}>
                    <input className={styles["cost__input"]} placeholder='Цена от' type='number' value={minCost} onChange={minCostChangeHandler} />
                </div>
                <div className={styles["cost__wrapper"]}>
                    <input className={styles["cost__input"]} placeholder='Цена до' type='number' value={maxCost} onChange={maxCostChangeHandler} />
                </div>
            </div>
        </div>
    )
}

export default CostFilter;