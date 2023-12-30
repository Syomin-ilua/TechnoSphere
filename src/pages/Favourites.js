import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFavouritesProducts, favouritesActions } from '../store/favourites-slice';
import FavouritesList from '../components/favourites-components/FavouritesList';
import Container from '../components/layout-components/Container';
import styles from "./Favourites.module.css";
import Loader from '../components/UI-components/Loader';
import { MdError } from "react-icons/md";
import { IoHeart } from "react-icons/io5";

const Favourites = () => {

    const userId = useSelector((state) => state.user.user.id);
    const { favouritesProducts, status, error } = useSelector((state) => state.favourites);

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);

    return (
        <Container class="favourites__container">
            <div className={styles["favourites__wrapper"]}>
                <div className={styles["favourites__title_wrapper"]}>
                    <h1 className={styles["favourites__title"]}>
                        <IoHeart />
                        Избранное
                    </h1>
                </div>
                {
                    status === "loading" &&
                    <div className={styles["loader__wrapper"]}>
                        <Loader />
                    </div>
                }
                {
                    status === "resolved" &&
                    <FavouritesList favouritesProducts={favouritesProducts} />
                }
                {
                    error &&
                    <div className={styles["error__wrapper"]}>
                        <MdError size={100} color="red" />
                        <p className={styles["error__text"]}>Произошла ошибка!</p>
                    </div>
                }
            </div>
        </Container>
    )
}

export default Favourites;