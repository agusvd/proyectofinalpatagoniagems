import React, { useState, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios';
import CardBlogMini from '../cards.blog/CardBlogMini';
import { Link } from 'react-router-dom';

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

                } else {
                    setAuth(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const [posts, setPosts] = useState([]);

    //OBTENER TODOS LOS POST DE LA BASE DE DATOS
    useEffect(() => {
        axios
            .get('http://localhost:8000/blogs')
            .then((res) => {
                if (res.data.length === 0) {
                    setPosts([]);
                } else {
                    setPosts(res.data);
                    console.log(res.data);
                }
            })
            .catch((error) => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <div className='font-primary bg-white overflow-hidden w-full'>
            {/* Header */}
            <div className=' text-center py-10 px-8'>
                <div className='text-4xl font-bold text-[#202020] first-letter:uppercase'>
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
                        <Link to='/blog/nuevo' className='bg-gray-200 p-2 border-white hover:border-l-0 h hover:bg-purple-600 duration-300 ease-in-out transition-all hover:text-white hover:rounded-xl rounded-md hover:scale-110'>
                            Nuevo
                        </Link>
                    )}
                </div>
            </div>
            {/* Cards de los blogs */}
            <div className='flex justify-center items-center pb-10 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center p-2'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <CardBlogMini key={post.id} post={post} />
                        ))
                    ) : (
                        <div className='flex items-center justify-center col-span-3 h-screen'>
                            <h2 className='text-black text-center text-4xl'>No hay blogs disponibles</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogPublicados
