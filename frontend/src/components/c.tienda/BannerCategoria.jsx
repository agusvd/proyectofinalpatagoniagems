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
        <section className="flex w-full relative pt-10 pb-10">
            <div className='flex w-full gap-2 justify-center items-center '>
                {categorias.map(categoria => (
                    <Link to={`/tienda/${categoria.id}`} className="w-[600px] h-[600px] relative rounded-lg duration-300 ease-in-out group">
                        <img src={categoria.imagen} className="h-full w-full rounded-lg brightness-90 group-hover:brightness-75" alt={categoria.categoria} />
                        <div className="absolute inset-0 flex flex-col justify-center items-center ">
                            <h2 className='text-center text-white font-bold text-5xl'>
                                {categoria.categoria}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default BannerCategoria