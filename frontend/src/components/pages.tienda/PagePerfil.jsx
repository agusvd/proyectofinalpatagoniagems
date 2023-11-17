import React from 'react'
import Perfil from '../c.tienda/Perfil'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import NavMini from '../shared.tienda/NavMini'


const PagePerfil = () => {
    return (
        <div>
            <NavMini/>
            <NavbarNormal/>
            <NavbarMobile/>
            <Perfil/>
            <Footer/>
        </div>
    )
}

export default PagePerfil