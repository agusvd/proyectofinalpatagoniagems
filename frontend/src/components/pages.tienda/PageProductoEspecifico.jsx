import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import ProductPage from '../c.tienda/ProductPage'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'


const PageProductoEspecifico = () => {
    return (
        <div className='bg-white'>
            <NavbarNormal/>
            <NavbarMobile/>
            <Anuncio />
            <ProductPage />
            <Footer />
        </div>
    )
}

export default PageProductoEspecifico