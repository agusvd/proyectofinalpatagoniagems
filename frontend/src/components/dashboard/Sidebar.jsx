import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoPeopleSharp, IoRadioButtonOffOutline } from 'react-icons/io5'
import { HiOutlineLogout } from 'react-icons/hi';
import { BiBarChart, BiSpreadsheet, BiAddToQueue, BiGridAlt, BiDotsVerticalRounded } from 'react-icons/bi'
import { IoArrowBackSharp } from 'react-icons/io5';
import axios from 'axios'

export default function Sidebar() {

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
					<Link to="/" onClick={() => { handleNav(); handleLogout(); }} className='p-2 text-white w-full'>Cerrar sesion</Link>

				</div>
			)
				: (
					''
				)}
			<div className="hidden bg-[#202020] text-white w-60 font-primary md:flex md:flex-col md:overflow-auto h-screen md:h-[700px] md:m-4 md:rounded-xl">
				<div className="flex items-center gap-2 px-1 py-3">
					<span className="text-xl p-2 text-white font-bold">PatagoniaGems</span>
				</div>
				<div className="py-4 flex flex-1 flex-col gap-4 m-2">
					<p className='text-sm text-gray-500'>Panel de administrador</p>
					<Link to="/dashboard" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard' ? 'bg-purple-800 text-white' : ''}`}>
						<BiBarChart size={25} />Inicio
					</Link>
					<p className='text-sm text-gray-500'>Inventario</p>
					<Link to="/dashboard/inventario" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/inventario' ? 'bg-purple-800 text-white' : ''}`}>
						<BiSpreadsheet size={25} />Productos
					</Link>
					<Link to="/dashboard/inventario/agregar" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/inventario/agregar' ? 'bg-purple-800 text-white' : ''}`}>
						<BiAddToQueue size={25} />Agregar productos
					</Link>
					<Link to="/dashboard/categorias" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black ${location.pathname === '/dashboard/categorias' ? 'bg-purple-800 text-white' : ''}`}>
						<BiGridAlt size={25} />Categorias
					</Link>
					<p className='text-sm text-gray-500'>Informacion</p>
					<Link to="/dashboard/clientes" className={`inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100 ${location.pathname === '/dashboard/clientes' ? 'bg-purple-800 text-white' : ''}`}>
						<IoPeopleSharp size={20} />Clientes
					</Link>
				</div>
				<div className='flex flex-col pl-2'>
					<button className='flex justify-between'>
						<div className='flex gap-2'>
							<div className='rounded-full w-[50px]'>
								<img src='https://png.pngtree.com/png-vector/20191116/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_1992804.jpg' className='rounded-full' />
							</div>
							<div className='text-start'>
								<h2 className='text-md'>
									{nombre}
								</h2>
								<h3 className='text-sm text-gray-500'>
									{role}
								</h3>
							</div>
						</div>
						<div className='group relative'>
							<button className='text-white hover:text-purple-600 p-1 rounded-full'>
								<BiDotsVerticalRounded size={30} />
							</button>
							<ul className='fixed hidden group-hover:block bottom-12 left-20 z-[99] text-sm'>
								<li className='text-white bg-[#202020] shadow-2xl  gap-2 rounded-xl p-2 space-y-2 whitespace-no-wrap flex flex-col'>
									<Link to="/" className="inline-flex items-center gap-2 p-1 hover:rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100">
										<IoArrowBackSharp className="inline-block mr-2" />
										Ir a la tienda
									</Link>
									<Link to="/" onClick={handleLogout} className="inline-flex items-center gap-2 p-1 rounded-md hover:bg-gray-200 hover:text-black transition-all  ease-in-out duration-100">
										<HiOutlineLogout className="inline-block mr-2" />
										Cerrar sesión
									</Link>
								</li>
							</ul>
						</div>
					</button>

				</div>
			</div>
		</div>
	);
}