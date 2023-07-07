import React from 'react'
import { BiArrowFromLeft } from 'react-icons/bi';

const Cart = ({ onClose }) => {
    return (
        <div className="fixed top-0 right-0 w-3/4 md:w-1/3 h-screen bg-white shadow-md font-primary">
            <header className="bg-gray-200 p-2 flex justify-between items-center">
                <h2 className="text-black text-xl">Carrito</h2>
                <button className="text-black hover:text-purple-500" onClick={onClose}>
                    <BiArrowFromLeft className='h-8 w-8'/>
                </button>
            </header>
            <div className="p-2 h-4/5 overflow-y-auto">
                {/* Contenido del carrito */}
            </div>
            <footer className="p-2 flex flex-col">
                <button className="bg-gray-100 text-black py-2 px-4 rounded mb-2 hover:bg-gray-200">Ver Carrito</button>
                <button className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-purple-500 ">Proceder al pago</button>
            </footer>
        </div>
    );
};

export default Cart