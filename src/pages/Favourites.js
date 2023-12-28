import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFavouritesProducts, favouritesActions } from '../store/favourites-slice';
import FavouritesList from '../components/favourites-components/FavouritesList';
import Container from '../components/layout-components/Container';
import { ReactComponent as NotProductsFavouritesIcon } from "../images/not-favourites-product-icon.svg";
import styles from "./Favourites.module.css";

const Favourites = () => {

    const userId = useSelector((state) => state.user.user.id);
    const favouritesData = useSelector((state) => state.favourites);
    const dispatchAction = useDispatch();

    useEffect(() => {

        window.scrollTo(0, 0);

    }, []);
    
    useEffect(() => {

        if(favouritesData.isFavoritesProductsContentChanged) {
            changeFavouritesProducts(userId);
            dispatchAction(favouritesActions.resetFavoritesStateChanged());
        }

    }, [favouritesData.favourites]);

    return (
        <Container class="favourites__container">
            <div className={styles["favourites__wrapper"]}>
                <div className={styles["favourites__title_wrapper"]}>
                    <h1 className={styles["favourites__title"]}>Избранное</h1>
                </div>
                {favouritesData.favourites.length === 0 ?
                    <div className={styles["not__products_favourites"]}>
                        <div className={styles["not__products_favouritesImage-wrapper"]}>
                            <NotProductsFavouritesIcon />
                            <p>В списке пока нет ни одного избранного товара</p>
                        </div>
                    </div> :
                    <FavouritesList favourites={favouritesData.favourites} />
                }
            </div>
        </Container>
    )
}

export default Favourites;