import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Footer from '../shared.tienda/Footer'
import ProductosCategoria from '../c.tienda/ProductosCategoria'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'

const PageTiendaPorCategoria = () => {
    return (
        <div>
            <NavbarNormal />
            <NavbarMobile />
            <ProductosCategoria />
            <Anuncio />
            <Footer />
        </div>
    )
}

export default PageTiendaPorCategoria