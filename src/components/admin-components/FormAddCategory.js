import React from 'react';
import { useState } from 'react';
import styles from "./FormAddCategory.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { categoriesProductsActions } from '../../store/categoriesProducts-slice';

const FormAddCategory = () => {

    const dispatchAction = useDispatch();
    const categoriesProducts = useSelector((state) => state.categoriesProducts);
    console.log(categoriesProducts);

    const [nameCategory, setNameCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const [nameCategoryTouched, setNameCategoryTouched] = useState(false);
    const [filterCategoryTouched, setFilterCategoryTouched] = useState(false);

    const nameCategoryValid = nameCategory.trim().length !== 0;
    const filterCategoryValid = filterCategory.trim().length !== 0;

    const addCategoryHandler = (event) => {
        event.preventDefault();

        if(!nameCategoryValid || !filterCategoryValid) {
            alert('Заполните все поля!');
            return;
        }

        const newCategory = {
            id: Math.random(),
            filterTypeText: nameCategory,
            filterValue: filterCategory.toLowerCase()
        }

        dispatchAction(categoriesProductsActions.addCategories(newCategory));
        
        setNameCategoryTouched(false);
        setFilterCategoryTouched(false);
        setNameCategory("");
        setFilterCategory("");
    }

    const nameCategoryChangeHandler = (event) => {
        setNameCategory(event.target.value);
        setNameCategoryTouched(true);
    }

    const nameCategoryFilterChangeHandler = (event) => {
        setFilterCategory(event.target.value);
        setFilterCategoryTouched(true);
    }

    return (
        <form onSubmit={addCategoryHandler} className={styles["form__add_category"]}>
            <h1 className={styles["add__category_title"]}>Добавление категории</h1>
            <div className={styles["inputs__add_category"]}>
                <label htmlFor='category-name' className={styles["input__label"]}>
                    <p>Введите название категории: </p>
                    <input
                        id='category-name'
                        type='text'
                        className={styles["input__category"]}
                        onChange={nameCategoryChangeHandler}
                        value={nameCategory}
                    />
                    {!nameCategoryValid && nameCategoryTouched && <span className={styles["invalid__text"]}>Поле не должно быть пустым!</span>}
                </label>
                <label htmlFor='category-name-filter' className={styles["input__label"]}>
                    <p>Введите название категории для фильтрации: </p>
                    <input
                        id='category-name-filter'
                        type='text'
                        className={styles["input__category"]}
                        onChange={nameCategoryFilterChangeHandler}
                        value={filterCategory}
                    />
                    {!filterCategoryValid && filterCategoryTouched && <span className={styles["invalid__text"]}>Поле не должно быть пустым!</span>}
                </label>
            </div>
            <button className={styles["btn__add_category"]} type='submit'>Добавить категорию</button>
        </form>
    )
}

export default FormAddCategory;