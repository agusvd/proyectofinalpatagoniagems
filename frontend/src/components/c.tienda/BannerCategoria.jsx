import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const BannerCategoria = () => {

    // obtener categorias del backend
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        // Obtener las categorías desde el backend
        axios.get('http://localhost:8000/dashboard/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(err => console.error('Error al obtener las categorías:', err));
    }, []);

    return (
        <section className="flex flex-col relative pt-10 pb-10 font-primary justify-center items-center bg-white">
            <div className="text-center py-5 sm:py-10 px-4 mb-4 bg-white">
                <h1 className="text-4xl font-bold text-[#202020]">CATEGORIAS</h1>
            </div>
            <div className='flex justify-center items-center w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-20'>
                    {categorias.map(categoria => (
                        <Link to={`/tienda/${categoria.id}`} className="w-[400px] h-[400px] relative rounded-lg duration-300 ease-in-out group ">
                            <img src={categoria.imagen} className="h-full w-full rounded-lg brightness-90 group-hover:brightness-75 duration-300 ease-in-out" alt={categoria.categoria} />
                            <div className="absolute inset-0 flex flex-col justify-center items-center ">
                                <h2 className='text-center text-white font-bold text-5xl'>
                                    {categoria.categoria}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default BannerCategoria