import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProductoTest from '../assets/producto1.png';

const ProductosTotal = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/productos')
            .then((res) => {
                console.log(res.data);
                setProductos(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                console.log(res.data);
                setCategorias(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    return (
        <div className='flex justify-center'>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-0 sm:m-2 md:m-4 font-primary justify-center items-center">
                {Array.isArray(productos) ? (
                    productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="h-98 w-64 ml-16 mr-16 sm:ml-8 sm:mr-8 md:mr-4 md:ml-4 my-5 md:m-4 bg-white shadow-sm hover:shadow-xl rounded-md p-2 hover:scale-105 transition-all duration-300 ease-out relative"
                        >
                            <div className="flex flex-wrap items-center justify-center">
                                <img src={ProductoTest} className="h-full w-full object-cover" alt="Producto" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-md font-bold">{producto.nombre}</h2>
                                    <p className="text-sm sm:text-md text-gray-800">{getCategoriaNombre(producto.categoria_id)}</p>
                                    <p className="text-md text-gray-400">${producto.precio}</p>
                                </div>
                            </div>
                            <div className='flex flex-col text-center'>
                                <button className='bg-gray-300 text-black flex text-center justify-center py-1 m-1 rounded-xl hover:bg-purple-500 hover:text-white'>Agregar al carro</button>
                                <button className='bg-gray-300 text-black flex text-center justify-center  py-1 m-1 rounded-xl hover:bg-purple-500 hover:text-white'>Vista Previa</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-center text-3xl'>No hay productos disponibles.</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductosTotal;
