import React, { useState, useEffect} from "react";
import LayoutComp from "../core/LayoutComp";
import { isAuthenticated } from "../authClient/authClient";
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";
import  "./AddProduct.css";


const AddProduct = () => {

  const [values, setValues] = useState({
    name:'',
    description: '',
    price:'',
    categories:[],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error:'',
    createProduct: '',
    redirectToProfile: false,
    formData:''
  });
  const [displayName, setDisplayName] = useState("");
  const [success, setSuccess] = useState(false);

  const { 
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData
   } = values;

  const { user, token } = isAuthenticated();



  const newPostForm = () => {
    return <form className="md-form mb-3">
      <h4>Post Photo</h4>



      <div className="form-group">

        <label className="btn btn-primary">
        <input className="form-control" type="file" name="photo" accept="image/*"/>

        </label>

        

{/* 
        <div class="upload-btn-wrapper">
  <button class="btn">Upload a file</button>
  <input type="file" name="photo" accept="image/*"/>
</div> */}


      



      </div>

    </form>
  }
  const handleChange = (e) => {
   
    setSuccess(false);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    // make request to api
    createProduct(user._id, token, { name }).then((data) => {
      if (data.error) {
        setDisplayName(name);
      } else {
        setSuccess(true);
        setDisplayName(name);
      }
    });
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
   return <div className="mt-5">
      <Link to="/admin/dashboard" className="text-secondary">Back to Dashboard</Link>
    </div>
  };
  return (
    <LayoutComp
      title="Add a new Product"
      description={`Hi ${isAuthenticated().user.name}, add your product here`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
         
          {newPostForm()}
       
        </div>
      </div>
    </LayoutComp>
  );
};

export default AddProduct;
