import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Auth.module.css";
import LogoBanner from "../images/logo-banner.svg"
import Container from "../components/layout-components/Container";

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignIn = () => {

    const dispatchAction = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [invalidMessageEmail, setInvalidMessageEmail] = useState(null);
    const [invalidMessagePassword, setInvalidMessagePassword] = useState(null);

    const signInHandler = (event) => {
        event.preventDefault();

        const auth = getAuth();

        const emailValue = emailRef.current.value.trim();
        const passwordValue = passwordRef.current.value.trim();

        if (emailValue.length === 0) {
            setInvalidMessageEmail("Эл. почта не должна быть пустая!");
            return;
        }

        if (!validateRegexEmail.test(emailValue)) {
            setInvalidMessageEmail("Введите корректную эл. почту!");
            return;
        }

        if (passwordValue.length === 0) {
            setInvalidMessagePassword("Пароль не должен быть пустым");
            return;
        }

        if (passwordValue.length < 8) {
            setInvalidMessagePassword("Пароль не должен быть меньше 8 символов!");
            return;
        }


        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then(({ user }) => {
                dispatchAction(userActions.setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }));
                navigate("/home", { replace: true });
            })
            .catch(console.error)

    }


    return (
        <div className={styles["auth"]}>
            <div className={styles["auth__container"]}>
                <div className={styles["auth__wrapper"]}>
                    <div className={styles["auth__wrapper__container"]}>
                        <div className={styles["auth__header"]}>
                            <h1 className={styles["auth__header_title"]}>Авторизация</h1>
                        </div>
                        <div className={styles["auth__form_wrapper"]}>
                            <form className={styles["auth__form"]}>
                                <label htmlFor="email" className={styles["auth__label"]}>
                                    Эл. почта
                                    <input className={styles["auth__input"]} type="email" id="email" />
                                </label>
                                <label className={styles["auth__label"]}>
                                    Пароль
                                    <input className={styles["auth__input"]} type="email" id="email" />
                                </label>
                                <button className={styles["auth__button"]} type="submit">Войти</button>
                            </form>
                        </div>
                        <div className={styles["link__auth__wrapper"]}>
                            <p className={styles["link__auth"]}>
                                Нет аккаунта?
                                <a href="/auth/register">Зарегистрироваться</a>
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