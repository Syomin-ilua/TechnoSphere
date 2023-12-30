import React from 'react';
import styles from "./MobileNavigation.module.css";
import { NavLink } from 'react-router-dom';
import { ReactComponent as CatalogIcon } from "../../images/catalog.svg";
import { FaHome } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import ProfileLink from "../users-components/ProfileLink";
import BasketMobileLink from '../basket-components/BasketMobileLink';
import MobileProfileLink from '../users-components/MobileProfileLink';
import { useAuth } from '../../hooks/use-auth';

const setActive = ({ isActive }) => isActive ? "active__link_navigation" : '';

const MobileNavigation = () => {

    const { isAuth } = useAuth();

    return (
        <div className={styles["mobile__navigation"]}>
            <div className={styles["mobile__navigation_wrapper"]}>
                <NavLink className={setActive} to="/home">
                    <div className={styles["mobile__navigation_link-wrapper"]}>
                        <FaHome />
                        <p>Главная</p>
                    </div>
                </NavLink>
                <NavLink className={setActive} to="/products">
                    <div className={styles["mobile__navigation_link-wrapper"]}>
                        <CatalogIcon />
                        <p>Каталог</p>
                    </div>
                </NavLink>
                {isAuth &&
                    <NavLink className={setActive} to="/favourites">
                        <div className={styles["mobile__navigation_link-wrapper"]}>
                            <IoHeart />
                            <p>Избранное</p>
                        </div>
                    </NavLink>
                }
                {isAuth &&
                    <NavLink className={setActive} to="/basket">
                        <BasketMobileLink />
                    </NavLink>
                }
                <MobileProfileLink />
            </div>
        </div>
    )
}

export default MobileNavigation;