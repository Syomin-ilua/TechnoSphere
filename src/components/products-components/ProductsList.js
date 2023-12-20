import { useSelector } from "react-redux";
import styles from "./ProductsList.module.css";
import ColumnGridProduct from "./ColumnGridProduct";
import NotFoundProducts from "../../images/not-found-products.png";
import RowGridProduct from "./RowGridProduct";

const ProductsList = ({ gridState }) => {

    const products = useSelector((state) => state.products.currentProducts);

    const gridRowContent =
        <div className={styles["products__row"]}>
            {products.map(product => (
                <RowGridProduct
                    key={product.id}
                    product={
                        {
                            id: product.id,
                            image: product.images[0],
                            productName: product.productName,
                            cost: product.cost,
                            description: product.description
                        }
                    }
                />
            ))
            }
        </div>

    const gridColumnContent =
        <div className={styles["products__column"]}>
            {products.map(product => (
                <ColumnGridProduct
                    key={product.id}
                    product={
                        {
                            id: product.id,
                            image: product.images[0],
                            productName: product.productName,
                            cost: product.cost,
                            description: product.description
                        }
                    }
                />
            ))
            }
        </div>

    return (
        <div className={styles["products__list"]} >
            {products.length !== 0 ?
                (
                    gridState ?
                        gridColumnContent :
                        gridRowContent
                ) :
                <div className={styles["empty__products_wrapper"]}>
                    <img src={NotFoundProducts} alt="Иконка: Товаров не найдено" />
                    <p className={styles["empty__products_title"]}>Товаров не найдено!</p>
                </div>


            }
        </div>
    );
}

export default ProductsList;