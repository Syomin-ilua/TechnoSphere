import React, { useState } from 'react';
import { LuUser } from "react-icons/lu";
import styles from "./MobileProfileLink.module.css";
import { toast, ToastContainer } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/use-auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ReactComponent as AccountIcon } from "../../images/account-icon.svg";
import { ReactComponent as OrdersIcon } from "../../images/orders-icon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logout-icon.svg";
import { ReactComponent as AdminIcon } from "../../images/admin-icon.svg";
import { userActions } from '../../store/user-slice';

const MobileProfileLink = () => {

    const { isAuth } = useAuth();
    const { status, error, user } = useSelector((state) => state.user.user);

    const dispatchAction = useDispatch();
    const navigate = useNavigate();

    const [profileLinksShowState, setProfileLinksShowState] = useState(false);

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatchAction(userActions.removeUser());
            toast.warning("Вы успешно вышли из аккаунта!");
            setTimeout(() => {
                navigate("/home");
            }, 500);
        }).catch((error) => {
            toast.warning("Произошла ошибка выхода!");
        })
    }

    const profileLinkEnter = () => {
        setProfileLinksShowState(true);
    }

    const profileLinkLeave = () => {
        setProfileLinksShowState(false);
    }

    const exitProfileHandler = () => {
        logoutUser();
    }

    const linkHandler = () => {
        setProfileLinksShowState(prevState => !prevState);
    }

    return (
        <div onMouseEnter={profileLinkEnter} onMouseLeave={profileLinkLeave} className={styles["profile__link"]}>
            <div className={styles["profile__wrapper"]}>
                <LuUser />
                <p>Профиль</p>
            </div>

            {profileLinksShowState &&

                <div className={styles["profile__links_wrapper"]}>
                    <div className={styles["profile__links"]}>
                        {
                            isAuth &&
                            <Link Link onClick={linkHandler} to="profile/info">
                                <AccountIcon />
                                Личный кабинет
                            </Link>
                        }
                        {
                            isAuth &&
                            <Link onClick={linkHandler} to="profile/orders">
                                <OrdersIcon />
                                История заказов
                            </Link>
                        }
                        {
                            isAuth && !!user.userRole &&
                            <Link onClick={linkHandler} to="/admin">
                                <AdminIcon />
                                Админка
                            </Link>
                        }
                        {
                            isAuth &&
                            <button onClick={exitProfileHandler} className={styles["btn__exit_profile"]}>
                                <LogoutIcon />
                                Выйти из профиля
                            </button>
                        }
                        {
                            !isAuth &&
                            <Link className={styles["not__auth_link"]} to="/auth/login">
                                Войти
                            </Link>
                        }
                        {
                            !isAuth &&
                            <Link className={styles["not__auth_link"]} to="/auth/register">
                                Зарегистрироваться
                            </Link>
                        }
                    </div>
                </div>
            }
            <ToastContainer />
        </div >
    )
}

export default MobileProfileLink;