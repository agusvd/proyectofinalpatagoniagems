import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios';
import Cart from './Cart';
import Search from './Search';

const NavbarNormal = () => {
    const location = useLocation();

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
            <div className='hidden bg-black w-full sm:flex sm:flex-col justify-center items-center p-4 h-[100px]'>
                <div className='flex items-center justify-around w-full p-1'>
                    <div className='flex items-center justify-center text-center'>
                        <div className='flex justify-center gap-5'>
                            <div className='flex items-center justify-center'>
                                <Link to="/" className={` font-bold text-center text-2xl hover:text-purple-600 ${location.pathname === '/' ? 'text-purple-500' : 'text-white'}`}>PatagoniaGems</Link>
                            </div>
                            <div className="dropdown dropdown-hover text-white text-xl py-2">
                                <Link to='/tienda' className={`nav text-xl py-2 ${location.pathname === '/tienda' ? 'text-purple-500' : 'text-white'}`}>Tienda</Link>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-52">
                                    {categorias.map(categoria => (
                                        <li key={categoria.id}>
                                            <Link to={`/tienda/${categoria.id}`} className='text-white'>
                                                {categoria.categoria}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link to='/tienda'>Todos los productos</Link>
                                    </li>
                                </ul>
                            </div>
                            <Link to='/blogs' className={`text-xl py-2 ${location.pathname === '/blogs' ? 'text-purple-500' : 'text-white'}`}>
                                <h2 className='nav'>Blogs</h2>
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={handleOpenSearchClick}>
                            <AiOutlineSearch size={35} className='text-white hover:scale-110 duration-300' />
                        </button>
                        {searchVisible && (
                            <div id='cerrar' className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99] animate-fade-left animate-duration-300" onClick={handleClose}>
                                <Search onClose={handleCloseSearchClick} />
                            </div>
                        )}
                        <button onClick={handleOpenCarritoClick}>
                            <AiOutlineShopping size={35} className='text-white hover:scale-110 duration-300' />
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