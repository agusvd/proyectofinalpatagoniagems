import React from 'react'
import { Link } from 'react-router-dom'
import { BiTrash } from 'react-icons/bi';


const CardProductoCarritoGrande = ({ producto, onClose, carritoItems, cantidadProductos, actualizarProductoCarrito, eliminarProductoCarrito }) => {
    return (
        <div className="flex flex-col sm:flex sm:flex-row bg-white sm:w-1/2 font-primary border-2 border-green-500">
            <div className='flex flex-col sm:flex sm:flex-row  w-full h-full gap-2 justify-center items-center border-2 border-red-500'>
                <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="w-[180px] border-2">
                    <img src={producto.imagen} className="w-[180px] object-contain" alt={producto.nombre} />
                </Link>
                <div className='flex flex-col justify-center h-full w-full'>
                    <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-md text-black font-bold">
                        {producto.nombre}
                    </Link>
                    <h2 className="text-sm text-gray-500">
                        {producto.categoria}
                    </h2>
                    <h3 className="text-gray-500 text-md font-bold pb-3">
                        ${producto.precio} CLP
                    </h3>
                </div>
            </div>
            <div className="flex flex-col sm:flex sm:flex-row w-full justify-around gap-2 border-2 border-purple-500">
                <div className='flex flex-col sm:flex sm:flex-row gap-2 items-center justify-center'>
                    {carritoItems.length > 0 && (
                        <div className="flex text-sm justify-start">
                            <div className="flex rounded-md border-2 border-black">
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
                    <button onClick={() => eliminarProductoCarrito(producto.id)} className="py-2">
                        <BiTrash size={30} className="hover:text-purple-500 text-gray-600" />
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <p className='text-xl text-black'>${producto.precio * cantidadProductos[producto.producto_id]} CLP</p>
                </div>
            </div>
        </div>
    )
}

export default CardProductoCarritoGrande