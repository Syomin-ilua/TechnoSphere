import { Link, Route, Routes, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Container from "../components/layout-components/Container";
import ProductCart from "../components/products-components/ProductCart";
import Loader from "../components/UI-components/Loader";
import Reviews from "../components/reviews-components/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productDetails-slice";
import LeftArrow from "../../src/images/left-arrow.svg";

const ProductDetails = () => {

    const params = useParams();
    const productId = params.productID;

    const dispatchAction = useDispatch();
    const product = useSelector((state) => state.product);
    console.log(product);

    useEffect(() => {

        window.scrollTo(0, 0);
        dispatchAction(getProduct(productId));

    }, []);

    return (
        <Container class="productDetails__container">
            <div className={styles["product__top"]}>
                <Link to="/products">
                    <div className={styles["location__action"]}>
                        <img src={LeftArrow} alt="<-" />
                    </div>
                    <p className={styles["product__text_back"]}>Назад</p>
                </Link>
            </div>
            {product.status === "loading" &&
                <div className={styles["loader__wrapper"]}>
                    <Loader />
                </div>
            }
            {product.status === "resolved" &&
                <ProductCart
                    product={{
                        id: product.product.id,
                        productName: product.product.productName,
                        type: product.product.type,
                        description: product.product.description,
                        cost: product.product.cost,
                        images: product.product.images,
                        options: product.product.options ? product.product.options : null
                    }}
                />
            }
            {product.error && <p>{product.error}</p>}
            <Routes>
                <Route path="reviews" element={
                    <Reviews productId={productId} />}
                />
            </Routes>
        </Container>
    )
}

export default ProductDetails;