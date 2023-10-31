import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./SignIn.module.css";
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
            .then(({user}) => {
                dispatchAction(userActions.setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }));
                navigate("/home", {replace: true});
            })
            .catch(console.error)

    }


    return (
        <Container class="auth__container">
            <div className={styles["auth__wrapper"]}>
                <div className={styles["auth-form__wrapper"]}>
                    <div className="auth__title_wrapper">
                        <h1 className="auth__title">авторизация</h1>
                    </div>
                    <form onSubmit={signInHandler} className={styles["auth__form"]}>
                        <div className={styles["label__wrapper"]}>
                            <label htmlFor="email" className={styles["input__wrapper"]}>
                                <input
                                    className={styles["input"]}
                                    placeholder="Введите эл. почту"
                                    id="email"
                                    ref={emailRef}
                                />
                            </label>
                            {
                                invalidMessageEmail &&
                                <p className={styles["invalid__input-text"]}>{invalidMessageEmail}</p>
                            }
                        </div>
                        <div className={styles["label__wrapper"]}>
                            <label htmlFor="password" className={styles["input__wrapper"]}>
                                <input
                                    className={styles["input"]}
                                    placeholder="Введите пароль"
                                    id="password"
                                    ref={passwordRef}
                                />
                            </label>
                            {
                                invalidMessagePassword &&
                                <p className={styles["invalid__input-text"]}>{invalidMessagePassword}</p>
                            }
                        </div>
                        <button type="submit" className={styles["btn_auth"]}>Войти</button>
                    </form>

                    <p className="link__auth">Нету аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
                </div>
            </div>
        </Container>
    );
}

export default SignIn;