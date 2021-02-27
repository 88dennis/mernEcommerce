import React from 'react'
import MenuComp from "./MenuComp";

const LayoutComp = ({title='Title', description='Description', className, children}) => {
    return (
        <div>
            <MenuComp />
            <div className='jumbotron' style={{marginTop: "60px"}}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default LayoutComp
