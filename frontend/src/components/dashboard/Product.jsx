import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [es_destacado, setEs_destacado] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8000/dashboard/inventario/agregar', {
                nombre,
                descripcion,
                precio,
                stock,
                categoria_id,
                es_destacado,
            })
            .then((res) => {
                console.log(res);
                navigate('/dashboard/inventario');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex-1 h-screen font-primary md:mt-10">
            <div className="md:m-10 m-auto bg-violet-900 md:rounded-md p-2 mt-10 md:mt-0">
            <h2 className="text-center text-3xl text-white pb-4">Nuevo Producto</h2>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div className="col-span-2">
                        <table className="w-full">
                            <tbody className='text-xl'>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">Nombre producto</label>
                                    </td>
                                    <td>
                                        <input
                                            required
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            type="text"
                                            placeholder="Nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">Descripción</label>
                                    </td>
                                    <td>
                                        <textarea
                                            required
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            type="text"
                                            placeholder="Descripción"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">Precio</label>
                                    </td>
                                    <td>
                                        <input
                                            required
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            type="number"
                                            placeholder="Precio"
                                            value={precio}
                                            onChange={(e) => setPrecio(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">Stock</label>
                                    </td>
                                    <td>
                                        <input
                                            required
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            type="number"
                                            placeholder="Stock"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">Categoría</label>
                                    </td>
                                    <td>
                                        <select
                                            required
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            value={categoria_id}
                                            onChange={(e) => setCategoria_id(e.target.value)}
                                        >
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.categoria}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">
                                        <label className="block mb-2 text-white">¿Es destacado?</label>
                                    </td>
                                    <td>
                                        <select
                                            className="w-full p-2 mb-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                            value={es_destacado}
                                            onChange={(e) => setEs_destacado(e.target.value)}
                                        >
                                            <option value="">Seleccione una opción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-2">
                        <button className="w-full py-2 mb-2 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-purple-800" type="submit">
                            Guardar
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/dashboard/inventario" className="text-md text-white">
                        Ver productos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
