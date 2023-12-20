import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productsActions } from "../store/products-slice";
import styles from "./Catalog.module.css";
import Loader from "../components/UI-components/Loader";
import Container from "../components/layout-components/Container";
import ProductsList from "../components/products-components/ProductsList";
import SearchForm from "../components/search-components/SearchForm";
import Filter from "../components/filter-components/Filter";
import { ReactComponent as RowGridIcon } from "../images/row-icon.svg";
import { ReactComponent as ColumnGridIcon } from "../images/column-icon.svg";

const Catalog = () => {

    const dispatchAction = useDispatch();
    const { status, error } = useSelector((state) => state.products);

    const [gridState, setGridState] = useState(true);

    const gridColumnChangeHandler = () => {
        setGridState(true);
    }

    const gridRowChangeHandler = () => {
        setGridState(false);
    }

    useEffect(() => {

        window.scrollTo(0, 0);
        dispatchAction(getProducts());

    }, []);


    const errorContent = <div className={styles["error"]}>
        <p>Произошла ошибка при получении данных о товарах: {error}</p>
    </div>;

    return (
        <Container class="catalog__container">
            <div className={styles["catalog__top"]}>
                <SearchForm />
                <div className={styles["catalog__show_grid"]}>
                    <button onClick={gridRowChangeHandler} className={`grid__button  ${!gridState ? "active__grid" : ""}`}>
                        <ColumnGridIcon />
                    </button>
                    <button onClick={gridColumnChangeHandler} className={`grid__button  ${gridState ? "active__grid" : ""}`}>
                        <RowGridIcon />
                    </button>
                </div>
            </div>
            <div className={styles["catalog__container"]}>
                <Filter />
                <div className={styles["catalog"]}>
                    {status === "loading" &&
                        <div className={styles["loader__wrapper"]}>
                            <Loader />
                        </div>
                    }
                    {status === "resolved" && <ProductsList gridState={gridState} />}
                    {error && errorContent}
                </div>
            </div>
        </Container>
    );
}

export default Catalog;