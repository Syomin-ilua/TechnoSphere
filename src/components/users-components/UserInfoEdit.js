import styles from "./UserInfoEdit.module.css";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const UserInfoEdit = () => {

  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user.id);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("мужчина");

  useEffect(() => {

    const getUserData = async () => {
      // setIsLoading(true);

      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userInfo = docSnap.data();
        setName(userInfo.name);
        setSurname(userInfo.surname);
        setPatronymic(userInfo.patronymic);
        setEmail(userInfo.email);
        setTel(userInfo.tel);
        setDateOfBirth(userInfo.dateOfBirth);
        setAddress(userInfo.address);
        setGender(userInfo.gender);
        // setIsLoading(false);
      } else {
        // setIsLoading(false);
        throw new Error("No such document!");
      }
    }

    getUserData().catch(error => {
      console.log(error);
    });


  }, []);

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
  }

  const telChangeHandler = (event) => {
    setTel(event.target.value);
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

    const userDocRef = doc(db, "users", userId);

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
      await updateDoc(userDocRef, userChangeData);
      setTimeout(() => {
        navigate("/profile/info");
      }, 1000);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles["profile__edit"]}>
      <form className={styles["profile__edit_wrapper"]}>
        <div className={styles["profile__edit_general-info"]}>
          <h2>Общая инофрмация</h2>
          <div className={styles["edit__sections"]}>
            <div className={styles["edit__section"]}>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='surname'>
                  <p>Фамилия:</p>
                  <input id='surname' value={surname} onChange={surnameChangeHandler} type='text' />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='name'>
                  <p>Имя:</p>
                  <input id='name' value={name} type='text' onChange={nameChangeHandler} />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='patronymic'>
                  <p>Отчество:</p>
                  <input id='patronymic' value={patronymic} onChange={patronymicChangeHandler} type='text' />
                </label>
              </div>
            </div>
            <div className={styles["edit__section"]}>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='dateOfBirth'>
                  <p>Дата рождения:</p>
                  <input id='dateOfBirth' value={dateOfBirth} onChange={dateOfBirthChangeHandler} type="date" />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='gender'>
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
          <h2>Контактная информация</h2>
          <div className={styles["edit__sections"]}>
            <div className={styles["edit__section"]}>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='email'>
                  <p>Эл. почта:</p>
                  <input id='email' value={email} onChange={emailChangeHandler} type="email" />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='tel'>
                  <p>Номер телефона:</p>
                  <input id='tel' value={tel} onChange={telChangeHandler} type='tel' />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='address'>
                  <p>Адрес:</p>
                  <input id='address' value={address} onChange={addressChangeHandler} type="text" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["edit__actions"]}>
          <button onClick={editCancelHandler} type="submit" className={styles["edit__cancel"]}>Отмена</button>
          <button onClick={editSaveHandler} type="submit" className={styles["edit__save"]}>Сохранить</button>
        </div>
      </form>
    </div>
  )
}

export default UserInfoEdit;