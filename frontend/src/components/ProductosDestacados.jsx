import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductoTest from '../assets/producto1.png';
import { BiCart } from 'react-icons/bi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Cart from './Cart';


const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/productos/')
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


    const productosDestacados = productos.filter(
        (producto) => producto.es_destacado === 'si'
    );

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    const handleAgregarCarro = (producto) => {
        // primero obtenemos el id del usuario guardado en el token 
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);

        const usuario_id = decodedToken.id;

        // creamos una variable que va guardar los datos del carrito
        const datosCarrito = {
            usuario_id: usuario_id, // tiene la id del token
            producto_id: producto.id, // la id del producto 
            precio_total: producto.precio, // el precio del producto guardado
            cantidad_total: 1 // por defecto se guarda 1 porque es un producto el que se guardo
        };

        // ahora cuando se quieran enviar los datos al backend, se enviara datosCarrito

        axios.post('http://localhost:8000/carrito', datosCarrito)
            .then((res) => {
                console.log(res.data);
                console.log(datosCarrito)
                setCarritoVisible(true); // Mostrar el componente Cart
            })
            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <div className="flex flex-col justify-center font-primary pb-20">
            <div className="bg-white py-20 text-center px-8 mb-4">
                <h1 className="text-3xl font-bold">Productos Destacados</h1>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:justify-center overflow-y-auto">
                {Array.isArray(productosDestacados) && productosDestacados.length > 0 ? (
                    productosDestacados.map((producto) => (
                        <div
                            key={producto.id}
                            className="h-98 w-64 ml-16 mr-16 sm:ml-8 sm:mr-8 md:mr-4 md:ml-4 my-5 md:m-4 bg-white hover:shadow-md rounded-md p-2 hover:scale-105 ease-out relative duration-700 hover:shadow-purple-500 transition-all"
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
                            <div className='flex text-center justify-between items-center'>
                                <button className='bg-gray-100 text-black flex text-center justify-center px-5  py-1 m-1 rounded-xl hover:bg-purple-500 hover:text-white'>Vista Previa</button>
                                <button className='bg-black text-white flex text-center justify-center px-3 py-3 m-1 rounded-full hover:bg-purple-500 hover:text-white' onClick={() => {
                                    handleAgregarCarro(producto);
                                }}><BiCart size={30} /></button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center">
                        <h1 className="text-center text-3xl">
                            No hay productos destacados disponibles.
                        </h1>
                    </div>
                )}
            </div>
            {carritoVisible && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                    <Cart onClose={() => setCarritoVisible(false)} />
                </div>
            )}
        </div>
    );
};

export default ProductosDestacados;
