import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Cart from '../shared.tienda/Cart';
import { Link } from 'react-router-dom';
import { BiMessageSquareX } from 'react-icons/bi'
import { toast, Toaster } from 'react-hot-toast';
import CardProductoCategoriaMini from '../cards/CardProductoCategoriaMini';
import CardToastAgregarCarro from '../cards/CardToastAgregarCarro';

const ProductosCategoria = () => {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [categoriaNombre, setCategoriaNombre] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/tienda/${categoriaId}`)
            .then((res) => {
                console.log(res.data);
                setProductos(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:8000/dashboard/categorias/${categoriaId}`)
            .then((res) => {
                console.log(res.data);
                setCategoriaNombre(res.data[0].categoria);
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

        const productoExistente = carritoItems.find(item => item.nombre === producto.nombre);
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
                toast.custom((t) => (
                    <CardToastAgregarCarro producto={producto} visible={t.visible} />
                ))
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className='flex flex-col justify-center font-primary bg-white'>
            <Toaster position="bottom-left" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            <div className="bg-gray-200 text-center py-10 sm:py-20 px-8 mb-4">
                <h1 className="text-4xl font-bold text-purple-600 first-letter:uppercase">{categoriaNombre}</h1>
            </div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 font-primary justify-center items-center gap-5 pb-5">
                    {Array.isArray(productos) && productos.length > 0 ? (
                        productos.map((producto) => (
                            <CardProductoCategoriaMini key={producto.id} producto={producto} handleAgregarCarro={handleAgregarCarro} />
                        ))
                    ) : (
                        <div className='h-screen text-center w-screen flex justify-center items-center'>
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
                                <Link to="/login" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">Iniciar sesión</Link>
                                <Link to="/register" className="bg-gray-100 text-black px-3 py-2 m-1 rounded-xl hover:bg-purple-500 hover:text-white">Registrarse</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductosCategoria;
