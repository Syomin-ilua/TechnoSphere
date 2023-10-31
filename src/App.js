import './App.css';
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Routes, Route, Navigate } from 'react-router-dom';
import { basketGetOrders, basketChangeOrders } from './store/basket-slice';

import Header from './components/layout-components/Header';
import Footer from './components/layout-components/Footer';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Basket from './pages/Basket';
import PageNotFound from './pages/PageNotFound';

let isInitialRunning = true;

function App() {

  const basket = useSelector((state) => state.basket);
  const dispatchAction = useDispatch(); 

  useEffect(() => {
    dispatchAction(basketGetOrders());
  }, []);

  useEffect(() => {
    if(isInitialRunning) {
      isInitialRunning = false;
      return;
    }


    if(basket.isBasketContentChanged) {
      dispatchAction(basketChangeOrders());
    }

  }, [basket]);


  return (
    <Fragment>
      <Header />
        <main>
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace/>}/>
            <Route path='/login' element={<SignIn />}/>
            <Route path='/register' element={<SignUp />}/>
            <Route path='/home' element={<About />}/>
            <Route path='/products' element={<Catalog />}/>
            <Route path='/products/:productID/*' element={<ProductDetails />} />
            <Route path='/basket' element={<Basket />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </main>
      <Footer />
    </Fragment>
  );
}

export default App;
