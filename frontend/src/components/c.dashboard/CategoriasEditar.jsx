import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoriasEditar = () => {
    const { id } = useParams();
    const [categoria, setCategoria] = useState('')
    const [imagen, setImagen] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios
            .get('http://localhost:8000/dashboard/categorias/' + id)
            .then((res) => {
                setCategoria(res.data[0].categoria)
                setImagen(res.data[0].imagen)
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleUpdate(event) {
        event.preventDefault();
        const updateData = { categoria, imagen }
        axios.put('http://localhost:8000/dashboard/categorias/' + id, updateData)
            .then(res => {
                console.log(res)
                navigate('/dashboard/categorias')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='felx flex-col h-screen bg-white p-2'>
            <form onSubmit={handleUpdate} className="mb-4">
                <div className="flex items-center justify-center pt-5">
                    <div className='flex flex-col gap-2 p-2 bg-gray-200 rounded-lg items-center shadow-md w-full sm:ml-5 sm:mr-5'>
                        <div className='flex justify-center items-start p-2'>
                            <h2 className='text-2xl'>
                                Actualizando {categoria}
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
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CategoriasEditar