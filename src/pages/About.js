import Container from "../components/layout-components/Container";
import styles from "./About.module.css";
import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container class="about__container">
            <div className={styles["about__wrapper"]}>
                <div className={styles["about__title_wrapper"]}>
                    <h1>О проекте</h1>
                </div>

                <div className={styles["about__description_wrapper"]}>
                    <div className={styles["about__project_name"]}>
                        <p>REACT SPA ПРОЕКТ. Тематика - ИНТЕРНЕТ-МАГАЗИН. Создан - Сёмин Илья (<span>GIT-HUB:</span> <a href="https://github.com/Syomin-ilua">https://github.com/Syomin-ilua</a>). </p>
                    </div>
                    <div className={styles["about__project"]}>
                        <p>
                            На этом сервисе доступна авторизация и регистрация пользователя. После авторизации и регистрации
                            пользователь может добавлять товары какие он хочет преобрести. Добавлять товары в избранное. Оформлять
                            заказ после того как выбрал нужные ему товары.  Просматривать, редактировать профиль. Также может проматривать
                            историю своих заказов.
                        </p>
                    </div>
                    <div className={styles["about__technologies_wrapper"]}>
                        <h2>ТЕХНОЛОГИИ КОТОРЫЕ ИСПОЛЬЗОВАЛИСЬ ДЛЯ СОЗДАНИЯ ЭТОГО СЕРВИСА: </h2>
                        <ul>
                            <li>REACT</li>
                            <li>REACT-ROUTER-DOM V6</li>
                            <li>REDUX (REDUX-TOLKIT)</li>
                            <li>FIREBASE</li>
                        </ul>
                    </div>
                </div>

                <div className={styles["banner__text"]}>
                    <p>ТЕХНОСФЕРА</p>
                </div>
            </div>
        </Container>
    );
}

export default About;