import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiCrystalGrowth } from 'react-icons/gi';
import { toast, Toaster } from 'react-hot-toast';
import Logo from '../assets/crystal.png';
import jwtDecode from 'jwt-decode';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        contraseña: '',
    });
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/login', values)
            .then((res) => {
                if (res.data.Status === "Perfecto") {
                    // Obtener el token del response
                    const token = res.data.token;
                    // Decodificar el token para obtener la información
                    const decodedToken = jwtDecode(token);
                    // Verificar si el usuario es administrador
                    if (decodedToken.isAdmin) {
                        toast.success("Ingresaste correctamente administrador");
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1000);
                    } else {
                        toast.success("Ingresaste correctamente");
                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    }
                } else {
                    toast.error(res.data.Error, {
                        className: 'bg-purple-600 text-white',
                    });
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="flex h-screen bg-white">
            <Toaster />
            <div className="w-full max-w-xs m-auto bg-white shadow-xl rounded-md p-5">
                <header>
                    <img className="w-20 mx-auto mb-5 animate-bounce" src={Logo} alt="Logo" />
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 text-purple-600 float-left">Email</label>
                        <Link to="/"><GiCrystalGrowth className='text-3xl hover:scale-125 text-purple-600 hover:text-red-600 float-right mb-2 transition duration-300 transform hover:rotate-45' /></Link>
                    </div>
                    <div>
                        <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="email" onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-2 text-purple-600">Contraseña</label>
                        <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="password" onChange={e => setValues({ ...values, contraseña: e.target.value })} />
                    </div>
                    <div>
                        <input className="w-full bg-purple-700 hover:bg-black text-white font-bold py-2 px-4 mb-6 rounded" type="submit" />
                    </div>
                </form>
                <footer className='justify-between flex gap-2 items-center'>
                    <Link to="/" className="text-indigo-700 hover:text-pink-700 text-sm ">Olvidé la contraseña</Link>
                    <Link to="/register" className="text-indigo-700 hover:text-pink-700 text-sm ">Crear cuenta</Link>
                </footer>
            </div>
        </div>
    )
}

export default Login