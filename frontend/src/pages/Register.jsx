import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import Logo from '../assets/crystal.png'


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
        <div className="flex h-screen bg-white">
            <Toaster />
            <div className="w-full max-w-xs m-auto bg-white shadow-xl rounded-md p-5">
                <header>
                    <img className=" mx-auto mb-5 h-20 animate-bounce" src={Logo} />
                </header>
                <form className='grid grid-cols-2 gap-3' onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-purple-600">Nombre</label>
                        <input required className="w-full p-2 mb-2 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="text" name="nombre" onChange={e => setValues({ ...values, nombre: e.target.value })} />
                    </div>
                    <div>
                        <label className="block mb-2 text-purple-600">Apellido</label>
                        <input required className="w-full p-2 mb-2 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="text" name="apellido" onChange={e => setValues({ ...values, apellido: e.target.value })} />
                    </div>
                    <div className='col-span-2'>
                        <label className="block mb-2 text-purple-600">Email</label>
                        <input required className="w-full p-2 mb-2 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="email" name="email" onChange={e => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='col-span-2'>
                        <label className="block mb-2 text-purple-600">Contraseña</label>
                        <input required className="w-full p-2 mb-2 text-purple-600 border-b-2 border-purple-600 outline-none focus:bg-purple-100" type="password" onChange={e => setValues({ ...values, contraseña: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                        <input className="w-full bg-purple-700 hover:bg-black text-white font-bold py-2 px-4 mb-2 rounded" type="submit" />
                    </div>
                </form>
                <footer className='text-center'>
                    <Link to="/login" className="text-indigo-700 hover:text-pink-700 text-sm">Ya tengo cuenta</Link>
                </footer>
            </div>
        </div>
    )
}

export default Register