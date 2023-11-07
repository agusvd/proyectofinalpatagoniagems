import React from 'react'
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
const CardProductoDestacadoMini = ({ producto, getCategoriaNombre, handleAgregarCarro }) => {
    return (
        <div key={producto.id} className="w-44 m-2 sm:h-98 sm:w-64 sm:m-4 md:mr-0 md:ml-4 md:m-10 bg-white hover:shadow-md rounded-md p-2 hover:scale-105 ease-out relative duration-700 hover:shadow-purple-500 transition-all">
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex flex-wrap items-center justify-center">
                <img src={producto.imagen} className="h-56 w-full object-contain" alt="Producto" />
            </Link>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-md font-bold capitalize">
                        {producto.nombre}
                    </Link>
                    <p className="text-sm sm:text-md text-gray-800 capitalize">
                        {getCategoriaNombre(producto.categoria_id)}
                    </p>
                    <p className="text-md text-gray-400">${producto.precio}</p>
                </div>
                <div className="flex text-center items-center">
                    <button className="bg-black text-white flex text-center justify-center px-2 py-2 m-1 rounded-full hover:bg-purple-500 hover:text-white hover:scale-125"
                        onClick={() => {
                            handleAgregarCarro(producto);
                        }}>
                        <BiCart size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProductoDestacadoMini