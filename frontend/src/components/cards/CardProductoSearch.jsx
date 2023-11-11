import React from 'react'
import { Link } from 'react-router-dom'

const CardProductoSearch = ({ producto, getCategoriaNombre, onClose }) => {
    return (
        <Link to={`/tienda/producto/${producto.nombre}`} className='flex m-4 bg-white rounded-xl w-auto h-full  hover:scale-95 duration-300 ease-in-out cursor-pointer'>
            <div className='flex rounded-xl p-2'>
                <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="p-2 h-[180px] w-[180px] object-center rounded-xl">
                    <img src={producto.imagen} alt={producto.nombre} className="h-full w-full object-cover" />
                </Link>
            </div>
            <div className="flex flex-col text-start p-2">
                <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-black">{producto.nombre}</Link>
                <p className='text-gray-600'>{getCategoriaNombre(producto.categoria_id)}</p>
                <p className="text-gray-700">${producto.precio}</p>
            </div>
        </Link>
    )
}

export default CardProductoSearch