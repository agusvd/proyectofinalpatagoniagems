import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai'


const CardProductoGeneralEspecifico = ({ producto, handleAgregarCarro }) => {
    return (
        <div key={producto.id} className="rounded-md w-[350px] h-[600px] flex flex-col font-primary ">
            {/* Imagen */}
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex items-center justify-center w-full">
                <img src={producto.imagen} className="h-[350px] object-cover" alt="Producto" />
            </Link>
            {/* Informacion */}
            <div className="flex items-center justify-center w-full text-center h-[200px]">
                <div className="flex flex-col">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-lg text-gray-700 capitalize">
                        {producto.nombre}
                    </Link>
                    <p className="text-md text-gray-700 font-bold">
                        ${producto.precio}
                    </p>
                </div>

            </div>
            <button className="bg-gray-200 text-black hover:text-white w-full p-2 items-center flex justify-center rounded-md hover:bg-purple-500 duration-500 ease-in-out"
                onClick={() => {
                    handleAgregarCarro(producto);
                }}>
                <AiOutlineShopping size={25} />
            </button>
        </div>
    )
}

export default CardProductoGeneralEspecifico