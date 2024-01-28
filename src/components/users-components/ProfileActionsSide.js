import { NavLink, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import styles from "./ProfileActionsSide.module.css";
import { ToastContainer, toast } from "react-toastify";
import useResize from "../../hooks/use-resize";
import { ReactComponent as OrdersHistory } from "../../images/user.svg";
import { ReactComponent as UserAccount } from "../../images/profile-user-account.svg";
import { ReactComponent as ExitUserAccount } from "../../images/exit.svg";

const setActive = ({ isActive }) => isActive ? styles["active__profile-link"] : '';

const ProfileActionsSide = () => {

    const widthDesktop = useResize();

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
                <img src={gender === "мужчина" || gender.length === 0 ? "/users-images/men.png" : "/users-images/women.png"} alt="Изоражение профиля" />
            </div>
            <div className={styles["profile__links"]}>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/info">
                        {widthDesktop > 900 ? "Личный кабинет" : <UserAccount />}
                    </NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <NavLink className={setActive} to="/profile/orders">
                        {widthDesktop > 900 ? "История заказов" : <OrdersHistory />}
                    </NavLink>
                </div>
                <div className={styles["profile__link"]}>
                    <button onClick={exitProfileHandler} type="button" className={styles["btn__exit_profile"]}>
                        {widthDesktop > 900 ? "Выйти из профиля" : <ExitUserAccount />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileActionsSide;