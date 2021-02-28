import React from 'react'
import { API } from "../config";

const ShowImage = ({item, url}) => {

        
    return (
        <div className="product_img">
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight:'100px', maxWidth: '100px'}}/>
        </div>  
    )
}

export default ShowImage
