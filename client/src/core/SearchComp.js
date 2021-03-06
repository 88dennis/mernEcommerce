import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import { getCategories, list } from "./apiCore";
import CardComp from "./CardComp";
// import e from "express";

const SearchComp = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else if(data) {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const noCategories = !data.categories || (data.categories && data.categories.length === 0);

  const searchData = () => {
    console.log(search, category);
    // if(search === undefined || search === "ALL" || search === "") {
    //     setData({
    //         categories: categories,
    // category: "",
    // search: "",
    // results:[],
    // searched: false
    //     })
    // } else
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response && response.error) {
            console.log(response.error);
          } else if(response) {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const noResults = !data.results || (data.results && data.results.length === 0);

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);

    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          {!noResults && results.map((product, i) => (
            <CardComp key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div style={{display: "flex", justifyContent: "center", verticalAlign:"center"}}className="col-12 col-md-3">
            <div style={{display:"flex", justifyContent:"center"}}>
         <span style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"5px"}} >Categories: </span> 
         <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"5px"}} >
         <select style={{height:"40px", padding:"5px", backgroundColor:"rgb(248,248,248", borderColor:"lightGray", borderRadius:"4px", outline:"none"}}className="" onChange={handleChange("category")}>
            <option value="All">All</option>
            {!noCategories && categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          </div>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <span className="input-group-text">
            <div className="input-group input-group-lg">
              <input
                type="search"
                className="form-control"
                onChange={handleChange("search")}
                placeholder="Search by name"
              />
            </div>

            <div className="btn input-group-append" style={{ border: "none" }}>
              <button className="input-group-text">Search</button>
            </div>
          </span>
        </div>
      </div>
    </form>
  );

  return (
    <div className="row">
      {/* {JSON.stringify(categories)} */}
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default SearchComp;
