import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import CardComp from "./CardComp";
import CheckboxComp from "./CheckboxComp";
import RadioBoxComp from "./RadioBoxComp";

import { prices } from "./fixedPrices";

import { getCategories } from "../admin/apiAdmin";

const ShopComp = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const noPrices = !prices || (prices && prices.length === 0);

  const init = async () => {
    await getCategories().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
        if (data[key]._id === parseInt(value)) {
            array = data[key].array;
        }
    }
    return array;
};

  const handleFiltersArr = (filters, filterBy) => {

     // console.log("SHOP", filters, filterBy);
     const newFilters = { ...myFilters };
     newFilters.filters[filterBy] = filters;

     if (filterBy === "price") {
         let priceValues = handlePrice(filters);
         newFilters.filters[filterBy] = priceValues;
     }
    //  loadFilteredResults(myFilters.filters);
     setMyFilters(newFilters);
  };

  useEffect(() => {
    init();
  }, []);

  console.log(prices);

  const noCategories = !categories || (categories && categories.length === 0);

  return (
    <LayoutComp
      title="Shopping Page"
      description="Shopping Page"
      className="container-fluid"
    >
      {!noCategories && (
        <div className="row">
          <div className="col-4">
            <h5>Filter by Categories</h5>
            <ul>
              <CheckboxComp
                handleFiltersArr={(filters) =>
                  handleFiltersArr(filters, "category")
                }
                categories={categories}
              />
            </ul>

            <h5>Filter by Prices</h5>
            <ul>
              <RadioBoxComp
                 handleFiltersArr={
                   filters =>
                   handleFiltersArr(filters, 'price')
                  }
                prices={prices}
              />
            </ul>
          </div>

          <div className="col-8">{JSON.stringify(myFilters)}</div>
        </div>
      )}
    </LayoutComp>
  );
};

export default ShopComp;
