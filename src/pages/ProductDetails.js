import { Link, Route, Routes, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Container from "../components/layout-components/Container";
import ProductCart from "../components/products-components/ProductCart";
import Loader from "../components/UI-components/Loader";
import Reviews from "../components/reviews-components/Reviews";

const URLFirebase = `https://react-course-http-cae26-default-rtdb.firebaseio.com/`;

const reviews = [
    {
        id: Math.random(),
        date: String(new Date()),
        reviewData: "dsadas",
        productID: "1",
        userId: 1,
        userSurname: "Сёмин",
        userName: "Илья",
        userPatronymic: "Александрович"
    },
    {
        id: Math.random(),
        date: String(new Date()),
        reviewData: "dsadas",
        productID: "1",
        userId: 1,
        userSurname: "Сёмин",
        userName: "Илья",
        userPatronymic: "Александрович"
    }
]

const ProductDetails = () => {

    const params = useParams();

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isHttpErrorMessage, setIsHttpErrorMessage] = useState(false);

    useEffect(() => {

        window.scrollTo(0, 0);

        const getProduct = async (url) => {
            setIsLoading(true);

            const URLFirebaseProduct = `${url}/products/${params.productID}.json`;

            const response = await fetch(URLFirebaseProduct);

            if (!response.ok) {
                throw new Error("Ошибка получения данных о товаре");
            }

            const responseData = await response.json();


            setProduct(responseData);
            setIsLoading(false);
        }

        getProduct(URLFirebase).catch(error => {
            setIsHttpErrorMessage(error + "");
            setIsLoading(false);
        });

    }, []);

    return (
        <Container class="productDetails__container">

            <div className={styles["product__top"]}>
                <Link to="/products">
                    <div className={styles["location__action"]}>
                        ←
                    </div>
                    <p className={styles["product__text_back"]}>Назад</p>
                </Link>
            </div>
            {
                isLoading ? <Loader /> :
                    <ProductCart
                        product={{
                            id: product.id,
                            productName: product.productName,
                            type: product.type,
                            description: product.description,
                            cost: product.cost,
                            image: product.image,
                            options: product.options ? product.options : null
                        }}
                    />
            }
            <Routes>
                <Route path="reviews" element={<Reviews productId={product.id} reviews={reviews || []} />} />
            </Routes>
        </Container>
    )
}

export default ProductDetails;