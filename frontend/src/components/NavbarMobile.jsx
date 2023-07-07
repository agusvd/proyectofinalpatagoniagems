import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiPlus, BiMinus, BiArrowFromRight } from 'react-icons/bi';


const NavbarMobile = ({ onClose }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [auth, setAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);


    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    setAuth(true);
                    setNombre(res.data.nombre);
                    setApellido(res.data.apellido);
                    setIsAdmin(res.data.role)
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);


    const handleDelete = () => {
        axios
            .get('http://localhost:8000/logout')
            .then(res => {
                setAuth(false);
                window.location.reload(); // Recarga la página después del logout
            })
            .catch(err => console.log(err));
    };

    const handleToggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <div className="bg-gray-200 p-4 left-0 absolute top-0 w-3/5 h-screen z-99 font-primary">
            <div className='flex items-center justify-between'>
                <BiArrowFromRight
                    size={30}
                    className="text-black cursor-pointer"
                    onClick={onClose}
                />
                <h2 className='text-black mr-4 text-xl'>Menu</h2>
            </div>
            <ul>
                <li className="border-t border-black my-4"></li>
                <li>
                    <Link to="/" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-between py-2 px-4 hover:text-purple-500" onClick={handleToggleCategories}>
                        Tienda {showCategories ? <BiMinus /> : <BiPlus />}
                    </a>
                    {showCategories && (
                        <ul className="ml-4">
                            <li>
                                <Link to="/tienda" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                                    Todos los productos
                                </Link>
                            </li>
                            <li>
                                <Link to="/categoria-1" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                                    Categoría 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/categoria-1" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                                    Categoría 2
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link to="/blogs" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                        Blogs
                    </Link>
                </li>
                <li>
                    <Link to="/nosotros" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                        Nosotros
                    </Link>
                </li>
                <li>
                    <Link to="/contacto" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                        Contacto
                    </Link>
                </li>
                {auth ? (
                    <div>
                        <li>
                            <Link to="/perfil" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                                Perfil
                            </Link>
                        </li>
                        {isAdmin === 'admin' && (
                            <li>
                                <Link to="/dashboard" className="block py-2 px-4 hover:text-purple-500" onClick={onClose}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/" className="block py-2 px-4 hover:text-purple-500" onClick={handleDelete}>
                                Cerrar sesión
                            </Link>
                        </li>
                    </div>
                ) : (
                    <div>
                        <li>
                            <Link to="/login" className="block py-2 px-4 hover:text-purple-500">
                                Iniciar sesión
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="block py-2 px-4 hover:text-purple-500">
                                Registrarse
                            </Link>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    )
}


export default NavbarMobile