import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Cart from '../shared.tienda/Cart';
import { toast, Toaster } from 'react-hot-toast';
import CardProductoGeneral from '../cards.tienda/CardProductoGeneral';
import CardToastAgregarCarro from '../cards.tienda/CardToastAgregarCarro';
import CardToastIniciarSesion from '../cards.tienda/CardToastIniciarSesion';

const ProductosTotal = () => {
    const [productos, setProductos] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/productos')
            .then((res) => {
                console.log(res.data);
                setProductos(res.data);
            })
            .catch((err) => console.log(err));

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // declaramos algunas variables que usaremos con el useState (estados)
    const [categorias, setCategorias] = useState([]);
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});


    // Obtener la informacion del backend
    // Aqui obtendremos las categorias
    useEffect(() => {
        axios.get('http://localhost:8000/dashboard/categorias')
            .then((res) => {
                console.log(res.data) // luego eliminar
                setCategorias(res.data)
            })
            .catch((err) => console.log(err))

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
                const response = await axios.get(`http://localhost:8000/carrito?usuario_id=${usuario_id}`);
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
    }, [])

    // obtener la categoria
    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    const handleAgregarCarro = (producto) => {
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }

        const productoExistente = carritoItems.find((item) => item.producto_id === producto.id);
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
        <div className="flex flex-col justify-center font-primary bg-white">
            <Toaster position="bottom-left" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            <div className="bg-black text-center py-10 sm:py-20 px-8 mb-4">
                <h1 className="text-4xl font-bold text-white">Todos los productos</h1>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 items-center bg-white">
                    {Array.isArray(productos) ? (
                        productos.map((producto) => (
                            <CardProductoGeneral key={producto.id} producto={producto} getCategoriaNombre={getCategoriaNombre} handleAgregarCarro={handleAgregarCarro} />
                        ))
                    ) : (
                        <div className="flex justify-center items-center">
                            <h1 className="text-center text-3xl">No hay productos disponibles.</h1>
                        </div>
                    )}
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
        </div>
    );
};

export default ProductosTotal;
