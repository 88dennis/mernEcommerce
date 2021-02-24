import React, { useState } from "react";
import LayoutComp from "../core/LayoutComp";
import { isAuthenticated } from "../authClient/authClient";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
    setSuccess(false);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        setDisplayName(name);
        setName("");
      } else {
        setError("");
        setSuccess(true);
        setDisplayName(name);
        setName("");
      }
    });
  };
  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name || ""}
            autoFocus
            required
          />
          {/* <br/> */}
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return (
        <h6 className="text-success">{displayName} successfully created</h6>
      );
    }
  };
  const showError = () => {
    if (error) {
      return <h6 className="text-danger">{displayName} should be unique</h6>;
    }
  };

  const goBack = () => {
   return <span className="mt-5">
      <Link to="/admin/dashboard" className="text-secondary">Dashboard</Link>{" "}
    </span>
  };
  return (
    <LayoutComp
      title="Admin Dashboard"
      description={`Hi ${isAuthenticated().user.name}, add your category here`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
         
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          <br/>
          {goBack()} {" "}<span ><Link to='/create/product' className="text-primary">| Post a Product</Link></span>
        </div>
      </div>
    </LayoutComp>
  );
};

export default AddCategory;
