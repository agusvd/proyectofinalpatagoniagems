import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios';

const BlogPublicados = () => {
    // Verificacion del role del usuario
    const [auth, setAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    setAuth(true);
                    setIsAdmin(res.data.role)
                    setMensaje2('😃');
                } else {
                    setAuth(false);
                    setMensaje(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <div className='font-primary bg-[#1B3F85] h-screen'>
            {/* Header */}
            <div className='w-full bg-gray-200 text-center py-10 sm:py-20 px-8'>
                <div className='text-4xl font-bold text-purple-600 first-letter:uppercase'>
                    <h1>blogs</h1>
                </div>
            </div>
            {/* Buscador de blog y boton para crear blogs */}
            <div className='flex justify-center items-center pt-10'>
                <div className="flex items-center justify-center bg-gray-200 text-[#202020] p-2 rounded-lg w-full md:w-2/4 m-4">
                    <div className='items-center flex justify-center'>
                        <BiSearch size={25} className="text-[#202020] " />
                    </div>
                    <input type="text" placeholder="Buscar blogs..."
                        className="search py-1 px-3 ml-2 text-[#202020] bg-gray-200 outline-none w-full"
                    />
                    {isAdmin === 'admin' && (
                        <button className='bg-gray-200 p-2 border-white hover:border-l-0 h hover:bg-purple-600 duration-300 ease-in-out transition-all hover:text-white hover:rounded-xl rounded-md hover:scale-110'>
                            Nuevo
                        </button>
                    )}
                </div>
            </div>
            {/* Cards de los blogs */}
        </div>
    )
}

export default BlogPublicados