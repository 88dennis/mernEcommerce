import React, {useEffect}from 'react';
import {Link, withRouter, useHistory, useLocation} from 'react-router-dom';

const MenuComp = (props) => {

let historia = useLocation();

console.log(historia)

let color = "white";

const isActive2 = (history, path) => {
    console.log(history.pathname)
  if(history.pathname === path) {
        color = "white"
        console.log(color)
    } else {
        color = "lightgray"
        console.log(color)
    }
}

    return (
        <div>
           <ul className="nav nav-tabs bg-primary">
                <li className="nav-item"><Link className="nav-link" onClick={isActive2(historia, "/")} style={{color: color}} to="/">Home</Link></li>
               <li className="nav-item"><Link className="nav-link" onClick={isActive2(historia, "/signin")}  style={{color: color}} to="/signin">Sign In</Link></li>
               <li className="nav-item"><Link className="nav-link" onClick={isActive2(historia, "/signup")}  style={{color: color}} to="/signup">Sign Up</Link></li>
           </ul>
        </div>
    )
}

export default MenuComp;
