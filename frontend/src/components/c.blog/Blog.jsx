import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify'; //evitar ataques XSS
import { TiEdit } from "react-icons/ti";


const Blog = () => {

    const { id } = useParams()
    const [post, setPost] = useState({})
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const descripcionSanitizada = DOMPurify.sanitize(post.descripcion)


    const navigate = useNavigate();

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


    useEffect(() => {
        axios
            .get(`http://localhost:8000/blog/post/${id}`)
            .then((res) => {      //si la solicitud es exitosa, se ejecuta esta parte del codigo
                console.log(res.data);
                if (res.data.length > 0) {//verifica si hay un elemento en el array de datos recibidos
                    setPost(res.data[0]) //establece el primer elemento del array como el estado 'post'
                }
                ;
            })
            .catch((err) => console.log(err))
    }, [id])

    const editPost = () => {
        navigate(`/editar/post/${id}`)
    }
    return (
        <div className="bg-gray-100 font-sans h-screen">
            <header className="flex bg-white shadow-lg">
                <img alt="Imagen de encabezado" className="w-full h-80 object-cover" />
            </header>
            <div className="container mx-auto my-8 text-black">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className='mb-4'>
                        <div className='flex justify-end'>
                        {isAdmin === 'admin' && (
                            <button onClick={editPost}>
                                <TiEdit size={35} />
                            </button>
                        )}
                        </div>
                        <h1 className='text-3xl font-bold mb-10'>{post.titulo}</h1>
                    </div>
                    <div className=''>
                        <p className="text-gray-700 text-sm mb-4">{post.fechaPublicacion}</p>
                    </div>
                    <div className='mb-8'>
                        <div dangerouslySetInnerHTML={{ __html: descripcionSanitizada }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog