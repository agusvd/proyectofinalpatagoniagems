import React from 'react'
import CartPage from '../c.tienda/CartPage'
import Anuncio from '../shared.tienda/Anuncio'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
const PageCarrito = () => {
    return (
        <div>
            <Anuncio />
            <NavbarNormal/>
            <NavbarMobile/>
            <CartPage />
            <Footer />
        </div>
    )
}

export default PageCarrito