import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar'
import Product from '../../components/dashboard/Product';


const NewProduct = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 h-screen w-full overflow-hidden bg-violet-900 md:bg-black">
                <Product />
            </div>
        </div>
    )
}

export default NewProduct