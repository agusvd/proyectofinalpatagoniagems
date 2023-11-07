import React, {useState, useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
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
        <div>
            <div className='sm:hidden flex justify-center items-center p-2 bg-[#202020] text-white z-[99]'>
                <button onClick={handleNav} className='flex gap-2 items-center justify-center bg-black p-2 rounded-xl'>
                    <AiOutlineMenu size={24} className="z-[99] md:hidden text-white cursor-pointer" />
                    {nav ?
                        (<h2 className='text-white text-xl'>Cerrar</h2>)
                        :
                        (<h2 className='text-white text-xl'>Menu</h2>)
                    }
                </button>
            </div>
            {nav ? (
                <div className='fixed w-screen h-screen bg-[#202020] flex flex-col pt-12 items-center z-20 text-center gap-2 text-xl'>
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
        </div>
    )
}

export default MobileMenu