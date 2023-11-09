import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiTrash, BiEdit, BiSearch } from 'react-icons/bi';

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
                console.log('Categorías cargadas:', res.data);
            })
            .catch((error) => {
                console.log('Error al cargar categorías:', error);
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
    };

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : 'Categoría no encontrada';
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
        <div className="font-primary h-screen overflow-auto bg-gray-200">
            <div className="flex flex-col bg-white p-2 border-2 m-4 rounded-xl shadow-2xl">
                {/* header */}
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex items-center justify-center bg-[#202020] text-white p-2 rounded-xl w-full md:w-2/4 m-4">
                        <BiSearch size={20} className="text-white" />
                        <input type="text" placeholder="Nombre del producto..."
                            className="search py-1 px-3 ml-2 bg-[#202020] text-white outline-none w-full"
                            onChange={(e) => {
                                setConsulta(e.target.value);
                                const filtrados = productos.filter((producto) =>
                                    producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setProductosFiltrados(filtrados);
                            }} />
                    </div>
                    <Link to="/dashboard/inventario/agregar" className='hover:bg-white hover:text-black shadow-xl rounded-xl p-2 bg-purple-600 text-white'>
                        Nuevo producto
                    </Link>
                </div>
                {/* fin header */}

                <div className="foverflow-x-auto overflow-y-auto relative">
                    <table className='table-auto w-full  p-2 rounded-xl'>
                        <thead className='text-black'>
                            <tr className='text-left'>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Imagen
                                </th>
                                <th className='text-center'>
                                    Nombre
                                </th>
                                <th>
                                    Categoria
                                </th>
                                <th>
                                    Precio
                                </th>
                                <th>
                                    Stock
                                </th>
                                <th className='text-center'>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        {productosActuales.length > 0 ? (
                            productosActuales.map((producto, i) => (
                                <tbody key={producto.id}>
                                    <tr className='text-black'>
                                        <td>
                                            {producto.id}
                                        </td>
                                        <td className='w-[50px]'>
                                            <img src={producto.imagen} alt={producto.nombre} />
                                        </td>
                                        <td className='text-center'>
                                            {producto.nombre}
                                        </td>
                                        <td>
                                            {getCategoriaNombre(producto.categoria_id)}
                                        </td>
                                        <td>
                                            {producto.precio}
                                        </td>
                                        <td>
                                            {producto.stock}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4 p-2">
                                                <Link to={`/dashboard/inventario/actualizar/${producto.id}`} className="text-[#202020] hover:text-purple-500">
                                                    <BiEdit size={30} />
                                                </Link>
                                                <button onClick={() => eliminarProducto(producto.id)} className="text-[#202020] hover:text-red-700">
                                                    <BiTrash size={30} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <p className='text-white text-xl'>No hay productos disponibles</p>
                        )}

                    </table>
                </div>
                {totalPaginas > 1 && (
                    <div className="flex justify-center my-4">
                        {numerosPagina.map((numero) => (
                            <button key={numero} onClick={() => cambiarPagina(numero)} className={`mx-1 px-3 py-1 rounded-md ${paginaActual === numero ? 'bg-black text-white' : 'bg-white text-black'}`}>
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

