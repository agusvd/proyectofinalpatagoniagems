import React from 'react'
import { Link } from 'react-router-dom'
import { BiTrash, BiEdit } from 'react-icons/bi';


const CardProductoCarritoGrande = ({ producto, onClose, carritoItems, cantidadProductos, actualizarProductoCarrito, eliminarProductoCarrito }) => {
    return (
        <div className="flex bg-white rounded-md border-2 sm:w-1/2">
            <div className='flex w-full gap-2'>
                <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="items-center h-[180px] w-[180px]">
                    <img src={producto.imagen} className="h-full w-full object-cover" alt={producto.nombre} />
                </Link>
                <div className='flex flex-col justify-center'>
                    <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-md text-black font-bold">
                        {producto.nombre}
                    </Link>
                    <h2 className="text-sm text-gray-500">
                        {producto.categoria}
                    </h2>
                    <h3 className="text-gray-500 text-md font-bold pb-3">
                        ${producto.precio}
                    </h3>
                </div>
            </div>
            <div className="flex w-full justify-around gap-2">
                <div className='flex flex-col justify-center'>
                    {carritoItems.length > 0 && (
                        <div className="flex text-sm justify-start rounded-full text-black">
                            <div className="flex">
                                <button className="px-4 bg-[#202020] hover:bg-gray-500 rounded-l-full border-r-0 border-2 border-gray-500 text-white" onClick={() => actualizarProductoCarrito(producto.producto_id, cantidadProductos[producto.producto_id] > 1 ? cantidadProductos[producto.producto_id] - 1 : 1)}>-</button>
                                <p className="px-4 py-2 bg-[#202020] text-white border-t-2 border-b-2 border-gray-500 font-bold">
                                    {cantidadProductos[producto.producto_id]}
                                </p>
                                <button className="px-4 bg-[#202020] text-white hover:bg-gray-500 rounded-r-full border-l-0 border-2 border-gray-500" onClick={() =>
                                    actualizarProductoCarrito(
                                        producto.producto_id,
                                        cantidadProductos[producto.producto_id] + 1
                                    )
                                }>+</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex">
                    <button onClick={() => eliminarProductoCarrito(producto.id)} className="py-2">
                        <BiTrash size={30} className="hover:text-purple-500 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProductoCarritoGrande