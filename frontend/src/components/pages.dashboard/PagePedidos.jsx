import React from 'react'
import Sidebar from '../shared.dashboard/Sidebar'
import Pedidos from '../c.dashboard/Pedidos'

const PagePedidos = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <Pedidos />
            </div>
        </div>
    )
}

export default PagePedidos