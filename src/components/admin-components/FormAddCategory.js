import React from 'react'
import styles from "./FormAddCategory.module.css";

const FormAddCategory = () => {


    const addCategoryHandler = (event) => {
        event.preventDefault();


        
    }
 
    return (
        <form onSubmit={addCategoryHandler} className={styles["form__add_category"]}>
            <h1 className={styles["add__category_title"]}>Добавление категории</h1>
            <label htmlFor='category-name' className={styles["input__label"]}>
                Введите название категории
                <input 
                    id='category-name'
                    type='text'
                    className={styles["input__category"]} 
                />
            </label>
            <button type='submit'>Добавить категорию</button>
        </form>
    )
}

export default FormAddCategory;