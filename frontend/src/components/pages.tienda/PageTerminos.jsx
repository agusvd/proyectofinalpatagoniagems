import React from 'react'
import Terminos from '../c.tienda/Terminos'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'

const PageTerminos = () => {
    return (
        <div>
            <NavbarNormal />
            <NavbarMobile/>
            <Terminos/>
            <Footer />
        </div>
    )
}

export default PageTerminos