import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import styles from "./Auth.module.css";
import LogoBanner from "../images/logo-banner.svg";
import IconSuccesStatus from "../images/status-success.svg";
import IconFailedStatus from "../images/status-failed.svg";
import { useAuth } from "../hooks/use-auth";
import useInput from "../hooks/use-input";

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignUp = () => {

    const navigate = useNavigate();

    const { isAuth } = useAuth();

    const {
        value: enteredName,
        hasError: hasNameInputError,
        isValid: isEnteredNameValid,
        inputChangeHandler: nameInputChangeHandler,
        inputLostFocusHandler: nameInputLostFocusHandler,
        resetValues: resetNameInputValues
    } = useInput((val) => val.trim().length > 2);

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

    const [isRegisterState, setIsRegisterState] = useState({
        text: null,
        stateReg: null,
        isShow: false,
    });

    useEffect(() => {

        if (isAuth) {
            navigate("/home");
        }

    }, []);

    const signUpHandler = (event) => {
        event.preventDefault();

        if (!isEnteredNameValid || !isEnteredEmailValid || !isEnteredPasswordValid) {
            return;
        }

        registerUser(enteredEmail, enteredPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    surname: "",
                    name: enteredName,
                    patronymic: "",
                    email: enteredEmail,
                    dateOfBirth: "",
                    gender: "",
                    userRole: "user",
                    tel: "",
                    address: "",
                    registeredAt: Timestamp.fromDate(new Date()),
                });
                setDoc(doc(db, 'baskets', user.uid), {
                    items: [],
                    itemsQuantity: 0
                });
                setDoc(doc(db, 'orders', user.uid), {
                    orders: []
                });
                setIsRegisterState({
                    text: "Регистрация прошла успешно!",
                    stateReg: true,
                    isShow: true
                });
                resetNameInputValues();
                resetEmailInputValues();
                resetPasswordInputValues();
                setTimeout(() => {
                    navigate("/auth/login");
                }, 1500);
            })
            .catch((error) => {
                setIsRegisterState({
                    text: "Произошла ошибка!",
                    stateReg: false,
                    isShow: true
                });
                setTimeout(() => {
                    setIsRegisterState({
                        text: null,
                        stateReg: null,
                        isShow: false
                    });
                }, 1500);
            });
    }

    const registerText =
        <div className="auth__state">
            <img src={isRegisterState.stateReg ? IconSuccesStatus : IconFailedStatus} alt="Icon: Состояние регистрации" />
            <p>{isRegisterState.text}</p>
        </div>;

    const nameInputClasses = hasEmailInputError
        ? "auth__label invalid"
        : "auth__label";

    const emailInputClasses = hasEmailInputError
        ? "auth__label invalid"
        : "auth__label";

    const passwordInputClasses = hasPasswordInputError
        ? "auth__label invalid"
        : "auth__label";


    return (
        <div className={styles["auth"]}>
            {isRegisterState.isShow && registerText}
            <div className={styles["auth__container"]}>
                <div className={styles["auth__wrapper"]}>
                    <div className={styles["auth__wrapper__container"]}>
                        <div className={styles["auth__header"]}>
                            <h1 className={styles["auth__header_title"]}>Регистрация</h1>
                        </div>
                        <div className={styles["auth__form_wrapper"]}>
                            <form onSubmit={signUpHandler} className={styles["auth__form"]}>
                                <label htmlFor="name" className={nameInputClasses}>
                                    Имя
                                    <input
                                        id="name"
                                        type="text"
                                        className={styles["auth__input"]}
                                        onChange={nameInputChangeHandler}
                                        onBlur={nameInputLostFocusHandler}
                                        value={enteredName}
                                    />
                                    {hasNameInputError && <p className="error__text">Имя не должно содержать меньше 2 симовлов</p>}
                                </label>
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
                                    {hasEmailInputError && <p className="error__text">Введите корректную эл. почту</p>}
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
                                    {hasPasswordInputError && <p className="error__text">Пароль не должен содержать меньше 8 символов</p>}
                                </label>
                                <button disabled={!isFormValid} className={styles["auth__button"]} type="submit">Зарегистрироваться</button>
                            </form>
                        </div>
                        <div className={styles["link__auth__wrapper"]}>
                            <p className={styles["link__auth"]}>
                                Есть аккаунт?
                                <Link to="/auth/login">Авторизоваться</Link>
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

export default SignUp;