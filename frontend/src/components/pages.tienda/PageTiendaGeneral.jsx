import React from 'react'
import Anuncio from '../shared.tienda/Anuncio'
import Navbar from '../shared.tienda/Navbar'
import ProductosTotal from '../c.tienda/ProductosTotal'
import Footer from '../shared.tienda/Footer'

const PageTiendaGeneral = () => {
    return (
        <div>
            <Anuncio />
            <Navbar />
            <ProductosTotal />
            <Footer />
        </div>
    )
}

export default PageTiendaGeneral