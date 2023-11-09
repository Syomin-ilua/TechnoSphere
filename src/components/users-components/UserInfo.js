import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserInfo = () => {

	const navaigate = useNavigate();
	const userId = useSelector((state) => state.user.user.id);
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {

		const getUserData = async () => {
			setIsLoading(true);

			const docRef = doc(db, "users", userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userInfo = docSnap.data();
				setUser(userInfo);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				throw new Error("No such document!");
			}
		}

		getUserData().catch(error => {
			console.log(error);
		});


	}, []);


	const changeProfileHandler = () => {
		navaigate("edit");
	}

	return (
		<div className={styles["user__wrapper"]}>
			<div className={styles["user__info_wrapper"]}>
				<div className={styles["user__general_info"]}>
					<div className={styles["user__info_title"]}>
						<h1>Общая информация</h1>
					</div>
					<div className={styles["general__info"]}>
						<div className={styles["general__info_leftSide"]}>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Фамилия: </span>
									{isLoading && !user.surname ? "загрузка" : !isLoading && !!user.surname ? user.surname : "не указано"}
								</p>
							</div>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Имя: </span>
									{isLoading && !user.name ? "загрузка" : !isLoading && !!user.name ? user.name : "не указано"}
								</p>
							</div>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Отчество: </span>
									{isLoading && !user.patronymic ? "загрузка" : !isLoading && !!user.patronymic ? user.patronymic : "не указано"}
								</p>
							</div>
						</div>
						<div className={styles["general__info_rightSide"]}>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Дата рождения: </span>
									{isLoading && !user.dateOfBirth ? "загрузка" : !isLoading && !!user.dateOfBirth ? user.dateOfBirth : "не указано"}
								</p>
							</div>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Пол: </span>
									{isLoading && !user.gender ? "загрузка" : !isLoading && !!user.gender ? user.gender : "не указано"}
								</p>
							</div>
							<div className={styles["info__item"]}>
								<p className={styles["info__text"]}>
									<span>Роль: </span>
									{isLoading && !user.userRole ? "загрузка" : !isLoading && !!user.userRole ? user.userRole : "не указано"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles["user__contacts_info"]}>
					<div className={styles["user__info_title"]}>
						<h1>Контактная информация</h1>
					</div>
					<div className={styles["user__contacts_info-wrapper"]}>
						<div className={styles["info__item"]}>
							<p className={styles["info__text"]}>
								<span>Эл. почта: </span>
								{isLoading && !user.email ? "загрузка" : !isLoading && !!user.email ? user.email : "не указано"}
							</p>
						</div>
						<div className={styles["info__item"]}>
							<p className={styles["info__text"]}>
								<span>Номер телефона: </span>
								{isLoading && !user.tel ? "загрузка" : !isLoading && !!user.tel ? user.tel : "не указано"}
							</p>
						</div>
						<div className={styles["info__item"]}>
							<p className={styles["info__text"]}>
								<span>Адрес: </span>
								{isLoading && !user.address ? "загрузка" : !isLoading && !!user.address ? user.address : "не указано"}
							</p>
						</div>
					</div>
				</div>
				<div className={styles["btn__change_profile-wrapper"]}>
					<button onClick={changeProfileHandler} className={styles["btn__change_profile"]} type="button">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.954 6.921 20.862 7.163C20.77 7.405 20.6243 7.62567 20.425 7.825L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5L16.2 6.4L17.6 7.8Z" fill="black" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default UserInfo