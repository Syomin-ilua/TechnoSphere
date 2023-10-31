import styles from "./PageNotFound.module.css";
import Container from "../components/layout-components/Container";


const PageNotFound = () => {
    return (
        <Container>
            <div className={styles["page-not-found__wrapper"]}>
                <p className={styles["code__not-found"]}>404</p>
                <p className={styles["text__not-found"]}>Такая страница не найдена</p>
            </div>
        </Container>
    );
}

export default PageNotFound;