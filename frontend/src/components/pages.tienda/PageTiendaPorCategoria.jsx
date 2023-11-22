import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Footer from '../shared.tienda/Footer'
import ProductosCategoria from '../c.tienda/ProductosCategoria'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'

const PageTiendaPorCategoria = () => {
    return (
        <div>
            <Anuncio />
            <NavMini />
            <NavbarNormal />
            <NavbarMobile />
            <ProductosCategoria />
            <Footer />
        </div>
    )
}

export default PageTiendaPorCategoria