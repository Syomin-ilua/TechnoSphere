import './App.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { basketGetOrders, basketChangeOrders } from './store/basket-slice';
import { getOrders, changeOrders } from './store/orders-slice';
import { getProducts } from './store/products-slice';
import { changeUserInfo, getUserInfo } from './store/user-slice';
import { changeCategoriesProducts, getCategoriesProducts } from './store/categoriesProducts-slice';
import { changeFavouritesProducts } from './store/favourites-slice';
import { categoriesProductsActions } from './store/categoriesProducts-slice';
import { ordersActions } from './store/orders-slice';
import { basketActions } from './store/basket-slice';
import { userActions } from './store/user-slice';
import { favouritesActions } from './store/favourites-slice';

import Header from './components/layout-components/Header';
import Footer from './components/layout-components/Footer';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Basket from './pages/Basket';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Favourites from "./pages/Favourites";
import Admin from './pages/Admin';
import RequireAuth from './hoc/RequireAuth';
import RequireAdminAuth from './hoc/RequireAdminAuth';
import { getFavouritesProducts } from './store/favourites-slice';
import MobileNavigation from './components/layout-components/MobileNavigation';
import useResize from './hooks/use-resize';

let isInitialRunning = true;

function App() {

  const userId = useSelector((state) => state.user.user.id);
  const user = useSelector((state) => state.user.user);
  const basket = useSelector((state) => state.basket);
  const orders = useSelector((state) => state.orders);
  const categoriesProducts = useSelector((state) => state.categoriesProducts);
  const favourites = useSelector((state) => state.favourites);

  const dispatchAction = useDispatch();

  const width = useResize();

  useEffect(() => {

    if (userId) {
      dispatchAction(basketGetOrders({ userId }));
      dispatchAction(getOrders(userId));
      dispatchAction(getUserInfo(userId));
      dispatchAction(getOrders(userId));
      dispatchAction(getFavouritesProducts(userId));
    }

    dispatchAction(getCategoriesProducts());
    dispatchAction(getProducts());

  }, [userId]);

  useEffect(() => {
    if (!basket.isBasketContentChanged) {
      isInitialRunning = false;
      return;
    }

    if (basket.isBasketContentChanged) {
      dispatchAction(basketChangeOrders({ userId }));
      dispatchAction(basketActions.resetBasketContentChangedState());
    }

  }, [basket]);

  useEffect(() => {
    if (!orders.isOrdersContentChanged) {
      isInitialRunning = false;
      return;
    }

    if (orders.isOrdersContentChanged) {
      dispatchAction(changeOrders(userId));
      dispatchAction(ordersActions.resetOrdersContentChangedState());
    }

  }, [orders]);

  useEffect(() => {

    if (!user.isUserContentChanged) {
      isInitialRunning = false;
      return;
    }

    if (user.isUserContentChanged) {
      dispatchAction(changeUserInfo(userId));
      dispatchAction(userActions.resetUserContentChangedState());
    }

  }, [user]);

  useEffect(() => {
    if (!categoriesProducts.isCategoriesProductsContentChanges) {
      isInitialRunning = false;
      return;
    }

    if (categoriesProducts.isCategoriesProductsContentChanges) {
      dispatchAction(changeCategoriesProducts());
      dispatchAction(categoriesProductsActions.resetCategoriesProductsContentChangedState());
    }

  }, [categoriesProducts]);

  useEffect(() => {

    if (favourites.isFavoritesProductsContentChanged) {
      dispatchAction(changeFavouritesProducts(userId));
      dispatchAction(favouritesActions.resetFavoritesStateChanged());
    }

  }, [favourites]);

  return (
    <Fragment>
      <Routes>
        <Route path='/*' element={
          <Fragment>
            <Header />
            {width <= 800 &&
              <MobileNavigation />
            }
            <Routes>
              <Route path='/' element={
                <Navigate to="/home" replace={true} />
              } />
              <Route path='/home' element={<About />} />
              <Route path='/products' element={<Catalog />} />
              <Route path='/products/:productID/*' element={<ProductDetails />} />
              <Route path='/basket' element={
                <RequireAuth>
                  <Basket />
                </RequireAuth>
              } />
              <Route path='/profile' element={
                <Navigate to="/profile/info" replace="true" />
              } />
              <Route path='/profile/*' element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              } />
              <Route path='/favourites' element={
                <RequireAuth>
                  <Favourites />
                </RequireAuth>
              } />
              <Route
                path='/admin'
                element={
                  <RequireAdminAuth>
                    <Admin />
                  </RequireAdminAuth>
                }
              />
              <Route path='/*' element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Fragment>
        } />

        <Route path='/auth/*' element={
          <Routes>
            <Route path='/login' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        } />

      </Routes>
    </Fragment>
  );
}

export default App;
