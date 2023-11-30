import React from 'react'
import Perfil from '../c.tienda/Perfil'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'


const PagePerfil = () => {
    return (
        <div>
            <NavbarNormal/>
            <NavbarMobile/>
            <Perfil/>
            <Footer/>
        </div>
    )
}

export default PagePerfil