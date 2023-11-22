import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { toast, Toaster } from 'react-hot-toast';
import CardToastEliminarCategoria from '../cards/CardToastEliminarCategoria'
import { Link } from 'react-router-dom';

const CategoriasP = () => {
    const { id } = useParams();
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState('')

    // obtener las categorias
    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios
            .get('http://localhost:8000/dashboard/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // crear categoria
    const handleSubmit = (event) => {
        event.preventDefault();
        const updateData = { categoria, imagen };
        axios
            .post('http://localhost:8000/dashboard/categorias', updateData)
            .then((res) => {
                console.log(res);
                setCategoria('');
                setImagen('');
                // Vuelve a cargar las categorías después de agregar una nueva
                axios.get('http://localhost:8000/dashboard/categorias')
                    .then((res) => {
                        setCategorias(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // eliminar categoria
    const closeWarm = () => {
        toast.close
    }

    const handleDelete = (id) => {
        const categoria = categorias.find((categoria) => categoria.id === id);
        if (categoria) {
            toast.custom(
                <CardToastEliminarCategoria categoria={categoria}
                    onConfirm={() => handleConfirmDelete(id)} visible={toast.visible} />
            );
        }
    };

    const handleConfirmDelete = (id) => {
        axios
            .delete(`http://localhost:8000/dashboard/categorias/${id}`)
            .then((res) => {
                console.log(res);
                toast.success('Categoría eliminada exitosamente.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Vuelve a cargar las categorías después de agregar una nueva
                axios.get('http://localhost:8000/dashboard/categorias')
                    .then((res) => {
                        setCategorias(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
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


    return (
        <div className="flex flex-col h-screen bg-white p-2">
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            {/* Crear categoria */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex items-center justify-center pt-5">
                    <div className='flex flex-col gap-2 p-2 bg-gray-200 rounded-lg items-center shadow-md w-full sm:ml-5 sm:mr-5'>
                        <div className='flex justify-center items-start p-2'>
                            <h2 className='text-2xl'>
                                Crear categoria
                            </h2>
                        </div>
                        <div className='w-full items-center justify-center flex'>
                            <input required className="w-full p-2 text-[#202020] outline-none rounded-md bg-white" type="text" placeholder="Nombre de la categoría"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <input required className="p-2 text-black bg-white rounded-lg w-full outline-purple-500"
                                type="text" placeholder="url" value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                            />
                        </div>
                        <div className='rounded-full bg-purple-600 hover:bg-black duration-300 p-2'>
                            <button className="text-white" type="submit">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {/* Ver categorias */}
            <div className="h-screen w-full overflow-hidden">
                <div className='flex gap-2 sm:ml-5 sm:mr-5'>
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <div key={categoria.id} className=''>
                                <div className='p-2 bg-gray-200 w-[300px] h-[300px] rounded-lg'>
                                    <div className='text-2xl text-center'>
                                        <h2>{categoria.categoria}</h2>
                                    </div>
                                    <div className='w-full h-[200px]'>
                                        <img src={categoria.imagen} className='w-full h-full' />
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <button className='p-2 hover:text-red-500 duration-300 ease-in-out'
                                            onClick={() => handleDelete(categoria.id)}>
                                            <BiTrash size={40} />
                                        </button>
                                        <Link to={`/dashboard/categorias/actualizar/${categoria.id}`} className='p-2 hover:text-purple-600 duration-300'>
                                            <BiEdit size={40} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>
                            No hay categegorias
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriasP;
