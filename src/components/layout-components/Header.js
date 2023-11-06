import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import Logo from "../../images/logo.svg";
import BasketLink from "../basket-components/BasketLink";
import ProfileLink from "../users-components/ProfileLink";

const setActive = ({ isActive }) => isActive ? "active__link" : '';

const isAuth = true;

const Header = () => {

    return (
        <header className={styles["header"]}>
            <Container class="header__container">
                <NavLink className={styles["logo"]} to="/">
                    <img src={Logo} alt="Логотип" />
                </NavLink>
                <nav className={styles["navigation"]}>
                    <ul>
                        <li>
                            <NavLink className={setActive} to="/">Главная</NavLink>
                        </li>
                        <li>
                            <NavLink className={setActive} to="/products">Каталог товаров</NavLink>
                        </li>
                    </ul>
                </nav>
                {!isAuth &&
                    <div className={styles["auth__links"]}>
                        <Link to="/auth/login">Войти</Link>
                        <Link to="/auth/register">Зарегистрироваться</Link>
                    </div>
                }
                {isAuth &&
                    <div className={styles["profile__links"]}>
                        <BasketLink />
                        <ProfileLink />
                    </div>
                }
            </Container>
        </header>
    );
}

export default Header;