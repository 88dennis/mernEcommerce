import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import { getProducts } from "./apiCore";
import CardComp from "./CardComp";

const HomeComp = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);


  async function init(){

    await getProducts("sold").then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setProductsBySell(data);
        }
      });
  
      await getProducts("createdAt").then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setProductsByArrival(data);
        }
      });
  }
  useEffect(() => {

    init();

  }, []);

  console.log(productsBySell);
  console.log(productsByArrival);

  const noProductsBySell =
    !productsBySell || (productsBySell && productsBySell.length === 0);
  const noProductsByArrival =
    !productsByArrival || (productsByArrival && productsByArrival.length === 0);

  function noSold() {
    let totalSold = 0;
    if (!noProductsByArrival) {
      productsByArrival.map((item) => {
        totalSold = totalSold + item.sold;
      });
    }

    if (totalSold === 0) {
      return true;
    }

    return false;
  };

  // console.log(noSold())

  return (
    <LayoutComp
      title="Home Page"
      description="Node React Ecommerce App"
      className="container-fluid"
    >
      {/* {noProductsBySell && <div><p>No products yet</p></div> } */}
      {/* {!noProductsBySell && <div><p>{JSON.stringify(productsBySell,undefined, 2)}</p></div> } */}

      {/* <hr/> */}
      {/* {!noProductsBySell && <div><p>{JSON.stringify(productsByArrival)}</p></div> } */}

      {/* <div className="container"> */}
      {!noSold() && (
        <>
          <h4 className="mb-4">Best Sellers</h4>
          <div className="row">
            {!noProductsBySell &&
              productsBySell.map((product) => (
                <CardComp
                  key={product._id}
                  product={product.sold === 0 ? null : product}
                />
              ))}
          </div>
          <br />
      <hr />
      <br />
        </>
      )}
      {/* </div> */}
      

      {/* <div className="container"> */}
      {!noProductsByArrival &&  <>
      <h4 className="mb-4">New Arrivals</h4>

      <div className="row">
          {!noProductsByArrival &&  productsByArrival.map((product) => (
            <CardComp key={product._id} product={product} />
          ))}
      </div>

      </>}
      {/* </div>   */}

      {/* {API} */}
    </LayoutComp>
  );
};

export default HomeComp;
