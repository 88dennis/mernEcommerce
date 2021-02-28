import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import ShowImage from "./ShowImage";

import { API } from "../config";
import { getProducts } from "./apiCore";
import { Link } from "react-router-dom";
import '../styles.css'

const CardComp = ({ product }) => {

  const noProduct = product ? false : true;
  return (
<>
       {!noProduct && <div className="col-12 col-sm-4 mb-2">
        {/* 50% on mobile (6/12 and on desktop (3/12)) */}

          <div className="card" style={{ minWidth: "250px"}}>

            <h5 className="card-header">{product.name}</h5>
            
            <div className="card-body">
              <ShowImage item={product}
              url={"product"}
              />
              <p>{product.description}</p>
              <p>${product.price}</p>
              {/* <Link to="/"><button className="btn btn-outline-primary mt-2 mb-2 btn-block btn-sm responsive-width">View Product</button></Link> */}
              <div className="container">
                <Link to="/">
                  <button className="btn btn-primary mt-2 mb-4 btn-sm btn-block responsive-width">
                    View Product
                  </button>
                </Link>
                <button className="btn btn-outline-primary mt-2 mb-2 btn-sm btn-block responsive-width">
                  Add to Cart
                </button>
              </div>
            </div>

          </div>

          
        </div>}
</>
 
  );
};

export default CardComp;
