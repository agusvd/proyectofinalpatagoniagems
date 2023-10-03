import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Pedidos from '../../components/dashboard/Pedidos'

const PedidosP = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <Pedidos />
            </div>
        </div>
    )
}

export default PedidosP