import React from 'react';
import styles from "./FormAddProduct.module.css";

const FormAddProduct = () => {



  return (
    <form className={styles["form__add_product"]}>
        <label className={styles["input__label"]}>
            <select>
              op
            </select>
        </label>
        
        <label className={styles["input__label"]}>
            <input />
        </label>
    </form>
  )
}

export default FormAddProduct;