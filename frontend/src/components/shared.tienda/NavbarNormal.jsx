import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa'
import { AiFillFacebook, AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai'
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
            <div className='hidden bg-gray-200 w-full sm:flex sm:flex-col justify-center items-center p-4 h-[100px]'>
                <div className='flex items-center justify-around w-full p-1'>
                    <div className='flex items-center justify-center'>
                        <Link to="/" className='text-black font-bold text-center text-2xl hover:text-purple-600'>PatagoniaGems</Link>
                    </div>
                    <div className='flex items-center justify-center text-center'>
                        <div className='flex justify-center gap-5'>
                            <div className="dropdown dropdown-hover text-black text-xl py-2">
                                <label tabIndex={0} className="">Tienda</label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    {categorias.map(categoria => (
                                        <li key={categoria.id}>
                                            <Link to={`/tienda/${categoria.id}`}>
                                                {categoria.categoria}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to='/tienda'>Todos los productos</Link>
                                    </li>
                                </ul>
                            </div>
                            <Link to='/blogs' className={`text-black text-xl py-2 ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-black'}`}>
                                <h2 className='nav'>Blogs</h2>
                            </Link>

                            <Link className={`text-black text-xl py-2 ${location.pathname === '/contacto' ? 'text-purple-500' : 'text-black'}`}>
                                <h2 className='nav'>Contacto</h2>
                            </Link>
                            <Link className={`text-black text-xl py-2 ${location.pathname === '/nosotros' ? 'text-purple-500' : 'text-black'}`}>
                                <h2 className='nav'>Nosotros</h2>
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleOpenSearchClick}>
                            <AiOutlineSearch size={35} className='text-[#202020] hover:scale-110 duration-300' />
                        </button>
                        {searchVisible && (
                            <div id='closeOut' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick}>
                            <AiOutlineShopping size={35} className='text-[#202020] hover:scale-110 duration-300' />
                        </button>
                        {carritoVisible && (
                            <div id='closeOut' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Cart onClose={handleCloseCarritoClick} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* navegacion principal */}

            {/* Categorias de la tienda */}
            {showTienda && (
                <div id='tienda' className={`bg-[#202020] text-black flex justify-around items-center w-full transition-all duration-500 gap-1 pt-2 pb-2 text-lg -space-x-32 ${showTienda ? " ease-in-out  animate-fade-down animate-duration-500 animate-delay-100" : "animate-duration-500"}`}>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-black text-2xl text-start  justify-center w-full pb-2'>Categorias</h2>
                        <div className='flex flex-col gap-3'>
                            {categorias.map(categoria => (
                                <div className='' key={categoria.id}>
                                    <Link to={`/tienda/${categoria.id}`}>
                                        <h2 className='text-black hover:text-purple-600 duration-300 ease-in-out transition-all'>
                                            {categoria.categoria}
                                        </h2>
                                    </Link>
                                </div>
                            ))}
                            <div className=' flex flex-col justify-start items-start'>
                                <Link to='/tienda' className='text-black hover:text-purple-600 duration-300 ease-in-out transition-all'>Todos los productos</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default NavbarNormal