import React, { useState, useEffect } from "react";
import Layout from "../core/LayoutComp";
import { isAuthenticated } from "../authClient/authClient";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";
import "./AddProduct.css";

let isMounted = false;
const AddProduct = () => {
  const [mount, setMount] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    displaySuccess: false,
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    displaySuccess,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    isMounted = true;
    if (!mount) {
      setMount(true);
      if (isMounted) {
        getCategories().then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              categories: data,
              formData: new FormData(),
            });
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [mount, values]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: "", displaySuccess: false, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          shipping: "",
          createdProduct: data.name,
          displaySuccess: true,
          formData: new FormData(),
        });
      }
      document.getElementById("categorySelectId").value = "";
      document.getElementById("shippingSelectId").value = "";
    });
  };

  const newPostForm = () => {
    if (categories.length === 0) {
      return (
        <>
          <p>No Categories yet. Please Create a Category.</p>
          <br />
          <Link to="/create/category" className="text-primary">
            Create a Category
          </Link>
        </>
      );
    }
    return (
      <div className="container">
        <form className="mb-3" onSubmit={clickSubmit}>
          <div className="form-group">
            <label className="text-muted">Category</label>
            <select
              id="categorySelectId"
              onChange={handleChange("category")}
              className="form-control"
            >
              <option value="">Please select</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <Link to="/create/category" className="text-primary">
            New Category? Click Here
          </Link>

          <br />
          <br />

          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea
              onChange={handleChange("description")}
              className="form-control"
              value={description}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Price</label>
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              value={price}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select
              id="shippingSelectId"
              onChange={handleChange("shipping")}
              className="form-control"
            >
              <option value="">Please select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input
              onChange={handleChange("quantity")}
              type="number"
              className="form-control"
              value={quantity}
            />
          </div>

          <p className="text-primary">Post a Photo</p>

          <div className="form-group">
            <label htmlFor="fileUpload" className="btn btn-secondary">
              <input
                id="fileUpload"
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>
          <br />
          <button className="btn btn-outline-primary">Post Product</button>
        </form>
      </div>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () =>
    displaySuccess && (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{`${createdProduct}`} successfully created!</h4>
      </div>
    );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Post a new product"
      description={`Hey ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
