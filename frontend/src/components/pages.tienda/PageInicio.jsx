import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Home from '../c.tienda/Home'
import ProductosDestacados from '../c.tienda/ProductosDestacados'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'


const PageInicio = () => {
    return (
        <div>
            <Anuncio />
            <NavbarNormal/>
            <NavbarMobile/>
            <Home />
            <ProductosDestacados />
            <Footer />
        </div>
    )
}

export default PageInicio