import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupComp from "./user/SignupComp";
import SigninComp from "./user/SigninComp";
import HomeComp from "./core/HomeComp";
import MenuComp from "./core/MenuComp";


const Routes = () => {
  return (
      <Router>
          <MenuComp />
        <Switch>
          <Route path="/" exact component={HomeComp} />
          <Route path="/signin" exact component={SigninComp} />
          <Route path="/signup" exact component={SignupComp} />
        </Switch>
      </Router>
  );
};

export default Routes;
