import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowFromLeft } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';
import CardProductoCarritoMini from '../cards/CardProductoCarritoMini';

const Cart = ({ onClose }) => {
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    useEffect(() => {
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

    const calcularPrecioTotal = (producto) => {
        return producto.precio * cantidadProductos[producto.producto_id];
    };

    const calcularPrecioTotalCarrito = () => {
        let total = 0;
        carritoItems.forEach((item) => {
            total += calcularPrecioTotal(item);
        });
        return total;
    };

    const actualizarProductoCarrito = (producto_id, cantidad) => {
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

        // Actualizar la base de datos
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

    const eliminarProductoCarrito = (id) => {
        axios
            .delete(`http://localhost:8000/carrito/${id}`)
            .then((res) => {
                console.log(res.data);
                setCarritoItems((prevCarritoItems) =>
                    prevCarritoItems.filter((item) => item.id !== id)
                );
                toast.success('Producto eliminado del carrito');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="fixed top-0 right-0 w-full sm:w-2/3 md:w-2/3 lg:w-1/3 h-screen bg-w shadow-md font-primay bg-[#202020]">
            <header className="bg-[#202020] p-2 flex justify-between items-center">
                <h2 className="text-white text-3xl font-bold">Carrito</h2>
                <button className="text-white hover:text-purple-500 duration-300" onClick={onClose}>
                    <BiArrowFromLeft size={40} />
                </button>
            </header>
            <div className="p-2 h-4/5 overflow-y-auto gap-2">
                {carritoItems.length === 0 ? (
                    <div className="flex flex-col justify-center items-center m-2 gap-4">
                        <h1 className="text-white text-4xl text-center pt-6">Tu carrito está vacío.</h1>
                        <Link to="/tienda" onClick={onClose} className="flex px-4 py-2 text-white font-bold text-xl bg-purple-600 rounded-full hover:bg-black duration-300 transition-all ease-in">
                            Ir de compras
                        </Link>
                    </div>
                ) : (
                    carritoItems.map((producto) => (
                        <div className='p-2 w-full bg-[#202020]'>
                            <CardProductoCarritoMini key={producto.id} producto={producto} onClose={onClose} carritoItem={carritoItems} cantidadProductos={cantidadProductos} carritoItems={carritoItems} actualizarProductoCarrito={actualizarProductoCarrito} eliminarProductoCarrito={eliminarProductoCarrito} />
                        </div>
                    ))
                )}
                {carritoItems.length > 0 && (
                    <div className="bg-[#202020] w-full ml-2 items-center justify-between flex p-2 text-lg">
                        <h1 className="text-white font-bold">Subtotal:</h1>
                        <h2 className="text-white font-bold">${calcularPrecioTotalCarrito()} CLP</h2>
                    </div>
                )}
            </div>
            {carritoItems.length > 0 && (
                <footer className="p-2 flex flex-col">
                    <Link to="/carrito" className="bg-black text-white py-2 px-4 rounded mb-2 hover:bg-gray-500" >
                        Ver Carrito
                    </Link>
                    <Link to="/pago" className=" text-white py-2 px-4 rounded bg-purple-500 hover:bg-green-500">
                        Proceder al pago
                    </Link>
                </footer>
            )}
        </div>
    );
};

export default Cart;