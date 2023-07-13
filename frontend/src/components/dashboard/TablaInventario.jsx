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
                console.log(categorias)
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
                <div className="flex-grow overflow-auto rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
                        {productosActuales.map((producto, i) => (
                            <div key={i} className="bg-violet-800 text-white rounded-md p-4 justify-between flex">
                                <div className='flex flex-col border-2 rounded-xl w-full'>
                                    <div className='flex justify-between'>
                                        <div className='text-white text-xl font-bold bortder-t-0 flex justify-start gap-2 p-2'>
                                            <a className='text-white'>ID: </a>
                                            {producto.id}
                                        </div>
                                        <div className="flex items-center justify-center gap-4 p-2">
                                            <Link to={`/dashboard/inventario/actualizar/${producto.id}`} className="text-white hover:text-green-700">
                                                <BiEdit size={30} />
                                            </Link>
                                            <button onClick={() => eliminarProducto(producto.id)} className="text-white hover:text-red-700">
                                                <BiTrash size={30} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex border-t-2'>
                                        <div className='flex w-55 w-44 p-2'>
                                            <img src={producto.imagen} alt="Producto" className="h-56 w-full object-contain rounded-xl" />
                                        </div>
                                        <div className='flex flex-col p-2 items-start justify-center'>
                                            <div>Nombre: {producto.nombre}</div>
                                            <div>Categoría: {getCategoriaNombre(producto.categoria_id)}</div>
                                            <div>Precio: ${producto.precio} CLP</div>
                                            <div>Stock: {producto.stock}</div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                {totalPaginas > 1 && (
                    <div className="flex justify-center my-4">
                        {numerosPagina.map((numero) => (
                            <button key={numero} onClick={() => cambiarPagina(numero)} className={`mx-1 px-3 py-1 rounded-md ${paginaActual === numero ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}>
                                {numero}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TablaInventario;

