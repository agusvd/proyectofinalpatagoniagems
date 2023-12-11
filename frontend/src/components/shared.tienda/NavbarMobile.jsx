import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiOutlineShopping, AiOutlineSearch, AiFillCloseCircle, AiOutlineMenu } from 'react-icons/ai'
import Cart from './Cart';
import Search from './Search';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const NavbarMobile = () => {
    const [auth, setAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false)

    const HandleMenuVisible = () => {
        setMenuVisible(!menuVisible)
    }

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

    // carrito
    const [totalCarrito, setTotalCarrito] = useState(0);
    useEffect(() => {
        if (auth) {
            const token = Cookies.get('token');
            const decodedToken = jwtDecode(token);
            const usuario_id = decodedToken.id;
            axios.get(`http://localhost:8000/carrito?usuario_id=${usuario_id}`)
                .then(res => {
                    const productosCarrito = res.data.reduce((acc, item) => acc + item.cantidad_total, 0);
                    setTotalCarrito(productosCarrito);
                })
                .catch(error => console.error('Error al obtener los productos del carrito:', error));
            console.log('Uusario autentificado')
        } else {
            console.log('Usuario no auntentificado')
        }
    },);

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
        // Obtener las categorías desde el backend
        axios.get('http://localhost:8000/dashboard/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(err => console.error('Error al obtener las categorías:', err));
    }, []);

    const [searchVisible, setSearchVisible] = useState(false)
    const [carritoVisible, setCarritoVisible] = useState(false);

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

    const handleClose = (e) => {
        if (e.target.id === 'closeOut') {
            handleCloseSearchClick();
            handleCloseCarritoClick();
            console.log("click")
        }
    };
    return (
        <div className="sm:hidden bg-black p-4 z-99 font-primary sticky top-0 z-10 w-full h-full">
            {/* Navbar principal */}
            <div className='flex justify-between items-center w-full'>
                <button onClick={handleOpenSearchClick}>
                    <AiOutlineSearch size={35} className="hover:scale-125 ease-in duration-150 cursor-pointer text-white" />
                </button>
                {searchVisible && (
                    <div id='closeOut' onClick={handleClose} className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                        <Search onClose={handleCloseSearchClick} />
                    </div>
                )}
                <button onClick={HandleMenuVisible}>
                    <AiOutlineMenu size={35} className='text-white' />
                </button>
                {menuVisible && (
                    <div id='closeOut' className="absolute top-0 left-0 z-50 h-screen w-full bg-black">
                        <div className='overflow-auto h-full'>
                            {/* Encabezado del menu */}
                            <div className='flex items-center justify-between'>
                                <h2 className='text-white font-semibold pl-4 text-xl'>PatagoniaGems</h2>
                                <button onClick={HandleMenuVisible} className='p-2'>
                                    <AiFillCloseCircle size={40} className="text-white" />
                                </button>
                            </div>
                            {/* contenido del menu */}
                            <div className='flex flex-col w-full h-full'>
                                <ul className='gap-4 flex flex-col'>
                                    <Link to="/" className='pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl' onClick={HandleMenuVisible}>
                                        Inicio <MdOutlineKeyboardArrowRight size={25} />
                                    </Link>
                                    <Link to="/tienda" className='pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl' onClick={HandleMenuVisible}>
                                        Todos los productos <MdOutlineKeyboardArrowRight size={25} />
                                    </Link>
                                    <div className='collapse collapse-arrow pr-1'>
                                        <input type="checkbox" />
                                        <div className="collapse-title text-2xl text-white ">
                                            Categorias
                                        </div>
                                        <div className="collapse-content">
                                            <ul className="flex flex-col gap-4">
                                                {categorias.map(categoria => (
                                                    <li key={categoria.id}>
                                                        <Link to={`/tienda/${categoria.id}`} className="text-white">{categoria.categoria}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <Link to="/blogs" className="pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl" onClick={HandleMenuVisible}>
                                        Blogs <MdOutlineKeyboardArrowRight size={25} />
                                    </Link>
                                    {auth ? (
                                        <div className='flex flex-col justify-center gap-4'>
                                            <Link to="/perfil" className="pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl" onClick={HandleMenuVisible}>
                                                Perfil <MdOutlineKeyboardArrowRight size={25} />
                                            </Link>
                                            {isAdmin === 'admin' && (
                                                <Link to="/dashboard" className="pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl" onClick={HandleMenuVisible}>
                                                    Dashboard <MdOutlineKeyboardArrowRight size={25} />
                                                </Link>
                                            )}
                                            <Link to="/" className="pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl" onClick={handleDelete}>
                                                Cerrar sesión <MdOutlineKeyboardArrowRight size={25} />
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col w-full gap-2'>
                                            <Link to="/login" className='pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl' onClick={HandleMenuVisible}>
                                                Iniciar sesión <MdOutlineKeyboardArrowRight size={25} />
                                            </Link>
                                            <Link to="/register" className='pl-4 text-white flex w-full items-center justify-between pr-4 text-2xl' onClick={HandleMenuVisible}>
                                                Registrarse <MdOutlineKeyboardArrowRight size={25} />
                                            </Link>
                                        </div>
                                    )}
                                </ul>
                                <div className='flex w-full'>
                                    <div className='flex justify-center w-full items-center gap-2 p-2'>
                                        <a className='text-purple-600 font-semibold text-xl'>Instagram</a>
                                        <a className='text-purple-600 font-semibold text-xl'>Facebook</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={handleOpenCarritoClick}>
                    <div className="indicator">
                        <AiOutlineShopping size={40} className='text-white hover:text-purple-500 ease-in-out duration-300' />
                        {auth ?
                            <span className="badge bg-white badge-sm indicator-item text-black">{totalCarrito}</span>
                            :
                            <span className="badge bg-white badge-sm indicator-item text-black">0</span>
                        }

                    </div>
                </button>
                {carritoVisible && (
                    <div id='closeOut' onClick={handleClose} className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                        <Cart onClose={handleCloseCarritoClick} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavbarMobile