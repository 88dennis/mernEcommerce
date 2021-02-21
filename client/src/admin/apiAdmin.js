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