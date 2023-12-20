import React from 'react';
import styles from "./PreviewImage.module.css";

const PreviewImage = (props) => {

    const { url, id, name } = props.image;  
    console.log(name);

    const removeImageHandler = () => {
        props.onDelete(id, name);
    }

    return (
        <div className={styles["uploaded__image_wrapper"]}>
            <img className={styles["uploaded__image"]} src={url} alt={"Идентификатор изображения: " + id} />
            <button onClick={removeImageHandler} className={styles["btn__delete_image"]}>X</button>
        </div>
    )
}

export default PreviewImage;