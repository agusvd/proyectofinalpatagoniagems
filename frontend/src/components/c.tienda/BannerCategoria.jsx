import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import imagen2 from '../../assets/imagen2.jpeg';
import aromas from '../../assets/aromas.jpg';

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
            <div className='flex w-full gap-2 justify-center items-center'>
                {categorias.map(categoria => (
                    <div className="w-[600px] h-[600px] relative rounded-lg duration-300 ease-in-out  brightness-75 hover:brightness-105">
                        <img src={categoria.imagen} className="h-full w-full rounded-lg " alt="Imagen 1" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                            <p className='justify text-center text-white text-4xl'>
                                {categoria.categoria}
                            </p>
                            <Link to={`/tienda/${categoria.id}`}><h2 className='text-white  text-2xl hover:text-purple-600 duration-300 ease-in-out transition-all'>
                                Ver mas</h2>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default BannerCategoria