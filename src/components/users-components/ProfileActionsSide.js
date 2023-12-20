import { NavLink, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import styles from "./ProfileActionsSide.module.css";
import { ToastContainer, toast } from "react-toastify";

const setActive = ({ isActive }) => isActive ? styles["active__profile-link"] : '';

const ProfileActionsSide = () => {

    const dispatchAction = useDispatch();
    const navigate = useNavigate();

    const gender = useSelector((state) => state.user.user.user.gender);

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            toast.success("Вы успешно вышли из аккаунта!");
            dispatchAction(userActions.removeUser());
            setTimeout(() => {
                navigate("/home");
            }, 500);
        }).catch((error) => {
            toast.warning("Произошла ошибка при выходе из аккаунта!");
        });
    }

    const exitProfileHandler = () => {
        logoutUser();
    }

    return (
        <div className={styles["profile__actions_side"]}>
            <div className={styles["profile__avatar_wrapper"]}>
                <img src={gender === "мужчина" || gender.length === 0 ? "/users-images/men.png" : "/users-images/women.png" } alt="Изоражение профиля" />
            </div>
            <div className={styles["profile__links"]}>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/info">Личный кабинет</NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/orders">История заказов</NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <button onClick={exitProfileHandler} type="button" className={styles["btn__exit_profile"]}>Выйти из профиля</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfileActionsSide;