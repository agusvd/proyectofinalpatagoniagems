import React from 'react';
import Product from '../c.dashboard/Product';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';


const PageAgregarProducto = () => {
    return (
        <div className="flex flex-row overflow-auto w-screen h-screen bg-[#202020]">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <MobileMenu/>
                <Product />
            </div>
        </div>
    )
}

export default PageAgregarProducto