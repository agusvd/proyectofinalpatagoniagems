import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiCart } from 'react-icons/bi';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import ProductoTest from '../assets/producto1.png';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { BiMessageSquareX } from 'react-icons/bi';
import { toast, Toaster } from 'react-hot-toast';

const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

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

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }

        // Obtener los productos del carrito desde el backend
        const fetchCarritoItems = async () => {
            try {
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const usuario_id = decodedToken.id;
                const response = await axios.get(
                    `http://localhost:8000/carrito?usuario_id=${usuario_id}`
                );
                setCarritoItems(response.data);
                const cantidadInicial = {};
                response.data.forEach((item) => {
                    cantidadInicial[item.producto_id] = item.cantidad_total;
                });
                setCantidadProductos(cantidadInicial);
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCarritoItems();
    }, []);

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    const handleAgregarCarro = (producto) => {
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }

        const productoExistente = carritoItems.find((item) => item.id === producto.id);
        if (productoExistente) {
            toast.error('El producto ya está en el carrito');
            return;
        }

        // Obtener el ID del usuario del token
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const usuario_id = decodedToken.id;

        // Crear un objeto con los datos del carrito
        const datosCarrito = {
            usuario_id: usuario_id,
            producto_id: producto.id,
            precio_total: producto.precio,
            cantidad_total: 1,
        };

        axios
            .post('http://localhost:8000/carrito', datosCarrito)
            .then((res) => {
                console.log(res.data);
                setCarritoVisible(true);
                setCarritoItems((prevCarritoItems) => [...prevCarritoItems, producto]);
                setCantidadProductos((prevCantidadProductos) => ({
                    ...prevCantidadProductos,
                    [producto.id]: 1,
                }));
                toast.success('Producto agregado al carrito');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const productosDestacados = productos.filter(
        (producto) => producto.es_destacado === 'si'
    );

    return (
        <div className="flex flex-col justify-center font-primary pb-20 bg-gray-200">
            <Toaster />
            {/* TITULO */}
            <div className="text-center py-10 sm:py-20 px-8 mb-4">
                <h1 className="text-3xl sm:text-5xl font-bold">Productos destacados</h1>
            </div>
            {/* CONTENEDOR DE CARDS */}
            <div className="grid grid-cols-2 sm:flex items-center sm:flex-row justify-center overflow-y-auto">
                {/* CARDS */}
                {Array.isArray(productosDestacados) && productosDestacados.length > 0 ? (
                    productosDestacados.map((producto) => (
                        <div
                            key={producto.id}
                            className="w-44 m-2 sm:h-98 sm:w-64 sm:m-4 md:mr-0 md:ml-4 md:m-10 bg-white hover:shadow-md rounded-md p-2 hover:scale-105 ease-out relative duration-700 hover:shadow-purple-500 transition-all"
                        >
                            <Link
                                to={`/tienda/producto/${producto.nombre}`}
                                className="flex flex-wrap items-center justify-center"
                            >
                                <img
                                    src={ProductoTest}
                                    className="h-full w-full object-cover"
                                    alt="Producto"
                                />
                            </Link>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <Link
                                        to={`/tienda/producto/${producto.nombre}`}
                                        className="text-md font-bold capitalize"
                                    >
                                        {producto.nombre}
                                    </Link>
                                    <p className="text-sm sm:text-md text-gray-800 capitalize">
                                        {getCategoriaNombre(producto.categoria_id)}
                                    </p>
                                    <p className="text-md text-gray-400">${producto.precio}</p>
                                </div>
                            </div>
                            <div className="flex text-center justify-between items-center">
                                <Link
                                    to={`/tienda/producto/${producto.nombre}`}
                                    className="bg-gray-100 text-black hidden sm:flex text-center justify-center px-5 py-1 m-1 rounded-xl hover:bg-purple-500 hover:text-white"
                                >
                                    Ver producto
                                </Link>
                                <button
                                    className="bg-black text-white flex text-center justify-center px-2 py-2 m-1 rounded-full hover:bg-purple-500 hover:text-white hover:scale-125"
                                    onClick={() => {
                                        handleAgregarCarro(producto);
                                    }}
                                >
                                    <BiCart size={25} />
                                </button>
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
            {showModal && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] font-primary">
                    <div className="bg-white p-4 rounded-md">
                        <button
                            className="absolute top-2 right-2 focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <BiMessageSquareX
                                size={50}
                                className="text-white hover:text-red-500"
                            />
                        </button>
                        <h2 className="text-xl text-center">¡Necesitas estar registrado!</h2>
                        <div className="flex justify-center">
                            <Link
                                to="/login"
                                className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosDestacados;
