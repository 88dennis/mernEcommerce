import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupComp from "./user/SignupComp";
import SigninComp from "./user/SigninComp";
import HomeComp from "./core/HomeComp";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";

import PrivateRoutes from "./authClient/PrivateRoutes";
import AdminRoute from "./authClient/AdminRoute";



const Routes = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeComp} />
          <Route path="/signin" exact component={SigninComp} />
          <Route path="/signup" exact component={SignupComp} />
          <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

        </Switch>
      </Router>
  );
};

export default Routes;
