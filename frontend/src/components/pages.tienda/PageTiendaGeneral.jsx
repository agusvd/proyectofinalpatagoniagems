import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import ProductosTotal from '../c.tienda/ProductosTotal'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'

const PageTiendaGeneral = () => {
    return (
        <div>
            <NavbarNormal />
            <NavbarMobile />
            <Anuncio />
            <ProductosTotal />
            <Footer />
        </div>
    )
}

export default PageTiendaGeneral