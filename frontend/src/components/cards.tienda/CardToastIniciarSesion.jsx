import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { BiMessageSquareX } from 'react-icons/bi';

const CardToastIniciarSesion = ({ onClose }) => {

    return (
        <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] font-primary">
            <div className="bg-white p-4 rounded-md">
                <button className="absolute top-2 right-2 focus:outline-none" onClick={onClose}>
                    <BiMessageSquareX size={50} className="text-white hover:text-red-500" />
                </button>
                <h2 className="text-xl text-center text-black">¡Necesitas estar registrado!</h2>
                <div className="flex justify-center">
                    <Link to="/login" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">Iniciar sesión</Link>
                    <Link to="/register" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">Registrarse</Link>
                </div>
            </div>
        </div>
    )
}

export default CardToastIniciarSesion