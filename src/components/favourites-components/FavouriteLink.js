import React from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import styles from "./FavouriteLink.module.css";

const FavouriteLink = () => {
    return (
        <div className={styles["favourite__link_img"]}>
            <MdFavoriteBorder />
        </div>
    )
}

export default FavouriteLink;