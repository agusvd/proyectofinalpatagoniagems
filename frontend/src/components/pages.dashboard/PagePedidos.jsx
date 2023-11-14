import React from 'react'
import Pedidos from '../c.dashboard/Pedidos'
import NormalMenu from '../shared.dashboard/NormalMenu'
import MobileMenu from '../shared.dashboard/MobileMenu'

const PagePedidos = () => {
    return (
        <div className="flex flex-row bg-white overflow-auto w-scree font-primary animate-duration-300 animate-fade-down">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-white">
                <MobileMenu />
                <Pedidos />
            </div>
        </div>
    )
}

export default PagePedidos