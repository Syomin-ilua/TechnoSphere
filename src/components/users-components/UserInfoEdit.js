import React from 'react';
import styles from "./UserInfoEdit.module.css";

const UserInfoEdit = () => {





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
                  <input id='surname' type='text' />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='name'>
                  <p>Имя:</p>
                  <input id='name' type='text' />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='patronymic'>
                  <p>Отчество:</p>
                  <input id='patronymic' type='text' />
                </label>
              </div>
            </div>
            <div className={styles["edit__section"]}>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='dateOfBirth'>
                  <p>Дата рождения:</p>
                  <input id='dateOfBirth' type="date" />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='gender'>
                  <p>Пол:</p>
                  <select id='gender'>
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
                  <input id='email' type="email" />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='tel'>
                  <p>Номер телефона:</p>
                  <input id='tel' type='tel' />
                </label>
              </div>
              <div className={styles["edit__item"]}>
                <label className={styles["edit__item_label"]} htmlFor='address'>
                  <p>Адрес:</p>
                  <input id='address' type="text" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["edit__actions"]}>
          <button className={styles["edit__cancel"]}>Отмена</button>
          <button className={styles["edit__save"]}>Сохранить</button>
        </div>
      </form>
    </div>
  )
}

export default UserInfoEdit;