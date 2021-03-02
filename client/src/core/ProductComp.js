import React, { useState, useEffect } from "react";
import LayoutComp from "./LayoutComp";
import { getProducts } from "./apiCore";
import CardComp from "./CardComp";
import SearchComp from "./SearchComp";
import { read, listRelated } from './apiCore';  




const ProductComp = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data && data.error) {
                setError(data.error);
            } else if(data){
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };


    useEffect(() => {
        //grab the product from the URL
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

  const noProduct = !product || (product === {});
  const noRelatedProduct = !relatedProduct || (relatedProduct && relatedProduct.length === 0);
  
    return (
        <LayoutComp
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">
            <div className="col-12 col-md-7 mb-3">
            <h4>Product Details</h4>
                    {product && product.description && <CardComp product={product} showBackButton={true} showViewProductButton={false} showDescription={true}/>} 
            </div>
                    <div className="col-12 col-md-5 mb-3">
                    <h4>Related products</h4>

                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <CardComp product={p} />
                        </div>
                    ))}
                        </div>
                
            </div>
        </LayoutComp>
    )
}

export default ProductComp
