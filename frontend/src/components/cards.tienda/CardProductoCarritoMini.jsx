import React from 'react'
import { Link } from 'react-router-dom'
import { BiTrash } from 'react-icons/bi';


const CardProductoCarritoMini = ({ producto, onClose, carritoItems, cantidadProductos, actualizarProductoCarrito, eliminarProductoCarrito }) => {
    return (
        <div className="ml-2 flex p-2 bg-white w-full duration-300 ease-in-out">
            <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="mask mask-square items-center h-[180px] w-[180px]">
                <img
                    src={producto.imagen}
                    className="h-full w-full object-cover"
                    alt={producto.nombre}
                />
            </Link>
            <div className="flex flex-col justify-between ml-2 sm:ml-5 text-black text-start gap-1 bg-white">
                <div>
                    <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-md font-bold">
                        {producto.nombre}
                    </Link>
                    <h3 className="text-gray-500 text-md font-bold pb-3">
                        ${producto.precio} CLP
                    </h3>
                </div>
                <div className='flex items-center gap-5'>
                    {carritoItems.length > 0 && (
                        <div className="flex text-sm justify-start">
                            <div className="flex rounded-md">
                                <button className="px-4 bg-white hover:bg-gray-200 duration-150 ease-in-out rounded-md" onClick={() => actualizarProductoCarrito(producto.producto_id, cantidadProductos[producto.producto_id] > 1 ? cantidadProductos[producto.producto_id] - 1 : 1)}>
                                    <p className='text-xl font-bold text-black'>-</p>
                                </button>
                                <p className="px-4 py-2 bg-white text-black font-bold">
                                    {cantidadProductos[producto.producto_id]}
                                </p>
                                <button className="px-4 bg-white text-[#202020] hover:bg-gray-200 duration-150 ease-in-out rounded-md" onClick={() =>
                                    actualizarProductoCarrito(
                                        producto.producto_id,
                                        cantidadProductos[producto.producto_id] + 1
                                    )
                                }>
                                    <p className='text-xl font-bold text-black'>+</p>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="space-x-3 text-2xl py-2">
                        <button onClick={() => eliminarProductoCarrito(producto.id)} className="py-2">
                            <BiTrash size={30} className="hover:text-purple-500 text-black" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardProductoCarritoMini