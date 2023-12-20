import React, { useEffect, useState } from 'react';
import styles from "./Admin.module.css";
import Container from '../components/layout-components/Container';
import FormAddCategory from '../components/admin-components/FormAddCategory';
import FormAddProduct from '../components/admin-components/FormAddProduct';

const Admin = () => {

    const [isShowAddCategory, setShowAddCategory] = useState(false);
    const [isShowAddProduct, setShowAddProduct] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const showAddCategoryHandler = () => {
        setShowAddProduct(false);
        setShowAddCategory(true);
    }

    const showAddProductHandler = () => {
        setShowAddCategory(false);
        setShowAddProduct(true);
    }

    return (
        <Container class="admin__container">
            <div className={styles["admin__wrapper"]}>
                <div className={styles["admin__actions_wrapper"]}>
                    <div className={styles["admin__title_wrapper"]}>
                        <h1>Администрирование</h1>
                    </div>
                    <div className={styles["admin__btn_actions"]}>
                        <button onClick={showAddCategoryHandler} className={styles["btn__show_addCategory"]}>
                            Добавить категорию
                        </button>
                        <button onClick={showAddProductHandler} className={styles["btn__show_addProduct"]}>
                            Добавить товар
                        </button>
                    </div>
                </div>
                <div className={styles["admin__actions"]}>
                    {isShowAddCategory && <FormAddCategory />}
                    {isShowAddProduct && <FormAddProduct />}
                </div>
            </div>
        </Container>
    )
}

export default Admin;