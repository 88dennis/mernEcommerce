import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import ShowImage from "./ShowImage";
// import { numberWithCommas } from "../../utils/format.js";

import { API } from "../config";
import { getProducts } from "./apiCore";
import { Link, useHistory } from "react-router-dom";
import "../styles.css";

const CardComp = ({ product, showBackButton, showDescription }) => {
  const noProduct = product ? false : true;

  function showBackBtn() {
    if (!showBackButton) {
      return false;
    } else {
      return true;
    }
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function scrollToTop(){
    window.scrollTo(0, 0)
  }

  function showDesc() {
    if (!showDescription) {
      return false;
    } else {
      return true;
    }
  }


  function dateConvert(dateToConvert) {
    let date = new Date(dateToConvert);
    // date.toUTCString()
    return date.toDateString();
  }

  function timeConvert(dateToConvert) {
    let d = new Date(dateToConvert);
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    let timeFormat = hr + ":" + min + ampm;

    return timeFormat;
  }


  let history = useHistory();

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill p-1.5">
        In Stock - {quantity}{" "}
      </span>
    ) : (
      <span className="badge badge-primary badge-pill p-1.5">
        Out of Stock - {quantity}{" "}
      </span>
    );
  };
  return (
    <>
      {!noProduct && (
        <>
          {/* 50% on mobile (6/12 and on desktop (3/12)) */}

          <div className="card">
            <h5 className="card-header">{product.name}</h5>

            <div className="card-body">
              <ShowImage item={product} url={"product"} />
            

              {!showDesc() && <p className="lead mt-2">
                {product.description.substring(0, 50)}...{" "}
              </p>}

              {showDesc() && <p className="lead  mt-2">
                {product.description}
              </p>}

              <p className="black-9">${product.price || product.price === 0
                            ? numberWithCommas(product.price)
                            : "Contact seller for price"}</p>


              <p className="black-8">
                Category: {product.category && product.category.name}
              </p>

            <p>
            {dateConvert(product.createdAt)}
            </p>
            <p>
            {timeConvert(product.createdAt)}
            </p>

              {/* <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p> */}
              {showStock(product.quantity)}
              {/* <Link to="/"><button className="btn btn-outline-primary mt-2 mb-2 btn-block btn-sm responsive-width">View Product</button></Link> */}
              <div className="container">
                {!showBackBtn() && (
                  <Link to={`/product/${product._id}`}>
                    <button onClick={() => scrollToTop()}className="btn btn-primary mt-2 mb-4 btn-sm btn-block responsive-width">
                      View Product
                    </button>
                  </Link>
                )}

                {showBackBtn() && (
                  <button
                    className="btn btn-primary mt-2 mb-4 btn-sm btn-block responsive-width"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </button>
                )}
                <button className="btn btn-outline-primary mt-2 mb-2 btn-sm btn-block responsive-width">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardComp;
