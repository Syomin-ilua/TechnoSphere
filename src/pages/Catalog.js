import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productsActions } from "../store/products-slice";
import styles from "./Catalog.module.css";
import Loader from "../components/UI-components/Loader";
import Container from "../components/layout-components/Container";
import ProductsList from "../components/products-components/ProductsList";
import SearchForm from "../components/search-components/SearchForm";

const Catalog = () => {

    const dispatchAction = useDispatch();
    const { status, error } = useSelector(state => state.products);

    useEffect(() => {

        window.scrollTo(0, 0);
        dispatchAction(getProducts());

    }, []);


    const errorContent = <div className={styles["error"]}>
        <p>Произошла ошибка при получении данных о товарах: {error}</p>
    </div>;

    return (
        <Container class="catalog__container">
            <SearchForm />
            <div className={styles["catalog"]}>
                {status === "loading" && <Loader />}
                {status === "resolved" && <ProductsList />}
                {error && errorContent}
            </div>
        </Container>
    );
}

export default Catalog;