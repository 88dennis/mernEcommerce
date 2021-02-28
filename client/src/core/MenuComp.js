import React, { useEffect, useState } from "react";
// import classnames from "classnames";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../authClient/authClient";
import "./MenuComp.css";
import logo from "../images/BasicGoodz134133websmall.png";

const MenuComp = (props) => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  // const [scroll, setScroll] = useState(0);


  let historia = useLocation();
  let historyMethod = useHistory();
  let color = "white";
  console.log(historyMethod);
  console.log(historia);

  const styleVisible = {
    top: "0",
    transition:"all .3s ease"
  }

  const styleNotVisible = {
    top: "-70px",
    transition:"all .3s ease"
  }

useEffect(() => {
  const onScroll = e => {
    setScrollTop(e.target.documentElement.scrollTop);
    // setScroll(window.pageYOffset);
    setScrolling(e.target.documentElement.scrollTop > scrollTop);

  };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [scrollTop]);

console.log(scrolling);
console.log(scrollTop);
// console.log(scroll, "hehehe");



const isScrolling = () => {
  if(scrolling && scrollTop > 30){
    // setShowNav(false);
    return true;
  } else {
    // setShowNav(true);
    return false;

  }
}

  const isActive2 = (history, path) => {
    // console.log(history.pathname)
    if (history.pathname === path) {
      // color = "#222";
      color = "white";

      // console.log(color)
    } else {
      color = "lightgray";
      // console.log(color)
    }
  };

  return (
    <>
    <ul id="navbar" style={isScrolling() ? styleNotVisible : styleVisible} className="nav nav-tabs my_menucomp_nav navbar-fixed-top">
        <li
          className="nav-item"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            // className="nav-link"
            onClick={isActive2(historia, "/")}
            style={{ color: color }}
            to="/"
          >
            <img src={logo} style={{ height: "55px", margin: "auto" }} />
          </Link>
        </li>



        <li
          className="nav-item"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            className="nav-link"
            onClick={isActive2(historia, "/shop")}
            style={{ color: color }}
            to="/shop"
          >
          Shop
          </Link>
        </li>


        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={isActive2(historia, "/user/dashboard")}
              style={{ color: color }}
              to="/user/dashboard"
            >
            {isAuthenticated().user.role === 1 ? "SETUP" : "USER"}

            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={isActive2(historia, "/admin/dashboard")}
              style={{ color: color }}
              to="/admin/dashboard"
            >
              {isAuthenticated().user.role === 1 ? "SETUP" : "USER"}
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={isActive2(historia, "/signin")}
                style={{ color: color }}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={isActive2(historia, "/signup")}
                style={{ color: color }}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() =>
                  signout(() => {
                    historyMethod.push("/");
                  })
                }
                style={{ cursor: "pointer", color: "lightgray" }}
                to="/signup"
              >
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default MenuComp;
