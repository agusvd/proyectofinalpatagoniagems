import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import ProductUpdate from '../../components/dashboard/ProductUpdate';

const UpdateProduct = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1   w-full overflow-hidden bg-balck">
                <ProductUpdate />
            </div>
        </div>
    )
}

export default UpdateProduct