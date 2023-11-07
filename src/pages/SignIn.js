import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase";
import { userActions } from "../store/user-slice";
import styles from "./Auth.module.css";
import LogoBanner from "../images/logo-banner.svg"
import IconSuccesStatus from "../images/status-success.svg";
import IconFailedStatus from "../images/status-failed.svg";
import { useDispatch, useSelector } from "react-redux";

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignIn = () => {

    const navigate = useNavigate();
    const dispatchAction = useDispatch();

    const userInfo = useSelector((state) => state.user);
    console.log(userInfo); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidMessageEmail, setInvalidMessageEmail] = useState(null);
    const [invalidMessagePassword, setInvalidMessagePassword] = useState(null);

    const [isLoginState, setIsLoginState] = useState({
        text: null,
        stateLogin: null,
        isShow: false,
    });

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const signInHandler = (event) => {
        event.preventDefault();

        if (email.length === 0) {
            setInvalidMessageEmail("Эл. почта не должна быть пустая!");
            return;
        }

        if (!validateRegexEmail.test(email)) {
            setInvalidMessageEmail("Введите корректную эл. почту!");
            return;
        }

        if (password.length === 0) {
            setInvalidMessagePassword("Пароль не должен быть пустым");
            return;
        }

        if (password.length < 8) {
            setInvalidMessagePassword("Пароль не должен быть меньше 8 символов!");
            return;
        }

        console.log("sadas");

        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoginState({
                    text: "Авторизация прошла успешно!",
                    stateLogin: true,
                    isShow: true 
                });
                dispatchAction(userActions.setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 3000);
            })
            .catch((error) => {
                setIsLoginState({
                    text: "Произошла ошибка!",
                    stateLogin: false,
                    isShow: true 
                });
                console.error(error)
                setTimeout(() => {
                    setIsLoginState({
                        text: null,
                        stateLogin: null,
                        isShow: false 
                    });
                }, 3000);
            });

    }

    const loginText =
        <div className="auth__state">
            <img src={isLoginState.stateLogin ? IconSuccesStatus : IconFailedStatus} alt="Icon: Состояние регистрации" />
            <p>{isLoginState.text}</p>
        </div>;


    return (
        <div className={styles["auth"]}>
            {isLoginState.isShow && loginText}
            <div className={styles["auth__container"]}>
                <div className={styles["auth__wrapper"]}>
                    <div className={styles["auth__wrapper__container"]}>
                        <div className={styles["auth__header"]}>
                            <h1 className={styles["auth__header_title"]}>Авторизация</h1>
                        </div>
                        <div className={styles["auth__form_wrapper"]}>
                            <form onSubmit={signInHandler} className={styles["auth__form"]}>
                                <label htmlFor="email" className={styles["auth__label"]}>
                                    Эл. почта
                                    <input autoComplete="off" className={styles["auth__input"]} type="email" id="email" onChange={emailChangeHandler} />
                                </label>
                                <label htmlFor="password" className={styles["auth__label"]}>
                                    Пароль
                                    <input autoComplete="off" className={styles["auth__input"]} type="password" id="password" onChange={passwordChangeHandler} />
                                </label>
                                <button className={styles["auth__button"]} type="submit">Войти</button>
                            </form>
                        </div>
                        <div className={styles["link__auth__wrapper"]}>
                            <p className={styles["link__auth"]}>
                                Нет аккаунта?
                                <Link to="/auth/register">Зарегистрироваться</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles["project__banner_wrapper"]}>
                    <div className={styles["project__banner_wrapper-container"]}>
                        <div className={styles["project__image_wrapper-container"]}>
                            <div className={styles["project__image_wrapper"]}>
                                <img src={LogoBanner} alt="Баннер: ТехноСфера" />
                            </div>
                            <p className={styles["project__author"]}>
                                <span>Сервис создан: </span>
                                <a href="https://github.com/Syomin-ilua">https://github.com/Syomin-ilua</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;