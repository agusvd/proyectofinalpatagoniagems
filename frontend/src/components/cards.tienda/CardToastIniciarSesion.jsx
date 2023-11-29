import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { BiMessageSquareX } from 'react-icons/bi';

const CardToastIniciarSesion = ({ onClose }) => {

    return (
        <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] font-primary">
            <div className="bg-black p-4 rounded-md w-[600px] h-[200px] flex flex-col justify-center gap-5">
                <button className="absolute top-2 right-2 focus:outline-none" onClick={onClose}>
                    <BiMessageSquareX size={50} className="text-white hover:text-red-500" />
                </button>
                <h2 className="text-4xl text-center text-white">¡Necesitas estar registrado!</h2>
                <div className="flex justify-center gap-2">
                    <Link to="/login" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-md hover:bg-purple-500 hover:text-white text-xl font-bold">Iniciar sesión</Link>
                    <Link to="/register" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-md hover:bg-purple-500 hover:text-white text-xl font-bold">Registrarse</Link>
                </div>
            </div>
        </div>
    )
}

export default CardToastIniciarSesion