import React from 'react'
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';

const CardProductoMini = ({ producto, getCategoriaNombre, handleAgregarCarro }) => {

    return (
        <div key={producto.id} className='bg-white hover:shadow-md rounded-md p-2 hover:scale-105 ease-out relative duration-700 hover:shadow-purple-500 transition-all w-[250px] h-[350px] justify-between flex flex-col'>
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex items-center justify-center w-full h-[180px]">
                <img src={producto.imagen} className="h-[180px] w-full object-contain" alt="Producto" />
            </Link>
            <div className="flex justify-start w-full">
                <div className="flex flex-col w-full">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-md font-bold capitalize ">
                        {producto.nombre}
                    </Link>
                    <p className="text-sm sm:text-md text-gray-800 capitalize">
                        {getCategoriaNombre(producto.categoria_id)}
                    </p>
                    <p className="text-md text-gray-400">
                        ${producto.precio}
                    </p>
                </div>
            </div>
            <div className="flex justify-end items-center">
                <button className="bg-black text-white flex text-center justify-center px-2 py-2 m-1 rounded-full hover:bg-purple-500 hover:text-white hover:scale-125"
                    onClick={() => {
                        handleAgregarCarro(producto);
                    }}>
                    <BiCart size={25} />
                </button>
            </div>
        </div>

    )
}

export default CardProductoMini