import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../firebase";
import { userActions } from "../store/user-slice";
import styles from "./Auth.module.css";
import LogoBanner from "../images/logo-banner.svg"
import { useAuth } from "../hooks/use-auth";
import useInput from "../hooks/use-input";
import { ToastContainer, toast } from "react-toastify";

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignIn = () => {

    const navigate = useNavigate();
    const dispatchAction = useDispatch();

    const { isAuth } = useAuth();

    const {
        value: enteredEmail,
        hasError: hasEmailInputError,
        isValid: isEnteredEmailValid,
        inputChangeHandler: emailInputChangeHandler,
        inputLostFocusHandler: emailInputLostFocusHandler,
        resetValues: resetEmailInputValues
    } = useInput((val) => validateRegexEmail.test(val));

    const {
        value: enteredPassword,
        hasError: hasPasswordInputError,
        isValid: isEnteredPasswordValid,
        inputChangeHandler: passwordInputChangeHandler,
        inputLostFocusHandler: passwordInputLostFocusHandler,
        resetValues: resetPasswordInputValues
    } = useInput((val) => val.trim().length > 7);

    let isFormValid = false;

    if (isEnteredEmailValid && isEnteredPasswordValid) {
        isFormValid = true;
    }

    useEffect(() => {

        if (isAuth) {
            navigate("/home", {replace: true});
        }

    }, []);

    const signInHandler = (event) => {
        event.preventDefault();

        if (!isEnteredEmailValid || !isEnteredPasswordValid) {
            return;
        }

        loginUser(enteredEmail, enteredPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Авторизация прошла успешно!");
                dispatchAction(userActions.setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                resetEmailInputValues();
                resetPasswordInputValues();
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 500);
            })
            .catch((error) => {
                toast.warning("Произошла ошибка авторизации!");
            });

    }

    const emailInputClasses = hasEmailInputError
        ? "auth__label invalid"
        : "auth__label";

    const passwordInputClasses = hasPasswordInputError
        ? "auth__label invalid"
        : "auth__label";

    return (
        <div className={styles["auth"]}>
            <div className={styles["auth__container"]}>
                <div className={styles["auth__wrapper"]}>
                    <div className={styles["auth__wrapper__container"]}>
                        <div className={styles["auth__header"]}>
                            <h1 className={styles["auth__header_title"]}>Авторизация</h1>
                        </div>
                        <div className={styles["auth__form_wrapper"]}>
                            <form onSubmit={signInHandler} className={styles["auth__form"]}>
                                <label htmlFor="email" className={emailInputClasses}>
                                    Эл. почта
                                    <input
                                        id="email"
                                        type="email"
                                        className={styles["auth__input"]}
                                        onChange={emailInputChangeHandler}
                                        onBlur={emailInputLostFocusHandler}
                                        value={enteredEmail}
                                    />
                                    {hasEmailInputError && <p className="error__text">Укажите правильно эл. почту!</p>}
                                </label>
                                <label htmlFor="password" className={passwordInputClasses}>
                                    Пароль
                                    <input
                                        id="password"
                                        type="password"
                                        className={styles["auth__input"]}
                                        onChange={passwordInputChangeHandler}
                                        onBlur={passwordInputLostFocusHandler}
                                        value={enteredPassword}
                                    />
                                    {hasPasswordInputError && <p className="error__text">Пароль не должен быть меньше 8 символов</p>}
                                </label>
                                <button disabled={!isFormValid} className={styles["auth__button"]} type="submit">Войти</button>
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
            <ToastContainer />
        </div>
    );
}

export default SignIn;