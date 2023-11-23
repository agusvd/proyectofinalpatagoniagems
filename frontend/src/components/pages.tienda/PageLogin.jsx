import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiCrystalGrowth } from 'react-icons/gi';
import { toast, Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FcGoogle } from 'react-icons/fc'

const PageLogin = () => {
    const [values, setValues] = useState({
        email: '',
        contraseña: '',
    });
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await executeRecaptcha('Login');
        console.log(token)
        axios
            .post('http://localhost:8000/login', { ...values, token })
            .then((res) => {
                if (res.data.Status === 'Perfecto') {
                    // Obtener el token del response
                    const token = res.data.token;
                    // Decodificar el token para obtener la información
                    const decodedToken = jwtDecode(token);
                    // Verificar si el usuario es administrador
                    if (decodedToken.isAdmin) {
                        toast.success('Ingresaste correctamente administrador');
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 1000);
                    } else {
                        toast.success('Ingresaste correctamente');
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
            <div className="w-full max-w-md m-auto bg-white shadow-xl rounded-md p-5 hover:shadow-3xl hover:shadow-purple-400 transition-all ease-in duration-500 hover:">
                <header className="text-center pt-10 pb-16">
                    <a className="text-4xl font-bold text-center text-purple-600">PatagoniaGems</a>
                </header>
                <GoogleReCaptchaProvider reCaptchaKey="6LfS5RsnAAAAAHNasTesF3XiLU3ZNJtyNclR7ycz">
                    <form onSubmit={handleSubmit}>
                        <div className=""></div>
                        <div>
                            <label className="block mb-2 text-purple-600 float-left">Correo</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 bg-white border-gray-300 outline-none" type="email" onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="Escriba su correo electrónico" />
                        </div>
                        <div>
                            <label className="block mb-2 text-purple-600">Contraseña</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 bg-white border-gray-300 outline-none" type="password" onChange={(e) => setValues({ ...values, contraseña: e.target.value })} placeholder="Escriba su contraseña" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link to="/">
                                <GiCrystalGrowth size={35} className="hover:scale-125 text-purple-600 hover:text-red-600 mb-2 transition duration-300 transform hover:rotate-45" />
                            </Link>
                            <Link to="/" className="text-gray-500 hover:text-pink-700 text-sm">
                                Olvidaste la contraseña?
                            </Link>
                        </div>
                        <div className="items-center m-2 flex justify-center">
                            <button className="w-3/4 bg-indigo-500 hover:bg-pink-500 duration-300 transition-all ease-in text-white font-bold py-2 px-4 rounded-full text-lg" type="submit">
                                Entrar
                            </button>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='font-bold text-lg'>O</p>
                        </div>

                    </form>
                    <div className='flex flex-col justify-center items-center m-2'>
                        <button className='bg-white border-2 hover:bg-gray-200 border-gray-200 duration-300 ease-in-out rounded-3xl w-3/4 flex items-center justify-start gap-5 p-2'>
                            <FcGoogle size={30} /><h3 className='text-lg'>Continuar con google</h3>
                        </button>
                    </div>
                    <div className="flex flex-col text-center pt-20">
                        <a className="text-gray-500">No tienes cuenta?</a>
                        <Link to="/register" className="text-purple-500 hover:text-pink-700 text-sm">
                            Registrarse
                        </Link>
                    </div>
                </GoogleReCaptchaProvider>
            </div>
        </div>
    );
};

export default PageLogin;
