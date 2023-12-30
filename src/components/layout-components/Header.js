import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import Logo from "../../images/logo.svg";
import BasketLink from "../basket-components/BasketLink";
import ProfileLink from "../users-components/ProfileLink";
import { useAuth } from "../../hooks/use-auth";
import { useSelector } from "react-redux";
import { ReactComponent as HomeIcon } from "../../images/home.svg";
import { ReactComponent as CatalogIcon } from "../../images/catalog.svg";
import FavouriteLink from "../favourites-components/FavouriteLink";

const setActive = ({ isActive }) => isActive ? "active__link" : '';

const Header = () => {

    const { isAuth } = useAuth();

    return (
        <header className={styles["header"]}>
            <Container class="header__container">
                <div className={styles["header__wrapper"]}>
                    <NavLink className={styles["logo"]} to="/">
                        <img src={Logo} alt="Логотип" />
                    </NavLink>
                    <nav className={styles["navigation"]}>
                        <div>
                            <NavLink className={setActive} to="/home">
                                <HomeIcon className={styles["icon__navigation"]} />
                                Главная
                            </NavLink>
                            <NavLink className={setActive} to="/products">
                                <CatalogIcon className={styles["icon__navigation"]} />
                                Каталог товаров
                            </NavLink>
                        </div>
                    </nav>
                    {!isAuth &&
                        <div className={styles["auth__links"]}>
                            <Link to="/auth/login">Войти</Link>
                            <Link to="/auth/register">Зарегистрироваться</Link>
                        </div>
                    }
                    {isAuth &&
                        <div className={styles["important__links"]}>
                            <NavLink to="/favourites">
                                <FavouriteLink />
                            </NavLink>
                            <NavLink to="/basket">
                                <BasketLink />
                            </NavLink>
                            <ProfileLink />
                        </div>
                    }
                </div>
            </Container>
        </header>
    );
}

export default Header;