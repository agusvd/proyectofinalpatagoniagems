import React from 'react'
import Terminos from '../c.tienda/Terminos'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'

const PageTerminos = () => {
    return (
        <div>
            <NavMini/>
            <NavbarNormal />
            <NavbarMobile/>
            <Terminos/>
            <Footer />
        </div>
    )
}

export default PageTerminos