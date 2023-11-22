import React from 'react'
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';

const CardProductoDestacadoMini = ({ producto, getCategoriaNombre, handleAgregarCarro }) => {
    return (
        <div key={producto.id} className="bg-white rounded-md w-[350px] h-[500px] justify-between flex flex-col">
            <Link to={`/tienda/producto/${producto.nombre}`} className="flex items-center justify-center w-full">
                <img src={producto.imagen} className="h-[300px] w-full object-contain" alt="Producto" />
            </Link>
            <div className="flex justify-start w-full">
                <div className="flex flex-col w-full">
                    <button className="bg-gray-200 text-[#202020] flex text-center justify-center rounded-md p-2 hover:bg-purple-500 hover:text-white w-full"
                        onClick={() => {
                            handleAgregarCarro(producto);
                        }}>
                        Agregar al carro
                    </button>
                    <Link to={`/tienda/producto/${producto.nombre}`} className="text-lg capitalize">
                        {producto.nombre}
                    </Link>
                    <p className="text-md sm:text-md text-gray-800 capitalize">
                        {getCategoriaNombre(producto.categoria_id)}
                    </p>
                    <p className="text-md text-gray-800">
                        ${producto.precio}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default CardProductoDestacadoMini