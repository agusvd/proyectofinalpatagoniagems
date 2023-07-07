import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [es_destacado, setEs_destacado] = useState(''); // o useState(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios.get('http://localhost:8000/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/dashboard/search/' + id)
            .then(res => {
                setNombre(res.data[0].nombre);
                setDescripcion(res.data[0].descripcion);
                setPrecio(res.data[0].precio);
                setStock(res.data[0].stock);
                setCategoria_id(res.data[0].categoria_id);
                setEs_destacado(res.data[0].es_destacado)
            })
            .catch(error => {
                console.log(error);
                // Manejar el error aquí
            });
    }, []);
    function handleUpdate(event) {
        event.preventDefault();
        const updatedData = { nombre, descripcion, precio, stock, categoria_id, es_destacado };
        axios.put('http://localhost:8000/dashboard/actualizar/' + id, updatedData)
            .then(res => {
                console.log(res);
                navigate('/dashboard/inventario');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="flex-1 h-screen font-primary md:mt-5">
            <div className="md:m-10 m-auto bg-violet-900 md:rounded-md p-5 mt-10 md:mt-0">
            <h2 className="text-center text-3xl text-white pb-4">Actualizando producto</h2>
                <form className='grid grid-cols-2 gap-4' onSubmit={handleUpdate}>
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
                    <div className='col-span-2'>
                        <button className="w-full py-2 mb-2 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-purple-800" type="submit">Actualizar</button>
                    </div>
                </form>
                <div className='text-center'>
                    <Link to="/dashboard/inventario" className='text-sm text-purple-600'>Volver</Link>
                </div>
            </div>
        </div>
    );
}

export default Update