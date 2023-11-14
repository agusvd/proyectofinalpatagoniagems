import React from 'react'
import ClientesR from '../c.dashboard/ClientesR'
import NormalMenu from '../shared.dashboard/NormalMenu'
import MobileMenu from '../shared.dashboard/MobileMenu'

const PageClientes = () => {
    return (
        <div className="flex flex-row bg-white overflow-auto w-screen">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-white">
                <MobileMenu/>
                <ClientesR />
            </div>
        </div>
    )
}

export default PageClientes