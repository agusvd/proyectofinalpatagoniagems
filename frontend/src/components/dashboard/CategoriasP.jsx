import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriasP = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNombre, setEditingNombre] = useState('');

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
            setEditingNombre(categoria.categoria);
        }
    };

    const handleUpdate = () => {
        if (editingNombre.trim() === '') {
            return;
        }
        axios
            .put(`http://localhost:8000/categorias/${editingId}`, { categoria: editingNombre })
            .then((res) => {
                console.log(res);
                fetchCategorias();
                setEditingId(null);
                setEditingNombre('');
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
        <div className="flex flex-col h-screen font-primary bg-violet-950">
            <div className="md:m-5 m-auto bg-violet-800 md:rounded-md md:p-5 p-20">
                <h2 className="text-3xl text-white mb-4 text-center">Categorías</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center justify-center">
                        <input required className="w-3/5 p-2 mr-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950" type="text" placeholder="Nombre de la categoría" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        <button className="py-2 px-4 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-purple-800" type="submit">
                            Agregar
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-3 gap-4">
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <div key={categoria.id} className="bg-gray-950 text-white rounded-md p-4 flex flex-col justify-between">
                                {editingId === categoria.id ? (
                                    <input className="w-full p-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950" type="text" value={editingNombre} onChange={(e) => setEditingNombre(e.target.value)} />
                                ) : (
                                    <p className="text-xl">{categoria.categoria}</p>
                                )}
                                <div className="flex justify-end mt-4">
                                    {editingId === categoria.id ? (
                                        <>
                                            <button className="mr-2 text-white hover:text-purple-600" onClick={handleUpdate}>
                                                Guardar
                                            </button>
                                            <button className="text-white hover:text-red-600"
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditingNombre('');
                                                }}>
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="mr-2 text-white hover:text-purple-600" onClick={() => handleEdit(categoria.id)}>
                                                Editar
                                            </button>
                                            <button className="text-white hover:text-red-600" onClick={() => handleDelete(categoria.id)}>
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No hay categorías disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriasP;
