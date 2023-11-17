import React from 'react'
import PagoPage from '../c.tienda/PagoPage'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'


const PagePago = () => {
    return (
        <div>
            <NavMini/>
            <NavbarNormal />
            <NavbarMobile/>
            <PagoPage />
            <Footer />
        </div>
    )
}

export default PagePago