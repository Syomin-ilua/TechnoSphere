import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsActions } from "../../store/products-slice";
import styles from "./SearchForm.module.css";
import CloseSearchListIcon from "../../images/closeSearchListIcon.svg"
import SearchProduct from "./SearchProduct";
import SearchIcon from "../../images/loupe-search.svg";
import { useSearchParams } from "react-router-dom";
import SearchList from "./SearchList";

const filterTypes = [
    {
        filterValue: "all",
        filterTypeText: "Все товары",
    },
    {
        filterValue: "smartphone",
        filterTypeText: "Смартфоны",
    },
    {
        filterValue: "laptop",
        filterTypeText: "Ноутбуки",
    },
    {
        filterValue: "smartwatch",
        filterTypeText: "Умные часы",
    },
    {
        filterValue: "headphone",
        filterTypeText: "Наушники",
    }
];

let isFirstLoading = true;

const SearchForm = () => {

    const dispatchAction = useDispatch();

    const productsList = useSelector((state) => state.products.listSearchProducts);

    const [inputSearchValue, setInputSearchValue] = useState("");
    const [categoryProducts, setCategoryProducts] = useState("all");
    const [isSearchListState, setIsSearchListState] = useState(false);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const queryCategory = searchParams.get("category");
    const querySearch = searchParams.get("search") || '';

    const searchInput = useRef();

    useEffect(() => {

        if (isFirstLoading) {
            isFirstLoading = false;
            return;
        }

        setSearchParams({ category: categoryProducts, search: inputSearchValue });

    }, [inputSearchValue, categoryProducts]);

    useEffect(() => {
        
        if (isFirstLoading) {
            isFirstLoading = false;
            return;
        }

        dispatchAction(productsActions.searchProduct({queryCategory, querySearch}));

    }, [queryCategory, querySearch]);

    useEffect(() => {
        document.addEventListener('keydown', function (event) {
            if (event.code === "Escape") {
                closeSearchListHandlerEscape();
            }

            return;
        });

    }, []);

    // Обработчики событий select
    const selectTypeProductHandler = (event) => {
        setCategoryProducts(event.target.value);
    }

    // Обработчики событий инпута
    const inputSearchHandler = (event) => {
        setInputSearchValue(event.target.value);
    }

    const productHanler = (value) => {
        setInputSearchValue(value);
        setIsSearchListState(false);
    }

    const inputFocusHandler = () => {
        setIsSearchListState(true);
    }

    const closeSearchListHandler = () => {
        setIsSearchListState(false);
        searchInput.current.blur();
        setInputSearchValue("");
    }

    const closeSearchListHandlerEscape = () => {
        setIsSearchListState(false);
        searchInput.current.blur();
    }

    // Обрабочик отправки формы 
    const searchFormSubmitHandler = (event) => {
        event.preventDefault();
    }


    return (
        <form onSubmit={searchFormSubmitHandler} className={styles.searchForm}>
            {/* Инпут поиска */}
            <div className={styles.searchInputWrapper}>
                <label htmlFor="inputSearch" className={styles.searchIconWrapper}>
                    <img src={SearchIcon} alt="Иконка поиска" />
                </label>
                <input
                    value={inputSearchValue}
                    onChange={inputSearchHandler}
                    onFocus={inputFocusHandler}
                    ref={searchInput}
                    autocomplete="off"
                    id="inputSearch"
                    type="text"
                    placeholder="Введите название товара"
                />

                {isSearchListState &&
                    <button onClick={closeSearchListHandler} className={styles["btn__close_searchList"]}>
                        <img src={CloseSearchListIcon} alt="Иконка закрытия" />
                    </button>
                }

                { isSearchListState ? <SearchList onProductHanler={productHanler} products={productsList} /> : null }

            </div>

            {/* Select фильтрации */}
            <div className={styles.sortForm}>
                <select value={categoryProducts} onChange={selectTypeProductHandler} >
                    {
                        filterTypes.map(filterType => {
                            return (
                                <option value={filterType.filterValue}>{filterType.filterTypeText}</option>
                            )
                        })
                    }
                </select>
            </div>
        </form>
    );
}

export default SearchForm;