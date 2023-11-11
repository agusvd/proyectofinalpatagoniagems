import React from 'react'
import ProductUpdate from '../c.dashboard/ProductUpdate';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';

const PageActualizarProducto = () => {
    return (
        <div className="flex flex-row bg-[#202020] overflow-auto w-screen">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <MobileMenu />
                <ProductUpdate />
            </div>
        </div>
    )
}

export default PageActualizarProducto