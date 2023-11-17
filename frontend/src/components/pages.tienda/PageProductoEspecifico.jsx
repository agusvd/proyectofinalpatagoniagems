import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import ProductPage from '../c.tienda/ProductPage'
import ProductosDestacados from '../c.tienda/ProductosDestacados'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'

const PageProductoEspecifico = () => {
    return (
        <div>
            <NavMini/>
            <Anuncio />
            <NavbarNormal/>
            <NavbarMobile/>
            <ProductPage />
            <ProductosDestacados />
            <Footer />
        </div>
    )
}

export default PageProductoEspecifico