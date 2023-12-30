import React from 'react';
import FavouritesProduct from "./FavouriteProduct";
import styles from "./FavouritesList.module.css";
import { ReactComponent as NotProductsFavouritesIcon } from "../../images/not-favourites-product-icon.svg";


const FavouritesList = (props) => {

    const favouritesProducts = props.favouritesProducts;

    return (
        <div className={styles["favourites__list"]}>
            {favouritesProducts.length === 0 ?
                <div className={styles["not__products_favourites"]}>
                    <div className={styles["not__products_favouritesImage-wrapper"]}>
                        <NotProductsFavouritesIcon />
                        <p>В списке пока нет ни одного избранного товара</p>
                    </div>
                </div> :
                favouritesProducts.map((favouriteProduct, idx) =>
                    <FavouritesProduct
                        key={idx}
                        product={{
                            productName: favouriteProduct.productName,
                            cost: favouriteProduct.cost,
                            id: favouriteProduct.id,
                            image: favouriteProduct.image
                        }}
                    />
                )
            }
        </div>
    )
}

export default FavouritesList;