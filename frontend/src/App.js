import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Route, } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import EditProfile from "./containers/EditProfile";
import Menu from "./containers/Menu";
import About from "./containers/About";
import Contact from "./containers/Contact";
import SingleProduct from "./containers/SingleProduct";
import ShoppingCart from './containers/ShoppingCart';
import PlaceOrder from './containers/PlaceOrder'
import TwoStep from './containers/TwoStep'
import AdminDashboard from './containers/AdminDashboard'
import ForgotPassword from './containers/ForgotPassword'
import ProductCategories from './containers/Categories'
import OrdersHistory from './containers/OrdersHistory'

function App() {
  axios.defaults.baseURL = 'http://localhost:5000/';
  axios.defaults.headers.common['Authorization'] = `Bearer ${useSelector(state => state.user.token)}`

  const logged = useSelector(state => !!state.user._id) ? 
        (
          <>
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/shopping-cart" component={ShoppingCart} />
            <Route path="/place-order" component={PlaceOrder} />
          </>
        ) : <>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </>;
  const isAdmin = useSelector(state => state.user.role) ?        
    <Route path={["/admin-dashboard/:page", "/admin-dashboard"]} component={AdminDashboard} />
    : '';
 

  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/product/:id" component={SingleProduct} />
      <Route path="/two-step-verification" component={TwoStep} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/category/:id" component={ProductCategories} />
      <Route path="/ordersHistory" component={OrdersHistory} />
      {logged}
      {isAdmin}
    </>
  );
}

export default App;
