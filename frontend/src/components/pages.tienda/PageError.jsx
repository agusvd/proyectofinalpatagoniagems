import React from 'react'
import { Link } from 'react-router-dom'

const PageError = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-black font-primary'>
            <div className='p-10 items-center text-center justify-center'>
                <div className='text-purple-600 text-5xl pb-10'>ERROR 404</div>
                <div className='text-white p-2 text-2xl'>Pagina no encontrada</div>
                <Link to="/" className='text-white text-2xl hover:text-purple-400'>Volver a la tienda</Link>
            </div>
        </div>
    )
}

export default PageError