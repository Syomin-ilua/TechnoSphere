import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { basketActions } from "../../store/basket-slice";
import { getReviews } from "../../store/reviews-slice";
import { useAuth } from "../../hooks/use-auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { ReactComponent as DeleteProductInBasketIcon } from "../../images/delete-icon.svg";
import { FaStar } from "react-icons/fa";
import styles from "./ProductCart.module.css";
import "swiper/css";

const ProductCart = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth } = useAuth();

    const dispatchAction = useDispatch();
    const basket = useSelector((state) => state.basket.items);
    const { status, error, reviews, rating } = useSelector((state) => state.reviews);

    const [isLinkReviewsState, setIsLinkReviewsState] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { id, productName, type, description, cost, images, options } = props.product;

    useEffect(() => {
        dispatchAction(getReviews(id));
    }, []);

    const existingBasketProduct = basket.find((product) =>
        product.id === id
    );

    const reviewsShowLinkHandler = () => {
        setIsLinkReviewsState(false);
    }

    const reviewsHideLinkHandler = () => {
        setIsLinkReviewsState(true);
        navigate(-1);
    }

    let content;

    const addProductBasketHandler = () => {

        if (!isAuth) {
            toast.warn("Аавторизуйтесь!");
            navigate("/auth/login");
            return;
        }

        dispatchAction(basketActions.addItem({
            id: id,
            image: images[0],
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    const addProductHandler = () => {
        dispatchAction(basketActions.addItem({
            id: id,
            image: images[0],
            productName: productName,
            cost: cost,
            quantity: 1
        }));
    }

    const removeProductHandler = () => {
        dispatchAction(basketActions.removeItem(id));
    }

    const deleteProductBasketHandler = () => {
        dispatchAction(basketActions.deleteProductInBasket(id));
    }

    if (type === "smartphones") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    }

    if (type === "laptops") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Камера: </span>{options.camera}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    }

    if (type === "smartwatches") {
        content =
            <div className={styles["product__options"]}>
                <i>Характеристики: </i>
                <p><span>Память: </span>{options.memory}</p>
                <p><span>Оперативная память: </span>{options.RAM}</p>
                <p><span>Процессор: </span>{options.processor}</p>
            </div>;
    }

    const productExistsBasketContent =
        <div className={styles["choise__quontity_actions"]}>
            <div className={styles["quontity__actions"]}>
                <button className={styles["increment__button"]} onClick={addProductHandler}>+</button>
                <div className={styles["product__quantity"]}>
                    <p>{existingBasketProduct && existingBasketProduct.quantity}</p>
                </div>
                <button className={styles["decrement__button"]} onClick={removeProductHandler}>-</button>
            </div>
            <div className={styles["delete__product_basket_wrapper"]}>
                <button onClick={deleteProductBasketHandler} className={styles["btn__delete_product-basket"]}>
                    <DeleteProductInBasketIcon />
                    Убрать из корзины
                </button>
            </div>
            {
                isLinkReviewsState && location.pathname !== `/products/${id}/reviews` ?
                    <Link className={styles["reviews__link"]} onClick={reviewsShowLinkHandler} to="reviews">Смотреть отзывы</Link>
                    :
                    <p className={styles["btn__reviews_hide"]} onClick={reviewsHideLinkHandler}>Закрыть отзывы</p>
            }
        </div>;

    const productNotExistsBasketContent = <div className={styles["product__action"]}>
        <button className={styles["btn__add_basket"]} onClick={addProductBasketHandler}>Добавить в корзину</button>
        {
            isLinkReviewsState && location.pathname !== `/products/${id}/reviews` ?
                <Link className={styles["reviews__link"]} onClick={reviewsShowLinkHandler} to="reviews">Смотреть отзывы</Link>
                :
                <p className={styles["btn__reviews_hide"]} onClick={reviewsHideLinkHandler}>Закрыть отзывы</p>
        }
    </div>

    return (
        <div className={styles["product"]}>
            <div className={styles["rating__product_wrapper"]}>
                {status === "loading" ?
                    <div className={styles["rating__wrapper"]}>
                        <Skeleton
                            speed={2}
                            width={20}
                            height={20}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            borderRadius={`50%`}
                        />
                        <Skeleton
                            speed={2}
                            width={40}
                            height={15}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        />
                    </div>
                    :
                    <div className={styles["rating__wrapper"]}>
                        <FaStar
                            className={styles["star__icon"]}
                            color={rating === 0 ? "#e4e5e9" : "#ffc107"}
                        />
                        <p className={styles["rating__number"]}>{rating === 0 ? "нет отзывов" : rating}</p>
                    </div>
                }
            </div>
            <div className={styles["img__wrapper"]}>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        'width': '200px',
                        'height': "200px",
                        'cursor': "pointer",
                        "userSelect": "none",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <div className={styles["images__product"]}>
                        {images.map((image, idx) => (
                            <SwiperSlide>
                                <img className={styles["image"]} src={`/products-images/${image}`} alt={idx} />
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={2.5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    spaceBetween={10}
                    style={{
                        'cursor': "pointer",
                        'width': '200px',
                        'height': '100px',
                        'overflow': 'hidden',
                        'display': 'flex',
                        'alignItems': 'center',
                        'columnGap': '20px',
                        'userSelect': 'none'
                    }}
                >
                    {images.map((image, idx) => (
                        <SwiperSlide
                            style={{
                                'width': '70px',
                                'height': '70px'
                            }}
                        >
                            <img className={styles["image__slide"]} src={`/products-images/${image}`} alt={idx} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles["product__information"]}>
                <div className={styles["product__info"]}>
                    <p className={styles["product__name"]}>{productName}</p>
                    <p className={styles["cost"]}><span>Цена: </span>{cost} руб.</p>
                    <p className={styles["description"]}><span>Описание: </span> {description}</p>
                </div>
                <div className={styles["product__options"]}>
                    {content}
                </div>
                <div className={styles["product__actions"]}>
                    <div className={styles["product__action"]}>
                        {
                            existingBasketProduct ?
                                productExistsBasketContent :
                                productNotExistsBasketContent
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProductCart;