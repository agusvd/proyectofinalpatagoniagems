import React from 'react'
import { BiArrowFromLeft, BiTrash, BiEdit } from 'react-icons/bi';
import ProductoEjemplo from '../assets/producto1.png'

const Cart = ({ onClose }) => {
    return (
        <div className="fixed top-0 right-0 w-full md:w-1/3 h-screen bg-white shadow-md font-primary">
            <header className="bg-gray-200 p-2 flex justify-between items-center">
                <h2 className="text-black text-xl">Carrito</h2>
                <button className="text-black hover:text-purple-500" onClick={onClose}>
                    <BiArrowFromLeft className='h-8 w-8' />
                </button>
            </header>
            <div className="p-2 h-4/5 overflow-y-auto">
                {/* CARD */}
                <div className='ml-2 flex'>
                    <div className='m-2 border-2 shadow-lg transition-shadow duration-500 hover:shadow-purple-500'>
                        <img src={ProductoEjemplo} className='h-64 w-44 sm:h-72 sm:w-64 object-center' />
                    </div>
                    <div className='flex flex-col justify-center ml-5 text-black'>
                        <h1 className='text-lg'>Nombre</h1>
                        <h2 className='text-sm text-gray-500'>Descripcion</h2>
                        <div className='space-x-3 text-2xl py-2 '>
                            <button className='py-2'>
                                <BiEdit size={30} className='hover:text-purple-500' />
                            </button>
                            <button className='py-2'>
                                <BiTrash size={30} className='hover:text-purple-500' />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='ml-2 border-2 rounded-3xl py-2'>
                    <div className='flex flex-row text-xl justify-around rounded-full text-black'>
                        <h3 className='text-gray-500 text-sm flex items-center'>$10.000</h3>
                        <div className='flex'>
                            <button className='px-5 bg-white hover:bg-gray-100 rounded-l-full border-r-0 border-2'>-</button>
                            <p className='px-4 py-2 bg-white border-t-2 border-b-2'>1</p>
                            <button className='px-5 bg-white rounded-r-full border-l-0 hover:bg-gray-100 border-2'>+</button>
                        </div>
                        <h3 className='text-black text-sm flex items-center'>$10.000</h3>
                    </div>
                </div>
                {/* fin card */}

                {/* TOTAL */}
                <div className=' items-center justify-center p-2 border-t-2 border-b-2 text-lg'>
                    <h1 className='text-black'>Total</h1>
                    <h2 className='text-black'>$10.000</h2>
                </div>

            </div>
            <footer className="p-2 flex flex-col">
                <button className="bg-gray-100 text-black py-2 px-4 rounded mb-2 hover:bg-gray-200">Ver Carrito</button>
                <button className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-purple-500 ">Proceder al pago</button>
            </footer>
        </div>
    );
};

export default Cart