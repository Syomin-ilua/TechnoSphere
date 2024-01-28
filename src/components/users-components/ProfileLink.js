import React from 'react';
import styles from "./ProfileLink.module.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { userActions } from '../../store/user-slice';
import { useAuth } from '../../hooks/use-auth';
import storage from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { ReactComponent as AccountIcon } from "../../images/account-icon.svg";
import { ReactComponent as OrdersIcon } from "../../images/orders-icon.svg";
import { ReactComponent as LogoutIcon } from "../../images/logout-icon.svg";
import { ReactComponent as AdminIcon } from "../../images/admin-icon.svg";
import { ToastContainer, toast } from 'react-toastify';

const ProfileLink = () => {

    const { isAuth } = useAuth();
    const { status, error, user } = useSelector((state) => state.user.user);

    const dispatchAction = useDispatch();
    const navigate = useNavigate();

    const [profileLinksShowState, setProfileLinksShowState] = useState(false);

    const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatchAction(userActions.removeUser());
            toast.success("Вы успешно вышли из аккаунта!");
            setTimeout(() => {
                navigate("/home");
            }, 500);
        }).catch((error) => {
            toast.warning("Произошла ошибка выхода!");
        })
    }

    const profileLinkHandler = () => {
        setProfileLinksShowState(prevState => !prevState);
    }

    const exitProfileHandler = () => {
        logoutUser();
    }

    const linkHandler = () => {
        setProfileLinksShowState(prevState => !prevState);
    }

    return (
        <div className={styles["profile_link"]}>
            <button onClick={profileLinkHandler} className={styles["btn__profile_link"]}>
                <div className={styles["profile__link_icon-wrapper"]}>
                    {status === "loading" && <p>...</p>}
                    {status === "resolved" && 
                        <img src={user.gender === "мужчина" || user.gender.length === 0 ? "/users-images/men.png" : "/users-images/women.png"} alt="Изоражение профиля" />
                    }
                    {error && "?"}
                </div>
            </button>

            {profileLinksShowState &&

                <div className={styles["profile__links_wrapper"]}>
                    <div className={styles["profile__links"]}>
                        <Link onClick={linkHandler} to="profile/info">
                            <AccountIcon />
                            Личный кабинет
                        </Link>
                        <Link onClick={linkHandler} to="profile/orders">
                            <OrdersIcon />
                            История заказов
                        </Link>
                        {isAuth && !!user.userRole &&
                            <Link onClick={linkHandler} to="/admin">
                                <AdminIcon />
                                Админка
                            </Link>
                        }
                        <button onClick={exitProfileHandler} className={styles["btn__exit_profile"]}>
                            <LogoutIcon />
                            Выйти из профиля
                        </button>
                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default ProfileLink;