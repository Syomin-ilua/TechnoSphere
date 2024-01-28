import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user-slice";
import InputMask from "react-input-mask";
import styles from "./UserInfoEdit.module.css";
import { ReactComponent as SuccessIcon } from "../../images/success-icon.svg";
import { ReactComponent as CancelIcon } from "../../images/cancel-icon.svg";

const emailRegExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const telRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const UserInfoEdit = () => {

    const navigate = useNavigate();
    const dispatchAction = useDispatch();

    const user = useSelector((state) => state.user.user.user);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("мужчина");

    const [emailInputTouched, setEmailInputTouched] = useState(false);
    const [telInputTouched, setTelInputTouched] = useState(false);

    useEffect(() => {

        if (user) {
            setName(user.name);
            setSurname(user.surname);
            setPatronymic(user.patronymic);
            setEmail(user.email);
            setTel(user.tel);
            setDateOfBirth(user.dateOfBirth);
            setAddress(user.address);
            setGender(user.gender);
        }

    }, []);

    const emailValid = emailRegExp.test(email);
    const telValid = telRegExp.test(tel);

    const surnameChangeHandler = (event) => {
        setSurname(event.target.value);
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    const patronymicChangeHandler = (event) => {
        setPatronymic(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
        setEmailInputTouched(true);
    }

    const telChangeHandler = (event) => {
        setTel(event.target.value);
        setTelInputTouched(true);
    }

    const genderChangeHandler = (event) => {
        setGender(event.target.value);
    }

    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    }

    const dateOfBirthChangeHandler = (event) => {
        setDateOfBirth(event.target.value);
    }

    const editCancelHandler = (event) => {
        event.preventDefault();
        navigate("/profile/info");
    }

    const editSaveHandler = async (event) => {
        event.preventDefault();

        const userChangeData = {
            surname: surname,
            name: name,
            patronymic: patronymic,
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email,
            tel: tel,
            address: address,
        }

        try {

            dispatchAction(userActions.changeUser(userChangeData));
            navigate("/profile/info");

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={styles["profile__edit"]}>
            <form className={styles["profile__edit_wrapper"]}>
                <div className={styles["profile__edit_general-info"]}>
                    <h2 className={styles["h2"]}>Общая информация</h2>
                    <div className={styles["edit__sections"]}>
                        <div className={styles["edit__section"]}>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='surname'>
                                    <p>Фамилия:</p>
                                    <input
                                        id='surname'
                                        value={surname}
                                        onChange={surnameChangeHandler}
                                        type='text'
                                        className="input__item"
                                    />
                                </label>
                            </div>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='name'>
                                    <p>Имя:</p>
                                    <input
                                        id='name'
                                        value={name}
                                        type='text'
                                        onChange={nameChangeHandler}
                                        className="input__item"
                                    />
                                </label>
                            </div>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='patronymic'>
                                    <p>Отчество:</p>
                                    <input
                                        id='patronymic'
                                        value={patronymic}
                                        onChange={patronymicChangeHandler}
                                        type='text'
                                        className="input__item"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles["edit__section"]}>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='dateOfBirth'>
                                    <p>Дата рождения:</p>
                                    <input
                                        id='dateOfBirth'
                                        value={dateOfBirth}
                                        onChange={dateOfBirthChangeHandler}
                                        type="date"
                                        className="input__item"
                                    />
                                </label>
                            </div>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label-gender"]} htmlFor='gender'>
                                    <p>Пол:</p>
                                    <select value={gender} onChange={genderChangeHandler} id='gender'>
                                        <option>мужчина</option>
                                        <option>женщина</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles["profile__edit_contacts-info"]}>
                    <h2 className={styles["h2"]}>Контактная информация</h2>
                    <div className={styles["edit__sections"]}>
                        <div className={styles["edit__section"]}>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='email'>
                                    <p>Эл. почта:</p>
                                    <input
                                        className={`input__item ${!emailValid && emailInputTouched && "input__item_invalid"}`}
                                        id="email"
                                        type="text"
                                        onChange={emailChangeHandler}
                                        value={email}
                                    />
                                </label>
                            </div>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='tel'>
                                    <p>Номер телефона: </p>
                                    <InputMask
                                        id="tel"
                                        mask="+7 (999) 999-99-99"
                                        onChange={telChangeHandler}
                                        value={tel}
                                        className={`input__item ${!telValid && telInputTouched && "input__item_invalid"}`}
                                    />
                                </label>
                            </div>
                            <div className={styles["edit__item"]}>
                                <label className={styles["edit__item_label"]} htmlFor='address'>
                                    <p>Адрес доставки:</p>
                                    <input
                                        id='address'
                                        value={address}
                                        onChange={addressChangeHandler}
                                        type="text"
                                        className="input__item"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles["edit__actions"]}>
                    <button onClick={editCancelHandler} type="submit" className={styles["edit__cancel"]}>
                        <CancelIcon className={styles["btn__icon"]} />
                    </button>
                    <button onClick={editSaveHandler} type="submit" className={styles["edit__save"]}>
                        <SuccessIcon className={styles["btn__icon"]} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserInfoEdit;