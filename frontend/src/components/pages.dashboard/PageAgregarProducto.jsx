import React from 'react';
import Product from '../c.dashboard/Product';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';


const PageAgregarProducto = () => {
    return (
        <div className="flex flex-row overflow-auto w-screen h-screen bg-white font-primary animate-duration-300 animate-fade-down">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-white">
                <MobileMenu/>
                <Product />
            </div>
        </div>
    )
}

export default PageAgregarProducto