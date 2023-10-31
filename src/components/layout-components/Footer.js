import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo.svg";
import MailIcon from "../../images/contacts-icon/mail.svg";
import Container from "./Container";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container class="footer__container">
                <div className={styles.centerSide}>
                    <div>
                        <p>© 2023 technosphere.ru <br /> All rights reserved</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;