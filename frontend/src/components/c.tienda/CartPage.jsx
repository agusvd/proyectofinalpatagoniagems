import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';


const Cart = ({ onClose }) => {
    const [carritoItems, setCarritoItems] = useState([]);
    const [cantidadProductos, setCantidadProductos] = useState({});

    // guardamos un valor true si esta logeado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Obtener los productos del carrito desde el backend
        const fetchCarritoItems = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    setIsLoggedIn(true);
                }
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
        <div className="bg-white font-primary min-h-screen w-screen h-screen">
            <div className="p-2 flex justify-center items-center flex-col h-full">
                {
                    isLoggedIn ?
                        <div className='overflow-auto flex flex-col h-full'>
                            <div>
                                <h3 className='text-4xl text-black text-center'>Tu carrito</h3>
                            </div>
                            {carritoItems.length === 0 ? (
                                <div className="flex flex-col justify-center items-center m-2 gap-4 w-full">
                                    <h1 className="text-black text-xl text-center pt-6 border-2 w-full">Tu carrito está vacío.</h1>
                                    <Link to="/tienda" onClick={onClose} className="flex px-4 py-2 text-white font-bold text-xl hover:bg-purple-600 rounded-md bg-black duration-300 transition-all ease-in">
                                        Ir de compras
                                    </Link>
                                </div>
                            ) : (
                                <table className='table table-sm'>
                                    <thead>
                                        <tr>
                                            <th className='text-black'>
                                                Producto
                                            </th>
                                            <th className='text-black'>
                                                Cantidad
                                            </th>
                                            <th className='text-black'>
                                                Eliminar
                                            </th>
                                            <th className='text-black hidden sm:block'>
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    {carritoItems.map((producto) => (
                                        <tbody>
                                            <tr>
                                                <td className='flex w-full'>
                                                    <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="w-[100px]">
                                                        <img src={producto.imagen} className="w-full object-contain" alt={producto.nombre} />
                                                    </Link>
                                                    <div className='flex flex-col justify-center h-full w-full'>
                                                        <Link onClick={onClose} to={`/tienda/producto/${producto.nombre}`} className="text-md text-black font-bold">
                                                            {producto.nombre}
                                                        </Link>
                                                        <h2 className="text-md text-gray-500">
                                                            {producto.categoria}
                                                        </h2>
                                                        <h3 className="text-black text-md font-semibold pb-3">
                                                            ${producto.precio} CLP
                                                        </h3>
                                                    </div>
                                                </td>
                                                <td className=''>
                                                    {carritoItems.length > 0 && (
                                                        <div className="flex text-sm justify-start">
                                                            <div className="flex rounded-md">
                                                                <button className="px-4 bg-white hover:bg-gray-200 duration-150 ease-in-out rounded-md" onClick={() => actualizarProductoCarrito(producto.producto_id, cantidadProductos[producto.producto_id] > 1 ? cantidadProductos[producto.producto_id] - 1 : 1)}>
                                                                    <p className='text-xl font-bold text-black'>-</p>
                                                                </button>
                                                                <p className="px-4 py-2 bg-white text-black font-bold">
                                                                    {cantidadProductos[producto.producto_id]}
                                                                </p>
                                                                <button className="px-4 bg-white text-[#202020] hover:bg-gray-200 duration-150 ease-in-out rounded-md" onClick={() =>
                                                                    actualizarProductoCarrito(
                                                                        producto.producto_id,
                                                                        cantidadProductos[producto.producto_id] + 1
                                                                    )
                                                                }>
                                                                    <p className='text-xl font-bold text-black'>+</p>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <button onClick={() => eliminarProductoCarrito(producto.id)} className="py-2">
                                                        <BiTrash size={30} className="hover:text-purple-500 text-gray-600" />
                                                    </button>
                                                </td>
                                                <td className='hidden sm:table-cell'>
                                                    <p className='text-sm text-black'>${producto.precio * cantidadProductos[producto.producto_id]} CLP</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>

                            )}
                            <div className='bg-white w-full sticky bottom-0'>
                                {carritoItems.length > 0 && (
                                    <div className="items-end justify-end flex flex-col p-2 text-lg gap-2">
                                        <h2 className="text-black text-md font-semibold">
                                            Total: ${calcularPrecioTotalCarrito()} CLP
                                        </h2>
                                        {carritoItems.length > 0 && (
                                            <footer className="p-2 flex">
                                                <Link to="/checkout" className="bg-black hover:bg-purple-500 duration-300 ease-in-out text-white py-2 px-4 rounded active:bg-green-500">
                                                    Proceder al pago
                                                </Link>
                                            </footer>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                        :
                        <div className='flex justify-center items-center w-full h-full'>
                            <h3 className='text-4xl text-black'>Tienes que iniciar sesion</h3>
                        </div>
                }
            </div>
        </div>
    );
};

export default Cart;
