import React from "react";
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import EditProfile from './containers/EditProfile'
import Menu from './containers/Menu'
import About from './containers/About'
import Contact from './containers/Contact'
import SingleProduct from './containers/SingleProduct'
import ShoppingCart from './containers/ShoppingCart'

function App() {
  
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/edit-profile" component={EditProfile} />
      <Route path="/menu" component={Menu} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/product/:id" component={SingleProduct} />
      <Route path="/shopping-cart" component={ShoppingCart} />
    </>
  );
}

export default App;
