import React, {useState, useEffect} from 'react'
import LayoutComp from "./LayoutComp";
import CardComp from './CardComp';
import {getCategories} from './apiCore';

const ShopComp = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    async function init(){
        await getCategories().then((data) => {
            if (data && data.error) {
              setError(data.error);
            } else if (data) {
              setCategories(data);
            }
          });
    }
    useEffect(() => {
        init();
      }, []);


      const noCategories =
      !categories || (categories && categories.length === 0);
      
    return (
        <LayoutComp
        title="Shopping Page"
        description="Shopping Page"
        className="container-fluid"
      >
       
       <div className="row">
           <div className="col-4">
               left side bar

               {!noCategories && JSON.stringify(categories)}
           </div>
           <div className="col-8">
               Right side bar
           </div>
       </div>
      </LayoutComp>
    )
}

export default ShopComp
