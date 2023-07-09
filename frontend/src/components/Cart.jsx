import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowFromLeft, BiTrash, BiEdit } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import ProductoEjemplo from '../assets/producto1.png'


const Cart = ({ onClose }) => {
    const [cantidad, setCantidad] = useState(1);
    const [carritoItems, setCarritoItems] = useState([]);

    useEffect(() => {
        // Obtener los productos del carrito desde el backend
        const fetchCarritoItems = async () => {
            try {
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const usuario_id = decodedToken.id;
                const response = await axios.get(`http://localhost:8000/carrito?usuario_id=${usuario_id}`);
                setCarritoItems(response.data);
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCarritoItems();
    }, []);

    // Función para aumentar la cantidad en 1
    const incrementarCantidad = (productoId) => {
        setCarritoItems((prevCarritoItems) =>
            prevCarritoItems.map((item) =>
                item.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };


    // Función para disminuir la cantidad en 1
    const decrementarCantidad = (productoId) => {
        setCarritoItems((prevCarritoItems) =>
            prevCarritoItems.map((item) =>
                item.id === productoId && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        );
    };

    const calcularPrecioTotal = (producto) => {
        return producto.precio * producto.cantidad;
    };

    // Calcular el precio total de todos los productos en el carrito
    const calcularPrecioTotalCarrito = () => {
        let total = 0;
        carritoItems.forEach((item) => {
            total += item.precio_total;
        });
        return total;
    };

    const eliminarProductoCarrito = (id) => {
        axios
            .delete(`http://localhost:8000/carrito/${id}`)
            .then((res) => {
                console.log(res);
                // Eliminar el producto del array de carritoItems
                setCarritoItems(prevCarritoItems =>
                    prevCarritoItems.filter(item => item.id !== id)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="fixed top-0 right-0 w-full sm:w-2/3 md:w-1/3 h-screen bg-white shadow-md font-primary">
            <header className="bg-gray-300 p-2 flex justify-between items-center">
                <h2 className="text-black text-lg font-bold">CARRITO</h2>
                <button className="text-gray-600 hover:text-purple-500" onClick={onClose}>
                    <BiArrowFromLeft className="h-8 w-8" />
                </button>
            </header>
            <div className="p-2 h-4/5 overflow-y-auto">
                {carritoItems.length === 0 ? (
                    <div className='flex flex-col justify-center items-center m-2 gap-4'>
                        <h1 className='text-black text-xl text-center pt-6'>Tu carrito está vacío.</h1>
                        <Link to="/tienda" onClick={onClose} className='flex px-4 py-2 text-white font-bold text-xl bg-purple-600 rounded-full hover:bg-black duration-300 transition-all ease-in'>
                            Ir de compras
                        </Link>
                    </div>
                ) : (
                    carritoItems.map((item) => (
                        <div className='md:flex md:justify-center'>
                            <div className="ml-2 flex p-2" key={item.id}>
                                <div className="m-2 border-2 shadow-lg">
                                    <img src={ProductoEjemplo} className="h-44 w-32 sm:h-48 sm:w-36 object-center" alt={item.nombre} />
                                </div>
                                <div className="flex flex-col justify-center ml-5 text-black text-start gap-1">
                                    <h1 className="text-md font-bold" >{item.nombre}</h1>
                                    <h2 className="text-sm text-gray-500">{item.categoria}</h2>
                                    <h3 className="text-gray-500 text-md font-bold pb-3">${item.precio}</h3>
                                    {carritoItems.length > 0 && (
                                        <div className="flex text-sm justify-around rounded-full text-black">
                                            <div className="flex">
                                                <button className="px-4 bg-white hover:bg-gray-100 rounded-l-full border-r-0 border-2 border-gray-500" onClick={() => decrementarCantidad(item.id)}>-</button>
                                                <p className="px-4 py-2 bg-white border-t-2 border-b-2 border-gray-500 font-bold">{cantidad}</p>
                                                <button className="px-4 bg-white rounded-r-full border-l-0 hover:bg-gray-100 border-2 border-gray-500" onClick={() => incrementarCantidad(item.id)}>+</button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-x-3 text-2xl py-2">
                                        <button className="py-2">
                                            <BiEdit size={20} className="hover:text-purple-500 text-gray-600" />
                                        </button>
                                        <button onClick={() => eliminarProductoCarrito(item.id)} className="py-2">
                                            <BiTrash size={20} className="hover:text-purple-500 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {/* Mostrar el total del carrito si hay productos */}
                {carritoItems.length > 0 && (
                    <div className="ml-2 items-center justify-between flex p-2 border-t-2 border-b-2 text-lg">
                        <h1 className="text-black font-bold">Subtotal:</h1>
                        <h2 className="text-black font-bold">${calcularPrecioTotalCarrito()} CLP</h2>
                    </div>
                )}
                
            </div>
            {/* Ocultar los botones si no hay productos en el carrito */}
            {carritoItems.length > 0 && (
                    <footer className="p-2 flex flex-col">
                        <Link to="/carrito" className="bg-gray-100 text-black py-2 px-4 rounded mb-2 hover:bg-gray-200">
                            Ver Carrito
                        </Link>
                        <Link to="/pago" className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-purple-500">
                            Proceder al pago
                        </Link>
                    </footer>
                )}
        </div>
    );
};

export default Cart;