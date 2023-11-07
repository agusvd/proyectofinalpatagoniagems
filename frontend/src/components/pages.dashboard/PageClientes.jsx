import React from 'react'
import Sidebar from '../shared.dashboard/Sidebar'
import ClientesR from '../c.dashboard/ClientesR'

const PageClientes = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <ClientesR />
            </div>
        </div>
    )
}

export default PageClientes