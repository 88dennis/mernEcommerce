import React, { useState } from "react";
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
// import 'bootstrap/dist/css/bootstrap.css';

import { Link, Redirect } from "react-router-dom";
import LayoutComp from "../core/LayoutComp";
import { values } from "lodash";
import { signin, authenticate, isAuthenticated} from "../authClient/authClient";
import "./SigninSignupComp.css";


const SigninComp = () => {
  const [state, setState] = useState({
    email: "den@den.com",
    password: "888888",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer} = state;
  const {user} = isAuthenticated();
  function handleChange(inputVal) {
    return function (e) {
      setState({
        ...state,
        error: false,
        [inputVal]: e.target.value,
      });
    };
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      error: false,
      loading: true,

    });
    //signin({ email: email, password: password})
    //import signup function from authClient
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setState({
          ...state,
          error: data.error,
          loading: false,
        });
      } else {
        authenticate(data, ()=>{
            setState({
                ...values,
                redirectToReferrer: true,
              });
        })
      }
    });
  };
  // const handleChange = inputVal => e => {
  //     setState({
  //         ...state,
  //         error: false,
  //         [inputVal] : e.target.value
  //     })
  // }

  const signinForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            value={email || ""}
            className="form-control"
          />
        </div>



        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            onChange={handleChange("password")}
            value={password || ""}
            className="form-control dark"
          />
             <span className="bmd-help">We'll never share your email with anyone else.</span>
    <span className="bmd-help">And this is probably from a second plugin showing in a non-optimal way</span>
        </div>
        <button type="submit" onClick={clickSubmit} className="my_signinsignupcomp_btn btn border border-dark">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error} {" "} <Link to="/signup">No yet? please signup</Link>
      </div>
    );
  };

  const showLoading = () => {
    return (

     loading &&  <div
        className="alert alert-info"
      >
      <h3>Loading...</h3>
      </div>
    );
  };    


  const redirectUser = ()=> {
      if(redirectToReferrer){
          if(user && user.role === 1){
            return <Redirect to='/admin/dashboard' />
          } else {
            return <Redirect to='/user/dashboard' />

          }
      }
      if(isAuthenticated()){
        return <Redirect to='/' />
      }
  }

  return (
    <LayoutComp
      title="Sign In"
      className="container col-md-8 offset-md-2"
      description="Sign in and get started"
    >
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}

      {/* test your onChange */}
      {/* {JSON.stringify({...state})} */}
    </LayoutComp>
  );
};

export default SigninComp;
