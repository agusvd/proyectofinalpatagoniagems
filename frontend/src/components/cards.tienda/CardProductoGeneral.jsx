import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai'


const CardProductoGeneral = ({ producto, getCategoriaNombre, handleAgregarCarro }) => {

    return (
        <div key={producto.id} className="rounded-md sm:w-[280px] sm:h-[400px] flex flex-col font-primary m-1 p-2 hover:-translate-y-2 hover:shadow-xl duration-300 ease-in-out">
            {/* Imagen */}
            <Link to={`/tienda/producto/${producto.nombre}`} className="mask mask-square flex items-center justify-center w-full h-[300px]">
                <img src={producto.imagen} className="h-[250px] bg-white w-full object-contain" alt="Producto" />
            </Link>
            {/* Informacion */}
            <div className="flex items-start justify-start w-full h-full">
                <div className="flex flex-col justify-start truncate">
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-sm text-clip text-black font-bold capitalize">
                        {producto.nombre}
                    </Link>
                    <p className="text-sm text-gray-700">
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

export default CardProductoGeneral

