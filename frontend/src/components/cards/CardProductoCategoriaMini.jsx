import React from 'react'
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';

const CardProductoCategoriaMini = ({ producto }) => {
    return (
        <div key={producto.id} className="bg-white rounded-md w-[350px] h-[650px] justify-between flex flex-col border-2 border-red-500 gap-2">
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex items-center justify-center w-full border-2 border-green-500">
                <img src={producto.imagen} className="h-[500px] w-full object-cover" alt="Producto" />
            </Link>
            <div className="flex items-start w-full h-full border-2 border-purple-600">
                <div className="flex flex-col w-full">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-lg capitalize font-bold">
                        {producto.nombre}
                    </Link>
                    <p className="text-lg text-gray-800">
                        ${producto.precio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardProductoCategoriaMini