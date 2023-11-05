import styles from "./Profile.module.css";
import { Routes, Route } from "react-router-dom";
import ProfileActionsSide from "../components/users-components/ProfileActionsSide";
import UserInfo from "../components/users-components/UserInfo";
import Container from "../components/layout-components/Container";
import UserOrders from "../components/users-components/UserOrders";
import UserInfoEdit from "../components/users-components/UserInfoEdit";

const Profile = () => {
    return (
        <Container class="profile__container">
            <div className={styles["profile"]}>
                <ProfileActionsSide />
                <Routes>
                    <Route path="info" element={
                        <UserInfo />
                    } />
                    <Route path="orders" element={
                        <UserOrders />
                    } />
                    <Route path="info/edit" element={
                        <UserInfoEdit />
                    } />
                </Routes>
            </div>
        </Container>
    )
}

export default Profile