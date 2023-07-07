import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit, BiSearch, BiInfoCircle } from 'react-icons/bi';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';

const TablaInventario = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [consulta, setConsulta] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [ordenStock, setOrdenStock] = useState(null); // Nuevo estado para el orden
    const productosPorPagina = 13;

    useEffect(() => {
        axios
            .get('http://localhost:8000/dashboard/inventario/')
            .then((res) => {
                console.log(res.data);
                setProductos(res.data);
                setProductosFiltrados(res.data); // Inicialmente, mostrar todos los productos
            })
            .catch((err) => console.log(err));
    }, []);

    const eliminarProducto = (id) => {
        axios
            .delete('http://localhost:8000/dashboard/inventario/' + id)
            .then((res) => {
                location.reload();
            })
            .catch((err) => console.log(err));
        const productosActualizados = productos.filter((producto) => producto.id !== id);
        setProductosFiltrados(productosActualizados);
    };

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
        setOrdenStock(null); // Reiniciar el estado del orden al cambiar de página
    };

    const ordenarTabla = () => {
        if (ordenStock === 'asc') {
            setProductosFiltrados([...productosFiltrados].sort((a, b) => a.stock - b.stock));
            setOrdenStock('desc');
        } else {
            setProductosFiltrados([...productosFiltrados].sort((a, b) => b.stock - a.stock));
            setOrdenStock('asc');
        }
    };

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    const numerosPagina = [];
    for (let i = 1; i <= totalPaginas; i++) {
        numerosPagina.push(i);
    }

    return (
        <div className="font-primary h-screen overflow-auto mt-10 md:mt-5">
            <div className="bg-violet-900 md:rounded-lg shadow-md md:p-2 md:mx-4 flex flex-col">
                <h2 className="text-2xl text-center text-white pt-2 md:pb-2">Inventario</h2>
                <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center border-2 border-purple-500 m-3 md:p-2 md:rounded-md w-full md:w-2/5">
                        <BiSearch size={30} className="text-purple-500" />
                        <input
                            type="text"
                            placeholder="Nombre del producto..."
                            className="search py-2 px-5 ml-2 bg-violet-900 text-white outline-none w-full"
                            onChange={(e) => {
                                setConsulta(e.target.value);
                                const filtrados = productos.filter((producto) =>
                                    producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setProductosFiltrados(filtrados);
                            }}
                        />
                    </div>
                </div>
                <div className="flex-grow overflow-auto">
                    <table className="min-w-full m-2">
                        <thead className="text-purple-500">
                            <tr className="text-xl">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Nombre</th>
                                <th
                                    className="py-2 px-4 cursor-pointer"
                                    onClick={ordenarTabla}
                                >
                                    Stock{' '}
                                    {ordenStock === 'asc' ? (
                                        <CgChevronUp className="inline-block" />
                                    ) : (
                                        <CgChevronDown className="inline-block" />
                                    )}
                                </th>
                                <th className="py-2 px-4">Precio</th>
                                <th className="py-2 px-4">Destacado</th>
                                <th className="py-2 px-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-md text-white">
                            {productosActuales.map((producto, i) => (
                                <tr key={i}>
                                    <td className="py-2 px-4">{producto.id}</td>
                                    <td className="py-2 px-4">{producto.nombre}</td>
                                    <td className="py-2 px-4">{producto.stock}</td>
                                    <td className="py-2 px-4">{producto.precio}</td>
                                    <td className="py-2 px-4">{producto.es_destacado}</td>
                                    <td className="py-2 px-4 space-x-2 flex justify-center gap-2 items-center">
                                        <Link
                                            className="rounded-md p-1 text-white ring-1 ring-transparent hover:ring-purple-500"
                                        >
                                            <BiInfoCircle className="text-xl" />
                                        </Link>
                                        <Link
                                            to={`/dashboard/inventario/actualizar/${producto.id}`}
                                            className="rounded-md p-1 text-white ring-1 ring-transparent hover:ring-purple-500"
                                        >
                                            <BiEdit className="text-xl" />
                                        </Link>
                                        <button
                                            onClick={() => eliminarProducto(producto.id)}
                                            className="rounded-md p-1 text-white ring-1 ring-transparent hover:ring-purple-500 inline-flex"
                                        >
                                            <BiTrash className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPaginas > 1 && (
                    <div className="flex justify-center my-4">
                        {numerosPagina.map((numero) => (
                            <button
                                key={numero}
                                onClick={() => cambiarPagina(numero)}
                                className={`mx-1 px-3 py-1 rounded-md ${paginaActual === numero
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-white text-purple-500'
                                    }`}
                            >
                                {numero}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TablaInventario
