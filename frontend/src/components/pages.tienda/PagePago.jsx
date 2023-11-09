import React from 'react'
import PagoPage from '../c.tienda/PagoPage'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'


const PagePago = () => {
    return (
        <div>
            <NavbarNormal />
            <NavbarMobile/>
            <PagoPage />
            <Footer />
        </div>
    )
}

export default PagePago