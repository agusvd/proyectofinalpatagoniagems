import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import { IoHomeSharp, IoPeopleSharp, IoRadioButtonOffOutline } from 'react-icons/io5'
import { CgChevronRight, CgChevronDown } from "react-icons/cg"
import { HiOutlineLogout } from 'react-icons/hi';
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from 'axios'

export default function Sidebar() {

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

	// Mostrar opciones inv
	const [inv, SetInv] = useState(false)

	// opciones inv
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [showCreateCategory, setShowCreateCategory] = useState(false);
	const [showViewCategories, setShowViewCategories] = useState(false);
	const [showViewInventory, setShowViewInventory] = useState(false);

	const inventoryNav = () => {
		SetInv(!inv);
		if (inv) {
			setShowAddProduct(false);
			setShowCreateCategory(false);
			setShowViewCategories(false);
			setShowViewInventory(false);
		} else {
			setShowAddProduct(true);
			setShowCreateCategory(true);
			setShowViewCategories(true);
			setShowViewInventory(true);
		}
		console.log("Apretaste el inventario");
	};


	return (
		<div className=''>
			<AiOutlineMenu onClick={handleNav} size={24} className="absolute top-4 left-4 z-[99] md:hidden text-white cursor-pointer" />
			{nav ? (
				<div className='fixed w-full h-screen bg-violet-950 flex flex-col pt-12 items-center z-20 text-center gap-2 text-xl'>
					<Link to="/dashboard" onClick={handleNav} className='p-2 text-white w-full'>Inicio</Link>
					<Link to="/dashboard/inventario" onClick={handleNav} className='p-2 text-white w-full'>Inventario</Link>
					<Link to="/dashboard/inventario/agregar" onClick={handleNav} className='p-2 text-white w-full'>Agregar productos</Link>
					<Link to="/dashboard/categorias" onClick={handleNav} className='p-2 text-white w-full'>Categorias</Link>
					<Link to="/dashboard/clientes" onClick={handleNav} className='p-2 text-white w-full'>Clientes</Link>
					<Link to="/" onClick={handleNav} className='p-2 text-white w-full'>Volver a la tienda</Link>
					<Link to="/" onClick={() => { handleNav(); handleLogout(); }}  className='p-2 text-white w-full'>Cerrar sesion</Link>

				</div>
			)
				: (
					''
				)}
			<div className="hidden bg-black text-white w-60 font-primary md:flex md:flex-col  md:overflow-auto md:h-screen">
				<div className="flex items-center gap-2 px-1 py-3">
					<span className="text-xl p-2 text-white font-bold">PatagoniaGems</span>
				</div>
				<div className="py-4 flex flex-1 flex-col gap-4 m-2">
					<p className='text-sm text-gray-500'>Panel de administrador</p>
					<Link to="/dashboard" className='inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black'>
						<IoHomeSharp className='text-xl' />Dashboard
					</Link>
					<Link onClick={inventoryNav} className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
						<AiOutlinePlus className="text-xl" />
						Inventario {inv ? <CgChevronDown className='ml-auto text-xl' /> : <CgChevronRight className='ml-auto text-xl' />}
					</Link>

					{inv ? (
						<>
							{showViewInventory && (
								<Link to="/dashboard/inventario" className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
									<IoRadioButtonOffOutline className="text-sm ml-5" />Ver inventario
								</Link>
							)}
							{showAddProduct && (
								<Link to="/dashboard/inventario/agregar" className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
									<IoRadioButtonOffOutline className="text-sm ml-5" />Nuevo producto
								</Link>
							)}
							{showCreateCategory && (
								<Link to="/dashboard/categorias" className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
									<IoRadioButtonOffOutline className="text-sm ml-5" />Categorias
								</Link>
							)}
							{showViewCategories && (
								<button className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
									<IoRadioButtonOffOutline className="text-sm ml-5" />Proximamente
								</button>
							)}
						</>
					)
						: (
							''
						)}
					<Link to="/dashboard/clientes" className='inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black'><IoPeopleSharp className='text-xl' />Clientes</Link>
				</div>
				<div className='flex flex-col bg-black pl-2 border-t-2'>
					<Link to="/" className="inline-flex items-center gap-2 p-1 hover:rounded-md hover:bg-gray-200 hover:text-black">
						<IoArrowBackSharp className="inline-block mr-2" />
						Ir a la tienda
					</Link>
					<Link to="/" onClick={handleLogout} className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black">
						<HiOutlineLogout className="inline-block mr-2" />
						Cerrar sesión
					</Link>
				</div>
			</div>
		</div>
	);
}