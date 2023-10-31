import React from "react";
import propTypes from 'prop-types';
import classNames from "classnames";
import "./Image.css";

const Image = ({src, alt, className}) => {

    const clasess = classNames(
        className,
    );


    if(!src) {
        src = "product-images/image-place-holder.jpg"
    }

    return (
        <img 
            src={`/${src}`}
            alt={alt}
            className={clasess}
        />
    );
}

Image.propTypes = {
    src: propTypes.string,
    alt: propTypes.string,
    className: propTypes.string,
};

Image.defaultProps = {
    src: '',
    alt: 'imageName',
    className: '',
}

export default Image;