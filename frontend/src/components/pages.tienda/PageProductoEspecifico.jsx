import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import ProductPage from '../c.tienda/ProductPage'
import ProductosRelacionados from '../c.tienda/ProductosRelacionados'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'

const PageProductoEspecifico = () => {
    return (
        <div>
            <Anuncio />
            <NavbarNormal/>
            <NavbarMobile/>
            <ProductPage />
            <ProductosRelacionados />
            <Footer />
        </div>
    )
}

export default PageProductoEspecifico