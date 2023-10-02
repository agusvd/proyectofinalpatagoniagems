import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { GiCrystalGrowth } from 'react-icons/gi';


const Register = () => {
    const [passwordValid, setPasswordValid] = useState(true);
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
    })

    const navigate = useNavigate()
    const handleSubmit = (e) => {

        e.preventDefault();

        if (values.contraseña.length < 8) {
            setPasswordValid(false);
            toast.error('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        console.log(values)
        axios.post('http://localhost:8000/register', values)
            .then(res => {
                if (res.data.Status === "Perfecto") {
                    toast.success("Registrado correctamente")
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000)
                } else {
                    alert("Error")
                }
            })
            .then(err => console.log(err))
    }


    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-primary justify-center items-center">
            <Toaster />
            <div className="w-auto h-auto m-auto bg-white shadow-xl rounded-md p-10">
                <header className='text-center pt-10 pb-20'>
                    <a className='text-4xl font-bold text-center text-purple-600'>PatagoniaGems</a>
                </header>
                <form className='grid grid-cols-2 gap-2' onSubmit={handleSubmit}>
                    <div className='col-span-2 sm:col-span-1'>
                        <div>
                            <label className="block mb-2 text-purple-600 float-left">Nombre</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="text" name="apellido" onChange={e => setValues({ ...values, nombre: e.target.value })} placeholder="Escriba su nombre" />
                        </div>
                        <div>
                            <label className="block mb-2 text-purple-600">Apellido</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="text" name="apellido" onChange={e => setValues({ ...values, apellido: e.target.value })} placeholder="Escriba su apellido" />
                        </div>
                    </div>
                    <div className='col-span-2 sm:col-span-1'>
                        <div>
                            <label className="block mb-2 text-purple-600">Email</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="email" name="email" onChange={e => setValues({ ...values, email: e.target.value })} placeholder="Escriba su correo electrónico" />
                        </div>
                        <div>
                            <label className="block mb-2 text-purple-600">Contraseña</label>
                            <input required className="w-full p-2 mb-6 text-purple-600 border-b-2 border-gray-300 outline-none" type="password" onChange={e => setValues({ ...values, contraseña: e.target.value })} placeholder="Escriba su contraseña" />
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className="">
                            <button className="w-full bg-indigo-500 hover:bg-pink-500 duration-500 transition-all ease-in text-white font-bold py-2 px-4 mb-6 rounded-full" type="submit">Registrarse</button>
                        </div>
                    </div>
                    <div className='flex justify-between items-center col-span-2'>
                        <div className='flex text-center'>
                            <Link to="/" className='items-center flex gap-2 text-purple-600 hover:text-red-500'><GiCrystalGrowth className='text-3xl hover:scale-125 text-purple-600 hover:text-red-600 float-right mb-2 transition duration-300 transform hover:rotate-45' />Volver</Link>
                        </div>
                        <div className='flex flex-col text-center'>
                            <a className='text-gray-500'>Ya tienes cuenta?</a>
                            <Link to="/login" className="text-purple-500 hover:text-pink-700 text-sm ">Iniciar sesion</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register