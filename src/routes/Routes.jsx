import React from "react";

import { Route, Switch } from "react-router-dom";

import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Contact from "pages/HomePage/Contact";
import ReturnPolicy from "pages/HomePage/ReturnPolicy";
import Login from "pages/Login";
import About from "pages/HomePage/About";
import Checkout from "pages/Checkout/Checkout";
import UserProfile from "pages/UserProfile";
import EditProfileUser from "pages/profile-page/EditProfileUser";
import OrderPageUser from "pages/profile-page/Order";
import ChangePassword from "pages/profile-page/ChangePassword";
import AddressUser from "pages/profile-page/Address";
import CheckoutRoot from "pages/Checkout/CheckoutRoot";
import CatalogTest from "pages/CatalogTest";
import HomeTest from "pages/HomeTest";
import ResetPasswrod from "pages/ResetPasswrod";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomeTest} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/edit/profile" component={EditProfileUser} />
      <Route path="/my-order/profile" component={OrderPageUser} />
      <Route path="/my-address/address" component={AddressUser} />

      <Route path="/edit-password/profile" component={ChangePassword} />
      <Route path="/catalog/:id" component={Product} />
      <Route path="/catalog" component={CatalogTest} />
      <Route path="/cart" component={Cart} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/return-policy" component={ReturnPolicy} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout-root" component={CheckoutRoot} />
      <Route path="/forgot" component={ResetPasswrod} />
    </Switch>
  );
};

export default Routes;
