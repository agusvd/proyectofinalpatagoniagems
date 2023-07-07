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
            <div>
                <div className={mobileCart ? 'sm:hidden ' : 'block'}>
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
                        <div className='flex flex-col items-center justify-center p-2 border-t-2 border-b-2 text-lg'>
                            <h1>Total</h1>
                            <h2>$20.000</h2>
                        </div>
                    </div>
                </div>
                <table className={mobileCart ? 'hidden sm:table min-w-full m-2' : 'table min-w-full m-2'}>
                    <thead className='border-b border-gray-300'>
                        <tr className="text-md">
                            <th className="py-2 px-4">Producto</th>
                            <th className="py-2 px-4">Precio</th>
                            <th className="py-2 px-4">Cantidad</th>
                            <th className="py-2 px-4">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <br />
                        <tr className=' pb-2'>
                            <td className="py-2 px-4">
                                <div className='flex flex-col sm:flex-row gap-2 sm:justify-center '>
                                    <div className='shadow-md h-64 w-48'>
                                        <img src={ProductoEjemplo} className='h-72 w-64 object-contain' alt='Producto' />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='flex flex-col px-5 py-2 justify-center items-starr'>
                                            <h1 className='text-lg'>Nombre</h1>
                                            <h2 className='text-md text-left'>Descripcion</h2>
                                        </div>
                                        <div className='flex gap-3 text-2xl ml-10 my-2'>
                                            <button>
                                                <BiEdit className='hover:text-purple-500' />
                                            </button>
                                            <button>
                                                <BiTrash className='hover:text-purple-500' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-4">$10.000</td>
                            <td className="py-2 px-4">
                                <div className='flex text-xl justify-center rounded-xl'>
                                    <button className='p-2 bg-white hover:bg-gray-100 rounded-l-xl border-2'>-</button>
                                    <p className='p-2 bg-white border-t-2 border-b-2'>1</p>
                                    <button className='p-2 bg-white rounded-r-xl hover:bg-gray-100 border-2'>+</button>
                                </div>
                            </td>
                            <td className="py-2 px-4">
                                $10.000
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div className=''>
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
                </div>
            </div>
            <div className='justify-center flex flex-col p-2 sm:flex sm:flex-row sm:justify-end'>
                <button className='p-2 text-center bg-gray-300 rounded-full px-5 mx-5 hover:bg-purple-500 hover:text-white'>
                    Ir al pago
                </button>
            </div>
        </div>
    );
};

export default CartPage;
