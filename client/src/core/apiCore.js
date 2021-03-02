import { API } from "../config";
import queryString from "query-string";

export const getProducts = async (sortBy) => {
  //QUERY PARAMETERS CAN BE IN ANY ARRANGEMENT ON THE URL
  // return await fetch(`${API}/products?order=desc&limit=6&sortBy=${sortBy}`, {

  return await fetch(`${API}/products?sortBy=${sortBy}&products?order=desc&limit=6`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};



export const getCategories = async () => {
  return await fetch(`${API}/categories`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};


export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const data = {
      limit,
      skip,
      filters
  };
  return await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const list = async (params) => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return await fetch(`${API}/products/search?${query}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const createCategory = async (userId, token, category) => {
    //you need to return the fetch method to use it in another function / to make the promise available
    console.log(category, "FROM API ADMIN");
    return await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const createProduct = async (userId, token, product) => {
    //you need to return the fetch method to use it in another function / to make the promise available
    console.log(product, "FROM API ADMIN");
    return await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      
        Authorization: `Bearer ${token}`
      },
      body: product //we will send the form data
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const read = async (productId) => {
    return await fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = async (productId) => {
    return await fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



 