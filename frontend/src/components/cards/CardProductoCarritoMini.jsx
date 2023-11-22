import React from 'react'
import { Link } from 'react-router-dom'
import { BiTrash, BiEdit } from 'react-icons/bi';


const CardProductoCarritoMini = ({ producto, onClose, carritoItems, cantidadProductos, actualizarProductoCarrito, eliminarProductoCarrito }) => {
    return (
        <div className="ml-2 flex p-2 bg-white w-full shadow-md rounded-xl hover:shadow-white duration-300 ease-in-out">
            <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="items-center h-[180px] w-[180px]">
                <img
                    src={producto.imagen}
                    className="h-full w-full object-container"
                    alt={producto.nombre}
                />
            </Link>
            <div className="flex flex-col justify-center ml-2 sm:ml-5 text-black text-start gap-1 bg-white">
                <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-md font-bold">{producto.nombre}</Link>
                <h2 className="text-sm text-gray-500">{producto.categoria}</h2>
                <h3 className="text-gray-500 text-md font-bold pb-3">${producto.precio}</h3>
                {carritoItems.length > 0 && (
                    <div className="flex text-sm justify-start rounded-full text-black">
                        <div className="flex">
                            <button className="px-4 bg-white hover:bg-gray-200 duration-150 ease-in-out hover:border-gray-800 rounded-l-full border-r-0 border-2 border-black text-[#202020]" onClick={() => actualizarProductoCarrito(producto.producto_id, cantidadProductos[producto.producto_id] > 1 ? cantidadProductos[producto.producto_id] - 1 : 1)}>-</button>
                            <p className="px-4 py-2 bg-white text-[#202020] border-t-2 border-b-2 border-black font-bold">
                                {cantidadProductos[producto.producto_id]}
                            </p>
                            <button className="px-4 bg-white text-[#202020] hover:bg-gray-200 duration-150 ease-in-out hover:border-gray-800 rounded-r-full border-l-0 border-2 border-black" onClick={() =>
                                actualizarProductoCarrito(
                                    producto.producto_id,
                                    cantidadProductos[producto.producto_id] + 1
                                )
                            }>+</button>
                        </div>
                    </div>
                )}
                <div className="space-x-3 text-2xl py-2">
                    <button onClick={() => eliminarProductoCarrito(producto.id)} className="py-2">
                        <BiTrash size={30} className="hover:text-purple-500 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProductoCarritoMini