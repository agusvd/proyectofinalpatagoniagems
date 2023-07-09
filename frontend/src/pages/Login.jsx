import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiCrystalGrowth } from 'react-icons/gi';
import { toast, Toaster } from 'react-hot-toast';
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
        <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-primary justify-center items-center ">
            <Toaster />
            <div className="w-full max-w-md m-auto bg-white shadow-xl rounded-md p-10">
                <header className='text-center pt-10 pb-20'>
                    <a className='text-4xl font-bold text-center text-purple-600'>PatagoniaGems</a>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        
                    </div>
                    <div>
                        <label className="block mb-2 text-purple-600 float-left">Correo</label>
                        <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="email" onChange={e => setValues({ ...values, email: e.target.value })} placeholder="Escriba su correo electrónico" />
                    </div>
                    <div>
                        <label className="block mb-2 text-purple-600">Contraseña</label>
                        <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="password" onChange={e => setValues({ ...values, contraseña: e.target.value })} placeholder='Escriba su contraseña' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Link to="/"><GiCrystalGrowth size={35} className='hover:scale-125 text-purple-600 hover:text-red-600 mb-2 transition duration-300 transform hover:rotate-45' /></Link>
                        <Link to="/" className="text-gray-500 hover:text-pink-700 text-sm">Olvidaste la contraseña?</Link>
                    </div>
                    <div className='m-2 items-center pt-4'>
                        <button className="w-full bg-indigo-500 hover:bg-pink-500 duration-500 transition-all ease-in text-white font-bold py-2 px-4 mb-6 rounded-full " type="submit">Entrar</button>
                    </div>
                    <div className='flex flex-col text-center pt-20'>
                        <a className='text-gray-500'>No tienes cuenta?</a>
                        <Link to="/register" className="text-purple-500 hover:text-pink-700 text-sm ">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login