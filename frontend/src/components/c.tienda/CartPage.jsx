import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';
import CardProductoCarritoGrande from '../cards.tienda/CardProductoCarritoGrande';


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
            console.error(
                `No se encontró el elemento del carrito con el producto_id ${producto_id}`
            );
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
        <div className="h-full bg-white  font-primary">
            <div className="p-2 overflow-y-auto">
                <div>
                    <h1 className='text-4xl pl-10 text-black text-center'>Tu carrito</h1>
                </div>
                {carritoItems.length === 0 ? (
                    <div className="flex flex-col justify-center items-center m-2 gap-4">
                        <h1 className="text-black text-xl text-center pt-6">Tu carrito está vacío.</h1>
                        <Link to="/tienda" onClick={onClose} className="flex px-4 py-2 text-white font-bold text-xl bg-purple-600 rounded-full hover:bg-black duration-300 transition-all ease-in">
                            Ir de compras
                        </Link>
                    </div>
                ) : (
                    carritoItems.map((producto) => (
                        <div className='p-2 flex flex-col w-full justify-center items-center'>
                            <CardProductoCarritoGrande key={producto.id} producto={producto} onClose={onClose} carritoItem={carritoItems} cantidadProductos={cantidadProductos} carritoItems={carritoItems} actualizarProductoCarrito={actualizarProductoCarrito} eliminarProductoCarrito={eliminarProductoCarrito} />
                        </div>
                    ))
                )}
            </div>
            <div className='bg-white w-full items-center justify-center flex flex-col'>

                {carritoItems.length > 0 && (
                    <div className="ml-2 items-center justify-center flex p-2 text-lg gap-5">
                        <h1 className="text-black text-2xl">Total:</h1>
                        <h2 className="text-black text-xl">${calcularPrecioTotalCarrito()} CLP</h2>
                        {carritoItems.length > 0 && (
                            <footer className="p-2 flex">
                                <Link to="/pago" className="bg-purple-500 duration-300 ease-in-out text-white py-2 px-4 rounded hover:bg-green-500">
                                    Proceder al pago
                                </Link>
                            </footer>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;
