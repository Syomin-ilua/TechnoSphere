import styles from "./UserProfile.module.css";
import Container from "../layout-components/Container";

const UserProfile = () => {

    const userINFO = {
        id: "1",
        surname: "Сёмин",
        name: "Илья",
        patronymic: "Александрович",
        gender: "мужской",
        email: "semin574@yandex.ru",
        tel: "+79610344485",
        dateOfBirth: "12.01.2000",
        country: "Российсикая Федерация"
    }

    const editProfileHandler = () => {

    }

    const exitProfileHandler = () => {

    }

    return (
        <Container class="user__profile_container">
            <div className={styles["user__profile_wrapper"]}>
                <div className={styles["user__profile_top"]}>
                    <h1 className={styles["user__profile_header"]}>Информация о пользователе</h1>
                </div>

                <div className={styles["user__profile_info-wrapper"]}>
                    <div className={styles["user__profile_inf"]}>
                        <div className={styles["user__profile_info-top"]}>
                            <div className={styles["user__profile_avatar"]}>
                                <img src={`users-images/${userINFO.gender === "мужской" ? "men.png" : "women.png"}`} alt="Изображение профиля" />
                            </div>
                            <div className={styles["user__profile_info"]}>
                                <div className={styles["user__profile_information"]}>
                                    <h2 className={styles["general__title"]}>Общая информация:</h2>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Фамилия: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.surname}</span>
                                    </div>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Имя: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.name}</span>
                                    </div>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Отчество: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.patronymic}</span>
                                    </div>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Дата рождения: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.dateOfBirth} г.</span>
                                    </div>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Пол: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.gender}</span>
                                    </div>
                                </div>
                                <div className={styles["user__profile_information"]}>
                                    <h2 className={styles["general__title"]}>Контактная информация:</h2>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Эл почта: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.email}</span>
                                    </div>
                                    <div className={styles["user__profile_general"]}>
                                        <p className={styles["user__info_title"]}>Номер телефона: </p>
                                        <span className={styles["user__info_data"]}>{userINFO.tel}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["user__actions"]}>
                        <button onClick={editProfileHandler} type="button" className={styles["btn__edit"]}>
                            <img className={styles["btn__icon"]} src="users-images/edit-icon.svg" alt="Иконка редактирования"/>
                            Редактировать профиль
                        </button>
                        <button onClick={exitProfileHandler} type="button" className={styles["btn__exit"]}>
                            <img className={styles["btn__icon"]} src="users-images/exit-icon.svg" alt="Иконка выхода"/>
                            Выйти из профиля
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default UserProfile;