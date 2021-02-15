import React from 'react'
import LayoutComp from './LayoutComp';
import {API} from '../config';

const HomeComp = () => {
    return (
        <LayoutComp title='Home Page' description='Node React Ecommerce App' >
            .....Home Content

            {API}
        </LayoutComp>
    )
}

export default HomeComp
