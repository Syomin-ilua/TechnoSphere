import './App.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { basketGetOrders, basketChangeOrders } from './store/basket-slice';
import { getOrders, changeOrders } from './store/orders-slice';

import Header from './components/layout-components/Header';
import Footer from './components/layout-components/Footer';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Basket from './pages/Basket';
import PageNotFound from './pages/PageNotFound';
import RequireAuth from './hoc/RequireAuth';
import Profile from './pages/Profile';
// import { postProducts } from './store/products-slice';

let isInitialRunning = true;

function App() {

  const userId = useSelector((state) => state.user.user.id);
  const basket = useSelector((state) => state.basket);
  const orders = useSelector((state) => state.orders); 
  const products = useSelector((state) => state.products.fetchedProducts);
  

  const dispatchAction = useDispatch();

  useEffect(() => {
    // dispatchAction(postProducts());
    dispatchAction(basketGetOrders({userId}));
    dispatchAction(getOrders(userId));
  }, []);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }


    if (basket.isBasketContentChanged) {
      dispatchAction(basketChangeOrders({userId}));
    }

  }, [basket]);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }
    
    if (orders.isOrdersContentChanged) {
      dispatchAction(changeOrders(userId));
    }


  }, [orders]);

  return (
    <Fragment>
      <Routes>
        <Route path='/*' element={
          <Fragment>
            <Header />
            <Routes>
              <Route path='/' element={
                <Navigate to="/home" replace={true}/>
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
