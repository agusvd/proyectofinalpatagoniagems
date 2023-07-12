import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Update from '../../components/dashboard/Update';

const UpdateProduct = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 h-screen w-full overflow-hidden bg-violet-900">
                <Update />
            </div>
        </div>
    )
}

export default UpdateProduct