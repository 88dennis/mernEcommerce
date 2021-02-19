import React, { useState } from "react";
import { Link } from "react-router-dom";
import LayoutComp from "../core/LayoutComp";
import { values } from "lodash";
import { signup } from "../authClient/authClient";


const SignupComp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = state;

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
    });
    //signup({ name: name, email: email, password: password})
    //import signup function from authClient
    signup({ name, email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setState({
          ...state,
          error: data.error,
          success: false,
        });
      } else {
        setState({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
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

  const signupForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            //the || prevents the error for input controlled uncontrolled
            value={name || ""}
            className="form-control"
          />
        </div>
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
            className="form-control"
          />
        </div>
        <button type="submit" onClick={clickSubmit} className="btn btn-primary">
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
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Your account was created! <Link to="/signin">Please Signin</Link>
      </div>
    );
  };

  return (
    <LayoutComp
      title="Sign Up"
      className="container col-md-8 offset-md-2"
      description="Sign up and get started"
    >
      {showSuccess()}
      {showError()}
      {signupForm()}

      {/* test your onChange */}
      {/* {JSON.stringify({...state})} */}
    </LayoutComp>
  );
};

export default SignupComp;
