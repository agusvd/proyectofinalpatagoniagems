import React from 'react'

import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';
import CategoriasEditar from '../c.dashboard/CategoriasEditar';

const PageActualizarCategoria = () => {
    return (
        <div className="flex flex-row bg-white overflow-auto w-screen font-primary">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-white">
                <MobileMenu />
                <CategoriasEditar/>
            </div>
        </div>
    )
}

export default PageActualizarCategoria