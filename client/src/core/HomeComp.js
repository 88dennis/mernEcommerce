import React, {useState, useEffect} from 'react'
import LayoutComp from './LayoutComp';
import {API} from '../config';
import { getProducts } from "./apiCore";


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


    return (
        <LayoutComp title='Home Page' description='Node React Ecommerce App' >
            .....Home Content

            {/* {API} */}
        </LayoutComp>
    )
}

export default HomeComp
