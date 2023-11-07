import React from 'react'
import Sidebar from '../shared.dashboard/Sidebar'
import ProductUpdate from '../c.dashboard/ProductUpdate';

const PageActualizarProducto = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <ProductUpdate />
            </div>
        </div>
    )
}

export default PageActualizarProducto