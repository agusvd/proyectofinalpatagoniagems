import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductoEjemplo from '../assets/producto1.png';
import ProductosRelacionados from '../components/ProductosRelacionados';
import Footer from '../components/Footer';
import axios from 'axios';
import Cart from '../components/Cart';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { BiCart } from 'react-icons/bi';
import { BiMessageSquareX } from 'react-icons/bi';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nombreP, setNombreP] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const { nombre } = useParams();

    useEffect(() => {
        axios
            .get('http://localhost:8000/tienda/producto/' + nombre)
            .then((res) => {
                if (res.data.length === 0) {
                    setProducto(null); // No se encontró el producto, establecer producto a null
                } else {
                    setProducto(res.data[0]);
                    setNombreP(res.data[0].nombre);
                    setDescripcion(res.data[0].descripcion);
                    setPrecio(res.data[0].precio);
                    setStock(res.data[0].stock);
                    setCategoria_id(res.data[0].categoria_id);
                }
            })
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((err) => console.log(err));

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [nombre]);

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    const handleAgregarCarro = (producto) => {
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }

        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const usuario_id = decodedToken.id;

        const datosCarrito = {
            usuario_id: usuario_id,
            producto_id: producto.id,
            precio_total: producto.precio,
            cantidad_total: 1
        };

        axios
            .post('http://localhost:8000/carrito', datosCarrito)
            .then((res) => {
                console.log(res.data);
                console.log(datosCarrito);
                setCarritoVisible(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    if (producto === null) {
        return (
            <div>
                <div className="font-primary">
                    <div className="h-screen text-white bg-black flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-4">ERROR NO EXISTE EL PRODUCTO</h1>
                        <Link to="/" className="text-white bg-purple-500 hover:bg-pink-600 transition-all duration-150 rounded-full p-2">
                            Volver a la tienda
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-8 font-primary">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2 px-4">
                        <img
                            src={ProductoEjemplo}
                            alt="Nombre del producto"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-4 flex flex-col">
                        {nombreP && (
                            <div>
                                <p className="text-sm text-purple-600">PatagoniaGems</p>
                                <h1 className="text-3xl capitalize">{nombreP}</h1>
                                <h2 className="text-xl text-gray-600 capitalize">
                                    {getCategoriaNombre(categoria_id)}
                                </h2>
                                <p className="text-lg text-gray-500 mb-5">${precio} CLP</p>
                                <p className="text-lg text-start capitalize">{descripcion}</p>
                            </div>
                        )}
                        <div className="flex items-center gap-5 text-center justify-between sm:justify-normal">
                            <div className="flex">
                                <button
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                >
                                    -
                                </button>
                                <p className="bg-purple-500 text-white py-2 px-4 mx-2 rounded">{quantity}</p>
                                <button
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex">
                                <button
                                    className="bg-black text-white flex text-center justify-center px-3 py-3 m-1 rounded-full hover:bg-purple-500 hover:text-white"
                                    onClick={() => handleAgregarCarro(producto)}
                                >
                                    <BiCart size={30} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col p-2 gap-2 border-t-2 border-b-2 justify-center sm:justify-normal sm:border-0 sm:gap-2">
                            <div className='sm:text-start text-center'>
                                <h1>Redes sociales</h1>
                            </div>
                            <div className='justify-center flex gap-5 sm:justify-normal'>
                            <a href="https://www.facebook.com/Patagoniagems/" target="_blank" className="text-black">
                                <FaFacebook size={25} />
                            </a>
                            <a href="https://www.instagram.com/patagoniagems/?hl=es" target="_blank" className="text-black">
                                <FaInstagram size={25} />
                            </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <ProductosRelacionados />
            </div>
            <Footer />
            {carritoVisible && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                    <Cart onClose={() => setCarritoVisible(false)} />
                </div>
            )}
            {showModal && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] font-primary">
                    <div className="bg-white p-4 rounded-md">
                        <button className="absolute top-2 right-2 focus:outline-none" onClick={() => setShowModal(false)}>
                            <BiMessageSquareX size={50} className="text-white hover:text-red-500" />
                        </button>
                        <h2 className="text-xl text-center">Necesitas estar registrado!</h2>
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
    );
};

export default ProductPage;
