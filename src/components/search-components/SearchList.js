import styles from "./SearchList.module.css";
import SearchProduct from "./SearchProduct";

const SearchList = (props) => {

    const productsList = props.products;

    const productHanler = (productName) => {
        props.onProductHanler(productName);
    }

    return (
        <div className={styles["list__search_wrapper"]}>
            <ul className={styles["list__search"]}>
                {productsList.length === 0 ?
                    <p className={styles["products__notFound"]}>Товаров с таким названием не найдено!</p> :
                    productsList.map(product =>
                        <SearchProduct
                            key={product.id}
                            product={{
                                id: product.id,
                                productName: product.productName
                            }}
                            onClickProduct={productHanler}
                        />
                    )
                }
            </ul>
        </div>
    );
}

export default SearchList;