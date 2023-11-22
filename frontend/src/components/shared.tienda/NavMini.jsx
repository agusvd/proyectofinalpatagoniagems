import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiFillFacebook, AiFillInstagram} from 'react-icons/ai'

const NavMini = () => {
    // obtener la info del usuario
    const [auth, setAuth] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [mensaje2, setMensaje2] = useState('')
    const [nombre, setNombre] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const [usuarioId, setUsuarioId] = useState('')

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    setAuth(true);
                    setUsuarioId(res.data.id)
                    setNombre(res.data.nombre);
                    setIsAdmin(res.data.role)
                    setMensaje2('😃');
                } else {
                    setAuth(false);
                    setMensaje(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    // logout usuario
    const handleDelete = () => {
        axios
            .get('http://localhost:8000/logout')
            .then(res => {
                setAuth(false);
                window.location.reload(); // Recarga la página después del logout
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='w-full bg-gray-200 font-primary'>
            <div className='flex flex-col sm:flex sm:flex-row items-center justify-center sm:justify-between w-full p-4 gap-5 sm:gap-0'>
                <div className='flex gap-2 sm:ml-32'>
                    <a href="https://www.instagram.com/patagoniagems/?hl=es" target="_blank">
                        <AiFillInstagram size={30} className="text-[#202020] hover:text-purple-500 duration-300 ease-in-out cursor-pointer" />
                    </a>
                    <a href="https://www.facebook.com/Patagoniagems/" target="_blank">
                        <AiFillFacebook size={30} className='text-[#202020] hover:text-purple-500 duration-300 ease-in-out cursor-pointer' />
                    </a>
                </div>
                <div className='w-full flex items-center '>
                    {
                        auth ?
                            <div className='w-full flex flex-col sm:flex-row justify-center sm:justify-end sm:mr-32 items-center gap-2 sm:gap-10 text-sm'>
                                <p className='nav'>Hola {' ' + nombre + mensaje2}</p>
                                {isAdmin === 'admin' && (
                                    <Link to="/dashboard" className="nav">
                                        Dashboard
                                    </Link>
                                )}
                                <Link to={`/perfil/${usuarioId}`} className="nav">Perfil</Link>
                                <Link className="nav" onClick={handleDelete}>Cerrar sesion</Link>

                            </div>
                            :
                            <div className='w-full flex justify-end mr-32 items-center gap-10 text-sm'>
                                <Link to="/login" className="nav">Iniciar sesion</Link>
                                <Link to="/register" className="nav">Registrarse</Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavMini