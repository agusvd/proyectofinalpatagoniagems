import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriasP = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = () => {
        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEdit = (id) => {
        setEditingId(id);
        const categoria = categorias.find((categoria) => categoria.id === id);
        if (categoria) {
            setNombre(categoria.categoria);
        }
    };

    const handleUpdate = () => {
        if (nombre.trim() === '') {
            return;
        }
        axios
            .put(`http://localhost:8000/categorias/${editingId}`, { categoria: nombre })
            .then((res) => {
                console.log(res);
                fetchCategorias();
                setEditingId(null);
                setNombre('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/categorias/${id}`)
            .then((res) => {
                console.log(res);
                fetchCategorias();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nombre.trim() === '') {
            return;
        }
        axios
            .post('http://localhost:8000/categorias', { categoria: nombre })
            .then((res) => {
                console.log(res);
                fetchCategorias();
                setNombre('');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="flex-1 h-screen font-primary">
            <div className="md:m-5 m-auto bg-violet-900 md:rounded-md md:p-5 p-20">
                <h2 className="text-3xl text-white mb-4 text-center">Categorías</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center justify-center">
                        <input
                            required
                            className="w-3/5 p-2 mr-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                            type="text"
                            placeholder="Nombre de la categoría"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <button
                            className="py-2 px-4 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-purple-800"
                            type="submit"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
                {categorias.length > 0 ? (
                    <table className="w-full text-xl text-center">
                        <thead className='text-purple-500'>
                            <tr>
                                <th className="py-2 ">Nombre</th>
                                <th className="py-2 ">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td className="py-2 text-white">
                                        {editingId === categoria.id ? (
                                            <input
                                                className="w-full p-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950"
                                                type="text"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                            />
                                        ) : (
                                            categoria.categoria
                                        )}
                                    </td>
                                    <td className="py-2">
                                        {editingId === categoria.id ? (
                                            <>
                                                <button
                                                    className="mr-2 text-white hover:text-purple-600"
                                                    onClick={handleUpdate}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="text-white hover:text-red-600"
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setNombre('');
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="mr-2 text-white hover:text-purple-600"
                                                    onClick={() => handleEdit(categoria.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-white hover:text-red-600"
                                                    onClick={() => handleDelete(categoria.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-white">No hay categorías disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default CategoriasP;
