import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import axios from 'axios';
import Cart from './Cart';
import Search from './Search';

const NavbarNormal = () => {
    const location = useLocation();

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

    console.log(categorias)


    // carrito
    const [productosCarrito, setProductosCarrito] = useState([]);
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
        if (e.target.id === 'cerrar') {
            handleCloseSearchClick();
            handleCloseCarritoClick();
            console.log("click")
        }
    };

    

    return (
        <div className='sticky top-0 z-10 font-primary'>
            <div className='hidden bg-white w-full sm:flex sm:flex-col justify-center items-center h-[80px] border-2'>
                <div className='flex items-center justify-between w-full p-1 pl-5 pr-5 h-full'>
                    <div className='flex items-center justify-center text-center h-full'>
                        <div className='flex items-center justify-center gap-5 h-full'>
                            <div className='flex items-center justify-center py-2'>
                                <Link to="/" className={`text-center text-xl hover:text-gray-500 active:text-purple-600 ${location.pathname === '/' ? 'text-purple-500' : 'text-black'}`}>
                                    Inicio
                                </Link>
                            </div>
                            <button className="dropdown dropdown-hover py-2 h-full">
                                <Link to='/tienda' className={`text-xl hover:text-gray-500 ${location.pathname.startsWith('/tienda') ? 'text-purple-500' : 'text-black'}`}>
                                    Tienda
                                </Link>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                                    {categorias.map(categoria => (
                                        <li key={categoria.id}>
                                            <Link to={`/tienda/${categoria.id}`} className='text-black hover:text-purple-500'>
                                                {categoria.categoria}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to='/tienda'>Todos los productos</Link>
                                    </li>
                                </ul>
                            </button>
                            <Link to='/blogs' className={`text-xl py-2 ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-white'}`}>
                                <h2 className='text-black hover:text-gray-500 duration-300 active:text-purple-600'>Blogs</h2>
                            </Link>
                        </div>
                    </div>
                    <div className='absolute left-1/2 transform -translate-x-1/2'>
                        <Link to='/' className='text-xl text-black'>
                            PatagoniaGems
                        </Link>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleOpenSearchClick}>
                            <AiOutlineSearch size={35} className='text-black active:scale-95 duration-300' />
                        </button>
                        {searchVisible && (
                            <div id='cerrar' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick}>
                            <AiOutlineShopping size={35} className='text-black active:scale-95 duration-300' />
                        </button>
                        {carritoVisible && (
                            <div id='cerrar' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Cart onClose={handleCloseCarritoClick} />
                            </div>
                        )}
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} className="active:scale-95 duration-300">
                                <AiOutlineUser className='text-black' size={35} />
                            </button>
                            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                                {auth ?
                                    <>
                                        <li>
                                            <Link to={`/perfil/${usuarioId}`} className="text-black hover:text-purple-600">Perfil</Link>
                                        </li>
                                        {isAdmin === 'admin' && (
                                            <li>
                                                <Link to="/dashboard" className="text-black hover:text-purple-600">
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <button className='text-black hover:text-purple-600' onClick={handleDelete}>
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link to="/login" className="text-black hover:text-purple-600">Iniciar sesion</Link>
                                        </li>
                                        <li>
                                            <Link to="/register" className="text-black hover:text-purple-600">Registrarse</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarNormal