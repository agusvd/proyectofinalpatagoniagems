import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Navbar from '../shared.tienda/Navbar'
import Home from '../c.tienda/Home'
import ProductosDestacados from '../c.tienda/ProductosDestacados'
import Footer from '../shared.tienda/Footer'

const PageInicio = () => {
    return (
        <div>
            <Anuncio />
            <Navbar />
            <Home />
            <ProductosDestacados />
            <Footer />
        </div>
    )
}

export default PageInicio