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
                                <ul className='text-xl ml-10 flex flex-col gap-10 justify-center h-full'>
                                    <Link to="/" className='text-white' onClick={HandleMenuVisible}>
                                        Inicio
                                    </Link>
                                    <Link to="/tienda" className='text-white' onClick={HandleMenuVisible}>
                                        Todos los productos
                                    </Link>
                                    <div className='flex items-center justify-between text-white' onClick={handleToggleCategories}>
                                        Categorias {showCategories ? <BiMinus /> : <BiPlus />}
                                    </div>
                                    {showCategories && (
                                        <ul className=" flex flex-col gap-10 pt-10">
                                            {categorias.map(categoria => (
                                                <li className='' key={categoria.id}>
                                                    <Link to={`/tienda/${categoria.id}`} className="nav">{categoria.categoria}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <Link to="/blogs" className="text-white" onClick={HandleMenuVisible}>
                                        Blogs
                                    </Link>
                                    <Link to="/nosotros" className="text-white" onClick={HandleMenuVisible}>
                                        Nosotros
                                    </Link>
                                    <Link to="/contacto" className="text-white" onClick={HandleMenuVisible}>
                                        Contacto
                                    </Link>
                                    {auth ? (
                                        <div className='text-white flex flex-col justify-center gap-10'>
                                            <Link to="/perfil" className="" onClick={HandleMenuVisible}>
                                                Perfil
                                            </Link>
                                            {isAdmin === 'admin' && (
                                                <Link to="/dashboard" className="text-whit" onClick={HandleMenuVisible}>
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link to="/" className="text-white" onClick={handleDelete}>
                                                Cerrar sesión
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>

                                            <Link to="/login" className='text-white' onClick={HandleMenuVisible}>
                                                Iniciar sesión
                                            </Link>

                                            <Link to="/register" className='text-white' onClick={HandleMenuVisible}>
                                                Registrarse
                                            </Link>
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