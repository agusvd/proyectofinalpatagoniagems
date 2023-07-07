import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import ClientesR from '../../components/dashboard/ClientesR'

const Clientes = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 h-screen w-full overflow-hidden bg-black">
                <ClientesR />
            </div>
        </div>
    )
}

export default Clientes