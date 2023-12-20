import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../../store/products-slice";
import styles from "./SearchForm.module.css";
import { ReactComponent as CloseSearchListIcon } from "../../images/closeSearchListIcon.svg"
import { ReactComponent as SearchIcon } from "../../images/loupe-search.svg";

let isFirstRunning = true;

const SearchForm = () => {

    const dispatchAction = useDispatch();

    const [inputSearchValue, setInputSearchValue] = useState("");

    const searchInput = useRef();

    const inputSearchHandler = (event) => {
        setInputSearchValue(event.target.value);
    }

    const closeSearchListHandler = () => {
        setInputSearchValue("");
    }

    const searchFormSubmitHandler = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if(isFirstRunning) {
            isFirstRunning = false;
            return;
        }

        dispatchAction(productsActions.changeSearchValue(inputSearchValue));
        dispatchAction(productsActions.filteredProducts());
    }, [inputSearchValue]);

    return (
        <form onSubmit={searchFormSubmitHandler} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
                <label htmlFor="inputSearch" className={styles.searchIconWrapper}>
                    <SearchIcon />
                </label>
                <input
                    value={inputSearchValue}
                    onChange={inputSearchHandler}
                    ref={searchInput}
                    autocomplete="off"
                    id="inputSearch"
                    type="text"
                    placeholder="Введите название товара"
                />

                {inputSearchValue.length > 0 &&
                    <button onClick={closeSearchListHandler} className={styles["btn__close_searchList"]}>
                        <CloseSearchListIcon />
                    </button>
                }
            </div>
        </form>
    );
}

export default SearchForm;