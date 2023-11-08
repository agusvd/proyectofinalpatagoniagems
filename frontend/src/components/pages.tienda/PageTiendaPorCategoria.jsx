import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Navbar from '../shared.tienda/Navbar'
import Footer from '../shared.tienda/Footer'
import ProductosCategoria from '../c.tienda/ProductosCategoria'

const PageTiendaPorCategoria = () => {
    return (
        <div>
            <Anuncio />
            <Navbar />
            <ProductosCategoria />
            <Footer />
        </div>
    )
}

export default PageTiendaPorCategoria