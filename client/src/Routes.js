import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupComp from "./user/SignupComp";
import SigninComp from "./user/SigninComp";
import HomeComp from "./core/HomeComp";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";

import PrivateRoutes from "./authClient/PrivateRoutes";
import AdminRoute from "./authClient/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";





const Routes = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeComp} />
          <Route path="/signin" exact component={SigninComp} />
          <Route path="/signup" exact component={SignupComp} />
          <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/create/product" exact component={AddProduct} />


        </Switch>
      </Router>
  );
};

export default Routes;
