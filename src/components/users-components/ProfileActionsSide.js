import { NavLink, useNavigate } from "react-router-dom";
import styles from "./ProfileActionsSide.module.css";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const setActive = ({ isActive }) => isActive ? styles["active__profile-link"] : '';

const ProfileActionsSide = () => {

    const dispatchAction = useDispatch();
    const navigate = useNavigate();

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

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatchAction(userActions.removeUser());
            setTimeout(() => {
                navigate("/auth/login");
            }, 1000);
        }).catch((error) => {
            alert("Произошла ошибка");
            const errorCode = error.code;
            console.log(errorCode);
        })
    }

    const exitProfileHandler = () => {
        logoutUser();
    }

    return (
        <div className={styles["profile__actions_side"]}>
            <div className={styles["profile__avatar_wrapper"]}>
                <img src={userINFO.gender === "мужской" ? "/users-images/men.png" : "/users-images/women.png"} alt="Изоражение профиля" />
            </div>
            <div className={styles["profile__links"]}>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/info">Информация о пользователе</NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/orders">История заказов</NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <button onClick={exitProfileHandler} type="button" className={styles["btn__exit_profile"]}>Выйти из профиля</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileActionsSide;