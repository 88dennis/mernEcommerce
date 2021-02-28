import React, {useState, useEffect} from 'react'
import LayoutComp from "./LayoutComp";
import CardComp from './CardComp';
import CheckboxComp from './CheckboxComp';

import {getCategories} from '../admin/apiAdmin';

const ShopComp = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);


  const init = async () => {
    await getCategories().then(data => {
        if (data && data.error) {
            setError(data.error);
        } else {
            setCategories(data);
        }
    });
};


    useEffect(() => {
      init()
      }, []);




      const noCategories =
      !categories || (categories && categories.length === 0);
      
    return (
        <LayoutComp
        title="Shopping Page"
        description="Shopping Page"
        className="container-fluid"
      >
       
     {!noCategories &&  <div className="row">
           <div className="col-4">
             <h5>Filter by Categories</h5>
               <CheckboxComp categories={categories}/>

               {/* {!noCategories && JSON.stringify(categories)} */}
           </div>
           <div className="col-8">
               Right side bar
           </div>
       </div>}
      </LayoutComp>
    )
}

export default ShopComp
