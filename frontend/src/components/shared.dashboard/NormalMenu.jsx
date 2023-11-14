import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoPeopleSharp } from 'react-icons/io5'
import { HiOutlineLogout, HiOutlineViewGridAdd, HiOutlineViewGrid } from 'react-icons/hi';
import { BiBarChart,BiSpreadsheet, BiShoppingBag } from 'react-icons/bi'
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from 'axios'
import { RiShieldUserFill } from "react-icons/ri";



const NormalMenu = () => {
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

    return (
        <div className="hidden text-[#202020] bg-white w-60 font-primary md:flex md:flex-col md:overflow-auto h-screen border-r-2">
            <div className="flex items-center gap-2 px-1 py-3">
                <span className="text-xl p-2 text-[#202020] font-bold">PatagoniaGems</span>
            </div>
            <div className="py-4 flex flex-1 flex-col gap-4 m-2">
                <p className='text-sm text-gray-500'>Panel de administrador</p>
                <Link to="/dashboard" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard' ? 'bg-purple-800 text-white duration-300   ' : ''}`}>
                    <BiBarChart size={25} />Inicio
                </Link>
                <p className='text-sm text-gray-500'>Inventario</p>
                <Link to="/dashboard/inventario/agregar" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/inventario/agregar' ? 'bg-purple-800 text-white duration-300' : ''}`}>
                    <HiOutlineViewGridAdd size={25} />Agregar productos
                </Link>
                <Link to="/dashboard/categorias" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black ${location.pathname === '/dashboard/categorias' ? 'bg-purple-800 text-white' : ''}`}>
                    <BiSpreadsheet size={25} />Categorias
                </Link>
                <Link to="/dashboard/inventario" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/inventario' ? 'bg-purple-800 text-white duration-300' : ''}`}>
                    <HiOutlineViewGrid size={25} />Productos
                </Link>
                <p className='text-sm text-gray-500'>Informacion</p>
                <Link to="/dashboard/clientes" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/clientes' ? 'bg-purple-800 text-white duration-300' : ''}`}>
                    <IoPeopleSharp size={20} />Clientes
                </Link>
                <Link to="/dashboard/pedidos" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/pedidos' ? 'bg-purple-800 text-white duration-300' : ''}`}>
                    <BiShoppingBag size={25} />Pedidos
                </Link>
            </div>
            <div className='flex flex-col  p-2 hover:bg-gray-200 duration-100 ease-in-out transition-all'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <div className='items-center justify-center flex p-2'>
                            <RiShieldUserFill size={30} className='text-[#202020]'/>
                        </div>
                        <div className='text-start items-start justify-center flex flex-col'>
                            <h2 className='text-md'>
                                {nombre}
                            </h2>
                            <h3 className='text-sm text-gray-500'>
                                {role}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col m-2 gap-4 py-4'>
                <Link to="/" className="inline-flex items-center gap-2 p-1 hover:rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100">
                    <IoArrowBackSharp size={25} />Ir a la tienda
                </Link>
                <Link to="/" onClick={handleLogout} className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100">
                    <HiOutlineLogout size={25}/>Cerrar sesión
                </Link>
            </div>
        </div>
    )
}

export default NormalMenu