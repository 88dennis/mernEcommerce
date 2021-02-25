import React, {useState, useEffect} from 'react'
import LayoutComp from './LayoutComp';
import {API} from '../config';
import { getProducts } from "./apiCore";
import CardComp from './CardComp';


const HomeComp = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState([]);


    useEffect(()=>{
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductsBySell(data);
            }
        });

        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductsByArrival(data);
            }
        });

    },[])

    console.log(productsBySell)
    console.log(productsByArrival)

 
    const noProductsBySell = !productsBySell || (productsBySell && productsBySell.length === 0);


    return (
        <LayoutComp title='Home Page' description='Node React Ecommerce App' >
    {/* {noProductsBySell && <div><p>No products yet</p></div> } */}
    {/* {!noProductsBySell && <div><p>{JSON.stringify(productsBySell,undefined, 2)}</p></div> } */}

    {/* <hr/> */}
    {/* {!noProductsBySell && <div><p>{JSON.stringify(productsByArrival)}</p></div> } */}


<div className="container">
<h4 className="mb-4">Best Sellers</h4>

    <div className="row">
    {!noProductsBySell &&  productsBySell.map((product)=> <CardComp
    key={product._id}
    product={product}
    /> )}

    </div>
</div>
<br/>
<hr/>
<br/>

<div className="container">
<h4 className="mb-4">New Arrivals</h4>

    <div className="row">
    {!noProductsBySell &&  productsByArrival.map((product)=> <CardComp
    key={product._id}
    product={product}
    /> )}

    </div>
</div>
 
            


            {/* {API} */}
        </LayoutComp>
    )
}

export default HomeComp
