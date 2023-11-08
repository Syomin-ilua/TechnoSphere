import { useSelector } from "react-redux";

export const useAuth = () => {
    const userInfo = useSelector((state) => state.user);

    return {
        isAuth: !!userInfo.user.email,
        email: userInfo.user.email, 
        token: userInfo.user.token,
        id: userInfo.user.id
    };
}