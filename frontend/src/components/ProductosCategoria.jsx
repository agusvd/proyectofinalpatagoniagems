import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import ProductoTest from '../assets/producto1.png';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { BiMessageSquareX } from 'react-icons/bi'

const ProductosCategoria = () => {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [categoriaNombre, setCategoriaNombre] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/tienda/${categoriaId}`)
            .then((res) => {
                console.log(res.data);
                setProductos(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:8000/categorias/${categoriaId}`)
            .then((res) => {
                console.log(res.data);
                setCategoriaNombre(res.data.categoria);
            })
            .catch((err) => console.log(err));

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [categoriaId]);

    const handleAgregarCarro = (producto) => {
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }

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
        <div className='flex flex-col justify-center font-primary bg-gray-200'>
            <div className=" bg-purple-600 text-center py-10 sm:py-20 px-8 mb-4">
                <h1 className="text-3xl sm:text-5xl font-bold text-white uppercase">{categoriaNombre}</h1>
            </div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-0 sm:m-2 md:m-4 font-primary justify-center items-center">
                    {Array.isArray(productos) && productos.length > 0 ? (
                        productos.map((producto) => (
                            <div
                                key={producto.id}
                                className="w-44 m-2 sm:h-98 sm:w-64 sm:m-4 md:mr-0 md:ml-4 md:m-10 bg-white hover:shadow-md rounded-md p-2 hover:scale-105 ease-out relative duration-700 hover:shadow-purple-500 transition-all"
                            >
                                <Link to={`/tienda/producto/${producto.nombre}`} className="flex flex-wrap items-center justify-center">
                                    <img src={ProductoTest} className="h-full w-full object-cover" alt="Producto" />
                                </Link>
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <Link to={`/tienda/producto/${producto.nombre}`} className="text-md font-bold capitalize">{producto.nombre}</Link>
                                        <p className="text-sm sm:text-md text-gray-800 capitalize">{producto.categoria}</p>
                                        <p className="text-md text-gray-400">${producto.precio}</p>
                                    </div>
                                </div>
                                <div className='flex text-center justify-between items-center'>
                                    <Link to={`/tienda/producto/${producto.nombre}`} className='bg-gray-100 text-black hidden sm:flex text-center justify-center px-5  py-1 m-1 rounded-xl hover:bg-purple-500 hover:text-white'>Ver producto</Link>
                                    <button className='bg-black text-white flex text-center justify-center px-2 py-2 m-1 rounded-full hover:bg-purple-500 hover:text-white hover:scale-125' onClick={() => {
                                        handleAgregarCarro(producto);
                                    }}><BiCart size={25} /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-4 p-4 h-screen text-center'>
                            <h1 className='text-3xl'>No hay productos disponibles en esta categoría.</h1>
                        </div>
                    )}
                </div>
                {carritoVisible && (
                    <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                        <Cart onClose={() => setCarritoVisible(false)} />
                    </div>
                )}
                {showModal && (
                    <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] font-primary">
                        <div className="bg-white p-4 rounded-md">
                            <button className="absolute top-2 right-2 focus:outline-none"
                                onClick={() => setShowModal(false)}>
                                <BiMessageSquareX size={50} className='text-white hover:text-red-500' />
                            </button>
                            <h2 className='text-xl text-center'>Necesitas estar registrado!</h2>
                            <div className="flex justify-center">
                                <Link to="/login" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">
                                    Iniciar sesión
                                </Link>
                                <Link to="/register" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductosCategoria;
