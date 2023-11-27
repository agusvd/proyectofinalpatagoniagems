import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowFromLeft } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';
import CardProductoCarritoMini from '../cards.tienda/CardProductoCarritoMini';

const Cart = ({ onClose }) => {
    // Estado para almacenar los productos en el carrito
    const [carritoItems, setCarritoItems] = useState([]);

    // Estado para almacenar la cantidad de cada producto en el carrito
    const [cantidadProductos, setCantidadProductos] = useState({});

    // Efecto para cargar los productos del carrito al montar el componente
    useEffect(() => {
        const fetchCarritoItems = async () => {
            try {
                // Obtener el token del usuario desde las cookies
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const usuario_id = decodedToken.id;

                // Hacer una solicitud al backend para obtener los productos del carrito
                const response = await axios.get(
                    `http://localhost:8000/carrito?usuario_id=${usuario_id}`
                );

                // Actualizar el estado con los productos y la cantidad inicial
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

    // Función para calcular el precio total de un producto en el carrito
    const calcularPrecioTotal = (producto) => {
        return producto.precio * cantidadProductos[producto.producto_id];
    };

    // Función para calcular el precio total del carrito sumando los precios totales de todos los productos
    const calcularPrecioTotalCarrito = () => {
        let total = 0;
        carritoItems.forEach((item) => {
            total += calcularPrecioTotal(item);
        });
        return total;
    };

    // Función para actualizar la cantidad de un producto en el carrito
    const actualizarProductoCarrito = (producto_id, cantidad) => {
        // Actualizar el estado de la cantidad de productos
        setCantidadProductos((prevCantidadProductos) => ({
            ...prevCantidadProductos,
            [producto_id]: cantidad,
        }));

        // Verificar si el elemento del carrito con el producto_id especificado existe
        const carritoItem = carritoItems.find(
            (item) => item.producto_id === producto_id
        );
        if (!carritoItem) {
            console.error(`No se encontró el elemento del carrito con el producto_id ${producto_id}`);
            return;
        }

        // Actualizar la base de datos con la nueva cantidad
        const nuevoPrecioTotal = carritoItem.precio * cantidad;
        axios
            .put(`http://localhost:8000/carrito/${carritoItem.id}`, {
                cantidad_total: cantidad,
                precio_total: nuevoPrecioTotal,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Función para eliminar un producto del carrito
    const eliminarProductoCarrito = (id) => {
        axios
            .delete(`http://localhost:8000/carrito/${id}`)
            .then((res) => {
                console.log(res.data);
                // Actualizar el estado eliminando el producto del carrito
                setCarritoItems((prevCarritoItems) =>
                    prevCarritoItems.filter((item) => item.id !== id)
                );
                // Mostrar un mensaje de éxito usando react-hot-toast
                toast.success('Producto eliminado del carrito');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="fixed top-0 right-0 w-full sm:w-2/3 md:w-2/3 lg:w-1/3 h-screen font-primay bg-white">
            {/* Encabezado del carrito */}
            <header className="bg-white p-2 flex justify-between items-center">
                <h2 className="text-[#202020] text-3xl">Carrito</h2>
                <button className="text-[#202020] hover:text-purple-500 duration-300" onClick={onClose}>
                    <BiArrowFromLeft size={40} />
                </button>
            </header>

            {/* Contenido del carrito */}
            <div className="h-4/5 overflow-y-auto gap-2">
                {carritoItems.length === 0 ? (
                    // Mostrar mensaje si el carrito está vacío
                    <div className="flex flex-col justify-center items-center p-2 gap-4">
                        <h1 className="text-[#202020] text-4xl text-center pt-6">Tu carrito está vacío.</h1>
                        {/* Enlace para ir de compras */}
                        <Link to="/tienda" onClick={onClose} className="flex px-4 py-2 text-white text-xl hover:bg-purple-600 rounded-lg bg-black duration-300 transition-all ease-in">
                            Ir de compras
                        </Link>
                    </div>
                ) : (
                    // Mostrar productos en el carrito
                    carritoItems.map((producto) => (
                        <div className='p-5 w-full bg-white items-center flex justify-center'>
                            {/* Usar el componente CardProductoCarritoMini para mostrar información del producto */}
                            <CardProductoCarritoMini
                                key={producto.id}
                                producto={producto}
                                onClose={onClose}
                                carritoItem={carritoItems}
                                cantidadProductos={cantidadProductos}
                                carritoItems={carritoItems}
                                actualizarProductoCarrito={actualizarProductoCarrito}
                                eliminarProductoCarrito={eliminarProductoCarrito}
                            />
                        </div>
                    ))
                )}

                {/* Mostrar el subtotal si hay productos en el carrito */}
                {carritoItems.length > 0 && (
                    <div className="bg-white w-full items-center justify-between flex p-2 text-lg border-t-2 border-b-2">
                        <h1 className="text-[#202020] font-bold">Subtotal:</h1>
                        <h2 className="text-[#202020] font-bold">${calcularPrecioTotalCarrito()} CLP</h2>
                    </div>
                )}
            </div>

            {/* Pie de página con enlaces para ver el carrito y proceder al pago */}
            {carritoItems.length > 0 && (
                <footer className="p-2 flex flex-col">
                    <Link to="/carrito" className="bg-black text-white py-2 px-4 rounded mb-2 hover:bg-gray-500" >
                        Ver Carrito
                    </Link>
                    <Link to="/pago" className="text-white py-2 px-4 rounded bg-purple-500 hover:bg-green-500">
                        Proceder al pago
                    </Link>
                </footer>
            )}
        </div>
    );
};

export default Cart;
