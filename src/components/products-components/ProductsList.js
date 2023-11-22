import { useSelector } from "react-redux";
import styles from "./ProductsList.module.css";
import Product from "./Product";

const ProductsList = () => {

    const products = useSelector((state) => state.products.currentProducts);

    return (
        <div className={styles.products}>
            {products.map(product => (
                <Product
                    key={product.id}
                    product={
                        {
                            id: product.id,
                            images: product.images,
                            productName: product.productName,
                            cost: product.cost,
                            description: product.description
                        }
                    }
                />
            ))
            }
        </div>
    );
}

export default ProductsList;