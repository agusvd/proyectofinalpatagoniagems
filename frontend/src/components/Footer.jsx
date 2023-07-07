import React from 'react'
import IconMercadopago from '../assets/mercado-pago.svg'
import Crystal from  '../assets/crystal.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-black text-white'>
            <div className='grid grid-cols-1 pt-12 py-4 sm:grid-cols-3 sm:pt-0 sm:py-0'>
                <div className='flex justify-center items-center'>
                    <img src={Crystal} alt="Logo PatagoniaGems" className='w-16 h-16'/>
                </div>
                <div className='flex flex-col justify-center items-center space-y-2 pt-10 sm:flex sm:pt-0'>
                    <p className='text-white-500'>
                        <Link to="/nosotros" className='cursor-pointer hover:text-purple-500'>Quienes somos</Link>
                    </p>
                    <p className='text-white-500'>
                        <Link to="/politicas-de-privacidad" className='cursor-pointer hover:text-purple-500'>Politicas de Privacidad</Link>
                    </p>
                    <p className='text-white-500'>
                        <Link to="/contacto" className='cursor-pointer hover:text-purple-500'>Contacto</Link>
                    </p>
                </div>
                <div className='flex justify-center items-center'>
                    <img src={IconMercadopago} alt="Mercado Pago" className='w-32 h-32' />
                </div>
            </div>
        </footer>
    )
}

export default Footer