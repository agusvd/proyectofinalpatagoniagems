import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div className='w-full bg-[#202020]'>
            <div className='flex items-center justify-end w-full p-4'>
                <div className='w-full flex items-center'>
                    {
                        auth ?
                            <div className='w-full flex justify-end mr-32 items-center gap-10 text-sm'>
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