import styles from "./Footer.module.css";
import Container from "./Container";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container class="footer__container">
                <div className={styles["footer__wrapper"]}>
                    <div className={styles["footer__author_wrapper"]}>
                        <p className={styles["footer__author"]}><span>Сервис создал:</span> Сёмин Илья</p>
                        <p className={styles["footer__author"]}><span>GIT HUB:</span> <a href="https://github.com/Syomin-ilua">https://github.com/Syomin-ilua</a></p>
                    </div>
                    <div className={styles["footer__rights_wrapper"]}>
                        <p className={styles["footer__rights_text"]}>©️ Все права защищены</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;