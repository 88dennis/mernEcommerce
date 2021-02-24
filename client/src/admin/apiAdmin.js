import { API } from "../config";

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



  export const getCategories = async () => {
    return await fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};