import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { toast, Toaster } from 'react-hot-toast';
import CardToastEliminarCategoria from '../cards/CardToastEliminarCategoria'

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

    const closeWarm = () => {
        toast.close
    }
    const handleDelete = (id) => {
        const categoria = categorias.find((categoria) => categoria.id === id);
        if (categoria) {
            toast.custom(
                <CardToastEliminarCategoria  categoria={categoria} onConfirm={() => handleConfirmDelete(id)} visible={toast.visible} />
            );
        }
    };

    const handleConfirmDelete = (id) => {
        axios
            .delete(`http://localhost:8000/categorias/${id}`)
            .then((res) => {
                console.log(res);
                fetchCategorias();
                toast.success('Categoría eliminada exitosamente.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ocurrió un error al eliminar la categoría.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
        <div className="flex flex-col h-screen font-primary bg-white">
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            <h2 className="text-5xl text-black mb-4 text-center pt-10 pb-10">Categorías</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex items-center justify-center">
                    <div className='flex p-2 bg-[#202020] w-2/3 rounded-full items-center shadow-2xl'>
                        <div className='rounded-l-full text-white'>
                            <BiPlus size={30} />
                        </div>
                        <input required className="w-full p-2 mr-2 text-white outline-none rounded-md bg-[#202020]" type="text" placeholder="Nombre de la categoría" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <div className='rounded-full bg-purple-500 hover:bg-purple-700 duration-300 p-2'>
                            <button className="text-white" type="submit">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex flex-col gap-4 p-2 overflow-auto justify-center items-center">
                {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <div key={categoria.id} className="bg-[#202020] text-white rounded-md p-4 flex flex-col items-center w-1/2">
                            {editingId === categoria.id ? (
                                <input className="w-full p-2 text-white border-b-2 outline-none rounded-md border-2 bg-gray-950" type="text" value={editingNombre} onChange={(e) => setEditingNombre(e.target.value)} />
                            ) : (
                                <p className="text-3xl">{categoria.categoria}</p>
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
                                        <button className="mr-2 text-white hover:text-purple-500" onClick={() => handleEdit(categoria.id)}>
                                            <BiEdit size={30} />
                                        </button>
                                        <button className="text-white hover:text-red-600" onClick={() => handleDelete(categoria.id)}>
                                            <BiTrash size={30} />
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
    );
};

export default CategoriasP;
