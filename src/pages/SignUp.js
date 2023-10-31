import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../store/user-slice";
import styles from "./SignUp.module.css";
import Container from "../components/layout-components/Container";

const validateRegexEmail = /^\S+@\S+\.\S+$/;

const SignUp = () => {
    
    const dispatchAction = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [invalidMessageEmail, setInvalidMessageEmail] = useState(null);
    const [invalidMessagePassword, setInvalidMessagePassword] = useState(null);

    const signUpHandler = (event) => {
        event.preventDefault();
        
        const auth = getAuth();

        const emailValue = emailRef.current.value.trim();
        const passwordValue = passwordRef.current.value.trim();

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

        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then(({user}) => {
                console.log(user);
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
                        <h1 className="auth__title">регистрация</h1>
                    </div>
                    <form onSubmit={signUpHandler} className={styles["auth__form"]}>
                        <div className={styles["label__wrapper"]}>
                            <label htmlFor="email" className={styles["input__wrapper"]}>
                                <input
                                    placeholder="Введите эл. почту"
                                    className={styles["input"]}
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
                                    placeholder="Введите пароль"
                                    className={styles["input"]}
                                    id="password"
                                    ref={passwordRef}
                                />
                            </label>
                            {
                                invalidMessagePassword &&
                                <p className={styles["invalid__input-text"]}>{invalidMessagePassword}</p>
                            }
                        </div>
                        <button type="submit" className={styles["btn_auth"]}>Зарегистрироваться</button>
                    </form>

                    <p className="link__auth">Есть аккаунт? <Link to="/login">Авторизоваться</Link></p>
                </div>
            </div>
        </Container>
    );
}

export default SignUp;