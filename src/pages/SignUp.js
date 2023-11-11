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

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignUp = () => {

    const navigate = useNavigate();
    const { isAuth } = useAuth(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [invalidMessageName, setInvalidMessageName] = useState(null);
    const [invalidMessageEmail, setInvalidMessageEmail] = useState(null);
    const [invalidMessagePassword, setInvalidMessagePassword] = useState(null);

    const [isRegisterState, setIsRegisterState] = useState({
        text: null,
        stateReg: null,
        isShow: false,
    });

    useEffect(() => {
        
        if(isAuth) {
            navigate("/home");
        }


    }, []);

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const signUpHandler = (event) => {
        event.preventDefault();

        if (name.length === 0) {
            setInvalidMessageName("Имя не должно быть пустым");
            return;
        }

        if (name.length < 2) {
            setInvalidMessageName("Имя не должно быть меньше 2 симовлов");
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

        setInvalidMessageName(null);
        setInvalidMessageEmail(null);
        setInvalidMessagePassword(null);

        registerUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    surname: "",
                    name: name,
                    patronymic: "",
                    email: email,
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
                                <label htmlFor="name" className={styles["auth__label"]}>
                                    Имя
                                    <input autoComplete="off" className={styles["auth__input"]} type="text" id="name" onChange={nameChangeHandler} value={name} />
                                    {invalidMessageName && <p className={styles["invalid__input_message"]}>{invalidMessageName}</p>}
                                </label>
                                <label htmlFor="email" className={styles["auth__label"]}>
                                    Эл. почта
                                    <input autoComplete="off" className={styles["auth__input"]} type="email" id="email" onChange={emailChangeHandler} value={email} />
                                    {invalidMessageEmail && <p className={styles["invalid__input_message"]}>{invalidMessageEmail}</p>}
                                </label>
                                <label htmlFor="password" className={styles["auth__label"]}>
                                    Пароль
                                    <input autoComplete="off" className={styles["auth__input"]} type="password" id="password" onChange={passwordChangeHandler} value={password} />
                                    {invalidMessagePassword && <p className={styles["invalid__input_message"]}>{invalidMessagePassword}</p>}
                                </label>
                                <button className={styles["auth__button"]} type="submit">Зарегистрироваться</button>
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