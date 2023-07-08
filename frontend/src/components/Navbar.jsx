import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiChevronDown, BiUserCircle, BiSearch, BiMenu } from 'react-icons/bi';
import { BsCart3 } from "react-icons/bs";

import axios from 'axios';
import Icono from '../assets/crystal.png'
import Cart from './Cart';
import Search from './Search';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false)
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const location = useLocation();


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


    useEffect(() => {
        // Obtener los datos del carrito desde el backend
        axios.get('http://localhost:8000/carrito')
            .then((res) => {
                setProductosCarrito(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        // Obtener las categorías desde el backend
        axios.get('http://localhost:8000/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(err => console.error('Error al obtener las categorías:', err));
    }, []);

    const handleOpenNavbarClick = () => {
        setMobileMenuVisible(true)
    }

    const handleCloseNavbarClick = () => {
        setMobileMenuVisible(false)
    }

    const handleOpenSearchClick = () => {
        setSearchVisible(true)
    }

    const handleCloseSearchClick = () => {
        setSearchVisible(false)
    }

    const handleOpenCarritoClick = () => {
        setCarritoVisible(true);
    };

    const handleCloseCarritoClick = () => {
        setCarritoVisible(false);
    };


    return (
        <div>
            <nav className="antialiased">
                <div className="font-primary text-center py-3 px-2 md:justify-around md:flex md:items-center bg-black text-white">
                    <div className="hidden md:inline-flex md:justify-between md:items-center ">{/* Ocultar en pantallas más pequeñas */}
                        <div className="flex gap-2 text-lg">
                            <Link to="/" className={`hover:text-purple-500 cursor-pointer ${location.pathname === '/' ? 'text-purple-500' : 'text-white'}`}>Inicio</Link>
                        </div>
                        <div className="group relative items-center text-center text-lg">
                            <button className="py-2 px-4 rounded inline-flex items-center">
                                <Link to="/tienda" className={`hover:text-purple-500 mr-1 cursor-pointer ${location.pathname === '/tienda' ? 'text-purple-500' : 'text-white'}`}>Tienda</Link>
                                <BiChevronDown />
                            </button>
                            <ul className="fixed hidden text-black group-hover:block  shadow-xl z-[99] rounded-lg">
                                <p className='mt-3'></p>
                                {categorias.map(categoria => (
                                    <li className='bg-white' key={categoria.id}>
                                        <Link to={`/tienda/${categoria.id}`} className="rounded-t rounded-b bg-white hover:text-purple-500 p-2 mx-10 text-start block whitespace-no-wrap cursor-pointer">{categoria.categoria}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2 text-lg">
                            <Link to="/blogs" className={`hover:text-purple-500 cursor-pointer ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-white'}`}>Blogs</Link>
                            <Link to="/nosotros" className={`hover:text-purple-500 cursor-pointer ${location.pathname === '/nosotros' ? 'text-purple-500' : 'text-white'}`}>Nosotros</Link>
                            <Link to="/contacto" className={`hover:text-purple-500 cursor-pointer ${location.pathname === '/contacto' ? 'text-purple-500' : 'text-white'}`}>Contacto</Link>
                        </div>
                    </div>
                    <div className="hidden md:inline-flex relative gap-4 text-center items-center">{/* Ocultar en pantallas más pequeñas */}
                        <div className="group relative items-center text-center text-lg">
                            <button className="inline-flex items-center hover:text-purple-500">
                                <p className='text-purple-500'>{message}</p>
                                <p className='text-purple-500'>{nombre + ' ' + apellido}</p><BiUserCircle size={30} className='ml-4 hover:scale-125 ease-in duration-150 cursor-pointer' />
                            </button>
                            <div className="rounded absolute hidden text-black pt-1 group-hover:block whitespace-no-wrap shadow-lg text-center right-0 w-48 origin-top-right z-[99]">
                                {
                                    auth ?
                                        <div>
                                            <Link className="mt-3 bg-white rounded-t hover:text-purple-500 py-2 px-4 block whitespace-no-wrap" onClick={handleDelete}>Cerrar sesion</Link>
                                            <Link to="/perfil" className="bg-white rounded-b hover:text-purple-500 py-2 px-4 block whitespace-no-wrap">Perfil</Link>
                                            {isAdmin === 'admin' && (
                                                <Link to="/dashboard" className="bg-white rounded-b hover:text-purple-500 py-2 px-4 block whitespace-no-wrap">
                                                    Dashboard
                                                </Link>
                                            )}
                                        </div>
                                        :
                                        <div>
                                            <Link to="/login" className="mt-4 bg-white hover:text-purple-500 py-2 px-4 block whitespace-no-wrap">Iniciar sesion</Link>
                                            <Link to="/register" className="bg-white hover:text-purple-500 py-2 px-4 block whitespace-no-wrap">Registrarse</Link>
                                        </div>
                                }
                            </div>
                        </div>
                        <button onClick={handleOpenSearchClick}>
                            <BiSearch size={30} className='hover:scale-125 ease-in duration-150 cursor-pointer' />
                        </button>
                        {searchVisible && (
                            <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick}>
                            <BsCart3 size={30} className="hover:scale-125 ease-in duration-150 cursor-pointer ml-auto"
                            />
                        </button>
                        {carritoVisible && (
                            <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                                <Cart onClose={handleCloseCarritoClick} />
                            </div>
                        )}

                    </div>
                    <div className="md:hidden flex justify-between items-center pr-4">
                        {/* Botón de menú para dispositivos móviles */}
                        <button className='' onClick={handleOpenNavbarClick}>
                            <BiMenu size={30} className="flex-sh" />
                        </button>
                        <div className="">
                            <img src={Icono} className="h-10 mx-auto" />
                        </div>
                        <div className="">
                            <button onClick={handleOpenSearchClick}>
                                <BiSearch fontSize={30} className="hover:scale-125 ease-in duration-150 cursor-pointer" />
                            </button>
                            {searchVisible && (
                                <div className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                                    <Search onClose={handleCloseSearchClick} />
                                </div>
                            )}
                            <button onClick={handleOpenCarritoClick} className=''>
                                <BsCart3 size={30} className="hover:scale-125 ease-in duration-150 cursor-pointer" />
                            </button>
                            {carritoVisible && (
                                <div className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                                    <Cart onClose={handleCloseCarritoClick} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Contenido del menú para dispositivos móviles */}
                {mobileMenuVisible && (
                    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                        <NavbarMobile onClose={handleCloseNavbarClick} />
                    </div>
                )}


            </nav>
        </div>
    );
};

export default Navbar;