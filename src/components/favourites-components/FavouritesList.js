import React from 'react';
import FavouritesProduct from "./FavouriteProduct";
import styles from "./FavouritesList.module.css";

const FavouritesList = (props) => {

    const { favourites } = props;

    return (
        <div className={styles["favourites__list"]}>
            {favourites.map((favouriteProduct, idx) =>
                <FavouritesProduct
                    key={idx}
                    product={{
                        productName: favouriteProduct.productName,
                        cost: favouriteProduct.cost,
                        id: favouriteProduct.id,
                        image: favouriteProduct.image,
                        type: favouriteProduct.type
                    }}
                />
            )}
        </div>
    )
}

export default FavouritesList;