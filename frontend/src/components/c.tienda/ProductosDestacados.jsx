import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Cart from '../shared.tienda/Cart';
import { toast, Toaster } from 'react-hot-toast';
import CardToastAgregarCarro from '../cards.tienda/CardToastAgregarCarro';
import CardProductoGeneral from '../cards.tienda/CardProductoGeneral';
import CardToastIniciarSesion from '../cards.tienda/CardToastIniciarSesion';

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
            .get('http://localhost:8000/dashboard/categorias')
            .then((res) => {
                console.log(res.data);
                setCategorias(res.data);
            })
            .catch((err) => console.log(err));

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            console.log("hola")
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
                toast.custom((t) => (
                    <CardToastAgregarCarro producto={producto} visible={t.visible} />
                ))
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const productosDestacados = productos.filter(
        (producto) => producto.es_destacado === 'si'
    );

    return (
        <div className="flex flex-col justify-center font-primary bg-white pt-10">
            <Toaster position="bottom-left" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            {/* TITULO */}
            <div className="text-center py-5 px-4 bg-white">
                <h1 className="text-4xl text-[#202020] font-bold">Nuevos productos</h1>
            </div>
            {/* CONTENEDOR DE CARDS */}
            <div className='w-full flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-5 p-5 items-center justify-center overflow-y-auto bg-white">
                    {/* CARDS */}
                    {Array.isArray(productosDestacados) && productosDestacados.length > 0 ? (
                        productosDestacados.map((producto) => (
                            <CardProductoGeneral key={producto} producto={producto} getCategoriaNombre={getCategoriaNombre} handleAgregarCarro={handleAgregarCarro} />
                        ))
                    ) : (
                        <div className="flex justify-center items-center">
                            <h1 className="text-center text-3xl">
                                No hay productos destacados disponibles.
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            {carritoVisible && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                    <Cart onClose={() => setCarritoVisible(false)} />
                </div>
            )}
            {showModal && (
                <CardToastIniciarSesion onClose={() => setShowModal(false)}/>
            )}
        </div>
    );
};

export default ProductosDestacados;
