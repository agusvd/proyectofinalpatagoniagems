import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSearch, BiCart, } from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import axios from 'axios';
import Cart from './Cart';
import Search from './Search';

const NavbarNormal = () => {
    const location = useLocation();

    // funcionalidad para mostrar tienda (categorias)
    const [showTienda, setShowTienda] = useState(false)

    const handleShowTienda = () => {
        setShowTienda(!showTienda)
    }

    // obtener la info del usuario
    const [auth, setAuth] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [mensaje2, setMensaje2] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
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
                    setApellido(res.data.apellido);
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

    // obtener categorias del backend
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        // Obtener las categorías desde el backend
        axios.get('http://localhost:8000/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(err => console.error('Error al obtener las categorías:', err));
    }, []);

    // carrito
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

    const [productosCarrito, setProductosCarrito] = useState([]);
    const [carritoVisible, setCarritoVisible] = useState(false);

    const handleOpenCarritoClick = () => {
        setCarritoVisible(true);
    };

    const handleCloseCarritoClick = () => {
        setCarritoVisible(false);
    };

    // search productos
    
    const [searchVisible, setSearchVisible] = useState(false)

    const handleOpenSearchClick = () => {
        setSearchVisible(true)
    }
    const handleCloseSearchClick = () => {
        setSearchVisible(false)
    }

    // cerrar el carrito y el search
    const handleClose = (e) => {
        if (e.target.id === 'closeOut') {
            handleCloseSearchClick();
            handleCloseCarritoClick();
            console.log("click")
        }
    };

    return (
        <div className='sticky top-0 z-10 font-primary'>
            <div className='hidden bg-[#202020] w-full sm:flex sm:flex-col justify-center items-center p-4'>
                {/* Botones */}
                <div className='flex items-center justify-end w-full'>
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
                <div className='flex items-center justify-around w-full p-5'>
                    <div className='flex gap-2'>
                        <a href="https://www.instagram.com/patagoniagems/?hl=es" target="_blank">
                            <FaInstagram size={30} className="text-white hover:text-purple-500 duration-300 ease-in-out cursor-pointer" />
                        </a>
                        <a href="https://www.facebook.com/Patagoniagems/" target="_blank">
                            <AiFillFacebook size={30} className='text-white hover:text-purple-500 duration-300 ease-in-out cursor-pointer' />
                        </a>
                    </div>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-white text-center text-2xl'>Patagoniagems</h2>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleOpenSearchClick}>
                            <BiSearch size={35} className='text-white hover:scale-110 duration-300' />
                        </button>
                        {searchVisible && (
                            <div id='closeOut' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick}>
                            <BiCart size={35} className='text-white hover:scale-110 duration-300' />
                        </button>
                        {carritoVisible && (
                            <div id='closeOut' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Cart onClose={handleCloseCarritoClick} />
                            </div>
                        )}
                    </div>
                </div>
                {/* navegacion principal */}
                <div className='flex items-center justify-center text-center w-full'>
                    <div className='flex justify-around -space-x-44 w-full'>
                        <Link to='/' className={`text-white text-xl py-2 ${location.pathname === '/' ? 'text-purple-500' : 'text-white'}`}>
                            <h2 className='nav'>Inicio</h2>
                        </Link>
                        <button className='text-white text-xl py-2' onClick={handleShowTienda}>
                            <h2 className='nav'>Tienda</h2>
                        </button>
                        <Link className={`text-white text-xl py-2 ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-white'}`}>
                            <h2 className='nav'>Blogs</h2>
                        </Link>
                        <Link className={`text-white text-xl py-2 ${location.pathname === '/contacto' ? 'text-purple-500' : 'text-white'}`}>
                            <h2 className='nav'>Contacto</h2>
                        </Link>
                        <Link className={`text-white text-xl py-2 ${location.pathname === '/nosotros' ? 'text-purple-500' : 'text-white'}`}>
                            <h2 className='nav'>Nosotros</h2>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Categorias de la tienda */}
            {showTienda && (
                <div id='tienda' className={`bg-[#202020] flex justify-around items-center w-full transition-all duration-500 gap-1 pt-2 pb-2 text-lg -space-x-32 ${showTienda ? " ease-in-out  animate-fade-down animate-duration-500 animate-delay-100" : "animate-duration-500"}`}>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className=' text-white text-start text-xl justify-center w-full'>Categorias</h2>
                        <div className='flex flex-col'>
                            {categorias.map(categoria => (
                                <div className='p-2 flex flex-col justify-start items-start' key={categoria.id}>
                                    <Link to={`/tienda/${categoria.id}`}><h2 className='nav'>{categoria.categoria}</h2></Link>
                                </div>
                            ))}
                            <div className='p-2 flex flex-col justify-start items-start'>
                                <Link to='/tienda' className='nav'>Todos los productos</Link>
                            </div>
                        </div>
                    </div>
                    <div className='bg-black rounded-lg p-2 w-[300px] h-[250px]'>
                        <img src='https://picsum.photos/200/300' className='w-full h-[200px]' />
                        <h2 className='text-white'>Card blog</h2>
                    </div>
                </div>
            )}
        </div>


    )
}

export default NavbarNormal