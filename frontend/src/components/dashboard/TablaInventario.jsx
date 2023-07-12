import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit, BiSearch, BiInfoCircle } from 'react-icons/bi';

const TablaInventario = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [consulta, setConsulta] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
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

        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
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
        <div className="font-primary h-screen overflow-auto bg-violet-950">
            <div className="md:p-2 md:mx-4 flex flex-col">
                <div className="flex flex-col sm:flex-row items-center justify-center pt-10 sm:pt-0 sm:pl-10 sm:pr-10 sm:justify-between">
                    <Link to="/dashboard/inventario/agregar" className='bg-violet-900 shadow-xl rounded-xl p-2 hover:bg-black text-white'>
                        Nuevo producto
                    </Link>
                    <div className="flex items-center justify-center border-2 border-violet-900 p-2 md:rounded-full w-full md:w-1/4 m-4">
                        <BiSearch size={20} className="text-white" />
                        <input type="text" placeholder="Nombre del producto..."
                            className="search py-1 px-3 ml-2 bg-violet-950 text-white outline-none w-full"
                            onChange={(e) => {
                                setConsulta(e.target.value);
                                const filtrados = productos.filter((producto) =>
                                    producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setProductosFiltrados(filtrados);
                            }} />
                    </div>
                </div>
                <div className="flex-grow overflow-auto bg-violet-900 rounded-md">
                    <table className="min-w-full m-2">
                        <thead className="text-white">
                            <tr className="text-xl uppercase">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Nombre</th>
                                <th className='py-2 px-4'>Categoria</th>
                                <th className="py-2 px-4">stock</th>
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
                                    <td className="py-2 px-4">{getCategoriaNombre(producto.categoria_id)}</td>

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
