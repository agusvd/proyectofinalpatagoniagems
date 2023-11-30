import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai'


const CardProductoGeneralEspecifico = ({ producto, handleAgregarCarro }) => {
    return (
        <div key={producto.id} className="rounded-md w-[350px] h-[420px] flex flex-col font-primary">
            {/* Imagen */}
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex items-center justify-center w-full h-[300px]">
                <img src={producto.imagen} className="h-[300px] w-full object-contain" alt="Producto" />
            </Link>
            {/* Informacion */}
            <div className="flex items-start justify-start w-full h-full">
                <div className="flex flex-col justify-start">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-sm text-black font-bold capitalize">
                        {producto.nombre}
                    </Link>
                    <p className="text-sm text-gray-700 ">
                        ${producto.precio} CLP
                    </p>
                </div>
            </div>
            <button className="bg-black text-white hover:bg-purple-600 w-full p-2 items-center flex justify-center rounded-md active:bg-green-500 active:scale-95 duration-500 ease-in-out"
                onClick={() => {
                    handleAgregarCarro(producto);
                }}>
                <AiOutlineShopping size={25} />
            </button>
        </div>
    )
}

export default CardProductoGeneralEspecifico