    import { API } from "../config";

export const signup = async (user) => {
    //you need to return the fetch method to use it in another function / to make the promise available
    return await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const signin = async (user) => {
    //you need to return the fetch method to use it in another function / to make the promise available
    return await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

//2 args data from the submit and a function to set the state
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

//2 args next to update the state and redirect the page
export const signout = async (next) => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return await fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response =>{
            console.log('signout', response);
        })
        .catch(err => console.log(err));
    }
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}