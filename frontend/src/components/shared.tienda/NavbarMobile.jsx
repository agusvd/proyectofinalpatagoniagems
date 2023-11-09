import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiPlus, BiMinus, BiArrowFromRight, BiCart, BiMenu, BiSearch } from 'react-icons/bi';
import Cart from './Cart';
import Search from './Search';

const NavbarMobile = ({ onClose }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [auth, setAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
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

    useEffect(() => {
        // Obtener las categorías desde el backend
        axios.get('http://localhost:8000/categorias')
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
        <div className="sm:hidden bg-[#202020] p-4 z-99 font-primary sticky top-0 z-10">
            {/* Navbar principal */}
            <div className='flex justify-between items-center w-full'>
                <button onClick={handleOpenSearchClick}>
                    <BiSearch size={30} className="hover:scale-125 ease-in duration-150 cursor-pointer text-white" />
                </button>
                {searchVisible && (
                    <div id='closeOut' onClick={handleClose} className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-[99]">
                        <Search onClose={handleCloseSearchClick} />
                    </div>
                )}
                <button onClick={HandleMenuVisible}>
                    <BiMenu size={30} className='text-white' />
                </button>
                {menuVisible && (
                    <div id='closeOut' className="fixed top-0 right-0 h-screen bg-black bg-opacity-50 flex justify-center items-center z-[90] w-full">
                        <div className='bg-[#202020] w-full h-full z-[99] overflow-auto'>
                            <div className='flex items-center justify-between'>
                                <button onClick={HandleMenuVisible} className='p-2'>
                                    <BiArrowFromRight size={40} className="text-white" />
                                </button>
                                <h2 className='text-white mr-4 text-xl'>Menu</h2>
                            </div>
                            <div className='flex flex-col justify-around items-center h-full'>
                                <ul className='nav ml-10 flex flex-col gap-10 justify-center text-xl h-full'>
                                    <li>
                                        <Link to="/" onClick={HandleMenuVisible}>
                                            Inicio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/tienda" onClick={HandleMenuVisible}>
                                            Todos los productos
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#" className='flex items-center justify-between' onClick={handleToggleCategories}>
                                            Categorias {showCategories ? <BiMinus /> : <BiPlus />}
                                        </a>
                                        {showCategories && (
                                            <ul className=" flex flex-col gap-10 pt-10">
                                                {categorias.map(categoria => (
                                                    <li className='' key={categoria.id}>
                                                        <Link to={`/tienda/${categoria.id}`} className="nav">{categoria.categoria}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <Link to="/blogs" className="" onClick={HandleMenuVisible}>
                                            Blogs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/nosotros" className="" onClick={HandleMenuVisible}>
                                            Nosotros
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contacto" className="" onClick={HandleMenuVisible}>
                                            Contacto
                                        </Link>
                                    </li>
                                    {auth ? (
                                        <div className='nav flex flex-col justify-center gap-10'>
                                            <li>
                                                <Link to="/perfil" className="" onClick={HandleMenuVisible}>
                                                    Perfil
                                                </Link>
                                            </li>
                                            {isAdmin === 'admin' && (
                                                <li>
                                                    <Link to="/dashboard" className="" onClick={HandleMenuVisible}>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link to="/" className="" onClick={handleDelete}>
                                                    Cerrar sesión
                                                </Link>
                                            </li>
                                        </div>
                                    ) : (
                                        <div>
                                            <li>
                                                <Link to="/login" onClick={HandleMenuVisible}>
                                                    Iniciar sesión
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/register" onClick={HandleMenuVisible}>
                                                    Registrarse
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </div>
                )}
                <button onClick={handleOpenCarritoClick}>
                    <BiCart size={30} className="hover:scale-125 ease-in duration-150 cursor-pointer text-white" />
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