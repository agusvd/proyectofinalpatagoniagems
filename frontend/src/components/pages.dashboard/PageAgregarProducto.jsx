import React from 'react';
import Sidebar from '../shared.dashboard/Sidebar'
import Product from '../c.dashboard/Product';


const PageAgregarProducto = () => {
    return (
        <div className="flex flex-row overflow-auto w-screen bg-black">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <Product />
            </div>
        </div>
    )
}

export default PageAgregarProducto