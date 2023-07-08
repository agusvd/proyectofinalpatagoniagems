import React, { useState } from 'react';
import ProductoEjemplo from '../assets/producto1.png'
import { BiTrash, BiEdit } from 'react-icons/bi';

const CartPage = () => {
    const [mobileCart, setMobileCart] = useState(true);



    return (
        <div className='flex-grow font-primary'>
            <div className='bg-gray-300 p-10 text-center text-3xl'>
                Carrito
            </div>
            <div className='flex justify-center'>
                <div className={mobileCart ? 'sm:hidden' : 'block'}>
                    <div>
                        {/* card mobile */}
                        <div className='flex'>
                            <div className='m-2 border-2 border-gray-100/50'>
                                <img src={ProductoEjemplo} className=' h-64 w-44 object-center' />
                            </div>
                            <div className='px-2 py-1 text-center justify-start flex flex-col'>
                                <div className='flex flex-col items-start p-2'>
                                    <h1 className='text-md font-extrabold'>Nombre</h1>
                                </div>
                                <div className='flex gap-3 text-2xl items-start py-2 ml-2'>
                                    <button className='py-2'>
                                        <BiEdit size={30} className='hover:text-purple-500' />
                                    </button>
                                    <button className='py-2'>
                                        <BiTrash size={30} className='hover:text-purple-500' />
                                    </button>
                                </div>
                                <div className='flex flex-col items-start p-2 py-3'>
                                    <h2 className='text-sm text-gray-600'>$10.000</h2>
                                </div>
                                <div className='flex text-xl justify-center rounded-full'>
                                    <button className='px-5 bg-white hover:bg-gray-100 rounded-l-full border-r-0 border-2'>-</button>
                                    <p className='px-4 py-2 bg-white border-t-2 border-b-2'>1</p>
                                    <button className='px-5 bg-white rounded-r-full border-l-0 hover:bg-gray-100 border-2'>+</button>
                                </div>
                            </div>
                        </div>
                        {/*Fin de la primera card */}
                        <div className='flex flex-col items-center justify-center p-2 border-t-2 border-b-2 text-lg'>
                            <h1>Total</h1>
                            <h2>$10.000</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* CARD NORMAL */}
            <div>
                <div className={mobileCart ? 'hidden sm:block' : 'hidden'}>
                    <div className='ml-2 flex'>
                        <div className='m-2 border-2 border-gray-100'>
                            <img src={ProductoEjemplo} className='h-64 w-44 sm:h-72 sm:w-64 object-center' />
                        </div>
                        <div className='flex flex-col justify-center ml-5'>
                            <h1 className='text-lg'>Nombre</h1>
                            <h2 className='text-sm'>Descripcion</h2>
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
                    <div className=' ml-2 border-2 py-2'>
                        <div className='ml-10 absolute py-3 px-10'>
                            <h3 className='text-gray-500'>$10.000</h3>
                        </div>
                        <div className='flex flex-row text-xl justify-center rounded-full'>
                            <button className='px-5 bg-white hover:bg-gray-100 rounded-l-full border-r-0 border-2'>-</button>
                            <p className='px-4 py-2 bg-white border-t-2 border-b-2'>1</p>
                            <button className='px-5 bg-white rounded-r-full border-l-0 hover:bg-gray-100 border-2'>+</button>
                        </div>
                        <div className='ml-10 px-10 absolute right-12 -my-10'>
                            <h3 className='text-black'>$10.000</h3>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center p-2 border-t-2 border-b-2 text-lg m-2'>
                            <h1>Total</h1>
                            <h2>$10.000</h2>
                        </div>
                </div>
            </div>
            {/* FIN card normal */}
            {/* Bton de pagar */}
            <div className='justify-center flex flex-col p-2 sm:flex sm:flex-row sm:justify-end'>
                <button className='p-2 text-center bg-gray-300 rounded-full px-5 mx-5 hover:bg-purple-500 hover:text-white'>
                    Ir al pago
                </button>
            </div>
        </div>
    );
};

export default CartPage;
