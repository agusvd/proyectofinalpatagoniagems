import React, { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { RiCloseFill } from 'react-icons/ri'
import axios from 'axios'

const MobileMenu = () => {
    const location = useLocation();
    // obtener el nombre
    const [nombre, setNombre] = useState('')
    const [role, setRole] = useState('')
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000')
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    setNombre(res.data.nombre);
                    setRole(res.data.role)
                } else {
                    setMensaje(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    //logout
    axios.defaults.withCredentials = true;
    const handleLogout = () => {
        axios.get('http://localhost:8000/logout')
            .then(res => {
                location.reload(true);
            })
            .catch(err => console.log(err));
    };

    // Navbar mobile (responsive)
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
        console.log("Apretaste el menu");
    };

    return (
        <div className='sm:hidden flex justify-center items-center p-2 bg-[#202020] text-white'>
            <button onClick={handleNav} className='flex gap-2 items-center justify-center bg-white p-2 rounded-xl w-1/3'>
                <AiOutlineMenu size={24} className="z-[99] md:hidden text-black cursor-pointer" />
                <h2 className='text-black text-xl'>Menu</h2>
            </button>
            {nav ? (
                <div className='fixed top-0 w-screen h-screen bg-[#202020] flex flex-col text-2xl items-center justify-center z-[99] text-white'>
                    <div>
                        <button className='p-2 text-white fixed top-0 left-0 hover:scale-110 hover:text-red-500' onClick={handleNav}>
                            <RiCloseFill size={50} />
                        </button>
                    </div>
                    <div className='text-4xl flex flex-col justify-start items-center w-full'>
                        <Link to="/dashboard" onClick={handleNav} className='p-2 text-white border-b'>Inicio</Link>
                        <Link to="/dashboard/inventario" onClick={handleNav} className='p-2 text-white border-b'>Inventario</Link>
                        <Link to="/dashboard/inventario/agregar" onClick={handleNav} className='p-2 text-white border-b'>Agregar productos</Link>
                        <Link to="/dashboard/categorias" onClick={handleNav} className='p-2 text-white border-b'>Categorias</Link>
                        <Link to="/dashboard/clientes" onClick={handleNav} className='p-2 text-white border-b'>Clientes</Link>
                        <Link to="/" onClick={handleNav} className='p-2 text-white border-b'>Volver a la tienda</Link>
                        <Link to="/" onClick={() => { handleNav(); handleLogout(); }} className='p-2 text-white border-b'>Cerrar sesion</Link>
                    </div>

                </div>
            )
                : (
                    ''
                )}
        </div>

    )
}

export default MobileMenu