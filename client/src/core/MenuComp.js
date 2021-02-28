import React, { useEffect, useState } from "react";
// import classnames from "classnames";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../authClient/authClient";
import "./MenuComp.css";
import logo from "../images/BasicGoodz134133websmall.png";

const MenuComp = (props) => {


  const [state, setState] = useState({
    prevScrollpos: window.pageYOffset,
    visible: true
  });
  // const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  
  const styleVisible = {
    top: "0",
    transition:"all .3s ease"
  }

  const styleNotVisible = {
    top: "-70px",
    transition:"all .3s ease"
  }

  const handleScroll = () => {
    const { prevScrollpos } = state;

    const currentScrollPos = window.pageYOffset;
    console.log(prevScrollpos, "PREV")
    console.log(currentScrollPos)

    // const visible = prevScrollpos > currentScrollPos;
    // console.log(visible)
    if(prevScrollpos < currentScrollPos && currentScrollPos > 30){
      setState({
        // prevScrollpos: currentScrollPos,
        visible: false
      });
    } else {
      setState({
        // prevScrollpos: currentScrollPos,
        visible: true
      });
    }

   
  };

useEffect(()=>{
  window.addEventListener("scroll", handleScroll);
  return () => {
  window.removeEventListener("scroll", handleScroll);
  }
},[])

  let historia = useLocation();

  let historyMethod = useHistory();


  console.log(historyMethod);

  console.log(historia);

  let color = "white";

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

  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function () {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > (currentScrollPos)) {
  //     document.getElementById("navbar").style.top = "0";
  //     // document.getElementById("navbar").style.transition = "all .3s ease";
  //   } else {
  //     document.getElementById("navbar").style.top = "-70px";
  //     document.getElementById("navbar").style.transition = "all .3s ease";
  //   }
  //   prevScrollpos = currentScrollPos;
  // };

  return (
    <>
    <ul id="navbar" style={state.visible ? styleVisible : styleNotVisible} className="nav nav-tabs my_menucomp_nav navbar-fixed-top">
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
