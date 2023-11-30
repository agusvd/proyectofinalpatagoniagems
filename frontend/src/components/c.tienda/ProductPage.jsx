import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cart from '../shared.tienda/Cart';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { AiOutlineShopping } from 'react-icons/ai'
import { BiMessageSquareX } from 'react-icons/bi';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import CardToastAgregarCarro from '../cards.tienda/CardToastAgregarCarro';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { AiOutlineLoading } from "react-icons/ai";
import CardToastIniciarSesion from '../cards.tienda/CardToastIniciarSesion';




const ProductPage = () => {

    const [cantidad, setCantidad] = useState(1);
    const [producto, setProducto] = useState(null);
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    const { nombre } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/tienda/producto/${nombre}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setProducto(null);
                } else {
                    setProducto(res.data[0]);
                    console.log(producto)
                }
            })
            .catch((err) => console.log(err));

        // Verificar si el usuario ha iniciado sesión
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [nombre]);

    const handleAgregarCarro = (producto) => {
        {/* Verificar si el usuario esta logeado */ }
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
            cantidad_total: cantidad,
        };
        //peticion
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

    // mercado pago

    const [preferenceId, setPreferenceId] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    initMercadoPago("TEST-9e467044-7573-4752-9e22-6d63cbd13be4")

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:8000/create_preference", {
                descripcion: producto.nombre,
                price: producto.precio,
                quantity: cantidad,
                currency_id: "CLP"
            });

            const { id } = response.data;
            return id;

        } catch (error) {
            console.log(error.response.data);  // Muestra información del error en la consola
            toast.error('Error al crear la preferencia');
        }
    };

    const handleBuy = async () => {
        {/* Veriifica si esta logeado el usuario */ }
        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }
        setIsLoading(true);
        const id = await createPreference()
        if (id) {
            setPreferenceId(id)
        }
    };

    if (producto === null) {
        return (
            <div>
                <div className="font-primary">
                    <div className="h-screen text-white bg-black flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-4">ERROR NO EXISTE EL PRODUCTO</h1>
                        <Link to="/" className="text-white bg-purple-500 hover:bg-pink-600 transition-all duration-150 rounded-full p-2">Volver a la tienda</Link>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div className='flex justify-center items-center h-screen w-full bg-white font-primary'>

            <Toaster position="bottom-left" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            {/* Contenedor del producto */}
            <div className='flex flex-col md:flex md:flex-row w-full h-screen overflow-x-hidden'>
                {/* Izquierda imagenes */}
                <div className='bg-white w-full overflow-auto'>
                    <div className='h-full'>
                        <img src={producto.imagen} className=' object-contain w-full h-full border-2' />
                        <img src={producto.imagen} className=' object-contain w-full h-full border-2' />
                    </div>
                </div>
                {/* derecha todo los detalles para comprar etc */}
                <div className='md:sticky md:right-0 md:w-[800px]'>
                    <div className='flex flex-col bg-white h-full md:w-[600px]'>
                        {/* Nombre y precio */}
                        <div className='flex flex-col p-2 pt-10'>
                            <h2 className='text-2xl text-black font-bold'>{producto.nombre}</h2>
                            <h3 className='text-xl text-gray-700'>${producto.precio} CLP</h3>
                        </div>
                        {/* Contenedor Botones */}
                        <div className='w-full flex flex-col gap-2'>
                            {/* Boton para aumentar la cantidad del producto */}
                            <div className="flex flex-col items-center justify-start">
                                <div className="flex bg-black rounded-md items-center">
                                    <button className="bg-black hover:bg-[#474A56] duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-md"
                                        onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}>
                                        <p className='text-2xl'>-</p>
                                    </button>
                                    <p className="bg-black text-white py-2 px-4 mx-2 rounded text-xl">
                                        {cantidad}
                                    </p>
                                    <button className="bg-black hover:bg-[#474A56] duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-md"
                                        onClick={() => setCantidad(cantidad + 1)}>
                                        <p className='text-2xl'>+</p>
                                    </button>
                                </div>
                            </div>
                            {/* Botones para agregar al carro y pagar  */}
                            <div className='w-full flex flex-col gap-2 p-2'>
                                <button className="w-full p-2 text-white text-xl rounded-md  active:bg-green-500 duration-300 ease-in-out bg-black hover:bg-purple-500 flex items-center justify-center" onClick={() => handleAgregarCarro(producto)}>
                                    <AiOutlineShopping size={30} />
                                </button>
                                {isLoading ?
                                    <div className='-mt-4'>
                                        {preferenceId && <Wallet initialization={{ preferenceId }} />}
                                    </div>
                                    :
                                    <button className='p-2 bg-black hover:bg-[#474A56]  text-white active:bg-green-500 duration-300 ease-in-out text-xl rounded-md  w-full items-center flex justify-center' onClick={handleBuy}>
                                        Comprar
                                    </button>
                                }
                            </div>
                        </div>
                        {/* informacion del producto */}
                        <div className="collapse collapse-arrow bg-white">
                            <input type="radio" name="my-accordion-2" checked="checked" />
                            <div className="collapse-title text-xl text-black">
                                Descripción
                            </div>
                            <div className="collapse-content">
                                <p className='text-black'>{producto.descripcion}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-white">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl text-black">
                                Detalles
                            </div>
                            <div className="collapse-content">
                                <p className='text-black'>Nada</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-white">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl text-black">
                                Extra
                            </div>
                            <div className="collapse-content">
                                <p className='text-black'>Nada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {carritoVisible && (
                <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                    <Cart onClose={() => setCarritoVisible(false)} />
                </div>
            )}
            {showModal && (
                <CardToastIniciarSesion onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default ProductPage;
