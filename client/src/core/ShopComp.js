import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import CardComp from "./CardComp";
import CheckboxComp from "./CheckboxComp";
import RadioBoxComp from "./RadioBoxComp";

import { prices } from "./fixedPrices";
import { getCategories, getFilteredProducts, getProducts } from "./apiCore";

// import { getCategories } from "../admin/apiAdmin";
let isMounted = false;

const ShopComp = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [mount, setMount] = useState(false);

  const noPrices = !prices || (prices && prices.length === 0);

  const init = async () => {
    await getCategories().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
    await getProducts().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data);
      }
    });
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMoreButton = () => {
    return (
        size > 0 &&
        size >= limit && (
            <button onClick={loadMore} className="btn btn-warning mb-5">
                Load more
            </button>
        )
    );
};

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setFilteredResults([...filteredResults, ...data.data]);
            setSize(data.size);
            setSkip(toSkip);
        }
    });
};

  const handleFiltersArr = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  useEffect(() => {
    isMounted = true;
    if (!mount) {
      setMount(true);
      if (isMounted) {
        init();
        // loadFilteredResults(skip, limit, myFilters.filters);
        getFilteredProducts(skip, limit, myFilters.filters).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setFilteredResults(data.data);
            setSize(data.size);
            setSkip(0);
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [mount, limit, skip, myFilters.filters]);

  // console.log(prices);

  const noCategories = !categories || (categories && categories.length === 0);
  const noSize = !size || (size && size.length === 0);

  return (
    <LayoutComp
      title="Shopping Page"
      description="Shopping Page"
      className="container-fluid"
    >
      {!noCategories && (
        <div className="row">
          <div className="col-12 col-md-3 mb-3">
            <div className="container">
              <h5>Filter by Categories</h5>
            </div>
            {/* <ul> */}
            <CheckboxComp
              handleFiltersArr={(filters) =>
                handleFiltersArr(filters, "category")
              }
              categories={categories}
            />
            {/* </ul> */}
            <div className="container">
              <h5>Filter by Prices</h5>
            </div>
            {/* <ul> */}
            <RadioBoxComp
              handleFiltersArr={(filters) => handleFiltersArr(filters, "price")}
              prices={prices}
            />
            {/* </ul> */}
          </div>

          <div className="col-12 col-md-9">
            {/* <h2 className="mb-4">Products</h2> */}

              {/* <h4 className="mb-4">
                {" "}
                {size === 1
                  ? "Product (" + size + ")"
                  : "Products (" + size + ")"}
              </h4> */}

              <h4 className="mb-4">
               Products
              </h4>
            {/* {noSize && <h4 className="mb-4">No products on this filter</h4>} */}

            <div className="row">
              {filteredResults.map((product, i) => (
                <CardComp product={product} />
              ))}
            </div>

          </div>

          <hr />
                    {loadMoreButton()}
        </div>
      )}
    </LayoutComp>
  );
};

export default ShopComp;
