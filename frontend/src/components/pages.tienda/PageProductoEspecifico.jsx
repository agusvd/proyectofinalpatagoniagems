import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Navbar from '../shared.tienda/Navbar'
import ProductPage from '../c.tienda/ProductPage'
import ProductosRelacionados from '../c.tienda/ProductosRelacionados'
import Footer from '../shared.tienda/Footer'

const PageProductoEspecifico = () => {
    return (
        <div>
            <Anuncio />
            <Navbar />
            <ProductPage />
            <ProductosRelacionados />
            <Footer />
        </div>
    )
}

export default PageProductoEspecifico