import React from 'react'
import Pedidos from '../c.dashboard/Pedidos'
import NormalMenu from '../shared.dashboard/NormalMenu'
import MobileMenu from '../shared.dashboard/MobileMenu'

const PagePedidos = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <MobileMenu />
                <Pedidos />
            </div>
        </div>
    )
}

export default PagePedidos