import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import Logo from "../../images/logo.svg";
import BasketLink from "../basket-components/BasketLink";

const setActive = ({isActive}) => isActive ? "active__link" : '';

const Header = () => {

    return (
        <header className={styles["header"]}>
            <Container class="header__container">
                <NavLink className={styles["logo"]} to="/home">
                    <img src={Logo} alt="Логотип" />
                </NavLink>
                <nav className={styles["navigation"]}>
                    <ul>
                        <li>
                            <NavLink className={setActive} to="/home">О нас</NavLink>
                        </li>
                        <li>
                            <NavLink className={setActive} to="/products">Каталог товаров</NavLink>
                        </li>
                    </ul>
                </nav>
                <BasketLink />
            </Container>
        </header>
    );
}

export default Header;