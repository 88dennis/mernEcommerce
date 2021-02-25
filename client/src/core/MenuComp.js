import React, { useEffect } from "react";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../authClient/authClient";
import "./MenuComp.css";

const MenuComp = (props) => {
  let historia = useLocation();

  let historyMethod = useHistory();

  console.log(historyMethod);

  console.log(historia);

  let color = "white";

  const isActive2 = (history, path) => {
    // console.log(history.pathname)
    if (history.pathname === path) {
      color = "white";
      // console.log(color)
    } else {
      color = "lightgray";
      // console.log(color)
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs my_menucomp_nav">
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={isActive2(historia, "/")}
            style={{ color: color }}
            to="/"
          >
            Home
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
           Dashboard
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
           Dashboard
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
                style={{ cursor: "pointer", color: "white" }}
                to="/signup"
              >
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuComp;
