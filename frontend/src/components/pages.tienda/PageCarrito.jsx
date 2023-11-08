import React from 'react'
import CartPage from '../c.tienda/CartPage'
import Anuncio from '../shared.tienda/Anuncio'
import Navbar from '../shared.tienda/Navbar'
import Footer from '../shared.tienda/Footer'
const PageCarrito = () => {
    return (
        <div>
            <Anuncio />
            <Navbar />
            <CartPage />
            <Footer />
        </div>
    )
}

export default PageCarrito