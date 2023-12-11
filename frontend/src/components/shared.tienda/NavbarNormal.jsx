import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import axios from 'axios';
import Cart from './Cart';
import Search from './Search';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import logo1 from '../../assets/logo1.jpg'

const NavbarNormal = () => {
    const location = useLocation();

    // obtener la info del usuario
    const [auth, setAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [usuarioId, setUsuarioId] = useState('')

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    setAuth(true);
                    setUsuarioId(res.data.id)
                    setIsAdmin(res.data.role)
                } else {
                    setAuth(false);
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

    const [carritoVisible, setCarritoVisible] = useState(false);
    const handleOpenCarritoClick = () => {
        setCarritoVisible(true);
    };
    const handleCloseCarritoClick = () => {
        setCarritoVisible(false);
    }

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
            <div className='hidden bg-black w-full sm:flex sm:flex-col justify-center items-center h-[80px]'>
                <div className='flex items-center justify-between w-full pl-5 pr-5 h-full'>
                    <div className='flex items-center justify-center text-center h-full'>
                        <div className='flex items-center justify-center gap-5 h-full'>
                            <div className='flex items-center justify-center py-2'>
                                <Link to="/" className={`text-center text-xl font-semibold hover:text-gray-500 active:text-purple-600 ${location.pathname === '/' ? 'text-purple-500' : 'text-white'}`}>
                                    Inicio
                                </Link>
                            </div>
                            <button className="dropdown dropdown-hover h-full">
                                <Link to='/tienda' className={`text-xl h-full flex items-center font-semibold hover:text-gray-500 ${location.pathname.startsWith('/tienda') ? 'text-purple-500' : 'text-white'}`}>
                                    Tienda
                                </Link>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-black rounded-box w-52">
                                    {categorias.map(categoria => (
                                        <li key={categoria.id}>
                                            <Link to={`/tienda/${categoria.id}`} className='text-white hover:text-purple-500'>
                                                {categoria.categoria}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to='/tienda' className='text-white hover:text-purple-500'>Todos los productos</Link>
                                    </li>
                                </ul>
                            </button>
                            <Link to='/blogs' className={`text-xl font-semibold py-2 ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-white'}`}>
                                <h2 className='text-white hover:text-gray-500 duration-300 active:text-purple-600'>Blogs</h2>
                            </Link>
                        </div>
                    </div>
                    <div className='absolute left-1/2 transform -translate-x-1/2 h-[70px]'>
                        <Link to='/' className='h-full w-full'>
                            <img src={logo1} className='w-full h-full object-contain'/>
                        </Link>
                    </div>
                    <div className='flex h-full items-center gap-4'>
                        <details className="dropdown dropdown-end h-full items-center ">
                            <summary tabIndex={0} className="active:scale-95 ease-in-out duration-300 flex items-center h-full">
                                <AiOutlineUser className='text-white hover:text-purple-500 ease-in-out duration-300' size={40} />
                            </summary>
                            <ul className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-black rounded-box w-52">
                                {auth ?
                                    <>
                                        <li>
                                            <Link to={`/perfil/${usuarioId}`} className="text-white hover:text-purple-500 ease-in-out duration-300">Perfil</Link>
                                        </li>
                                        {isAdmin === 'admin' && (
                                            <li>
                                                <Link to="/dashboard" className="text-white hover:text-purple-500 ease-in-out duration-300">
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <button className='text-white hover:text-purple-500 ease-in-out duration-300' onClick={handleDelete}>
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>
                                            <Link to="/login" className="text-white hover:text-purple-500 ease-in-out duration-300">Iniciar sesion</Link>
                                        </li>
                                        <li>
                                            <Link to="/register" className="text-white hover:text-purple-500 ease-in-out duration-300">Registrarse</Link>
                                        </li>
                                    </>
                                }
                            </ul>
                        </details>
                        <button onClick={handleOpenSearchClick} className='h-full'>
                            <AiOutlineSearch size={40} className='text-white hover:text-purple-500 ease-in-out duration-300' />
                        </button>
                        {searchVisible && (
                            <div id='cerrar' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick} className='h-full'>
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
                            <div id='cerrar' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Cart onClose={handleCloseCarritoClick} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarNormal