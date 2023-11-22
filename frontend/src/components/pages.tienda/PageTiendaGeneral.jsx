import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import ProductosTotal from '../c.tienda/ProductosTotal'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'

const PageTiendaGeneral = () => {
    return (
        <div>
            <Anuncio />
            <NavMini />
            <NavbarNormal />
            <NavbarMobile />

            <ProductosTotal />
            <Footer />
        </div>
    )
}

export default PageTiendaGeneral