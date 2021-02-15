import React from 'react'
import MenuComp from "./MenuComp";

const LayoutComp = ({title='Title', description='Description', className, children}) => {
    return (
        <div>
            <MenuComp />
            <div className='jumbotron'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default LayoutComp
