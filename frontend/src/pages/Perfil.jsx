import React from 'react'
import { Link } from 'react-router-dom'

const Perfil = () => {
    return (
        <div className='h-screen'>
            <div>Ingresaste al perfil</div>
            <Link to="/dashboard">Panel de administrador</Link>
        </div>
    )
}

export default Perfil