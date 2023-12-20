import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, db } from "../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../hooks/use-auth";
import useInput from "../hooks/use-input";
import styles from "./Auth.module.css";
import LogoBanner from "../images/logo-banner.svg";

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
                    userRole: false,
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
                toast.success("Регистрация прошла успешно!");
                resetNameInputValues();
                resetEmailInputValues();
                resetPasswordInputValues();
                setTimeout(() => {
                    navigate("/auth/login");
                }, 500);
            })
            .catch((error) => {
                toast.success("Произошла ошибка регистрации!");
            });
    }

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
            <ToastContainer />
        </div>
    );
}

export default SignUp;